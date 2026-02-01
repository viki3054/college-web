import { prisma } from "@/lib/prisma";

import AdminUsersClient from "./usersClient";

export const metadata = { title: "Admin • Users" };

export default async function AdminUsersPage() {
  const [users, classes] = await Promise.all([
    prisma.user.findMany({
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        isActive: true,
        createdAt: true,
      },
      take: 200,
    }),
    prisma.class.findMany({
      orderBy: [{ academicYear: "desc" }, { grade: "asc" }, { section: "asc" }],
      select: { id: true, grade: true, section: true, academicYear: true, name: true },
      take: 200,
    }),
  ]);

  return <AdminUsersClient initialUsers={users} classes={classes} />;
}
