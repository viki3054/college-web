export const metadata = { title: "About - DKTE International School" };

export default function AboutPage() {
  return (
    <div className="bg-slate-50">
      <section className="border-b border-slate-200 bg-gradient-to-b from-white to-slate-50">
        <div className="mx-auto max-w-6xl px-6 py-12">
          <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">About</p>
            <h1 className="mt-3 text-3xl font-semibold text-slate-900">DKTE International School</h1>
            <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600">
              D.K.T.E. Society’s 40 years of educational excellence from KG to Ph.D. has inspired the
              establishment of DKTE International School, Tardal (CBSE), a visionary initiative by
              Hon. Kallappanna Awade (Dada).
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-12">
        <div className="grid gap-6 lg:grid-cols-3">
          {[
            { label: "Legacy", value: "40+ Years" },
            { label: "Affiliation", value: "CBSE" },
            { label: "Focus", value: "Holistic Growth" },
          ].map((item) => (
            <div key={item.label} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow">
              <div className="text-xs uppercase tracking-wide text-slate-500">{item.label}</div>
              <div className="mt-2 text-lg font-semibold text-slate-900">{item.value}</div>
            </div>
          ))}
        </div>

        <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
          <div className="h-1 w-10 rounded-full bg-slate-900" />
          <h2 className="mt-4 text-xl font-semibold text-slate-900">Our Foundation</h2>
          <p className="mt-3 text-sm leading-6 text-slate-600">
            Education should be a joyful experience. We believe every child is unique and has their
            own strengths. Our role is to help students discover those strengths and build confidence
            through a thoughtful, disciplined, and caring learning environment.
          </p>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { src: "/images/campus-4.svg", label: "Classrooms" },
            { src: "/images/campus-2.svg", label: "Library" },
            { src: "/images/campus-3.svg", label: "Science Labs" },
          ].map((item) => (
            <div key={item.label} className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 shadow-sm transition hover:-translate-y-0.5 hover:shadow">
              <img src={item.src} alt={item.label} className="h-40 w-full object-cover" />
              <div className="border-t border-slate-200 bg-white px-4 py-3">
                <div className="text-sm font-semibold text-slate-900">{item.label}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          {[
            {
              title: "Mission",
              desc: "Provide high-quality education with supportive mentorship and strong parent engagement.",
            },
            {
              title: "Vision",
              desc: "Foster high-caliber individuals equipped with 21st century learning skills and human values.",
            },
            {
              title: "Philosophy",
              desc: "Emphasize all-round development to prepare students for future challenges and leadership.",
            },
          ].map((item) => (
            <div key={item.title} className="rounded-2xl border border-slate-200 bg-slate-50 p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow">
              <div className="text-sm font-semibold text-slate-900">{item.title}</div>
              <p className="mt-2 text-sm leading-6 text-slate-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
