import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { requireTeacher, enforceRateLimit } from "@/lib/apiAuth";
import { jsonError, jsonOk } from "@/lib/http";
import { getTeacherContext, assertTeacherHasClass } from "@/lib/teacherAccess";

export async function GET(req) {
  const rl = enforceRateLimit(req, { keyPrefix: "teacher:performance", limit: 60, windowMs: 60_000 });
  if (!rl.ok) return jsonError("RATE_LIMITED", 429);

  try {
    const user = await requireTeacher();
    const url = new URL(req.url);
    const classId = url.searchParams.get("classId") || "";

    const ctx = await getTeacherContext(user.id);
    assertTeacherHasClass(ctx, classId);

    const students = await prisma.student.findMany({
      where: { classId },
      select: {
        id: true,
        admissionNo: true,
        user: { select: { name: true, email: true } },
      },
      orderBy: { admissionNo: "asc" },
    });

    const studentIds = students.map((s) => s.id);

    const [attendanceAgg, resultsAgg] = await Promise.all([
      prisma.attendanceEntry.groupBy({
        by: ["studentId", "status"],
        where: { studentId: { in: studentIds } },
        _count: { _all: true },
      }),
      prisma.result.groupBy({
        by: ["studentId"],
        where: { studentId: { in: studentIds } },
        _count: { _all: true },
        _avg: { marks: true, maxMarks: true },
      }),
    ]);

    const attendanceMap = new Map();
    for (const a of attendanceAgg) {
      const rec = attendanceMap.get(a.studentId) || { total: 0, present: 0 };
      rec.total += a._count._all;
      if (a.status === "PRESENT") rec.present += a._count._all;
      attendanceMap.set(a.studentId, rec);
    }

    const resultsMap = new Map();
    for (const r of resultsAgg) {
      const avgMarks = r._avg.marks;
      const avgMax = r._avg.maxMarks;
      const avgPercent =
        avgMarks === null || avgMax === null || avgMax === 0
          ? null
          : (avgMarks / avgMax) * 100;

      resultsMap.set(r.studentId, {
        resultsCount: r._count._all,
        avgPercent,
      });
    }

    const rows = students.map((s) => {
      const a = attendanceMap.get(s.id) || { total: 0, present: 0 };
      const r = resultsMap.get(s.id) || { resultsCount: 0, avgPercent: null };
      return {
        studentId: s.id,
        admissionNo: s.admissionNo,
        name: s.user?.name || s.user?.email,
        attendanceCount: a.total,
        presentCount: a.present,
        resultsCount: r.resultsCount,
        avgPercent: r.avgPercent,
      };
    });

    return jsonOk({ rows });
  } catch (err) {
    return NextResponse.json(
      { ok: false, error: err?.message || "BAD_REQUEST" },
      { status: err?.status || 400 }
    );
  }
}
