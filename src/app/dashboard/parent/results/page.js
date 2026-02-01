import Link from "next/link";
import { redirect } from "next/navigation";

import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

function pct(marks, maxMarks) {
  if (!maxMarks) return "-";
  return `${Math.round((marks / maxMarks) * 100)}%`;
}

export const metadata = { title: "Parent • Child Results" };

export default async function ParentResultsPage({ searchParams }) {
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
        <h1 className="text-xl font-semibold text-zinc-900">Child Results</h1>
        <p className="mt-1 text-sm text-zinc-600">No linked students yet.</p>
      </div>
    );
  }

  const selectedId = searchParams?.studentId || kids[0].id;
  const selected = kids.find((k) => k.id === selectedId) || kids[0];

  const results = await prisma.result.findMany({
    where: { studentId: selected.id, publishedAt: { not: null } },
    select: {
      id: true,
      term: true,
      examName: true,
      marks: true,
      maxMarks: true,
      grade: true,
      publishedAt: true,
      subject: { select: { name: true, code: true } },
    },
    orderBy: { publishedAt: "desc" },
    take: 200,
  });

  return (
    <div>
      <h1 className="text-xl font-semibold text-zinc-900">Child Results</h1>
      <p className="mt-1 text-sm text-zinc-600">Published results for your child.</p>

      <div className="mt-6 rounded-2xl border border-zinc-200 p-4">
        <div className="text-sm font-semibold text-zinc-900">Select Child</div>
        <div className="mt-3 flex flex-wrap gap-2">
          {kids.map((k) => (
            <Link
              key={k.id}
              href={`/dashboard/parent/results?studentId=${encodeURIComponent(k.id)}`}
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

      <div className="mt-6 overflow-x-auto rounded-2xl border border-zinc-200">
        <table className="w-full min-w-[980px] text-left text-sm">
          <thead className="bg-zinc-50">
            <tr className="text-xs text-zinc-500">
              <th className="p-3">Subject</th>
              <th className="p-3">Term</th>
              <th className="p-3">Exam</th>
              <th className="p-3">Marks</th>
              <th className="p-3">Percent</th>
              <th className="p-3">Grade</th>
              <th className="p-3">Published</th>
            </tr>
          </thead>
          <tbody>
            {results.length === 0 ? (
              <tr>
                <td className="p-3 text-zinc-500" colSpan={7}>
                  No published results yet.
                </td>
              </tr>
            ) : (
              results.map((r) => (
                <tr key={r.id} className="border-t border-zinc-200">
                  <td className="p-3 font-medium text-zinc-900">
                    {r.subject ? `${r.subject.name} (${r.subject.code})` : "-"}
                  </td>
                  <td className="p-3 text-zinc-700">{r.term}</td>
                  <td className="p-3 text-zinc-700">{r.examName}</td>
                  <td className="p-3 text-zinc-700">
                    {r.marks} / {r.maxMarks}
                  </td>
                  <td className="p-3 text-zinc-700">{pct(r.marks, r.maxMarks)}</td>
                  <td className="p-3 text-zinc-700">{r.grade || "-"}</td>
                  <td className="p-3 text-zinc-700">
                    {r.publishedAt ? new Date(r.publishedAt).toLocaleString() : "-"}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
