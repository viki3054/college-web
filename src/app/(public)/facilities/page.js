export const metadata = { title: "Facilities - DKTE International School" };

export default function FacilitiesPage() {
  return (
    <div>
      <section className="relative isolate overflow-hidden px-6 py-20">
        <div className="absolute inset-0 -z-10 opacity-30">
          <div className="absolute bottom-20 right-20 h-80 w-80 rounded-full bg-sky-300/40 blur-[140px]" />
        </div>
        <div className="mx-auto max-w-5xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border-2 border-sky-300 px-5 py-2 text-xs uppercase tracking-wider text-sky-600 font-semibold">
            Facilities
          </div>
          <h1 className="mt-6 text-4xl font-bold leading-tight text-slate-900 lg:text-5xl">
            World-Class Amenities
          </h1>
          <p className="mt-6 text-lg text-slate-600 max-w-2xl mx-auto">
            Everything students need for holistic development
          </p>
        </div>
      </section>

      <section className="border-t border-sky-200">
        <div className="mx-auto max-w-6xl px-6 py-14">
          <h2 className="text-3xl font-bold text-center text-slate-900 mb-12">Academic Facilities</h2>
          <div className="grid gap-6 lg:grid-cols-3">
            {[
              { title: "Smart Classrooms", desc: "Interactive learning spaces" },
              { title: "Science Labs", desc: "Hands-on experiments" },
              { title: "Computer Lab", desc: "Modern technology" }
            ].map((item) => (
              <article key={item.title} className="card-box rounded-3xl p-6 text-center">
                <h3 className="text-lg font-bold text-slate-900">{item.title}</h3>
                <p className="mt-3 text-sm text-slate-600">{item.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-b from-sky-50/50 to-white border-t border-sky-200">
        <div className="mx-auto max-w-6xl px-6 py-14">
          <h2 className="text-3xl font-bold text-center text-slate-900 mb-12">Sports & Activities</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[
              "Sports Ground",
              "Indoor Games",
              "Music Room",
              "Art Studio"
            ].map((item) => (
              <div key={item} className="card-box rounded-3xl p-6 text-center">
                <p className="text-base font-bold text-sky-600">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-sky-200">
        <div className="mx-auto max-w-6xl px-6 py-14">
          <h2 className="text-3xl font-bold text-center text-slate-900 mb-12">Support Services</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              { title: "Medical Bay", desc: "Trained staff on duty" },
              { title: "Cafeteria", desc: "Nutritious meals" },
              { title: "Transport", desc: "GPS-enabled buses" }
            ].map((item) => (
              <div key={item.title} className="card-box rounded-3xl p-6 text-center">
                <h3 className="text-lg font-bold text-slate-900">{item.title}</h3>
                <p className="mt-3 text-sm text-slate-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
