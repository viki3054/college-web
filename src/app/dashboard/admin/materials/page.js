import { prisma } from "@/lib/prisma";

import AdminMaterialsClient from "./materialsClient";

export const metadata = { title: "Admin • Materials" };

export default async function AdminMaterialsPage() {
  const [materials, classes, subjects] = await Promise.all([
    prisma.studyMaterial.findMany({
      orderBy: { createdAt: "desc" },
      take: 200,
      include: {
        class: { select: { id: true, grade: true, section: true, academicYear: true } },
        subject: { select: { id: true, name: true, code: true } },
        createdBy: { select: { email: true, name: true } },
      },
    }),
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

  return <AdminMaterialsClient initialMaterials={materials} classes={classes} subjects={subjects} />;
}
