import { prisma } from "@/lib/prisma";
import { getTeacherContext } from "@/lib/teacherAccess";

export async function canUserAccessClass(user, classId) {
  if (!user || !classId) return false;

  if (user.role === "ADMIN") return true;

  if (user.role === "TEACHER") {
    const ctx = await getTeacherContext(user.id);
    return !!ctx?.classIds?.has(classId);
  }

  if (user.role === "STUDENT") {
    const student = await prisma.student.findUnique({
      where: { userId: user.id },
      select: { classId: true },
    });
    return student?.classId === classId;
  }

  if (user.role === "PARENT") {
    const parent = await prisma.parent.findUnique({
      where: { userId: user.id },
      select: {
        children: { select: { student: { select: { classId: true } } } },
      },
    });

    return (parent?.children || []).some((c) => c?.student?.classId === classId);
  }

  return false;
}
