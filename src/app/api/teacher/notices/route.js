import { NextResponse } from "next/server";
import { z } from "zod";

import { prisma } from "@/lib/prisma";
import { requireTeacher, enforceRateLimit } from "@/lib/apiAuth";
import { jsonError, jsonOk } from "@/lib/http";
import { getTeacherContext, assertTeacherHasClass } from "@/lib/teacherAccess";
import { notifyNoticePublished } from "@/lib/notify";

const schema = z.object({
  classId: z.string().min(1),
  title: z.string().min(3).max(200),
  content: z.string().min(5).max(5000),
  isPublished: z.boolean().optional().default(true),
});

export async function POST(req) {
  const rl = enforceRateLimit(req, { keyPrefix: "teacher:notices", limit: 20, windowMs: 60_000 });
  if (!rl.ok) return jsonError("RATE_LIMITED", 429);

  try {
    const user = await requireTeacher();
    const body = schema.parse(await req.json());

    const ctx = await getTeacherContext(user.id);
    assertTeacherHasClass(ctx, body.classId);

    const notice = await prisma.notice.create({
      data: {
        title: body.title,
        content: body.content,
        classId: body.classId,
        audienceRole: null,
        isPublished: body.isPublished,
        createdById: user.id,
        publishedAt: new Date(),
      },
    });

    if (notice.isPublished) {
      await notifyNoticePublished(notice.id);
    }

    return jsonOk({ id: notice.id });
  } catch (err) {
    return NextResponse.json(
      { ok: false, error: err?.message || "BAD_REQUEST" },
      { status: err?.status || 400 }
    );
  }
}
