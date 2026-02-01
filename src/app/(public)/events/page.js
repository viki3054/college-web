import { prisma } from "@/lib/prisma";

export const metadata = { title: "Events & Notices" };

export default async function EventsNoticesPage() {
  const [events, notices] = await Promise.all([
    prisma.event.findMany({
      where: { isPublished: true },
      orderBy: { startAt: "desc" },
      take: 10,
    }),
    prisma.notice.findMany({
      where: { isPublished: true },
      orderBy: { publishedAt: "desc" },
      take: 10,
    }),
  ]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-zinc-900">Events & Notices</h1>
          <p className="mt-2 text-sm text-zinc-600">
            Latest school announcements and upcoming activities.
          </p>
        </div>
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <section className="rounded-2xl border border-zinc-200 bg-white p-5">
          <h2 className="text-sm font-semibold text-zinc-900">Latest Events</h2>
          <div className="mt-4 space-y-3">
            {events.length === 0 ? (
              <div className="text-sm text-zinc-500">No events yet.</div>
            ) : (
              events.map((e) => (
                <div key={e.id} className="rounded-2xl border border-zinc-200 p-4">
                  <div className="text-sm font-semibold text-zinc-900">{e.title}</div>
                  <div className="mt-1 text-xs text-zinc-500">
                    {new Date(e.startAt).toLocaleString()} {e.location ? `• ${e.location}` : ""}
                  </div>
                  <p className="mt-2 text-sm text-zinc-600 leading-6 whitespace-pre-wrap">
                    {e.description}
                  </p>
                </div>
              ))
            )}
          </div>
        </section>

        <section className="rounded-2xl border border-zinc-200 bg-white p-5">
          <h2 className="text-sm font-semibold text-zinc-900">Latest Notices</h2>
          <div className="mt-4 space-y-3">
            {notices.length === 0 ? (
              <div className="text-sm text-zinc-500">No notices yet.</div>
            ) : (
              notices.map((n) => (
                <div key={n.id} className="rounded-2xl border border-zinc-200 p-4">
                  <div className="text-sm font-semibold text-zinc-900">{n.title}</div>
                  <div className="mt-1 text-xs text-zinc-500">
                    {new Date(n.publishedAt).toLocaleString()}
                  </div>
                  <p className="mt-2 text-sm text-zinc-600 leading-6 whitespace-pre-wrap">
                    {n.content}
                  </p>
                </div>
              ))
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
