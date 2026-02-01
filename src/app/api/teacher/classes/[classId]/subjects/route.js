import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { requireTeacher, enforceRateLimit } from "@/lib/apiAuth";
import { jsonError, jsonOk } from "@/lib/http";
import { getTeacherContext, assertTeacherHasClass } from "@/lib/teacherAccess";

export async function GET(req, { params }) {
  const rl = enforceRateLimit(req, { keyPrefix: "teacher:subjects", limit: 120, windowMs: 60_000 });
  if (!rl.ok) return jsonError("RATE_LIMITED", 429);

  try {
    const user = await requireTeacher();
    const classId = params.classId;

    const ctx = await getTeacherContext(user.id);
    assertTeacherHasClass(ctx, classId);

    const links = await prisma.classSubject.findMany({
      where: { classId },
      select: { subject: { select: { id: true, name: true, code: true } } },
      orderBy: { subject: { name: "asc" } },
    });

    const subjects = links.map((l) => l.subject);
    return jsonOk({ subjects });
  } catch (err) {
    return NextResponse.json(
      { ok: false, error: err?.message || "BAD_REQUEST" },
      { status: err?.status || 400 }
    );
  }
}
