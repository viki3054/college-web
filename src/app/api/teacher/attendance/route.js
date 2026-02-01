import { NextResponse } from "next/server";
import { z } from "zod";

import { prisma } from "@/lib/prisma";
import { requireTeacher, enforceRateLimit } from "@/lib/apiAuth";
import { jsonError, jsonOk } from "@/lib/http";
import { getTeacherContext, assertTeacherHasClass, assertTeacherHasSubjectIfAssigned } from "@/lib/teacherAccess";
import { notifyAttendanceAlert } from "@/lib/notify";

const schema = z.object({
  classId: z.string().min(1),
  subjectId: z.string().optional().nullable(),
  date: z.string().min(8),
  entries: z
    .array(
      z.object({
        studentId: z.string().min(1),
        status: z.enum(["PRESENT", "ABSENT", "LATE", "EXCUSED"]),
        note: z.string().max(500).optional().nullable(),
      })
    )
    .min(1),
});

export async function POST(req) {
  const rl = enforceRateLimit(req, { keyPrefix: "teacher:attendance", limit: 20, windowMs: 60_000 });
  if (!rl.ok) return jsonError("RATE_LIMITED", 429);

  try {
    const user = await requireTeacher();
    const body = schema.parse(await req.json());

    const ctx = await getTeacherContext(user.id);
    assertTeacherHasClass(ctx, body.classId);
    assertTeacherHasSubjectIfAssigned(ctx, body.subjectId);

    const date = new Date(body.date);
    date.setHours(0, 0, 0, 0);

    const record = await prisma.attendanceRecord.upsert({
      where: {
        date_classId_subjectId: {
          date,
          classId: body.classId,
          subjectId: body.subjectId || null,
        },
      },
      create: {
        date,
        classId: body.classId,
        subjectId: body.subjectId || null,
        markedById: user.id,
      },
      update: {
        markedById: user.id,
        updatedAt: new Date(),
      },
    });

    await prisma.$transaction(
      body.entries.map((e) =>
        prisma.attendanceEntry.upsert({
          where: {
            recordId_studentId: { recordId: record.id, studentId: e.studentId },
          },
          create: {
            recordId: record.id,
            studentId: e.studentId,
            status: e.status,
            note: e.note || null,
          },
          update: {
            status: e.status,
            note: e.note || null,
          },
        })
      )
    );

    // Send alerts for absences/late
    for (const e of body.entries) {
      if (e.status === "ABSENT" || e.status === "LATE") {
        await notifyAttendanceAlert({ studentId: e.studentId, date, status: e.status });
      }
    }

    return jsonOk({ recordId: record.id });
  } catch (err) {
    return NextResponse.json(
      { ok: false, error: err?.message || "BAD_REQUEST" },
      { status: err?.status || 400 }
    );
  }
}
