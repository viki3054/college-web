import { prisma } from "@/lib/prisma";

import AdminEmailSettingsClient from "./emailClient";

export const metadata = { title: "Admin • Email Settings" };

export default async function AdminEmailSettingsPage() {
  const settings =
    (await prisma.notificationSetting.findUnique({ where: { id: "default" } })) ||
    (await prisma.notificationSetting.create({ data: { id: "default" } }));

  const templates = await prisma.emailTemplate.findMany({
    orderBy: { key: "asc" },
    select: { id: true, key: true, subject: true, isActive: true, updatedAt: true },
    take: 200,
  });

  return <AdminEmailSettingsClient initialSettings={settings} templates={templates} />;
}
