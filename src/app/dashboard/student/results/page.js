import { redirect } from "next/navigation";

import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

function pct(marks, maxMarks) {
  if (!maxMarks) return "-";
  return `${Math.round((marks / maxMarks) * 100)}%`;
}

export const metadata = { title: "Student Results" };

export default async function StudentResultsPage() {
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
        <h1 className="text-xl font-semibold text-zinc-900">Results</h1>
        <p className="mt-1 text-sm text-zinc-600">Student profile not found.</p>
      </div>
    );
  }

  const results = await prisma.result.findMany({
    where: { studentId: student.id, publishedAt: { not: null } },
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
      <h1 className="text-xl font-semibold text-zinc-900">Results</h1>
      <p className="mt-1 text-sm text-zinc-600">Published results only.</p>

      <div className="mt-6 overflow-x-auto rounded-2xl border border-zinc-200">
        <table className="w-full min-w-[860px] text-left text-sm">
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
                  <td className="p-3 font-medium text-zinc-900">{r.subject ? `${r.subject.name} (${r.subject.code})` : "-"}</td>
                  <td className="p-3 text-zinc-700">{r.term}</td>
                  <td className="p-3 text-zinc-700">{r.examName}</td>
                  <td className="p-3 text-zinc-700">
                    {r.marks} / {r.maxMarks}
                  </td>
                  <td className="p-3 text-zinc-700">{pct(r.marks, r.maxMarks)}</td>
                  <td className="p-3 text-zinc-700">{r.grade || "-"}</td>
                  <td className="p-3 text-zinc-700">{r.publishedAt ? new Date(r.publishedAt).toLocaleString() : "-"}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
