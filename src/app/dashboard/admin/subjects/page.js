import { prisma } from "@/lib/prisma";

import AdminSubjectsClient from "./subjectsClient";

export const metadata = { title: "Admin • Subjects" };

export default async function AdminSubjectsPage() {
  const subjects = await prisma.subject.findMany({ orderBy: { name: "asc" }, take: 500 });
  return <AdminSubjectsClient initialSubjects={subjects} />;
}
