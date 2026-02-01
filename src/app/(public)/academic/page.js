export const metadata = { title: "Academic - DKTE International School" };

export default function AcademicPage() {
  return (
    <div>
      <section className="relative isolate overflow-hidden px-6 py-20">
        <div className="absolute inset-0 -z-10 opacity-30">
          <div className="absolute top-40 left-20 h-96 w-96 rounded-full bg-sky-300/40 blur-[140px]" />
        </div>
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 rounded-full border border-sky-300 px-4 py-2 text-xs uppercase tracking-[0.3em] text-sky-600">
                Academic Excellence
              </div>
              <h1 className="text-4xl font-bold leading-tight text-slate-900 lg:text-5xl">
                Structured CBSE education with purposeful mentoring
              </h1>
              <p className="text-lg text-slate-600">
                Teaching calendars, assessment rubrics, and learning labs integrated within structured academic blocks.
              </p>
            </div>
            <div className="glass-panel rounded-3xl p-6 text-sm text-slate-600">
              <div className="text-xs font-bold uppercase tracking-[0.28em] text-sky-600">At a glance</div>
              <ul className="mt-4 space-y-2">
                {["Nursery–VIII | CBSE", "25-30 students per section", "Dedicated coordinators per stage"].map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-sky-600" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-sky-200">
        <div className="mx-auto max-w-6xl px-6 py-12 lg:py-16">
          <div className="grid gap-10 lg:grid-cols-3">
            <div className="space-y-3">
              <p className="text-xs font-bold uppercase tracking-[0.28em] text-sky-600">Curriculum arcs</p>
              <h2 className="text-2xl font-bold text-slate-900">Stage-specific priorities</h2>
              <p className="text-sm leading-6 text-slate-600">
                Each stage has defined outcomes, teacher training modules, and assessments so transitions remain smooth.
              </p>
            </div>
            <div className="lg:col-span-2 grid gap-6 md:grid-cols-2">
              {[{ title: "Early years", desc: "Readiness, phonics, number sense, routines, and joy." }, { title: "Primary", desc: "Concept clarity, language fluency, purposeful homework." }, { title: "Middle School", desc: "STEM depth, humanities, leadership opportunities." }, { title: "Beyond academics", desc: "Value education, arts, sports, service credits." }].map((item) => (
                <article key={item.title} className="glass-panel rounded-3xl p-5">
                  <h3 className="text-sm font-bold text-slate-900">{item.title}</h3>
                  <p className="mt-2 text-sm text-slate-600">{item.desc}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-b from-sky-50/50 to-white border-t border-sky-200">
        <div className="mx-auto max-w-6xl px-6 py-14">
          <div className="grid gap-10 lg:grid-cols-2">
            <div className="space-y-4">
              <p className="text-xs font-bold uppercase tracking-[0.28em] text-sky-600">Learning architecture</p>
              <h2 className="text-3xl font-bold text-slate-900">Where planning meets mentorship</h2>
              <p className="text-sm text-slate-600">
                Coordinators publish planners every six weeks covering objectives, lab slots, reading focus, and formative
                assessments. Mentors review notebooks, portal submissions, and wellbeing check-ins weekly.
              </p>
            </div>
            <div className="glass-panel space-y-4 rounded-3xl p-6 text-sm text-slate-600">
              <p className="text-xs font-bold uppercase tracking-[0.28em] text-sky-600">Systems in practice</p>
              <ul className="space-y-3">
                {["Lesson studies + peer observations for teachers", "Assessment moderation to keep grading fair", "Parent conferences scheduled thrice a year", "Student portfolios maintained on the portal"].map((line) => (
                  <li key={line} className="flex gap-3">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-sky-600" />
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-sky-200">
        <div className="mx-auto max-w-6xl px-6 py-14">
          <div className="grid gap-10 lg:grid-cols-2">
            <div className="space-y-4">
              <p className="text-xs font-bold uppercase tracking-[0.28em] text-sky-600">Assessment & feedback</p>
              <h2 className="text-2xl font-bold text-slate-900">Predictable cycles</h2>
              <div className="space-y-3 text-sm text-slate-600">
                {["Weekly classwork reviews & verbal feedback", "Formative checkpoints every six weeks", "Summative exams at end of term with detailed rubrics"].map((line) => (
                  <p key={line}>{line}</p>
                ))}
              </div>
            </div>
            <div className="glass-panel rounded-3xl p-6 text-sm text-slate-600">
              <p className="text-xs font-bold uppercase tracking-[0.28em] text-sky-600">Mentoring</p>
              <ul className="mt-4 space-y-2">
                {["Section mentors track wellbeing and academics", "Remediation blocks built into timetable", "Portal reports summarise attendance, performance, conduct"].map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-sky-600" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-sky-200 bg-gradient-to-b from-sky-50/50 to-white">
        <div className="mx-auto max-w-6xl px-6 py-14">
          <div className="grid gap-8 lg:grid-cols-3">
            {["Library & reading lofts", "STEM + robotics labs", "Studios for arts and performing arts"].map((space) => (
              <article key={space} className="space-y-2 border-l-2 border-sky-600 pl-4">
                <h3 className="text-sm font-bold text-slate-900">{space}</h3>
                <p className="text-sm leading-6 text-slate-600">
                  Thoughtfully located near classrooms so transition time stays minimal and supervision stays high.
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
