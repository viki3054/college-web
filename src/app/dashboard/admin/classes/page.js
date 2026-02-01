import { prisma } from "@/lib/prisma";

import AdminClassesClient from "./classesClient";

export const metadata = { title: "Admin • Classes" };

export default async function AdminClassesPage() {
  const [classes, subjects, teachers] = await Promise.all([
    prisma.class.findMany({
      orderBy: [{ academicYear: "desc" }, { grade: "asc" }, { section: "asc" }],
      include: {
        subjects: { include: { subject: true } },
        teacherAssignments: { include: { teacher: { include: { user: true } } } },
      },
      take: 200,
    }),
    prisma.subject.findMany({ orderBy: { name: "asc" }, take: 500 }),
    prisma.teacher.findMany({
      orderBy: { employeeNo: "asc" },
      include: { user: true },
      take: 500,
    }),
  ]);

  return <AdminClassesClient initialClasses={classes} subjects={subjects} teachers={teachers} />;
}
