export const metadata = { title: "Infrastructure - DKTE International School" };

export default function InfrastructurePage() {
  return (
    <div>
      <section className="relative isolate overflow-hidden px-6 py-20">
        <div className="absolute inset-0 -z-10 opacity-30">
          <div className="absolute top-40 left-40 h-96 w-96 rounded-full bg-sky-300/40 blur-[160px]" />
        </div>
        <div className="mx-auto max-w-5xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-sky-300 px-4 py-2 text-xs uppercase tracking-[0.3em] text-sky-600">
            Campus Infrastructure
          </div>
          <h1 className="mt-6 text-4xl font-bold leading-tight text-slate-900 lg:text-5xl">
            Intelligent campus design for seamless learning
          </h1>
          <p className="mt-6 text-lg text-slate-600">
            Connected learning zones within a supervised loop, enabling efficient transitions and optimal faculty oversight.
          </p>
        </div>
      </section>

      <section className="border-t border-sky-200">
        <div className="mx-auto max-w-6xl px-6 py-14">
          <div className="grid gap-10 lg:grid-cols-2">
            <div className="space-y-3">
              <p className="text-xs font-bold uppercase tracking-[0.28em] text-sky-600">Academic block</p>
              <p className="text-sm leading-6 text-slate-600">
                Naturally lit classrooms, smart boards where required, and movable furniture support both direct instruction
                and collaborative work. Resource rooms sit adjacent to reduce transition time.
              </p>
            </div>
            <div className="glass-panel rounded-3xl p-6 text-sm text-slate-600">
              {[
                "Language + reading loft",
                "Mathematics lab",
                "Science laboratories",
                "Computer & robotics lab",
              ].map((space) => (
                <p key={space}>• {space}</p>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-b from-sky-50/50 to-white border-t border-sky-200">
        <div className="mx-auto max-w-6xl px-6 py-14">
          <div className="grid gap-10 lg:grid-cols-3">
            {[
              {
                title: "Sports loop",
                desc: "Multi-sport court, athletics track, and indoor fitness area for structured movement blocks.",
              },
              {
                title: "Cultural wing",
                desc: "Music, visual arts, drama studio, and AV hall that double up for exhibitions.",
              },
              {
                title: "Community spaces",
                desc: "Seminar hall for parent briefings and leadership interactions.",
              },
            ].map((item) => (
              <article key={item.title} className="space-y-2 border-l-2 border-sky-600 pl-4">
                <h3 className="text-sm font-bold text-slate-900">{item.title}</h3>
                <p className="text-sm text-slate-600">{item.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-sky-200">
        <div className="mx-auto max-w-6xl px-6 py-14">
          <div className="grid gap-10 lg:grid-cols-2">
            <div className="space-y-4">
              <p className="text-xs font-bold uppercase tracking-[0.28em] text-sky-600">Logistics & safety</p>
              <ul className="space-y-2 text-sm text-slate-600">
                {["CCTV coverage across blocks", "RFID-based attendance option", "Verified transport partners and GPS tracking", "Fire safety certifications and regular drills"].map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-sky-600" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="glass-panel rounded-3xl p-6 text-sm text-slate-600">
              <p>
                The maintenance team conducts weekly walkthroughs with leadership to review housekeeping, horticulture, and
                infrastructure enhancements so the campus stays ready for students every day.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
