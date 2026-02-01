export const metadata = { title: "Academic - DKTE International School" };

export default function AcademicPage() {
  return (
    <div>
      <section className="relative isolate overflow-hidden px-6 py-20">
        <div className="absolute inset-0 -z-10 opacity-30">
          <div className="absolute top-40 left-20 h-96 w-96 rounded-full bg-sky-300/40 blur-[140px]" />
        </div>
        <div className="mx-auto max-w-6xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border-2 border-sky-300 px-5 py-2 text-xs uppercase tracking-wider text-sky-600 font-semibold">
            Academics
          </div>
          <h1 className="mt-6 text-4xl font-bold leading-tight text-slate-900 lg:text-5xl">
            Structured CBSE Education
          </h1>
          <p className="mt-6 text-lg text-slate-600 max-w-2xl mx-auto">
            Quality education with dedicated mentoring
          </p>
        </div>
      </section>

      <section className="border-t border-sky-200">
        <div className="mx-auto max-w-6xl px-6 py-12">
          <div className="grid gap-6 md:grid-cols-3">
            <div className="card-box rounded-3xl p-6 text-center">
              <h3 className="text-lg font-bold text-slate-900">Nursery–VIII</h3>
              <p className="mt-2 text-sm text-slate-600">CBSE Curriculum</p>
            </div>
            <div className="card-box rounded-3xl p-6 text-center">
              <h3 className="text-lg font-bold text-slate-900">25-30</h3>
              <p className="mt-2 text-sm text-slate-600">Students per class</p>
            </div>
            <div className="card-box rounded-3xl p-6 text-center">
              <h3 className="text-lg font-bold text-slate-900">Dedicated</h3>
              <p className="mt-2 text-sm text-slate-600">Stage coordinators</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-b from-sky-50/50 to-white border-t border-sky-200">
        <div className="mx-auto max-w-6xl px-6 py-14">
          <h2 className="text-3xl font-bold text-center text-slate-900 mb-12">Learning Stages</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[
              { title: "Early Years", desc: "Foundational skills" },
              { title: "Primary", desc: "Core concepts" },
              { title: "Middle School", desc: "Advanced learning" },
              { title: "Activities", desc: "Arts & sports" }
            ].map((item) => (
              <article key={item.title} className="card-box rounded-3xl p-6 text-center">
                <h3 className="text-lg font-bold text-sky-600">{item.title}</h3>
                <p className="mt-3 text-sm text-slate-600">{item.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-sky-200">
        <div className="mx-auto max-w-6xl px-6 py-14">
          <h2 className="text-3xl font-bold text-center text-slate-900 mb-12">Our Approach</h2>
          <div className="grid gap-6 lg:grid-cols-3">
            {[
              "Weekly progress reviews",
              "Dedicated mentoring",
              "Parent conferences"
            ].map((item) => (
              <div key={item} className="card-box rounded-3xl p-6 text-center">
                <p className="text-base font-bold text-slate-900">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
