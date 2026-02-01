import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export const metadata = { title: "Teacher Dashboard" };

export default async function TeacherDashboard() {
  const session = await getSession();
  if (!session?.user?.role) redirect("/login");
  if (session.user.role !== "TEACHER") redirect("/dashboard");

  const teacher = await prisma.teacher.findUnique({
    where: { userId: session.user.id },
    select: {
      id: true,
      classAssignments: { select: { class: { select: { id: true, grade: true, section: true } } } },
    },
  });

  return (
    <div>
      <h1 className="text-xl font-semibold text-zinc-900">Teacher Overview</h1>
      <p className="mt-1 text-sm text-zinc-600">Your assigned classes and tools.</p>

      <div className="mt-6 rounded-2xl border border-zinc-200 p-4">
        <div className="text-sm font-semibold text-zinc-900">Assigned Classes</div>
        <div className="mt-3 flex flex-wrap gap-2">
          {(teacher?.classAssignments || []).length === 0 ? (
            <span className="text-sm text-zinc-500">No class assignments yet.</span>
          ) : (
            teacher.classAssignments.map((a) => (
              <span key={a.class.id} className="rounded-full border border-zinc-200 bg-white px-3 py-1 text-xs">
                {a.class.grade} {a.class.section || ""}
              </span>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
