import Link from "next/link";

import { prisma } from "@/lib/prisma";

export const metadata = { title: "Admin • Attendance" };

export default async function AdminAttendancePage() {
  const records = await prisma.attendanceRecord.findMany({
    orderBy: { date: "desc" },
    take: 60,
    select: {
      id: true,
      date: true,
      notes: true,
      class: { select: { grade: true, section: true, academicYear: true } },
      subject: { select: { name: true, code: true } },
      markedBy: { select: { email: true, name: true, role: true } },
      _count: { select: { entries: true } },
    },
  });

  return (
    <div>
      <h1 className="text-xl font-semibold text-zinc-900">Attendance Overview</h1>
      <p className="mt-1 text-sm text-zinc-600">Recent attendance records marked by teachers.</p>

      <div className="mt-6 overflow-x-auto rounded-2xl border border-zinc-200">
        <table className="w-full min-w-[980px] text-left text-sm">
          <thead className="bg-zinc-50">
            <tr className="text-xs text-zinc-500">
              <th className="p-3">Date</th>
              <th className="p-3">Class</th>
              <th className="p-3">Subject</th>
              <th className="p-3">Marked By</th>
              <th className="p-3">Entries</th>
              <th className="p-3">Notes</th>
            </tr>
          </thead>
          <tbody>
            {records.length === 0 ? (
              <tr>
                <td className="p-3 text-zinc-500" colSpan={6}>
                  No attendance records yet.
                </td>
              </tr>
            ) : (
              records.map((r) => (
                <tr key={r.id} className="border-t border-zinc-200">
                  <td className="p-3 text-zinc-700">{new Date(r.date).toLocaleDateString()}</td>
                  <td className="p-3 text-zinc-700">
                    {r.class ? `${r.class.grade} ${r.class.section || ""}`.trim() : "-"}
                    {r.class?.academicYear ? (
                      <span className="ml-2 text-xs text-zinc-500">({r.class.academicYear})</span>
                    ) : null}
                  </td>
                  <td className="p-3 text-zinc-700">
                    {r.subject ? `${r.subject.name} (${r.subject.code})` : "General"}
                  </td>
                  <td className="p-3 text-zinc-700">
                    {r.markedBy?.name || r.markedBy?.email || "-"}
                  </td>
                  <td className="p-3 text-zinc-700">{r._count?.entries ?? 0}</td>
                  <td className="p-3 text-zinc-700">{r.notes || "-"}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-6 rounded-2xl border border-zinc-200 bg-zinc-50 p-4 text-sm text-zinc-700">
        Tip: Students/Parents can view attendance in their dashboards.
        {" "}
        <Link className="font-semibold text-zinc-900 hover:underline" href="/dashboard/student/attendance">
          Student view
        </Link>
      </div>
    </div>
  );
}
