import Link from "next/link";
import { redirect } from "next/navigation";

import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

function percent(n, d) {
  if (!d) return null;
  return Math.round((n / d) * 100);
}

export const metadata = { title: "Parent • Progress" };

export default async function ParentProgressPage({ searchParams }) {
  const session = await getSession();
  if (!session?.user?.role) redirect("/login");
  if (session.user.role !== "PARENT") redirect("/dashboard");

  const parent = await prisma.parent.findUnique({
    where: { userId: session.user.id },
    select: {
      children: {
        select: {
          relation: true,
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

  const kids = (parent?.children || []).map((c) => ({
    ...c.student,
    relation: c.relation || null,
  }));

  if (kids.length === 0) {
    return (
      <div>
        <h1 className="text-xl font-semibold text-zinc-900">Progress</h1>
        <p className="mt-1 text-sm text-zinc-600">No linked students yet.</p>
      </div>
    );
  }

  const selectedId = searchParams?.studentId || kids[0].id;
  const selected = kids.find((k) => k.id === selectedId) || kids[0];

  const [attendanceAgg, resultsAgg] = await Promise.all([
    prisma.attendanceEntry.groupBy({
      by: ["status"],
      where: { studentId: selected.id },
      _count: { _all: true },
    }),
    prisma.result.aggregate({
      where: { studentId: selected.id, publishedAt: { not: null } },
      _count: { _all: true },
      _avg: { marks: true, maxMarks: true },
    }),
  ]);

  let attendanceTotal = 0;
  let attendancePresent = 0;
  for (const a of attendanceAgg) {
    attendanceTotal += a._count._all;
    if (a.status === "PRESENT") attendancePresent += a._count._all;
  }

  const avgPercent =
    resultsAgg?._avg?.marks === null ||
    resultsAgg?._avg?.maxMarks === null ||
    resultsAgg?._avg?.maxMarks === 0
      ? null
      : (resultsAgg._avg.marks / resultsAgg._avg.maxMarks) * 100;

  const attendancePct = percent(attendancePresent, attendanceTotal);

  return (
    <div>
      <h1 className="text-xl font-semibold text-zinc-900">Progress</h1>
      <p className="mt-1 text-sm text-zinc-600">Quick summary for your child.</p>

      <div className="mt-6 rounded-2xl border border-zinc-200 p-4">
        <div className="text-sm font-semibold text-zinc-900">Select Child</div>
        <div className="mt-3 flex flex-wrap gap-2">
          {kids.map((k) => (
            <Link
              key={k.id}
              href={`/dashboard/parent/progress?studentId=${encodeURIComponent(k.id)}`}
              className={`rounded-full border px-3 py-1 text-xs ${
                k.id === selected.id
                  ? "border-zinc-900 bg-zinc-900 text-white"
                  : "border-zinc-200 bg-white text-zinc-800 hover:bg-zinc-50"
              }`}
            >
              {k.user.name || k.user.email}
              {k.relation ? ` (${k.relation})` : ""}
            </Link>
          ))}
        </div>
        <div className="mt-3 text-xs text-zinc-500">
          Admission: {selected.admissionNo} • Class:{" "}
          {selected.class ? `${selected.class.grade} ${selected.class.section || ""}` : "-"}
        </div>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-zinc-200 bg-white p-4">
          <div className="text-xs font-semibold text-zinc-500">Attendance</div>
          <div className="mt-2 text-2xl font-semibold text-zinc-900">
            {attendancePct === null ? "-" : `${attendancePct}%`}
          </div>
          <div className="mt-1 text-xs text-zinc-500">
            Present {attendancePresent} / {attendanceTotal}
          </div>
        </div>

        <div className="rounded-2xl border border-zinc-200 bg-white p-4">
          <div className="text-xs font-semibold text-zinc-500">Avg Result</div>
          <div className="mt-2 text-2xl font-semibold text-zinc-900">
            {avgPercent === null ? "-" : `${Math.round(avgPercent)}%`}
          </div>
          <div className="mt-1 text-xs text-zinc-500">Published results only</div>
        </div>

        <div className="rounded-2xl border border-zinc-200 bg-white p-4">
          <div className="text-xs font-semibold text-zinc-500">Results Count</div>
          <div className="mt-2 text-2xl font-semibold text-zinc-900">{resultsAgg?._count?._all || 0}</div>
          <div className="mt-1 text-xs text-zinc-500">Across all subjects/exams</div>
        </div>
      </div>

      <div className="mt-6 rounded-2xl border border-zinc-200 bg-zinc-50 p-4 text-sm text-zinc-700">
        Tip: use the sidebar to view full attendance and results details.
      </div>
    </div>
  );
}
