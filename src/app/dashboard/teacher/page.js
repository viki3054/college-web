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

  const [attendanceMarked, homeworkCreated, materialCreated, videoCreated, resultsPublished, noticesCreated, eventsCreated] =
    await Promise.all([
      prisma.attendanceRecord.count({ where: { markedById: session.user.id } }),
      prisma.homework.count({ where: { createdById: session.user.id } }),
      prisma.studyMaterial.count({ where: { createdById: session.user.id } }),
      prisma.videoLink.count({ where: { createdById: session.user.id } }),
      prisma.result.count({ where: { publishedById: session.user.id } }),
      prisma.notice.count({ where: { createdById: session.user.id } }),
      prisma.event.count({ where: { createdById: session.user.id } }),
    ]);

  return (
    <div>
      <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
        <h1 className="text-xl font-semibold text-zinc-900">Teacher Dashboard</h1>
        <p className="mt-1 text-sm text-zinc-600">Manage classes, attendance, and academic resources.</p>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-4">
        {[
          { label: "Attendance", value: attendanceMarked },
          { label: "Homework", value: homeworkCreated },
          { label: "Materials", value: materialCreated },
          { label: "Videos", value: videoCreated },
          { label: "Results", value: resultsPublished },
          { label: "Notices", value: noticesCreated },
          { label: "Events", value: eventsCreated },
          { label: "Classes", value: (teacher?.classAssignments || []).length },
        ].map((c) => (
          <div key={c.label} className="rounded-2xl border border-zinc-200 bg-zinc-50 p-4">
            <div className="text-xs text-zinc-500">{c.label}</div>
            <div className="mt-1 text-2xl font-semibold text-zinc-900">{c.value}</div>
          </div>
        ))}
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl border border-zinc-200 bg-white p-4">
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
        <div className="rounded-2xl border border-zinc-200 bg-white p-4">
          <div className="text-sm font-semibold text-zinc-900">Quick Links</div>
          <div className="mt-3 flex flex-wrap gap-2 text-xs">
            <a className="rounded-full border border-zinc-200 bg-white px-3 py-1" href="/dashboard/teacher/attendance">
              Attendance
            </a>
            <a className="rounded-full border border-zinc-200 bg-white px-3 py-1" href="/dashboard/teacher/homework">
              Homework
            </a>
            <a className="rounded-full border border-zinc-200 bg-white px-3 py-1" href="/dashboard/teacher/materials">
              Materials
            </a>
            <a className="rounded-full border border-zinc-200 bg-white px-3 py-1" href="/dashboard/teacher/videos">
              Videos
            </a>
            <a className="rounded-full border border-zinc-200 bg-white px-3 py-1" href="/dashboard/teacher/results">
              Results
            </a>
            <a className="rounded-full border border-zinc-200 bg-white px-3 py-1" href="/dashboard/teacher/notices">
              Notices
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
