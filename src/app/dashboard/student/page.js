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
      id: true,
      admissionNo: true,
      classId: true,
      class: { select: { grade: true, section: true } },
    },
  });

  const classId = student?.classId || null;

  const [attendanceCount, resultCount, homeworkCount, materialCount, videoCount, timetableCount, noticeCount, eventCount] =
    await Promise.all([
      student?.id ? prisma.attendanceEntry.count({ where: { studentId: student.id } }) : Promise.resolve(0),
      student?.id ? prisma.result.count({ where: { studentId: student.id } }) : Promise.resolve(0),
      classId ? prisma.homework.count({ where: { classId } }) : Promise.resolve(0),
      classId ? prisma.studyMaterial.count({ where: { classId } }) : Promise.resolve(0),
      classId ? prisma.videoLink.count({ where: { classId } }) : Promise.resolve(0),
      classId ? prisma.timetable.count({ where: { classId } }) : Promise.resolve(0),
      classId
        ? prisma.notice.count({ where: { OR: [{ classId }, { classId: null }] } })
        : prisma.notice.count({ where: { classId: null } }),
      classId
        ? prisma.event.count({ where: { OR: [{ classId }, { classId: null }] } })
        : prisma.event.count({ where: { classId: null } }),
    ]);

  return (
    <div>
      <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
        <h1 className="text-xl font-semibold text-zinc-900">Student Dashboard</h1>
        <p className="mt-1 text-sm text-zinc-600">Overview of your academic progress and resources.</p>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-4">
        {[
          { label: "Attendance", value: attendanceCount },
          { label: "Results", value: resultCount },
          { label: "Homework", value: homeworkCount },
          { label: "Materials", value: materialCount },
          { label: "Videos", value: videoCount },
          { label: "Timetables", value: timetableCount },
          { label: "Notices", value: noticeCount },
          { label: "Events", value: eventCount },
        ].map((c) => (
          <div key={c.label} className="rounded-2xl border border-zinc-200 bg-zinc-50 p-4">
            <div className="text-xs text-zinc-500">{c.label}</div>
            <div className="mt-1 text-2xl font-semibold text-zinc-900">{c.value}</div>
          </div>
        ))}
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl border border-zinc-200 bg-white p-4">
          <div className="text-sm font-semibold text-zinc-900">Profile</div>
          <div className="mt-2 text-sm text-zinc-700">Admission No: {student?.admissionNo || "-"}</div>
          <div className="mt-1 text-sm text-zinc-700">
            Class: {student?.class ? `${student.class.grade} ${student.class.section || ""}` : "-"}
          </div>
        </div>
        <div className="rounded-2xl border border-zinc-200 bg-white p-4">
          <div className="text-sm font-semibold text-zinc-900">Quick Links</div>
          <div className="mt-3 flex flex-wrap gap-2 text-xs">
            <a className="rounded-full border border-zinc-200 bg-white px-3 py-1" href="/dashboard/student/timetable">
              Timetable
            </a>
            <a className="rounded-full border border-zinc-200 bg-white px-3 py-1" href="/dashboard/student/homework">
              Homework
            </a>
            <a className="rounded-full border border-zinc-200 bg-white px-3 py-1" href="/dashboard/student/materials">
              Materials
            </a>
            <a className="rounded-full border border-zinc-200 bg-white px-3 py-1" href="/dashboard/student/videos">
              Videos
            </a>
            <a className="rounded-full border border-zinc-200 bg-white px-3 py-1" href="/dashboard/student/attendance">
              Attendance
            </a>
            <a className="rounded-full border border-zinc-200 bg-white px-3 py-1" href="/dashboard/student/results">
              Results
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
