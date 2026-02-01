import ContactForm from "./ContactForm";

export const metadata = { title: "Contact - DKTE International School" };

export default function ContactPage() {
  return (
    <div className="bg-slate-50">
      <section className="border-b border-slate-200 bg-gradient-to-b from-white to-slate-50">
        <div className="mx-auto max-w-6xl px-6 py-12">
          <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">Contact</p>
            <h1 className="mt-3 text-3xl font-semibold text-slate-900">DKTE International School</h1>
            <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600">
              Reach us for admissions, queries, and general information. Our office team will be glad to assist you.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-12">
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
            <div className="h-1 w-10 rounded-full bg-slate-900" />
            <h2 className="mt-4 text-lg font-semibold text-slate-900">Contact Information</h2>
            <div className="mt-6 space-y-4 text-sm text-slate-600">
              <div className="flex items-center justify-between rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 shadow-sm">
                <span>Phone</span>
                <a className="font-semibold text-slate-900" href="tel:+918149065016">
                  +91 8149065016
                </a>
              </div>
              <div className="flex items-center justify-between rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 shadow-sm">
                <span>Email</span>
                <a className="font-semibold text-slate-900" href="mailto:dkteis@gmail.com">
                  dkteis@gmail.com
                </a>
              </div>
              <div className="flex items-center justify-between rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 shadow-sm">
                <span>Address</span>
                <span className="font-semibold text-slate-900">KATP Road, Tardal</span>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
            <div className="h-1 w-10 rounded-full bg-slate-900" />
            <h2 className="mt-4 text-lg font-semibold text-slate-900">Send an Enquiry</h2>
            <p className="mt-2 text-sm text-slate-600">We will respond to your message at the earliest.</p>
            <div className="mt-6 rounded-xl border border-slate-200 bg-slate-50 p-4">
              <ContactForm />
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
