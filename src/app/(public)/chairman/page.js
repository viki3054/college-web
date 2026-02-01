import ChairmanMessage from "@/components/public/ChairmanMessage";

export default function ChairmanPage() {
  return (
    <div className="bg-slate-50">
      <section className="border-b border-slate-200 bg-gradient-to-b from-white to-slate-50">
        <div className="mx-auto max-w-6xl px-6 py-12">
          <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">Leadership</p>
            <h1 className="mt-3 text-3xl font-semibold text-slate-900">Chairman’s Message</h1>
            <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600">
              A message from our leadership on the school’s values, vision, and commitment to excellence.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-12">
        <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
          <ChairmanMessage />
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { src: "/images/campus-1.svg", label: "Campus" },
            { src: "/images/campus-4.svg", label: "Classrooms" },
            { src: "/images/campus-6.svg", label: "Activities" },
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

export const metadata = { title: "Chairman's Message - DKTE International School" };