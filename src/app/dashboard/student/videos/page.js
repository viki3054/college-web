import Link from "next/link";
import { redirect } from "next/navigation";

import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export const metadata = { title: "Student Videos" };

export default async function StudentVideosPage() {
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
        <h1 className="text-xl font-semibold text-zinc-900">Videos</h1>
        <p className="mt-1 text-sm text-zinc-600">No class assigned yet.</p>
      </div>
    );
  }

  const videos = await prisma.videoLink.findMany({
    where: { OR: [{ classId: student.classId }, { classId: null }] },
    select: {
      id: true,
      title: true,
      url: true,
      createdAt: true,
      subject: { select: { name: true, code: true } },
    },
    orderBy: { createdAt: "desc" },
    take: 200,
  });

  return (
    <div>
      <h1 className="text-xl font-semibold text-zinc-900">Videos</h1>
      <p className="mt-1 text-sm text-zinc-600">YouTube links shared for your class.</p>

      <div className="mt-6 overflow-x-auto rounded-2xl border border-zinc-200">
        <table className="w-full min-w-[760px] text-left text-sm">
          <thead className="bg-zinc-50">
            <tr className="text-xs text-zinc-500">
              <th className="p-3">Title</th>
              <th className="p-3">Subject</th>
              <th className="p-3">Created</th>
              <th className="p-3">Link</th>
            </tr>
          </thead>
          <tbody>
            {videos.length === 0 ? (
              <tr>
                <td className="p-3 text-zinc-500" colSpan={4}>
                  No videos yet.
                </td>
              </tr>
            ) : (
              videos.map((v) => (
                <tr key={v.id} className="border-t border-zinc-200">
                  <td className="p-3 font-medium text-zinc-900">{v.title}</td>
                  <td className="p-3 text-zinc-700">{v.subject ? `${v.subject.name} (${v.subject.code})` : "-"}</td>
                  <td className="p-3 text-zinc-700">{new Date(v.createdAt).toLocaleString()}</td>
                  <td className="p-3">
                    <Link
                      className="rounded-lg border border-zinc-200 bg-white px-3 py-1.5 text-xs font-semibold text-zinc-800 hover:bg-zinc-50"
                      href={v.url}
                      target="_blank"
                    >
                      Open
                    </Link>
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
