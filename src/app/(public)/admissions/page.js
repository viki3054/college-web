export const metadata = { title: "Admissions - DKTE International School" };

export default function AdmissionsPage() {
  return (
    <div className="bg-slate-50">
      <section className="border-b border-slate-200 bg-gradient-to-b from-white to-slate-50">
        <div className="mx-auto max-w-6xl px-6 py-12">
          <div className="grid gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2 rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">Admissions</p>
              <h1 className="mt-3 text-3xl font-semibold text-slate-900">Admissions</h1>
              <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600">
                Admissions are open for the current academic year. We follow a transparent, merit-based
                process aligned with the CBSE curriculum and our school values.
              </p>
            </div>
            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
              <img src="/images/campus-4.svg" alt="Admissions" className="h-full w-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-12">
        <div className="grid gap-6 md:grid-cols-3">
          {["Step 1", "Step 2", "Step 3"].map((step, index) => (
            <div key={step} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow">
              <div className="flex items-center gap-3">
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-slate-900 text-xs font-semibold text-white">
                  {index + 1}
                </span>
                <span className="text-xs uppercase tracking-wide text-slate-500">{step}</span>
              </div>
              <p className="mt-3 text-sm text-slate-600">
                {index === 0 && "Share student details via phone or email to initiate the admission enquiry."}
                {index === 1 && "Visit the campus for interaction, guidance, and assessment."}
                {index === 2 && "Submit required documents and complete admission formalities."}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { title: "Transparent Process", desc: "Clear timelines and communication." },
            { title: "Merit-Based", desc: "Fair and structured evaluation." },
            { title: "Parent Guidance", desc: "Dedicated support for families." },
            { title: "Campus Visit", desc: "Experience our facilities." },
          ].map((item) => (
            <div key={item.title} className="rounded-xl border border-slate-200 bg-slate-50 p-4 shadow-sm">
              <div className="text-sm font-semibold text-slate-900">{item.title}</div>
              <p className="mt-2 text-xs text-slate-600">{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-sm font-semibold text-slate-900">Common Requirements</h2>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-slate-600">
              <li>Previous school records (if applicable)</li>
              <li>Birth certificate / proof of age</li>
              <li>Parent/guardian ID proof</li>
              <li>Passport-size photographs</li>
            </ul>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-slate-900 p-6 text-sm text-white shadow-sm">
            <div className="text-xs uppercase tracking-wide text-slate-300">Contact</div>
            <div className="mt-3 space-y-2">
              <div className="font-semibold">+91 8149065016</div>
              <div className="text-slate-300">dkteis@gmail.com</div>
              <div className="text-slate-300">KATP Road, Tardal</div>
            </div>
          </div>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { src: "/images/campus-1.svg", label: "Campus" },
            { src: "/images/campus-2.svg", label: "Library" },
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
