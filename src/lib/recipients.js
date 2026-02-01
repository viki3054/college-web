import { prisma } from "@/lib/prisma";

export async function getEmailsForRole(role) {
  const users = await prisma.user.findMany({
    where: { role, isActive: true },
    select: { email: true },
  });
  return users.map((u) => u.email);
}

export async function getEmailsForClass(classId, roles = []) {
  const emails = new Set();

  if (roles.includes("STUDENT")) {
    const students = await prisma.student.findMany({
      where: { classId },
      select: { user: { select: { email: true, isActive: true } } },
    });
    for (const s of students) {
      if (s.user?.isActive) emails.add(s.user.email);
    }
  }

  if (roles.includes("PARENT")) {
    const links = await prisma.parentStudent.findMany({
      where: { student: { classId } },
      select: { parent: { select: { user: { select: { email: true, isActive: true } } } } },
    });
    for (const l of links) {
      const u = l.parent?.user;
      if (u?.isActive) emails.add(u.email);
    }
  }

  if (roles.includes("TEACHER")) {
    const teachers = await prisma.teacherClass.findMany({
      where: { classId },
      select: { teacher: { select: { user: { select: { email: true, isActive: true } } } } },
    });
    for (const t of teachers) {
      const u = t.teacher?.user;
      if (u?.isActive) emails.add(u.email);
    }
  }

  return [...emails];
}

export async function getEmailsForStudentAndParents(studentId) {
  const emails = new Set();

  const student = await prisma.student.findUnique({
    where: { id: studentId },
    select: { user: { select: { email: true, isActive: true, name: true } } },
  });
  if (student?.user?.isActive) emails.add(student.user.email);

  const links = await prisma.parentStudent.findMany({
    where: { studentId },
    select: { parent: { select: { user: { select: { email: true, isActive: true } } } } },
  });

  for (const l of links) {
    const u = l.parent?.user;
    if (u?.isActive) emails.add(u.email);
  }

  return [...emails];
}
