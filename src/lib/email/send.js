import nodemailer from "nodemailer";

import { prisma } from "@/lib/prisma";

function envBool(v) {
  return String(v).toLowerCase() === "true";
}

function renderTemplate(str, context) {
  if (!str) return "";
  return str.replace(/\{\{\s*([a-zA-Z0-9_]+)\s*\}\}/g, (_, k) => {
    const val = context?.[k];
    return val === undefined || val === null ? "" : String(val);
  });
}

function buildTransporter() {
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT || 587);
  const secure = envBool(process.env.SMTP_SECURE);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !user || !pass) return null;

  return nodemailer.createTransport({
    host,
    port,
    secure,
    auth: { user, pass },
  });
}

export async function sendTemplateEmail({ to, templateKey, context }) {
  const template = await prisma.emailTemplate.findUnique({
    where: { key: templateKey },
  });

  if (!template || !template.isActive) {
    return;
  }

  const settings = await prisma.notificationSetting.findUnique({
    where: { id: "default" },
  });

  const from = settings?.fromName
    ? `${settings.fromName} <${process.env.SMTP_USER || "no-reply@example.com"}>`
    : process.env.MAIL_FROM;

  const replyTo = settings?.replyTo || process.env.MAIL_REPLY_TO || undefined;

  const subject = renderTemplate(template.subject, context);
  const html = renderTemplate(template.html, context);
  const text = renderTemplate(template.text || "", context);

  const log = await prisma.emailLog.create({
    data: {
      to,
      subject,
      templateKey,
      status: "QUEUED",
      context,
    },
  });

  const transporter = buildTransporter();
  if (!transporter) {
    await prisma.emailLog.update({
      where: { id: log.id },
      data: { status: "FAILED", error: "SMTP not configured" },
    });
    return;
  }

  try {
    const info = await transporter.sendMail({
      from,
      to,
      subject,
      text,
      html,
      replyTo,
    });

    await prisma.emailLog.update({
      where: { id: log.id },
      data: {
        status: "SENT",
        sentAt: new Date(),
        messageId: info.messageId || null,
      },
    });
  } catch (e) {
    await prisma.emailLog.update({
      where: { id: log.id },
      data: { status: "FAILED", error: e?.message || "Send failed" },
    });
  }
}
