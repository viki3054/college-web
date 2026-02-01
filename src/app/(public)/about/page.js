export const metadata = { title: "About - DKTE International School" };

export default function AboutPage() {
  return (
    <div>
      <section className="relative isolate overflow-hidden px-6 py-20">
        <div className="absolute inset-0 -z-10 opacity-30">
          <div className="absolute top-20 right-20 h-72 w-72 rounded-full bg-sky-300/40 blur-[120px]" />
        </div>
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 rounded-full border border-sky-300 px-4 py-2 text-xs uppercase tracking-[0.3em] text-sky-600">
                About the school
              </div>
              <h1 className="text-4xl font-bold leading-tight text-slate-900 lg:text-5xl">
                DKTE International School, Tardal
              </h1>
              <p className="text-lg text-slate-600">
                Founded by D.K.T.E. Society, extending four decades of higher education excellence to a structured CBSE environment for Nursery to Grade VIII.
              </p>
            </div>
            <dl className="glass-panel space-y-4 rounded-3xl p-6 text-sm text-slate-600">
              {[{ label: "Legacy", value: "40+ years of DKTE" }, { label: "Board", value: "CBSE" }, { label: "Location", value: "KATP Road, Tardal" }, { label: "Focus", value: "Holistic, value-led academics" }].map((fact) => (
                <div key={fact.label} className="flex items-center justify-between border-b border-sky-100 pb-3 last:border-b-0 last:pb-0">
                  <dt className="text-xs uppercase tracking-[0.25em] text-sky-600">{fact.label}</dt>
                  <dd className="font-semibold text-slate-900">{fact.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <section className="border-t border-sky-200">
        <div className="mx-auto max-w-6xl px-6 py-14">
          <div className="grid gap-12 lg:grid-cols-2">
            <div className="space-y-4">
              <p className="text-xs font-bold uppercase tracking-[0.28em] text-sky-600">Part of the D.K.T.E. legacy</p>
              <h2 className="text-2xl font-bold text-slate-900">What families can count on</h2>
              <p className="text-sm leading-6 text-slate-600">
                D.K.T.E. Society has built engineering, textile, and management institutions recognised across India.
                DKTE International School carries the same attention to systems: academic plans are published, pastoral
                mentors track every learner, and leadership reviews progress weekly.
              </p>
              <p className="text-sm leading-6 text-slate-600">
                The campus is intentionally calm. Corridors are supervised, routines are predictable, and expectations are
                clear—allowing students to focus on scholarship, conduct, and community.
              </p>
            </div>
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="glass-panel space-y-2 rounded-2xl p-4">
                <div className="text-3xl font-bold text-slate-900">40+</div>
                <div className="text-xs font-medium uppercase tracking-wider text-slate-600">Years of Education</div>
              </div>
              <div className="glass-panel space-y-2 rounded-2xl p-4">
                <div className="text-3xl font-bold text-slate-900">100%</div>
                <div className="text-xs font-medium uppercase tracking-wider text-slate-600">System Based</div>
              </div>
              <div className="glass-panel space-y-2 rounded-2xl p-4">
                <div className="text-3xl font-bold text-slate-900">CBSE</div>
                <div className="text-xs font-medium uppercase tracking-wider text-slate-600">Curriculum</div>
              </div>
              <div className="glass-panel space-y-2 rounded-2xl p-4">
                <div className="text-3xl font-bold text-slate-900">K-8</div>
                <div className="text-xs font-medium uppercase tracking-wider text-slate-600">Growing Campus</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
