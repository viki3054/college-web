export const metadata = { title: "Admissions - DKTE International School" };

export default function AdmissionsPage() {
  return (
    <div>
      <section className="relative isolate overflow-hidden px-6 py-20">
        <div className="absolute inset-0 -z-10 opacity-30">
          <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-sky-300/40 blur-[120px]" />
        </div>
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-12 lg:grid-cols-2">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 rounded-full border border-sky-300 px-4 py-2 text-xs uppercase tracking-[0.3em] text-sky-600">
                <span className="h-1.5 w-1.5 rounded-full bg-sky-600" />
                Admissions 2025‑26
              </div>
              <h1 className="text-4xl font-bold leading-tight text-slate-900 lg:text-5xl">
                Transparent admissions with personal guidance
              </h1>
              <p className="text-lg text-slate-600">
                Campus visits, leadership interaction, and structured onboarding for Nursery to Grade VIII.
              </p>
            </div>
            <div className="glass-panel rounded-3xl p-6 text-sm text-slate-600">
              <div className="text-xs font-bold uppercase tracking-[0.28em] text-sky-600">Admissions office</div>
              <div className="mt-4 space-y-2">
                <p className="text-slate-900 font-semibold">+91 81490 65016</p>
                <p>dkteis@gmail.com</p>
                <p>KATP Road, Tardal</p>
              </div>
              <p className="mt-4 text-xs text-slate-500">Visits are scheduled Monday–Saturday, 10.00 a.m. to 3.00 p.m.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-sky-200">
        <div className="mx-auto max-w-6xl px-6 py-12 lg:py-16">
          <div className="grid gap-8 lg:grid-cols-3">
            <div className="space-y-3">
              <p className="text-xs font-bold uppercase tracking-[0.28em] text-sky-600">How it works</p>
              <h2 className="text-2xl font-bold text-slate-900">3-step admissions pathway</h2>
            </div>
            <div className="lg:col-span-2 space-y-5">
              {["Share student profile via phone/email and book a visit.", "Join the campus walk + interaction with leadership.", "Submit documents and confirm the seat within the issued timeline."].map((step, idx) => (
                <div key={step} className="flex gap-4">
                  <span className="inline-flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-sky-500 to-sky-600 text-xs font-semibold text-white">
                    {idx + 1}
                  </span>
                  <p className="text-sm leading-6 text-slate-600">{step}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-b from-sky-50/50 to-white border-t border-sky-200">
        <div className="mx-auto max-w-6xl px-6 py-14">
          <div className="grid gap-10 lg:grid-cols-2">
            <div className="space-y-4">
              <p className="text-xs font-bold uppercase tracking-[0.28em] text-sky-600">Eligibility & documentation</p>
              <p className="text-sm text-slate-600">
                Admission is open for Nursery–Grade VIII. Age criteria follow CBSE guidelines and are verified using the
                birth certificate. Transferring students should carry the previous school's report card.
              </p>
            </div>
            <div className="glass-panel space-y-3 rounded-3xl p-6 text-sm text-slate-600">
              <ul className="space-y-2">
                {["Birth certificate or equivalent", "Previous school documents (Grades II and above)", "Immunization record", "Parent/guardian photo ID", "Passport-size photographs"].map((doc) => (
                  <li key={doc} className="flex gap-3">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-sky-600" />
                    <span>{doc}</span>
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
              <p className="text-xs font-bold uppercase tracking-[0.28em] text-sky-600">Guidance for families</p>
              <div className="space-y-3 text-sm text-slate-600">
                {["Readiness conversations cover academics, transport, and pastoral expectations.", "Admissions counsellor shares fee structure and timeline in writing.", "Orientation kit is issued once the seat is confirmed."].map((note) => (
                  <p key={note}>{note}</p>
                ))}
              </div>
            </div>
            <div className="glass-panel rounded-3xl p-6 text-sm text-slate-600">
              <p className="text-xs font-bold uppercase tracking-[0.28em] text-sky-600">Parent partnership</p>
              <ul className="mt-4 space-y-2">
                {["Dedicated admissions helpline for follow-ups", "Portal login issued post-enrolment for onboarding", "Transport survey ensures safe pick-up/drop-off planning"].map((item) => (
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
    </div>
  );
}
