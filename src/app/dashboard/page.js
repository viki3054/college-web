import { redirect } from "next/navigation";

import { getSession } from "@/lib/auth";

export default async function DashboardIndex() {
  const session = await getSession();
  const role = session?.user?.role;

  if (!role) redirect("/login");

  if (role === "ADMIN") redirect("/dashboard/admin");
  if (role === "TEACHER") redirect("/dashboard/teacher");
  if (role === "PARENT") redirect("/dashboard/parent");
  redirect("/dashboard/student");
}
