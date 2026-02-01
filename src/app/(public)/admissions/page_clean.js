export const metadata = { title: "Admissions - DKTE International School" };

export default function AdmissionsPage() {
  return (
    <div>
      <section className="relative isolate overflow-hidden px-6 py-20">
        <div className="absolute inset-0 -z-10 opacity-30">
          <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-sky-300/40 blur-[120px]" />
        </div>
        <div className="mx-auto max-w-6xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border-2 border-sky-300 px-5 py-2 text-xs uppercase tracking-wider text-sky-600 font-semibold">
            <span className="h-2 w-2 rounded-full bg-sky-600" />
            Admissions 2025‑26
          </div>
          <h1 className="mt-6 text-4xl font-bold leading-tight text-slate-900 lg:text-5xl">
            Join DKTE International
          </h1>
          <p className="mt-6 text-lg text-slate-600 max-w-2xl mx-auto">
            Now accepting applications for Nursery to Grade VIII
          </p>
        </div>
      </section>

      <section className="border-t border-sky-200">
        <div className="mx-auto max-w-6xl px-6 py-12">
          <div className="grid gap-8 lg:grid-cols-2">
            <div className="card-box rounded-3xl p-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Application Process</h2>
              <div className="space-y-4">
                {["Submit application", "Campus visit", "Document submission", "Seat confirmation"].map((step, idx) => (
                  <div key={step} className="flex gap-4 items-center">
                    <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-sky-500 text-white font-bold shadow-lg shadow-sky-500/30">
                      {idx + 1}
                    </span>
                    <p className="text-slate-900 font-medium">{step}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="card-box rounded-3xl p-8">
              <h3 className="text-sm font-bold uppercase tracking-wider text-sky-600 mb-6">Contact Admissions</h3>
              <div className="space-y-4">
                <div>
                  <a href="tel:+918149065016" className="text-2xl font-bold text-slate-900 hover:text-sky-600">
                    +91 81490 65016
                  </a>
                </div>
                <div>
                  <a href="mailto:dkteis@gmail.com" className="text-sky-600 hover:text-sky-700 font-medium">
                    dkteis@gmail.com
                  </a>
                </div>
                <div className="pt-4 border-t border-sky-100">
                  <p className="text-slate-900 font-medium">KATP Road, Tardal</p>
                  <p className="text-sm text-slate-500 mt-2">Mon–Sat: 10 AM – 3 PM</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-b from-sky-50/50 to-white border-t border-sky-200">
        <div className="mx-auto max-w-6xl px-6 py-14">
          <h2 className="text-3xl font-bold text-center text-slate-900 mb-12">Required Documents</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[
              "Birth certificate",
              "Previous school records",
              "Immunization record",
              "Parent ID proof",
              "Passport photos",
              "Address proof"
            ].map((doc) => (
              <div key={doc} className="card-box rounded-2xl p-4 text-center">
                <p className="text-slate-900 font-medium">{doc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
