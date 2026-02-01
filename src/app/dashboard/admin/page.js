import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";

export const metadata = { title: "Admin Dashboard" };

export default async function AdminDashboard() {
  const session = await getSession();
  if (!session?.user?.role) redirect("/login");
  if (session.user.role !== "ADMIN") redirect("/dashboard");

  const [users, students, teachers, parents, classes, notices, events] = await Promise.all([
    prisma.user.count(),
    prisma.student.count(),
    prisma.teacher.count(),
    prisma.parent.count(),
    prisma.class.count(),
    prisma.notice.count(),
    prisma.event.count(),
  ]);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const attendanceToday = await prisma.attendanceRecord.count({
    where: { date: today },
  });

  const cards = [
    { label: "Users", value: users },
    { label: "Students", value: students },
    { label: "Teachers", value: teachers },
    { label: "Parents", value: parents },
    { label: "Classes", value: classes },
    { label: "Notices", value: notices },
    { label: "Events", value: events },
    { label: "Attendance Today", value: attendanceToday },
  ];

  return (
    <div>
      <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
        <h1 className="text-xl font-semibold text-zinc-900">Admin Dashboard</h1>
        <p className="mt-1 text-sm text-zinc-600">Operational snapshot and quick access to key modules.</p>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-4">
        {cards.map((c) => (
          <div key={c.label} className="rounded-2xl border border-zinc-200 bg-zinc-50 p-4">
            <div className="text-xs text-zinc-500">{c.label}</div>
            <div className="mt-1 text-2xl font-semibold text-zinc-900">{c.value}</div>
          </div>
        ))}
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl border border-zinc-200 bg-white p-4">
          <div className="text-sm font-semibold text-zinc-900">Quick Actions</div>
          <div className="mt-3 flex flex-wrap gap-2 text-xs">
            <a className="rounded-full border border-zinc-200 bg-white px-3 py-1" href="/dashboard/admin/users">
              Users
            </a>
            <a className="rounded-full border border-zinc-200 bg-white px-3 py-1" href="/dashboard/admin/classes">
              Classes
            </a>
            <a className="rounded-full border border-zinc-200 bg-white px-3 py-1" href="/dashboard/admin/subjects">
              Subjects
            </a>
            <a className="rounded-full border border-zinc-200 bg-white px-3 py-1" href="/dashboard/admin/notices">
              Notices
            </a>
            <a className="rounded-full border border-zinc-200 bg-white px-3 py-1" href="/dashboard/admin/events">
              Events
            </a>
            <a className="rounded-full border border-zinc-200 bg-white px-3 py-1" href="/dashboard/admin/attendance">
              Attendance
            </a>
            <a className="rounded-full border border-zinc-200 bg-white px-3 py-1" href="/dashboard/admin/results">
              Results
            </a>
            <a className="rounded-full border border-zinc-200 bg-white px-3 py-1" href="/dashboard/admin/materials">
              Materials
            </a>
            <a className="rounded-full border border-zinc-200 bg-white px-3 py-1" href="/dashboard/admin/timetables">
              Timetables
            </a>
          </div>
        </div>
        <div className="rounded-2xl border border-zinc-200 bg-white p-4">
          <div className="text-sm font-semibold text-zinc-900">System Notes</div>
          <div className="mt-2 text-sm text-zinc-600">
            Manage modules from the left navigation. Use Email Settings for notifications and Website Pages for public content updates.
          </div>
        </div>
      </div>
    </div>
  );
}
