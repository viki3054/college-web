export default function Home() {
  return (
    <div>
      <section className="mx-auto max-w-6xl px-4 py-14">
        <div className="grid gap-10 md:grid-cols-2 md:items-center">
          <div>
            <div className="inline-flex items-center rounded-full border border-zinc-200 bg-white px-3 py-1 text-xs text-zinc-600">
              School portal • Attendance • Results • Notices
            </div>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight text-zinc-900 md:text-5xl">
              Smart School Management
            </h1>
            <p className="mt-4 text-lg leading-8 text-zinc-600">
              One portal for administrators, teachers, students, and parents—attendance,
              results, notices, events, timetables, and learning content.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                className="rounded-lg bg-zinc-900 px-5 py-2 text-sm font-semibold text-white hover:bg-zinc-800"
                href="/login"
              >
                Open Portal
              </a>
              <a
                className="rounded-lg border border-zinc-200 px-5 py-2 text-sm font-semibold text-zinc-900 hover:bg-zinc-50"
                href="/admissions"
              >
                Admissions
              </a>
            </div>
          </div>

          <div className="rounded-3xl border border-zinc-200 bg-zinc-50 p-6">
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="rounded-2xl bg-white p-4">
                <div className="font-semibold">Attendance</div>
                <div className="mt-1 text-zinc-600">Daily + subject-wise</div>
              </div>
              <div className="rounded-2xl bg-white p-4">
                <div className="font-semibold">Results</div>
                <div className="mt-1 text-zinc-600">Term & exam reports</div>
              </div>
              <div className="rounded-2xl bg-white p-4">
                <div className="font-semibold">Notices</div>
                <div className="mt-1 text-zinc-600">Role/class targeting</div>
              </div>
              <div className="rounded-2xl bg-white p-4">
                <div className="font-semibold">Email Alerts</div>
                <div className="mt-1 text-zinc-600">SMTP notifications</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-zinc-50">
        <div className="mx-auto max-w-6xl px-4 py-12">
          <h2 className="text-xl font-semibold text-zinc-900">Why Smart School?</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl border border-zinc-200 bg-white p-5">
              <div className="text-sm font-semibold">Role-based portals</div>
              <p className="mt-2 text-sm text-zinc-600 leading-6">
                Separate dashboards for Admin, Teacher, Parent, and Student.
              </p>
            </div>
            <div className="rounded-2xl border border-zinc-200 bg-white p-5">
              <div className="text-sm font-semibold">Centralized content</div>
              <p className="mt-2 text-sm text-zinc-600 leading-6">
                Upload homework/study materials and share YouTube links.
              </p>
            </div>
            <div className="rounded-2xl border border-zinc-200 bg-white p-5">
              <div className="text-sm font-semibold">Email notifications</div>
              <p className="mt-2 text-sm text-zinc-600 leading-6">
                Notices, events, attendance alerts, and results—delivered by email.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
