import Link from "next/link";
import { redirect } from "next/navigation";

import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export const metadata = { title: "Student Timetable" };

export default async function StudentTimetablePage() {
  const session = await getSession();
  if (!session?.user?.role) redirect("/login");
  if (session.user.role !== "STUDENT") redirect("/dashboard");

  const student = await prisma.student.findUnique({
    where: { userId: session.user.id },
    select: {
      classId: true,
      class: { select: { grade: true, section: true } },
    },
  });

  if (!student?.classId) {
    return (
      <div>
        <h1 className="text-xl font-semibold text-zinc-900">Timetable</h1>
        <p className="mt-1 text-sm text-zinc-600">No class assigned yet.</p>
      </div>
    );
  }

  const timetables = await prisma.timetable.findMany({
    where: { classId: student.classId },
    select: {
      id: true,
      title: true,
      createdAt: true,
      uploadedFile: { select: { id: true, name: true, mimeType: true, size: true } },
    },
    orderBy: { createdAt: "desc" },
  });

  const classLabel = student.class ? `${student.class.grade} ${student.class.section || ""}`.trim() : "";

  return (
    <div>
      <h1 className="text-xl font-semibold text-zinc-900">Timetable</h1>
      <p className="mt-1 text-sm text-zinc-600">Your class timetable files.</p>

      <div className="mt-6 rounded-2xl border border-zinc-200 p-4">
        <div className="text-sm font-semibold text-zinc-900">Class</div>
        <div className="mt-1 text-sm text-zinc-700">{classLabel || "-"}</div>
      </div>

      <div className="mt-6 overflow-x-auto rounded-2xl border border-zinc-200">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead className="bg-zinc-50">
            <tr className="text-xs text-zinc-500">
              <th className="p-3">Title</th>
              <th className="p-3">File</th>
              <th className="p-3">Created</th>
              <th className="p-3">Download</th>
            </tr>
          </thead>
          <tbody>
            {timetables.length === 0 ? (
              <tr>
                <td className="p-3 text-zinc-500" colSpan={4}>
                  No timetable uploaded yet.
                </td>
              </tr>
            ) : (
              timetables.map((t) => (
                <tr key={t.id} className="border-t border-zinc-200">
                  <td className="p-3 font-medium text-zinc-900">{t.title}</td>
                  <td className="p-3 text-zinc-700">{t.uploadedFile?.name || "-"}</td>
                  <td className="p-3 text-zinc-700">{new Date(t.createdAt).toLocaleString()}</td>
                  <td className="p-3">
                    {t.uploadedFile?.id ? (
                      <Link
                        className="rounded-lg border border-zinc-200 bg-white px-3 py-1.5 text-xs font-semibold text-zinc-800 hover:bg-zinc-50"
                        href={`/api/download/timetable/${t.uploadedFile.id}`}
                      >
                        Download
                      </Link>
                    ) : (
                      <span className="text-xs text-zinc-500">-</span>
                    )}
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
