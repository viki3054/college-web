import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export const metadata = { title: "Student Dashboard" };

export default async function StudentDashboard() {
  const session = await getSession();
  if (!session?.user?.role) redirect("/login");
  if (session.user.role !== "STUDENT") redirect("/dashboard");

  const student = await prisma.student.findUnique({
    where: { userId: session.user.id },
    select: {
      admissionNo: true,
      class: { select: { grade: true, section: true } },
    },
  });

  return (
    <div>
      <h1 className="text-xl font-semibold text-zinc-900">Student Overview</h1>
      <p className="mt-1 text-sm text-zinc-600">Welcome back.</p>

      <div className="mt-6 rounded-2xl border border-zinc-200 p-4">
        <div className="text-sm font-semibold text-zinc-900">Profile</div>
        <div className="mt-2 text-sm text-zinc-700">
          Admission No: {student?.admissionNo || "-"}
        </div>
        <div className="mt-1 text-sm text-zinc-700">
          Class: {student?.class ? `${student.class.grade} ${student.class.section || ""}` : "-"}
        </div>
      </div>
    </div>
  );
}
