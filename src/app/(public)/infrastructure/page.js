export const metadata = { title: "Infrastructure - DKTE International School" };

export default function InfrastructurePage() {
  return (
    <div className="bg-slate-50">
      <section className="border-b border-slate-200 bg-gradient-to-b from-white to-slate-50">
        <div className="mx-auto max-w-6xl px-6 py-12">
          <div className="grid gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2 rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">Infrastructure</p>
              <h1 className="mt-3 text-3xl font-semibold text-slate-900">Infrastructure</h1>
              <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600">
                A modern campus designed to support academic excellence, safety, and holistic growth.
              </p>
            </div>
            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
              <img src="/images/campus-1.svg" alt="Campus" className="h-full w-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-12">
        <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
          <div className="h-1 w-10 rounded-full bg-slate-900" />
          <h2 className="mt-4 text-lg font-semibold text-slate-900">School Infrastructure</h2>
          <p className="mt-3 text-sm leading-6 text-slate-600">
            Our facilities are purpose-built to provide a safe, comfortable, and inspiring learning environment.
          </p>

          <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[
              { title: "Modern Classrooms", desc: "Well-equipped classrooms with modern teaching aids." },
              { title: "Library", desc: "Extensive collection of books and digital resources." },
              { title: "Science Labs", desc: "Fully equipped laboratories for practical learning." },
              { title: "Sports Facilities", desc: "Playground and sports equipment for physical development." },
              { title: "Computer Lab", desc: "Latest computers with internet connectivity." },
              { title: "Safety & Security", desc: "Safe and secure campus environment." },
            ].map((item) => (
              <div key={item.title} className="rounded-xl border border-slate-200 bg-slate-50 p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow">
                <div className="text-sm font-semibold text-slate-900">{item.title}</div>
                <p className="mt-2 text-sm text-slate-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { src: "/images/campus-4.svg", label: "Classrooms" },
            { src: "/images/campus-3.svg", label: "Labs" },
            { src: "/images/campus-5.svg", label: "Sports" },
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