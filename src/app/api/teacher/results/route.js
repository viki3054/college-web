import { NextResponse } from "next/server";
import { z } from "zod";

import { prisma } from "@/lib/prisma";
import { requireTeacher, enforceRateLimit } from "@/lib/apiAuth";
import { jsonError, jsonOk } from "@/lib/http";
import { getTeacherContext, assertTeacherHasClass, assertTeacherHasSubjectIfAssigned } from "@/lib/teacherAccess";
import { notifyResultsPublished } from "@/lib/notify";

const schema = z.object({
  classId: z.string().min(1),
  subjectId: z.string().min(1),
  term: z.string().min(1).max(50),
  examName: z.string().min(1).max(80),
  publish: z.boolean().optional().default(false),
  results: z
    .array(
      z.object({
        studentId: z.string().min(1),
        marks: z.number().min(0),
        maxMarks: z.number().min(1).optional().default(100),
      })
    )
    .min(1),
});

export async function POST(req) {
  const rl = enforceRateLimit(req, { keyPrefix: "teacher:results", limit: 15, windowMs: 60_000 });
  if (!rl.ok) return jsonError("RATE_LIMITED", 429);

  try {
    const user = await requireTeacher();
    const body = schema.parse(await req.json());

    const ctx = await getTeacherContext(user.id);
    assertTeacherHasClass(ctx, body.classId);
    assertTeacherHasSubjectIfAssigned(ctx, body.subjectId);

    const students = await prisma.student.findMany({
      where: { classId: body.classId },
      select: { id: true },
    });
    const allowedStudentIds = new Set(students.map((s) => s.id));

    const now = new Date();

    await prisma.$transaction(
      body.results
        .filter((r) => allowedStudentIds.has(r.studentId))
        .map((r) =>
          prisma.result.upsert({
            where: {
              studentId_subjectId_term_examName: {
                studentId: r.studentId,
                subjectId: body.subjectId,
                term: body.term,
                examName: body.examName,
              },
            },
            create: {
              studentId: r.studentId,
              subjectId: body.subjectId,
              term: body.term,
              examName: body.examName,
              marks: r.marks,
              maxMarks: r.maxMarks,
              publishedAt: body.publish ? now : null,
              publishedById: body.publish ? user.id : null,
            },
            update: {
              marks: r.marks,
              maxMarks: r.maxMarks,
              publishedAt: body.publish ? now : null,
              publishedById: body.publish ? user.id : null,
            },
          })
        )
    );

    if (body.publish) {
      for (const r of body.results) {
        if (allowedStudentIds.has(r.studentId)) {
          await notifyResultsPublished({
            studentId: r.studentId,
            term: body.term,
            examName: body.examName,
          });
        }
      }
    }

    return jsonOk({ published: body.publish });
  } catch (err) {
    return NextResponse.json(
      { ok: false, error: err?.message || "BAD_REQUEST" },
      { status: err?.status || 400 }
    );
  }
}
