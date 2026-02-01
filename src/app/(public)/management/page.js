export const metadata = { title: "Management - DKTE International School" };

export default function ManagementPage() {
  return (
    <div>
      <section className="relative isolate overflow-hidden px-6 py-20">
        <div className="absolute inset-0 -z-10 opacity-30">
          <div className="absolute top-10 right-10 h-80 w-80 rounded-full bg-sky-300/40 blur-[120px]" />
        </div>
        <div className="mx-auto max-w-6xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border-2 border-sky-300 px-5 py-2 text-xs uppercase tracking-wider text-sky-600 font-semibold">
            Leadership
          </div>
          <h1 className="mt-6 text-4xl font-bold leading-tight text-slate-900 lg:text-5xl">
            Experienced Leadership Team
          </h1>
          <p className="mt-6 text-lg text-slate-600 max-w-2xl mx-auto">
            Guided by D.K.T.E. Society's 40+ years of excellence
          </p>
        </div>
      </section>

      <section className="border-t border-sky-200">
        <div className="mx-auto max-w-6xl px-6 py-14">
          <div className="grid gap-8 md:grid-cols-3">
            {[
              { title: "Hon. Kallappanna B. Awade", role: "Chairman" },
              { title: "School Director", role: "Academic Oversight" },
              { title: "Principal", role: "Daily Operations" }
            ].map((person) => (
              <div key={person.title} className="card-box rounded-3xl p-6 text-center">
                <h3 className="text-lg font-bold text-slate-900">{person.title}</h3>
                <p className="mt-2 text-sm text-sky-600">{person.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-b from-sky-50/50 to-white border-t border-sky-200">
        <div className="mx-auto max-w-4xl px-6 py-14">
          <div className="card-box rounded-3xl p-8 text-center">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Chairman's Message</h2>
            <p className="text-lg text-slate-600 italic">
              "Education must pair discipline with warmth, backed by systems that notice every child."
            </p>
            <p className="mt-4 text-sm text-slate-500">Hon. Kallappanna B. Awade</p>
            <p className="text-xs text-slate-400">Founder President, D.K.T.E. Society</p>
          </div>
        </div>
      </section>

      <section className="border-t border-sky-200">
        <div className="mx-auto max-w-6xl px-6 py-14">
          <h2 className="text-3xl font-bold text-center text-slate-900 mb-12">Focus Areas</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[
              "Academic Excellence",
              "Student Wellbeing",
              "Parent Communication",
              "Faculty Development"
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
