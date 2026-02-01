import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export const metadata = { title: "Parent Dashboard" };

export default async function ParentDashboard() {
  const session = await getSession();
  if (!session?.user?.role) redirect("/login");
  if (session.user.role !== "PARENT") redirect("/dashboard");

  const parent = await prisma.parent.findUnique({
    where: { userId: session.user.id },
    select: {
      children: {
        select: {
          student: {
            select: {
              id: true,
              admissionNo: true,
              user: { select: { name: true, email: true } },
              class: { select: { grade: true, section: true } },
            },
          },
        },
      },
    },
  });

  return (
    <div>
      <h1 className="text-xl font-semibold text-zinc-900">Parent Overview</h1>
      <p className="mt-1 text-sm text-zinc-600">Track your child’s progress.</p>

      <div className="mt-6 rounded-2xl border border-zinc-200 p-4">
        <div className="text-sm font-semibold text-zinc-900">Children</div>
        <div className="mt-3 space-y-2">
          {(parent?.children || []).length === 0 ? (
            <div className="text-sm text-zinc-500">No linked students yet.</div>
          ) : (
            parent.children.map((c) => (
              <div key={c.student.id} className="rounded-xl border border-zinc-200 bg-white p-3">
                <div className="text-sm font-semibold text-zinc-900">
                  {c.student.user.name || c.student.user.email}
                </div>
                <div className="mt-1 text-xs text-zinc-500">
                  Admission: {c.student.admissionNo} • Class: {c.student.class ? `${c.student.class.grade} ${c.student.class.section || ""}` : "-"}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
