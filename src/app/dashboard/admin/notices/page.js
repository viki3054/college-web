import { prisma } from "@/lib/prisma";

import AdminNoticesClient from "./noticesClient";

export const metadata = { title: "Admin • Notices" };

export default async function AdminNoticesPage() {
  const [notices, classes] = await Promise.all([
    prisma.notice.findMany({
      orderBy: { publishedAt: "desc" },
      include: { class: true },
      take: 100,
    }),
    prisma.class.findMany({
      orderBy: [{ academicYear: "desc" }, { grade: "asc" }, { section: "asc" }],
      select: { id: true, grade: true, section: true, academicYear: true },
      take: 200,
    }),
  ]);

  return <AdminNoticesClient initialNotices={notices} classes={classes} />;
}
