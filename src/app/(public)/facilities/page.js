export const metadata = { title: "Facilities - DKTE International School" };

export default function FacilitiesPage() {
  return (
    <div className="bg-slate-50">
      <section className="border-b border-slate-200 bg-gradient-to-b from-white to-slate-50">
        <div className="mx-auto max-w-6xl px-6 py-12">
          <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">Facilities</p>
            <h1 className="mt-3 text-3xl font-semibold text-slate-900">Facilities</h1>
            <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600">
              A comprehensive set of facilities that supports academic, physical, and creative development.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-12">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: "Kindergarten Facilities",
              desc: "Safe, developmentally appropriate spaces for early learners.",
            },
            { title: "Transportation", desc: "Reliable school bus service across key routes." },
            { title: "Medical Facility", desc: "On-campus medical support for student safety." },
            { title: "Cafeteria", desc: "Nutritious meals prepared in hygienic conditions." },
            { title: "Audio Visual Room", desc: "Modern AV equipment for interactive learning." },
            { title: "Activity Rooms", desc: "Dedicated spaces for arts, music, and creativity." },
          ].map((item) => (
            <div key={item.title} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow">
              <div className="h-1 w-8 rounded-full bg-slate-900" />
              <h3 className="mt-4 text-sm font-semibold text-slate-900">{item.title}</h3>
              <p className="mt-2 text-sm text-slate-600">{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { src: "/images/campus-6.svg", label: "Activities" },
            { src: "/images/campus-5.svg", label: "Sports" },
            { src: "/images/campus-1.svg", label: "Campus" },
          ].map((item) => (
            <div key={item.label} className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 shadow-sm transition hover:-translate-y-0.5 hover:shadow">
              <img src={item.src} alt={item.label} className="h-40 w-full object-cover" />
              <div className="border-t border-slate-200 bg-white px-4 py-3">
                <div className="text-sm font-semibold text-slate-900">{item.label}</div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}