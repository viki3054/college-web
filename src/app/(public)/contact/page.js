import ContactForm from "./ContactForm";

export const metadata = { title: "Contact - DKTE International School" };

export default function ContactPage() {
  return (
    <div>
      <section className="relative isolate overflow-hidden px-6 py-20">
        <div className="absolute inset-0 -z-10 opacity-30">
          <div className="absolute top-20 left-20 h-72 w-72 rounded-full bg-sky-300/40 blur-[120px]" />
        </div>
        <div className="mx-auto max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-sky-300 px-4 py-2 text-xs uppercase tracking-[0.3em] text-sky-600">
            Contact Information
          </div>
          <h1 className="mt-6 text-4xl font-bold leading-tight text-slate-900 lg:text-5xl">
            Connect with DKTE International
          </h1>
          <p className="mt-6 text-lg text-slate-600">
            Admissions, transport, and general enquiries welcomed. Office responds within one working day.
          </p>
        </div>
      </section>

      <section className="border-y border-sky-200">
        <div className="mx-auto max-w-6xl px-6 py-12 lg:py-16">
          <div className="grid gap-10 lg:grid-cols-2">
            <div className="glass-panel space-y-5 rounded-3xl p-6 text-sm text-slate-600">
              <div className="text-xs font-bold uppercase tracking-[0.28em] text-sky-600">Office details</div>
              <div className="space-y-3">
                <div>
                  <p className="text-xs uppercase tracking-[0.25em] text-slate-500">Phone</p>
                  <a className="text-lg font-semibold text-slate-900" href="tel:+918149065016">
                    +91 81490 65016
                  </a>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.25em] text-slate-500">Email</p>
                  <a className="text-sm font-semibold text-slate-900" href="mailto:dkteis@gmail.com">
                    dkteis@gmail.com
                  </a>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.25em] text-slate-500">Campus</p>
                  <p className="text-sm font-semibold text-slate-900">KATP Road, Tardal</p>
                </div>
              </div>
              <p className="text-xs text-slate-500">Office hours: Monday–Saturday, 9.30 a.m. – 4.00 p.m.</p>
            </div>
            <div className="glass-panel rounded-3xl p-6">
              <div className="text-xs font-bold uppercase tracking-[0.28em] text-sky-600">Send an enquiry</div>
              <p className="mt-3 text-sm text-slate-600">We will respond within one working day.</p>
              <div className="mt-6 rounded-2xl border border-sky-200 bg-sky-50/50 p-4">
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-5xl px-6 py-12 text-center text-sm text-slate-600">
          <p className="text-xs font-bold uppercase tracking-[0.28em] text-sky-600">Visit planning</p>
          <p className="mt-3">
            Admission visits include a walkthrough of classrooms, labs, library, and play spaces, followed by a meeting
            with the principal. Please carry a valid photo ID for entry at the gate.
          </p>
        </div>
      </section>
    </div>
  );
}
