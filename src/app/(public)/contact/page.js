import ContactForm from "./ContactForm";

export const metadata = { title: "Contact" };

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <div className="grid gap-8 md:grid-cols-2 md:items-start">
        <div>
          <h1 className="text-3xl font-semibold text-zinc-900">Contact</h1>
          <p className="mt-4 text-zinc-700 leading-7">
            Send us an enquiry and we’ll respond by email.
          </p>

          <div className="mt-6 rounded-2xl border border-zinc-200 bg-zinc-50 p-5">
            <div className="text-sm font-semibold text-zinc-900">Office hours</div>
            <div className="mt-2 text-sm text-zinc-600">Mon–Fri, 9:00 AM – 4:00 PM</div>
            <div className="mt-1 text-sm text-zinc-600">Email-based support via enquiry form</div>
          </div>
        </div>

        <div>
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
