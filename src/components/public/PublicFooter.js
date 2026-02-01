export default function PublicFooter() {
  return (
    <footer className="border-t border-zinc-200 bg-white">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="grid gap-6 md:grid-cols-3">
          <div>
            <div className="text-sm font-semibold text-zinc-900">Smart School</div>
            <p className="mt-2 text-sm text-zinc-600 leading-6">
              A modern school portal for administrators, teachers, students, and parents.
            </p>
          </div>
          <div>
            <div className="text-sm font-semibold text-zinc-900">Contact</div>
            <div className="mt-2 text-sm text-zinc-600">
              Email enquiries are supported via the Contact page.
            </div>
          </div>
          <div>
            <div className="text-sm font-semibold text-zinc-900">Portal</div>
            <div className="mt-2 text-sm text-zinc-600">
              Secure login with role-based dashboards.
            </div>
          </div>
        </div>
        <div className="mt-8 text-xs text-zinc-500">
          © {new Date().getFullYear()} Smart School. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
