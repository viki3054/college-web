import Link from "next/link";

import { prisma } from "@/lib/prisma";

export const metadata = { title: "Pages" };

export default async function PublicPagesIndex() {
  let pages = [];
  try {
    if (prisma?.sitePage?.findMany) {
      pages = await prisma.sitePage.findMany({
        where: { isPublished: true },
        orderBy: [{ updatedAt: "desc" }],
        select: { id: true, title: true, slug: true, updatedAt: true },
        take: 500,
      });
    }
  } catch {
    pages = [];
  }

  return (
    <section className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-2xl font-semibold text-zinc-900">Pages</h1>
      <p className="mt-1 text-sm text-zinc-600">Published pages on this website.</p>

      <div className="mt-6 grid gap-3 md:grid-cols-2">
        {pages.length === 0 ? (
          <div className="rounded-2xl border border-zinc-200 bg-white p-5 text-sm text-zinc-600">
            No pages published yet.
          </div>
        ) : (
          pages.map((p) => (
            <Link
              key={p.id}
              href={`/p/${p.slug}`}
              className="rounded-2xl border border-zinc-200 bg-white p-5 hover:bg-zinc-50"
            >
              <div className="text-sm font-semibold text-zinc-900">{p.title}</div>
              <div className="mt-1 text-xs text-zinc-500">Updated: {new Date(p.updatedAt).toLocaleString()}</div>
              <div className="mt-2 text-xs text-zinc-600">/p/{p.slug}</div>
            </Link>
          ))
        )}
      </div>
    </section>
  );
}
