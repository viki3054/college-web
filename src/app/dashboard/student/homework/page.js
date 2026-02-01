import Link from "next/link";
import { redirect } from "next/navigation";

import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export const metadata = { title: "Student Homework" };

export default async function StudentHomeworkPage() {
  const session = await getSession();
  if (!session?.user?.role) redirect("/login");
  if (session.user.role !== "STUDENT") redirect("/dashboard");

  const student = await prisma.student.findUnique({
    where: { userId: session.user.id },
    select: { id: true, classId: true },
  });

  if (!student?.classId) {
    return (
      <div>
        <h1 className="text-xl font-semibold text-zinc-900">Homework</h1>
        <p className="mt-1 text-sm text-zinc-600">No class assigned yet.</p>
      </div>
    );
  }

  const homework = await prisma.homework.findMany({
    where: { classId: student.classId },
    select: {
      id: true,
      title: true,
      description: true,
      dueAt: true,
      createdAt: true,
      subject: { select: { name: true, code: true } },
      attachmentName: true,
      attachmentUrl: true,
    },
    orderBy: { createdAt: "desc" },
    take: 100,
  });

  return (
    <div>
      <h1 className="text-xl font-semibold text-zinc-900">Homework</h1>
      <p className="mt-1 text-sm text-zinc-600">Recent homework posted for your class.</p>

      <div className="mt-6 space-y-3">
        {homework.length === 0 ? (
          <div className="rounded-2xl border border-zinc-200 bg-white p-4 text-sm text-zinc-600">
            No homework yet.
          </div>
        ) : (
          homework.map((h) => (
            <div key={h.id} className="rounded-2xl border border-zinc-200 bg-white p-4">
              <div className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
                <div>
                  <div className="text-sm font-semibold text-zinc-900">{h.title}</div>
                  <div className="mt-1 text-xs text-zinc-500">
                    {h.subject ? `${h.subject.name} (${h.subject.code})` : "General"} • Posted {new Date(h.createdAt).toLocaleString()}
                  </div>
                </div>
                <div className="text-xs text-zinc-600">
                  Due: {h.dueAt ? new Date(h.dueAt).toLocaleString() : "-"}
                </div>
              </div>

              <div className="mt-3 whitespace-pre-wrap text-sm text-zinc-700">{h.description}</div>

              <div className="mt-4 flex items-center gap-2">
                {h.attachmentUrl ? (
                  <Link
                    className="rounded-lg border border-zinc-200 bg-white px-3 py-1.5 text-xs font-semibold text-zinc-800 hover:bg-zinc-50"
                    href={h.attachmentUrl}
                    target="_blank"
                  >
                    Open attachment
                  </Link>
                ) : h.attachmentName ? (
                  <Link
                    className="rounded-lg border border-zinc-200 bg-white px-3 py-1.5 text-xs font-semibold text-zinc-800 hover:bg-zinc-50"
                    href={`/api/download/homework/${h.id}`}
                  >
                    Download attachment
                  </Link>
                ) : (
                  <span className="text-xs text-zinc-500">No attachment</span>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
