export const metadata = { title: "Management - DKTE International School" };

export default function ManagementPage() {
  return (
    <div>
      <section className="relative isolate overflow-hidden px-6 py-20">
        <div className="absolute inset-0 -z-10 opacity-30">
          <div className="absolute top-10 right-10 h-80 w-80 rounded-full bg-sky-300/40 blur-[120px]" />
        </div>
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 rounded-full border border-sky-300 px-4 py-2 text-xs uppercase tracking-[0.3em] text-sky-600">
                School Leadership
              </div>
              <h1 className="text-4xl font-bold leading-tight text-slate-900 lg:text-5xl">
                Guided by DKTE Society's proven mission
              </h1>
              <p className="text-lg text-slate-600">
                Overseen by the same leadership that built DKTE's acclaimed higher education institutions.
              </p>
            </div>
            <div className="glass-panel rounded-3xl p-6 text-sm text-slate-600">
              <div className="text-xs font-bold uppercase tracking-[0.28em] text-sky-600">Key contacts</div>
              <div className="mt-4 space-y-3">
                {[{
                  title: "Hon. Kallappanna B. Awade",
                  role: "Chairman, D.K.T.E. Society",
                }, { title: "School Director", role: "Academic oversight & collaborations" }, { title: "Principal", role: "Daily operations, academics, discipline" }].map((person) => (
                  <div key={person.title}>
                    <p className="text-sm font-semibold text-slate-900">{person.title}</p>
                    <p className="text-xs text-slate-500">{person.role}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-sky-200">
        <div className="mx-auto max-w-6xl px-6 py-14">
          <div className="grid gap-10 lg:grid-cols-2">
            <div className="space-y-4">
              <p className="text-xs font-bold uppercase tracking-[0.28em] text-sky-600">Chairman's message</p>
              <div className="glass-panel rounded-3xl p-6 text-sm leading-6 text-slate-600">
                <p className="text-xs font-bold uppercase tracking-[0.25em] text-sky-600">Hon. Kallappanna B. Awade</p>
                <p className="mt-3">
                  "Education must pair discipline with warmth, and be backed by systems that notice every child. DKTE
                  International School reflects the same commitment to excellence that the Society has upheld for decades."
                </p>
                <p className="mt-3 text-xs text-slate-500">Founder President, D.K.T.E. Society</p>
              </div>
            </div>
            <div className="space-y-4">
              <p className="text-xs font-bold uppercase tracking-[0.28em] text-sky-600">Leadership focus areas</p>
              <div className="grid gap-4 text-sm text-slate-600 md:grid-cols-2">
                {["Academic benchmarks & mentoring", "Wellbeing and safeguarding", "Parent partnership & communication", "Faculty development"].map((item) => (
                  <div key={item} className="glass-panel rounded-2xl p-4">
                    {item}
                  </div>
                ))}
              </div>
              <p className="text-sm leading-6 text-slate-600">
                Weekly leadership huddles review academics, student wellbeing, facilities, and parent feedback to keep the school
                aligned with DKTE values.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-b from-sky-50/50 to-white border-t border-sky-200">
        <div className="mx-auto max-w-6xl px-6 py-14">
          <div className="space-y-6">
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-sky-600">Governance principles</p>
            <div className="grid gap-6 md:grid-cols-3">
              {["Academic excellence", "Student wellbeing", "Transparent communication"].map((item) => (
                <div key={item} className="space-y-2 border-l-2 border-sky-600 pl-4">
                  <p className="text-sm font-bold text-slate-900">{item}</p>
                  <p className="text-sm text-slate-600">Core pillar of institutional governance and daily practice.</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
