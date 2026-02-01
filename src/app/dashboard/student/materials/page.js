import Link from "next/link";
import { redirect } from "next/navigation";

import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export const metadata = { title: "Student Content" };

export default async function StudentMaterialsPage() {
  const session = await getSession();
  if (!session?.user?.role) redirect("/login");
  if (session.user.role !== "STUDENT") redirect("/dashboard");

  const student = await prisma.student.findUnique({
    where: { userId: session.user.id },
    select: { classId: true },
  });

  if (!student?.classId) {
    return (
      <div>
        <h1 className="text-xl font-semibold text-zinc-900">Content</h1>
        <p className="mt-1 text-sm text-zinc-600">No class assigned yet.</p>
      </div>
    );
  }

  const materials = await prisma.studyMaterial.findMany({
    where: { classId: student.classId },
    select: {
      id: true,
      title: true,
      description: true,
      createdAt: true,
      youtubeUrl: true,
      subject: { select: { name: true, code: true } },
      attachmentName: true,
      attachmentUrl: true,
    },
    orderBy: { createdAt: "desc" },
    take: 100,
  });

  return (
    <div>
      <h1 className="text-xl font-semibold text-zinc-900">Content</h1>
      <p className="mt-1 text-sm text-zinc-600">Study materials shared by your teachers.</p>

      <div className="mt-6 space-y-3">
        {materials.length === 0 ? (
          <div className="rounded-2xl border border-zinc-200 bg-white p-4 text-sm text-zinc-600">
            No materials yet.
          </div>
        ) : (
          materials.map((m) => (
            <div key={m.id} className="rounded-2xl border border-zinc-200 bg-white p-4">
              <div className="text-sm font-semibold text-zinc-900">{m.title}</div>
              <div className="mt-1 text-xs text-zinc-500">
                {m.subject ? `${m.subject.name} (${m.subject.code})` : "General"} • {new Date(m.createdAt).toLocaleString()}
              </div>
              {m.description ? (
                <div className="mt-3 whitespace-pre-wrap text-sm text-zinc-700">{m.description}</div>
              ) : null}

              <div className="mt-4 flex flex-wrap items-center gap-2">
                {m.youtubeUrl ? (
                  <Link
                    className="rounded-lg border border-zinc-200 bg-white px-3 py-1.5 text-xs font-semibold text-zinc-800 hover:bg-zinc-50"
                    href={m.youtubeUrl}
                    target="_blank"
                  >
                    Watch on YouTube
                  </Link>
                ) : null}

                {m.attachmentUrl ? (
                  <Link
                    className="rounded-lg border border-zinc-200 bg-white px-3 py-1.5 text-xs font-semibold text-zinc-800 hover:bg-zinc-50"
                    href={m.attachmentUrl}
                    target="_blank"
                  >
                    Open attachment
                  </Link>
                ) : m.attachmentName ? (
                  <Link
                    className="rounded-lg border border-zinc-200 bg-white px-3 py-1.5 text-xs font-semibold text-zinc-800 hover:bg-zinc-50"
                    href={`/api/download/materials/${m.id}`}
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
