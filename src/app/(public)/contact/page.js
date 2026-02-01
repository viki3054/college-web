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
          <div className="inline-flex items-center gap-2 rounded-full border-2 border-sky-300 px-5 py-2 text-xs uppercase tracking-wider text-sky-600 font-semibold">
            Contact Us
          </div>
          <h1 className="mt-6 text-4xl font-bold leading-tight text-slate-900 lg:text-5xl">
            Get In Touch
          </h1>
          <p className="mt-6 text-lg text-slate-600">
            We respond within one working day
          </p>
        </div>
      </section>

      <section className="border-y border-sky-200">
        <div className="mx-auto max-w-6xl px-6 py-12">
          <div className="grid gap-8 lg:grid-cols-2">
            <div className="card-box rounded-3xl p-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Contact Information</h2>
              <div className="space-y-6">
                <div>
                  <p className="text-xs uppercase tracking-wider text-slate-500 mb-2">Phone</p>
                  <a className="text-xl font-bold text-sky-600 hover:text-sky-700" href="tel:+918149065016">
                    +91 81490 65016
                  </a>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wider text-slate-500 mb-2">Email</p>
                  <a className="text-lg font-semibold text-sky-600 hover:text-sky-700" href="mailto:dkteis@gmail.com">
                    dkteis@gmail.com
                  </a>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wider text-slate-500 mb-2">Address</p>
                  <p className="text-base font-medium text-slate-900">KATP Road, Tardal</p>
                  <p className="text-sm text-slate-600 mt-1">Ichalkaranji, Maharashtra</p>
                </div>
                <div className="pt-4 border-t border-sky-100">
                  <p className="text-sm text-slate-600">Office: Monday–Saturday</p>
                  <p className="text-sm text-slate-600">9:30 AM – 4:00 PM</p>
                </div>
              </div>
            </div>

            <div className="card-box rounded-3xl p-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Send Message</h2>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-b from-sky-50/50 to-white">
        <div className="mx-auto max-w-4xl px-6 py-12 text-center">
          <div className="card-box rounded-3xl p-8">
            <h3 className="text-lg font-bold text-slate-900 mb-3">Campus Visits</h3>
            <p className="text-slate-600">
              Schedule a tour to explore our classrooms, labs, library, and facilities. 
              Please bring a valid photo ID for campus entry.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
