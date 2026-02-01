import { redirect } from "next/navigation";

import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export const metadata = { title: "Student Attendance" };

export default async function StudentAttendancePage() {
  const session = await getSession();
  if (!session?.user?.role) redirect("/login");
  if (session.user.role !== "STUDENT") redirect("/dashboard");

  const student = await prisma.student.findUnique({
    where: { userId: session.user.id },
    select: { id: true },
  });

  if (!student) {
    return (
      <div>
        <h1 className="text-xl font-semibold text-zinc-900">Attendance</h1>
        <p className="mt-1 text-sm text-zinc-600">Student profile not found.</p>
      </div>
    );
  }

  const entries = await prisma.attendanceEntry.findMany({
    where: { studentId: student.id },
    select: {
      id: true,
      status: true,
      record: {
        select: {
          date: true,
          subject: { select: { name: true, code: true } },
        },
      },
    },
    orderBy: { record: { date: "desc" } },
    take: 200,
  });

  return (
    <div>
      <h1 className="text-xl font-semibold text-zinc-900">Attendance</h1>
      <p className="mt-1 text-sm text-zinc-600">Your recent attendance records.</p>

      <div className="mt-6 overflow-x-auto rounded-2xl border border-zinc-200">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead className="bg-zinc-50">
            <tr className="text-xs text-zinc-500">
              <th className="p-3">Date</th>
              <th className="p-3">Subject</th>
              <th className="p-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {entries.length === 0 ? (
              <tr>
                <td className="p-3 text-zinc-500" colSpan={3}>
                  No attendance entries yet.
                </td>
              </tr>
            ) : (
              entries.map((e) => (
                <tr key={e.id} className="border-t border-zinc-200">
                  <td className="p-3 text-zinc-700">{new Date(e.record.date).toLocaleDateString()}</td>
                  <td className="p-3 text-zinc-700">
                    {e.record.subject ? `${e.record.subject.name} (${e.record.subject.code})` : "General"}
                  </td>
                  <td className="p-3 font-medium text-zinc-900">{e.status}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
