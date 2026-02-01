export const metadata = { title: "Admissions" };

export default function AdmissionsPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="text-3xl font-semibold text-zinc-900">Admissions</h1>
      <p className="mt-4 max-w-3xl text-zinc-700 leading-7">
        Admissions are open for the current academic year. Submit an enquiry via the Contact page and our
        office will respond by email.
      </p>

      <div className="mt-8 grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-zinc-200 bg-white p-5">
          <div className="text-sm font-semibold">Step 1</div>
          <p className="mt-2 text-sm text-zinc-600 leading-6">
            Send an enquiry with student details and preferred grade.
          </p>
        </div>
        <div className="rounded-2xl border border-zinc-200 bg-white p-5">
          <div className="text-sm font-semibold">Step 2</div>
          <p className="mt-2 text-sm text-zinc-600 leading-6">
            Our office confirms seat availability and required documents.
          </p>
        </div>
        <div className="rounded-2xl border border-zinc-200 bg-white p-5">
          <div className="text-sm font-semibold">Step 3</div>
          <p className="mt-2 text-sm text-zinc-600 leading-6">
            Complete verification and admission registration.
          </p>
        </div>
      </div>

      <div className="mt-8 rounded-2xl border border-zinc-200 bg-white p-5">
        <h2 className="text-sm font-semibold text-zinc-900">Common Requirements</h2>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-zinc-600">
          <li>Previous school records (if applicable)</li>
          <li>Birth certificate / proof of age</li>
          <li>Parent/guardian ID proof</li>
          <li>Passport-size photographs</li>
        </ul>
      </div>
    </div>
  );
}
