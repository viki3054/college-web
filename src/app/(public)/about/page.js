export const metadata = { title: "About" };

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <div className="grid gap-8 md:grid-cols-2 md:items-start">
        <div>
          <h1 className="text-3xl font-semibold text-zinc-900">About Our School</h1>
          <p className="mt-4 text-zinc-700 leading-7">
            Smart School is a modern, student-first institution focused on academic excellence,
            character building, and technology-enabled learning.
          </p>
          <div className="mt-6 rounded-2xl border border-zinc-200 bg-zinc-50 p-5 text-sm text-zinc-700">
            This public website is mobile-first and SEO-friendly, and the portal supports role-based dashboards.
          </div>
        </div>

        <div className="grid gap-4">
          <div className="rounded-2xl border border-zinc-200 bg-white p-5">
            <div className="text-sm font-semibold">Mission</div>
            <p className="mt-2 text-sm text-zinc-600 leading-6">
              Provide high-quality education with supportive mentorship and strong parent engagement.
            </p>
          </div>
          <div className="rounded-2xl border border-zinc-200 bg-white p-5">
            <div className="text-sm font-semibold">Vision</div>
            <p className="mt-2 text-sm text-zinc-600 leading-6">
              Build confident learners prepared for future-ready careers and lifelong learning.
            </p>
          </div>
          <div className="rounded-2xl border border-zinc-200 bg-white p-5">
            <div className="text-sm font-semibold">Values</div>
            <p className="mt-2 text-sm text-zinc-600 leading-6">
              Respect, curiosity, discipline, and collaboration—supported by transparent communication.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
