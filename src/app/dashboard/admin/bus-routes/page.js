import { prisma } from "@/lib/prisma";

import AdminBusRoutesClient from "./routesClient";

export const metadata = { title: "Admin • Bus Routes" };

export default async function AdminBusRoutesPage() {
  const [routes, buses] = await Promise.all([
    prisma.busRoute.findMany({
      orderBy: [{ isActive: "desc" }, { name: "asc" }],
      take: 500,
      include: {
        bus: { select: { id: true, name: true, number: true, plateNo: true } },
        _count: { select: { assignments: true } },
      },
    }),
    prisma.bus.findMany({ orderBy: [{ isActive: "desc" }, { name: "asc" }], take: 500 }),
  ]);

  return <AdminBusRoutesClient initialRoutes={routes} buses={buses} />;
}
