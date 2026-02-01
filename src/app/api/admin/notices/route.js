import { z } from "zod";

import { prisma } from "@/lib/prisma";
import { jsonError, jsonOk } from "@/lib/http";
import { enforceRateLimit, requireAdmin } from "@/lib/apiAuth";
import { notifyNoticePublished } from "@/lib/notify";

export const runtime = "nodejs";

const createSchema = z.object({
  title: z.string().min(1).max(200),
  content: z.string().min(1).max(10_000),
  classId: z.string().optional().or(z.literal("")),
  audienceRole: z.enum(["ADMIN", "TEACHER", "PARENT", "STUDENT"]).optional(),
  isPublished: z.boolean().default(true),
  sendEmails: z.boolean().default(true),
});

export async function GET() {
  try {
    await requireAdmin();

    const notices = await prisma.notice.findMany({
      orderBy: { publishedAt: "desc" },
      include: { class: true },
      take: 100,
    });

    return jsonOk({ notices });
  } catch (e) {
    return jsonError(e, e?.status || 500);
  }
}

export async function POST(req) {
  try {
    const admin = await requireAdmin();

    const rl = enforceRateLimit(req, { limit: 30, windowMs: 60_000, keyPrefix: "admin-notices-write" });
    if (!rl.ok) return jsonError("Too many requests", 429);

    const body = await req.json();
    const data = createSchema.parse(body);

    const notice = await prisma.notice.create({
      data: {
        title: data.title,
        content: data.content,
        classId: data.classId || null,
        audienceRole: data.audienceRole || null,
        isPublished: data.isPublished,
        createdById: admin.id,
      },
      select: { id: true },
    });

    if (data.isPublished && data.sendEmails) {
      await notifyNoticePublished(notice.id);
    }

    return jsonOk({ id: notice.id }, { status: 201 });
  } catch (e) {
    return jsonError(e, 400);
  }
}
