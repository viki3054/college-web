import { prisma } from "@/lib/prisma";

import AdminTimetablesClient from "./timetablesClient";

export const metadata = { title: "Admin • Timetables" };

export default async function AdminTimetablesPage() {
  const [timetables, classes] = await Promise.all([
    prisma.timetable.findMany({
      orderBy: { createdAt: "desc" },
      take: 200,
      select: {
        id: true,
        title: true,
        createdAt: true,
        class: { select: { id: true, grade: true, section: true, academicYear: true } },
        uploadedFile: { select: { id: true, name: true, size: true, mimeType: true } },
      },
    }),
    prisma.class.findMany({
      orderBy: [{ academicYear: "desc" }, { grade: "asc" }, { section: "asc" }],
      select: { id: true, grade: true, section: true, academicYear: true },
      take: 300,
    }),
  ]);

  return <AdminTimetablesClient initialTimetables={timetables} classes={classes} />;
}
