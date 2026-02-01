import { prisma } from "@/lib/prisma";

export async function getTeacherContext(userId) {
  const teacher = await prisma.teacher.findUnique({
    where: { userId },
    select: {
      id: true,
      classAssignments: { select: { classId: true } },
      subjectLinks: { select: { subjectId: true } },
    },
  });

  const classIds = new Set((teacher?.classAssignments || []).map((t) => t.classId));
  const subjectIds = new Set((teacher?.subjectLinks || []).map((t) => t.subjectId));

  return {
    teacherId: teacher?.id || null,
    classIds,
    subjectIds,
  };
}

export function assertTeacherHasClass(ctx, classId) {
  if (!classId || !ctx?.classIds?.has(classId)) {
    const error = new Error("FORBIDDEN_CLASS");
    error.status = 403;
    throw error;
  }
}

export function assertTeacherHasSubjectIfAssigned(ctx, subjectId) {
  // If subjects were assigned, enforce; otherwise allow (useful while bootstrapping)
  if (!subjectId) return;
  if (ctx?.subjectIds && ctx.subjectIds.size > 0 && !ctx.subjectIds.has(subjectId)) {
    const error = new Error("FORBIDDEN_SUBJECT");
    error.status = 403;
    throw error;
  }
}
