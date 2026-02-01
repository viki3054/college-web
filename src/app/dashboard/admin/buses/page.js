import { prisma } from "@/lib/prisma";

import AdminBusesClient from "./busesClient";

export const metadata = { title: "Admin • Buses" };

export default async function AdminBusesPage() {
  const buses = await prisma.bus.findMany({
    orderBy: [{ isActive: "desc" }, { name: "asc" }],
    take: 500,
  });

  return <AdminBusesClient initialBuses={buses} />;
}
