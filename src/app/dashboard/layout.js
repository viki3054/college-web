import Link from "next/link";

import { getSession } from "@/lib/auth";
import DashboardHeader from "@/components/DashboardHeader";

export default async function DashboardLayout({ children }) {
  const session = await getSession();

  return (
    <div className="min-h-screen bg-zinc-50">
      <DashboardHeader email={session?.user?.email} role={session?.user?.role} />

      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-4 px-4 py-6 md:grid-cols-[220px_1fr]">
        <aside className="rounded-2xl border border-zinc-200 bg-white p-3">
          <nav className="space-y-1 text-sm">
            <Link
              className="block rounded-lg px-3 py-2 hover:bg-zinc-50"
              href="/dashboard"
            >
              Overview
            </Link>
            {session?.user?.role === "ADMIN" ? (
              <>
                <Link className="block rounded-lg px-3 py-2 hover:bg-zinc-50" href="/dashboard/admin/users">Users</Link>
                <Link className="block rounded-lg px-3 py-2 hover:bg-zinc-50" href="/dashboard/admin/classes">Classes</Link>
                <Link className="block rounded-lg px-3 py-2 hover:bg-zinc-50" href="/dashboard/admin/subjects">Subjects</Link>
                <Link className="block rounded-lg px-3 py-2 hover:bg-zinc-50" href="/dashboard/admin/notices">Notices</Link>
                <Link className="block rounded-lg px-3 py-2 hover:bg-zinc-50" href="/dashboard/admin/events">Events</Link>
                <Link className="block rounded-lg px-3 py-2 hover:bg-zinc-50" href="/dashboard/admin/attendance">Attendance</Link>
                <Link className="block rounded-lg px-3 py-2 hover:bg-zinc-50" href="/dashboard/admin/results">Results</Link>
                <Link className="block rounded-lg px-3 py-2 hover:bg-zinc-50" href="/dashboard/admin/materials">Materials</Link>
                <Link className="block rounded-lg px-3 py-2 hover:bg-zinc-50" href="/dashboard/admin/timetables">Timetables</Link>
                <Link className="block rounded-lg px-3 py-2 hover:bg-zinc-50" href="/dashboard/admin/site-pages">Website Pages</Link>
                <Link className="block rounded-lg px-3 py-2 hover:bg-zinc-50" href="/dashboard/admin/settings/email">Email Settings</Link>
              </>
            ) : null}
            {session?.user?.role === "TEACHER" ? (
              <>
                <Link className="block rounded-lg px-3 py-2 hover:bg-zinc-50" href="/dashboard/teacher/attendance">Attendance</Link>
                <Link className="block rounded-lg px-3 py-2 hover:bg-zinc-50" href="/dashboard/teacher/homework">Homework</Link>
                <Link className="block rounded-lg px-3 py-2 hover:bg-zinc-50" href="/dashboard/teacher/materials">Study Material</Link>
                <Link className="block rounded-lg px-3 py-2 hover:bg-zinc-50" href="/dashboard/teacher/videos">YouTube Videos</Link>
                <Link className="block rounded-lg px-3 py-2 hover:bg-zinc-50" href="/dashboard/teacher/results">Results</Link>
                <Link className="block rounded-lg px-3 py-2 hover:bg-zinc-50" href="/dashboard/teacher/notices">Class Notices</Link>
                <Link className="block rounded-lg px-3 py-2 hover:bg-zinc-50" href="/dashboard/teacher/performance">Performance</Link>
              </>
            ) : null}
            {session?.user?.role === "STUDENT" ? (
              <>
                <Link className="block rounded-lg px-3 py-2 hover:bg-zinc-50" href="/dashboard/student/timetable">Timetable</Link>
                <Link className="block rounded-lg px-3 py-2 hover:bg-zinc-50" href="/dashboard/student/homework">Homework</Link>
                <Link className="block rounded-lg px-3 py-2 hover:bg-zinc-50" href="/dashboard/student/materials">Content</Link>
                <Link className="block rounded-lg px-3 py-2 hover:bg-zinc-50" href="/dashboard/student/videos">Videos</Link>
                <Link className="block rounded-lg px-3 py-2 hover:bg-zinc-50" href="/dashboard/student/attendance">Attendance</Link>
                <Link className="block rounded-lg px-3 py-2 hover:bg-zinc-50" href="/dashboard/student/results">Results</Link>
              </>
            ) : null}
            {session?.user?.role === "PARENT" ? (
              <>
                <Link className="block rounded-lg px-3 py-2 hover:bg-zinc-50" href="/dashboard/parent/attendance">Child Attendance</Link>
                <Link className="block rounded-lg px-3 py-2 hover:bg-zinc-50" href="/dashboard/parent/results">Child Results</Link>
                <Link className="block rounded-lg px-3 py-2 hover:bg-zinc-50" href="/dashboard/parent/progress">Progress</Link>
              </>
            ) : null}
          </nav>
        </aside>

        <main className="rounded-2xl border border-zinc-200 bg-white p-5">
          {children}
        </main>
      </div>
    </div>
  );
}
