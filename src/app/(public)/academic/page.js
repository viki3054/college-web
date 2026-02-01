export const metadata = { title: "Academic - DKTE International School" };

export default function AcademicPage() {
  return (
    <div className="bg-slate-50">
      <section className="border-b border-slate-200 bg-gradient-to-b from-white to-slate-50">
        <div className="mx-auto max-w-6xl px-6 py-12">
          <div className="grid gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2 rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">Academics</p>
              <h1 className="mt-3 text-3xl font-semibold text-slate-900">Academic Excellence</h1>
              <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600">
                A strong CBSE curriculum supported by modern pedagogy, structured assessments, and
                continuous mentoring for every student.
              </p>
            </div>
            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
              <img src="/images/campus-3.svg" alt="Academics" className="h-full w-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-12">
        <div className="grid gap-6 lg:grid-cols-3">
          {[
            {
              title: "CBSE Curriculum",
              desc: "A balanced program that builds academic depth, values, and real-world skills.",
            },
            {
              title: "Academic Approach",
              desc: "Focus on critical thinking, creativity, and problem-solving with technology-enabled learning.",
            },
            {
              title: "Achievements",
              desc: "Consistent performance in academics and co-curricular activities.",
            },
          ].map((item) => (
            <div key={item.title} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow">
              <div className="text-sm font-semibold text-slate-900">{item.title}</div>
              <p className="mt-3 text-sm leading-6 text-slate-600">{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { title: "Assessments", desc: "Regular evaluations and feedback." },
            { title: "Mentoring", desc: "Personalized academic guidance." },
            { title: "Competitions", desc: "Olympiads and inter-school events." },
            { title: "Learning Aids", desc: "Smart classrooms and digital tools." },
          ].map((item) => (
            <div key={item.title} className="rounded-xl border border-slate-200 bg-slate-50 p-4 shadow-sm">
              <div className="text-sm font-semibold text-slate-900">{item.title}</div>
              <p className="mt-2 text-xs text-slate-600">{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {[
            { title: "Primary Education", desc: "Strong foundation with emphasis on core skills." },
            { title: "Secondary Education", desc: "Comprehensive preparation for higher grades." },
          ].map((item) => (
            <div key={item.title} className="rounded-xl border border-slate-200 bg-slate-50 p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow">
              <div className="text-sm font-semibold text-slate-900">{item.title}</div>
              <p className="mt-2 text-sm text-slate-600">{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { src: "/images/campus-2.svg", label: "Library" },
            { src: "/images/campus-3.svg", label: "Labs" },
            { src: "/images/campus-4.svg", label: "Classrooms" },
          ].map((item) => (
            <div key={item.label} className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 shadow-sm">
              <img src={item.src} alt={item.label} className="h-36 w-full object-cover" />
              <div className="border-t border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-900">
                {item.label}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}