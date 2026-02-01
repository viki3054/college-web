import { prisma } from "@/lib/prisma";

export const metadata = { title: "Events & Notices - DKTE International School" };

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
    <div className="bg-[#f7f6f2]">
      <section className="bg-white">
        <div className="mx-auto max-w-5xl px-6 py-14 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#c0912f]">Updates</p>
          <h1 className="mt-3 text-3xl font-semibold text-[#0b1f3a]">Events & Notices</h1>
          <p className="mt-3 text-sm leading-6 text-[#4e5661]">
            A single place for all key academic dates, assemblies, and circulars shared with families.
          </p>
        </div>
      </section>

      <section className="border-t border-[#e6dfcf] bg-white">
        <div className="mx-auto max-w-6xl px-6 py-14">
          <div className="grid gap-10 lg:grid-cols-3">
            <section className="lg:col-span-2 space-y-5">
              <div className="space-y-2">
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#8aa39b]">School calendar</p>
                <h2 className="text-lg font-semibold text-[#0b1f3a]">Upcoming & recent events</h2>
              </div>
              <div className="space-y-3">
                {events.length === 0 ? (
                  <div className="rounded-3xl border border-[#d9d4c7] bg-[#fdfbf6] p-4 text-sm text-[#8aa39b]">
                    No events have been published yet.
                  </div>
                ) : (
                  events.map((e) => {
                    const start = new Date(e.startAt);
                    const day = start.toLocaleDateString(undefined, { day: "2-digit" });
                    const month = start.toLocaleDateString(undefined, { month: "short" });
                    const time = start.toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" });
                    return (
                      <article key={e.id} className="flex gap-4 rounded-3xl border border-[#d9d4c7] bg-white p-5">
                        <div className="flex w-16 flex-col items-center justify-center rounded-2xl bg-[#0b1f3a] px-3 py-4 text-white">
                          <span className="text-lg font-semibold leading-none">{day}</span>
                          <span className="mt-1 text-[11px] uppercase tracking-[0.2em] text-[#c0912f]">{month}</span>
                        </div>
                        <div className="flex-1">
                          <h3 className="text-sm font-semibold text-[#0b1f3a]">{e.title}</h3>
                          <div className="mt-1 text-[11px] uppercase tracking-[0.2em] text-[#8aa39b]">
                            {time}
                            {e.location ? ` • ${e.location}` : ""}
                          </div>
                          {e.description ? (
                            <p className="mt-3 text-sm leading-6 text-[#4e5661] whitespace-pre-wrap">{e.description}</p>
                          ) : null}
                        </div>
                      </article>
                    );
                  })
                )}
              </div>
            </section>

            <section className="space-y-5">
              <div className="rounded-3xl border border-[#d9d4c7] bg-white p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#8aa39b]">Notices</p>
                <h2 className="mt-2 text-sm font-semibold text-[#0b1f3a]">Latest circulars</h2>
                <div className="mt-4 space-y-3 text-sm text-[#4e5661]">
                  {notices.length === 0 ? (
                    <div className="rounded-2xl border border-[#e6dfcf] bg-[#fdfbf6] p-4 text-xs text-[#8aa39b]">
                      No notices have been published yet.
                    </div>
                  ) : (
                    notices.map((n) => {
                      const d = new Date(n.publishedAt ?? Date.now());
                      const dateStr = d.toLocaleDateString(undefined, { day: "2-digit", month: "short", year: "numeric" });
                      return (
                        <article key={n.id} className="rounded-2xl border border-[#d9d4c7] bg-[#f7f6f2] p-4">
                          <div className="flex items-center justify-between gap-3">
                            <h3 className="text-sm font-semibold text-[#0b1f3a] line-clamp-2">{n.title}</h3>
                            <span className="whitespace-nowrap text-[11px] text-[#8aa39b]">{dateStr}</span>
                          </div>
                          {n.content ? (
                            <p className="mt-2 text-xs leading-5 text-[#4e5661] whitespace-pre-wrap line-clamp-3">{n.content}</p>
                          ) : null}
                        </article>
                      );
                    })
                  )}
                </div>
              </div>

              <div className="rounded-3xl border border-[#0b1f3a] bg-[#0b1f3a] p-6 text-xs text-white">
                <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#c0912f]">Reminder</p>
                <p className="mt-2 font-semibold">Check the student portal</p>
                <p className="mt-1 text-[11px] text-[#8aa39b]">
                  Daily homework, transport alerts, and attendance summaries are published inside the authenticated portal.
                </p>
              </div>
            </section>
          </div>
        </div>
      </section>
    </div>
  );
}
