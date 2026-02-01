import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { requireTeacher, enforceRateLimit } from "@/lib/apiAuth";
import { jsonError, jsonOk } from "@/lib/http";

export async function GET(req) {
  const rl = enforceRateLimit(req, { keyPrefix: "teacher:classes", limit: 60, windowMs: 60_000 });
  if (!rl.ok) return jsonError("RATE_LIMITED", 429);

  try {
    const user = await requireTeacher();

    const teacher = await prisma.teacher.findUnique({
      where: { userId: user.id },
      select: {
        classAssignments: {
          select: {
            class: {
              select: { id: true, grade: true, section: true, academicYear: true, name: true },
            },
          },
        },
      },
    });

    const classes = (teacher?.classAssignments || []).map((a) => a.class);
    return jsonOk({ classes });
  } catch (err) {
    return NextResponse.json(
      { ok: false, error: err?.message || "BAD_REQUEST" },
      { status: err?.status || 400 }
    );
  }
}
