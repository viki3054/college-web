import { prisma } from "@/lib/prisma";

import AdminResultsClient from "./resultsClient";

export const metadata = { title: "Admin • Results" };

export default async function AdminResultsPage() {
  const [classes, subjects] = await Promise.all([
    prisma.class.findMany({
      orderBy: [{ academicYear: "desc" }, { grade: "asc" }, { section: "asc" }],
      select: { id: true, grade: true, section: true, academicYear: true },
      take: 300,
    }),
    prisma.subject.findMany({
      orderBy: { name: "asc" },
      select: { id: true, name: true, code: true },
      take: 600,
    }),
  ]);

  return <AdminResultsClient classes={classes} subjects={subjects} />;
}
