import { prisma } from "@/lib/prisma";

import AdminEventsClient from "./eventsClient";

export const metadata = { title: "Admin • Events" };

export default async function AdminEventsPage() {
  const [events, classes] = await Promise.all([
    prisma.event.findMany({
      orderBy: { startAt: "desc" },
      include: { class: true },
      take: 100,
    }),
    prisma.class.findMany({
      orderBy: [{ academicYear: "desc" }, { grade: "asc" }, { section: "asc" }],
      select: { id: true, grade: true, section: true, academicYear: true },
      take: 200,
    }),
  ]);

  return <AdminEventsClient initialEvents={events} classes={classes} />;
}
