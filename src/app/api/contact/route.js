import { NextResponse } from "next/server";
import { z } from "zod";

import { prisma } from "@/lib/prisma";
import { sendTemplateEmail } from "@/lib/email/send";

const schema = z.object({
  name: z.string().min(2).max(120),
  email: z.string().email().max(200),
  phone: z.string().max(50).optional().or(z.literal("")),
  message: z.string().min(5).max(5000),
});

export async function POST(req) {
  try {
    const body = await req.json();
    const data = schema.parse(body);

    const enquiry = await prisma.contactEnquiry.create({
      data: {
        name: data.name,
        email: data.email.toLowerCase(),
        phone: data.phone || null,
        message: data.message,
      },
    });

    // Notify office (if configured)
    const to = process.env.MAIL_TO_CONTACT;
    if (to) {
      await sendTemplateEmail({
        to,
        templateKey: "CONTACT_ENQUIRY",
        context: {
          name: enquiry.name,
          email: enquiry.email,
          phone: enquiry.phone || "-",
          message: enquiry.message,
        },
      });
    }

    return NextResponse.json({ ok: true, id: enquiry.id });
  } catch (err) {
    const message = err?.message || "Bad Request";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
