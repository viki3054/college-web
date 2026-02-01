import { prisma } from "@/lib/prisma";

import AdminMaterialsClient from "./materialsClient";

export const metadata = { title: "Admin • Materials" };

export default async function AdminMaterialsPage() {
  const [materials, classes, subjects] = await Promise.all([
    prisma.studyMaterial.findMany({
      orderBy: { createdAt: "desc" },
      take: 200,
      select: {
        id: true,
        title: true,
        description: true,
        youtubeUrl: true,
        attachmentName: true,
        attachmentUrl: true,
        attachmentBytes: true,
        createdAt: true,
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

  const safeMaterials = materials.map((m) => {
    const hasAttachment = Boolean(m.attachmentBytes) || Boolean(m.attachmentUrl);
    return {
      id: m.id,
      title: m.title,
      description: m.description,
      youtubeUrl: m.youtubeUrl,
      attachmentName: m.attachmentName,
      attachmentUrl: m.attachmentUrl,
      hasAttachment,
      createdAt: m.createdAt,
      class: m.class,
      subject: m.subject,
      createdBy: m.createdBy,
    };
  });

  return <AdminMaterialsClient initialMaterials={safeMaterials} classes={classes} subjects={subjects} />;
}
