export const metadata = { title: "Facilities - DKTE International School" };

export default function FacilitiesPage() {
  return (
    <div>
      <section className="relative isolate overflow-hidden px-6 py-20">
        <div className="absolute inset-0 -z-10 opacity-30">
          <div className="absolute bottom-20 right-20 h-80 w-80 rounded-full bg-sky-300/40 blur-[140px]" />
        </div>
        <div className="mx-auto max-w-5xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-sky-300 px-4 py-2 text-xs uppercase tracking-[0.3em] text-sky-600">
            Campus Facilities
          </div>
          <h1 className="mt-6 text-4xl font-bold leading-tight text-slate-900 lg:text-5xl">
            Purpose-built spaces for focused learning
          </h1>
          <p className="mt-6 text-lg text-slate-600">
            Compact campus design enabling seamless supervision and transitions across academic, creative, and recreational zones.
          </p>
        </div>
      </section>

      <section className="border-t border-sky-200">
        <div className="mx-auto max-w-6xl px-6 py-14">
          <div className="grid gap-8 lg:grid-cols-3">
            {[
              {
                title: "Early learning cluster",
                desc: "Kindergarten classrooms open into shaded play patios with sensory material and low-height furniture.",
              },
              {
                title: "Academic spine",
                desc: "Primary and middle school classrooms sit beside language, math, and science labs for seamless movement.",
              },
              {
                title: "Specialist studios",
                desc: "Art, music, robotics, and AV rooms allow focused practice with faculty nearby.",
              },
            ].map((block) => (
              <article key={block.title} className="space-y-3 border-l-2 border-sky-600 pl-4">
                <h3 className="text-sm font-bold text-slate-900">{block.title}</h3>
                <p className="text-sm leading-6 text-slate-600">{block.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-b from-sky-50/50 to-white border-t border-sky-200">
        <div className="mx-auto max-w-6xl px-6 py-14">
          <div className="grid gap-10 lg:grid-cols-2">
            <div className="space-y-4">
              <p className="text-xs font-bold uppercase tracking-[0.28em] text-sky-600">Safety & care</p>
              <p className="text-sm text-slate-600">
                CCTV, controlled entry, infirmary staffed during school hours, and verified transport partners keep daily
                operations predictable.
              </p>
            </div>
            <div className="space-y-2 text-sm text-slate-600">
              {["Medical bay with trained staff", "Fire drills and evacuation plans", "GPS-enabled buses with attendants"].map((item) => (
                <p key={item}>• {item}</p>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-sky-200">
        <div className="mx-auto max-w-6xl px-6 py-14">
          <div className="grid gap-10 lg:grid-cols-2">
            <div className="space-y-3">
              <p className="text-xs font-bold uppercase tracking-[0.28em] text-sky-600">Student life essentials</p>
              <ul className="space-y-2 text-sm text-slate-600">
                {["Well-stocked library with reading loft", "Multi-sport court & athletics field", "Nutritious cafeteria with monitored menus", "Audio-visual and seminar rooms"].map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-sky-600" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="glass-panel rounded-3xl p-6 text-sm text-slate-600">
              <p>Integrated campus design ensures that students move efficiently between academic blocks, co-curricular zones, and break areas with faculty visibility throughout.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
