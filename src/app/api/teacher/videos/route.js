import { NextResponse } from "next/server";
import { z } from "zod";

import { prisma } from "@/lib/prisma";
import { requireTeacher, enforceRateLimit } from "@/lib/apiAuth";
import { jsonError, jsonOk } from "@/lib/http";
import { getTeacherContext, assertTeacherHasClass, assertTeacherHasSubjectIfAssigned } from "@/lib/teacherAccess";

const schema = z.object({
  classId: z.string().min(1).optional().nullable(),
  subjectId: z.string().min(1).optional().nullable(),
  title: z.string().min(3).max(200),
  url: z.string().url().max(500),
});

export async function POST(req) {
  const rl = enforceRateLimit(req, { keyPrefix: "teacher:videos", limit: 20, windowMs: 60_000 });
  if (!rl.ok) return jsonError("RATE_LIMITED", 429);

  try {
    const user = await requireTeacher();
    const body = schema.parse(await req.json());

    const ctx = await getTeacherContext(user.id);

    if (body.classId) assertTeacherHasClass(ctx, body.classId);
    assertTeacherHasSubjectIfAssigned(ctx, body.subjectId);

    const link = await prisma.videoLink.create({
      data: {
        title: body.title,
        url: body.url,
        classId: body.classId || null,
        subjectId: body.subjectId || null,
        createdById: user.id,
      },
    });

    return jsonOk({ id: link.id });
  } catch (err) {
    return NextResponse.json(
      { ok: false, error: err?.message || "BAD_REQUEST" },
      { status: err?.status || 400 }
    );
  }
}
