export const metadata = { title: "Infrastructure - DKTE International School" };

export default function InfrastructurePage() {
  return (
    <div>
      <section className="relative isolate overflow-hidden px-6 py-20">
        <div className="absolute inset-0 -z-10 opacity-30">
          <div className="absolute top-40 left-40 h-96 w-96 rounded-full bg-sky-300/40 blur-[160px]" />
        </div>
        <div className="mx-auto max-w-5xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border-2 border-sky-300 px-5 py-2 text-xs uppercase tracking-wider text-sky-600 font-semibold">
            Campus
          </div>
          <h1 className="mt-6 text-4xl font-bold leading-tight text-slate-900 lg:text-5xl">
            Modern Learning Facilities
          </h1>
          <p className="mt-6 text-lg text-slate-600 max-w-2xl mx-auto">
            Purpose-built campus for academic excellence
          </p>
        </div>
      </section>

      <section className="border-t border-sky-200">
        <div className="mx-auto max-w-6xl px-6 py-14">
          <h2 className="text-3xl font-bold text-center text-slate-900 mb-12">Campus Facilities</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              "Smart Classrooms",
              "Science Labs",
              "Computer Lab",
              "Library",
              "Sports Ground",
              "Art Studio",
              "Music Room",
              "Cafeteria",
              "Medical Room"
            ].map((facility) => (
              <div key={facility} className="card-box rounded-3xl p-6 text-center">
                <p className="text-lg font-bold text-slate-900">{facility}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-b from-sky-50/50 to-white border-t border-sky-200">
        <div className="mx-auto max-w-6xl px-6 py-14">
          <h2 className="text-3xl font-bold text-center text-slate-900 mb-12">Safety & Security</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[
              "24/7 CCTV",
              "GPS Tracking",
              "Fire Safety",
              "Medical Staff"
            ].map((item) => (
              <div key={item} className="card-box rounded-3xl p-6 text-center">
                <p className="text-base font-bold text-sky-600">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
