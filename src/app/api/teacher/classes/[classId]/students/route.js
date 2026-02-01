import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { requireTeacher, enforceRateLimit } from "@/lib/apiAuth";
import { jsonError, jsonOk } from "@/lib/http";
import { getTeacherContext, assertTeacherHasClass } from "@/lib/teacherAccess";

export async function GET(req, { params }) {
  const rl = enforceRateLimit(req, { keyPrefix: "teacher:students", limit: 120, windowMs: 60_000 });
  if (!rl.ok) return jsonError("RATE_LIMITED", 429);

  try {
    const user = await requireTeacher();
    const { classId } = await params;

    const ctx = await getTeacherContext(user.id);
    assertTeacherHasClass(ctx, classId);

    const students = await prisma.student.findMany({
      where: { classId },
      orderBy: [{ rollNo: "asc" }, { admissionNo: "asc" }],
      select: {
        id: true,
        rollNo: true,
        admissionNo: true,
        user: { select: { name: true, email: true } },
      },
    });

    return jsonOk({ students });
  } catch (err) {
    return NextResponse.json(
      { ok: false, error: err?.message || "BAD_REQUEST" },
      { status: err?.status || 400 }
    );
  }
}
