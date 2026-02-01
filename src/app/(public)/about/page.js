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
                DKTE International School
              </h1>
              <p className="text-lg text-slate-600">
                40+ years of D.K.T.E. Society excellence in CBSE education.
              </p>
            </div>
            <dl className="card-box space-y-4 rounded-3xl p-6">
              {[{ label: "Legacy", value: "40+ years" }, { label: "Board", value: "CBSE" }, { label: "Location", value: "Tardal" }, { label: "Grades", value: "K-VIII" }].map((fact) => (
                <div key={fact.label} className="flex items-center justify-between border-b border-sky-100 pb-3 last:border-b-0 last:pb-0">
                  <dt className="text-xs uppercase tracking-wider text-sky-600 font-semibold">{fact.label}</dt>
                  <dd className="font-bold text-slate-900">{fact.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <section className="border-t border-sky-200">
        <div className="mx-auto max-w-6xl px-6 py-14">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold text-slate-900">Why Choose DKTE</h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div className="card-box space-y-3 rounded-2xl p-6 text-center">
              <div className="text-4xl font-bold text-sky-600">40+</div>
              <div className="text-sm text-slate-600">Years of Excellence</div>
            </div>
            <div className="card-box space-y-3 rounded-2xl p-6 text-center">
              <div className="text-4xl font-bold text-sky-600">100%</div>
              <div className="text-sm text-slate-600">System Based</div>
            </div>
            <div className="card-box space-y-3 rounded-2xl p-6 text-center">
              <div className="text-4xl font-bold text-sky-600">CBSE</div>
              <div className="text-sm text-slate-600">Curriculum</div>
            </div>
            <div className="card-box space-y-3 rounded-2xl p-6 text-center">
              <div className="text-4xl font-bold text-sky-600">K-8</div>
              <div className="text-sm text-slate-600">All Grades</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
