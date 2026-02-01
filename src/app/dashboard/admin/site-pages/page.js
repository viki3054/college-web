import { prisma } from "@/lib/prisma";

import SitePagesClient from "./sitePagesClient";

export const metadata = { title: "Admin • Website Pages" };

export default async function AdminSitePagesPage() {
  const pages = await prisma.sitePage.findMany({
    orderBy: [{ updatedAt: "desc" }],
    take: 500,
    select: {
      id: true,
      title: true,
      slug: true,
      isPublished: true,
      updatedAt: true,
      sourceUrl: true,
    },
  });

  return <SitePagesClient initialPages={pages} />;
}
