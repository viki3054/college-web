import { prisma } from "@/lib/prisma";

import AdminBusAssignmentsClient from "./assignmentsClient";

export const metadata = { title: "Admin • Bus Assignments" };

export default async function AdminBusAssignmentsPage() {
  const [routes, students, assignments] = await Promise.all([
    prisma.busRoute.findMany({
      where: { isActive: true, bus: { isActive: true } },
      orderBy: { name: "asc" },
      select: { id: true, name: true, bus: { select: { name: true } } },
      take: 500,
    }),
    prisma.student.findMany({
      orderBy: { admissionNo: "asc" },
      select: {
        id: true,
        admissionNo: true,
        user: { select: { name: true, email: true } },
        class: { select: { grade: true, section: true } },
      },
      take: 2000,
    }),
    prisma.busAssignment.findMany({
      orderBy: [{ isActive: "desc" }, { assignedAt: "desc" }],
      take: 500,
      include: {
        route: { include: { bus: true } },
        student: { include: { user: true, class: true } },
      },
    }),
  ]);

  return <AdminBusAssignmentsClient routes={routes} students={students} initialAssignments={assignments} />;
}
