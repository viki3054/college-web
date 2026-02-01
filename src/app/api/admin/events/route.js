import { z } from "zod";

import { prisma } from "@/lib/prisma";
import { jsonError, jsonOk } from "@/lib/http";
import { enforceRateLimit, requireAdmin } from "@/lib/apiAuth";
import { notifyEventPublished } from "@/lib/notify";

export const runtime = "nodejs";

const createSchema = z.object({
  title: z.string().min(1).max(200),
  description: z.string().min(1).max(10_000),
  location: z.string().max(200).optional().or(z.literal("")),
  startAt: z.string().min(1),
  endAt: z.string().optional().or(z.literal("")),
  classId: z.string().optional().or(z.literal("")),
  audienceRole: z.enum(["ADMIN", "TEACHER", "PARENT", "STUDENT"]).optional(),
  isPublished: z.boolean().default(true),
  sendEmails: z.boolean().default(true),
});

export async function GET() {
  try {
    await requireAdmin();

    const events = await prisma.event.findMany({
      orderBy: { startAt: "desc" },
      include: { class: true },
      take: 100,
    });

    return jsonOk({ events });
  } catch (e) {
    return jsonError(e, e?.status || 500);
  }
}

export async function POST(req) {
  try {
    const admin = await requireAdmin();

    const rl = enforceRateLimit(req, { limit: 30, windowMs: 60_000, keyPrefix: "admin-events-write" });
    if (!rl.ok) return jsonError("Too many requests", 429);

    const body = await req.json();
    const data = createSchema.parse(body);

    const event = await prisma.event.create({
      data: {
        title: data.title,
        description: data.description,
        location: data.location || null,
        startAt: new Date(data.startAt),
        endAt: data.endAt ? new Date(data.endAt) : null,
        classId: data.classId || null,
        audienceRole: data.audienceRole || null,
        isPublished: data.isPublished,
        createdById: admin.id,
      },
      select: { id: true },
    });

    if (data.isPublished && data.sendEmails) {
      await notifyEventPublished(event.id);
    }

    return jsonOk({ id: event.id }, { status: 201 });
  } catch (e) {
    return jsonError(e, 400);
  }
}
