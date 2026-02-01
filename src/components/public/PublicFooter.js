import Link from 'next/link';

export default function PublicFooter() {
  return (
    <footer className="border-t border-sky-200 bg-gradient-to-b from-white to-sky-50">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="grid gap-12 lg:grid-cols-4">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 overflow-hidden rounded-lg bg-gradient-to-br from-sky-400 to-sky-600"></div>
              <span className="text-sm font-bold text-slate-900">DKTE International</span>
            </div>
            <p className="text-sm leading-6 text-slate-600">
              A premium CBSE campus on KATP Road, nurturing future leaders with 40+ years of academic excellence.
            </p>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-sky-600">Contact</h3>
            <div className="space-y-2 text-sm text-slate-600">
              <p>+91 81490 65016</p>
              <p>dkteis@gmail.com</p>
              <p>KATP Road, Tardal<br/>Ichalkaranji, Maharashtra</p>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-sky-600">Explore</h3>
            <div className="flex flex-col gap-2 text-sm text-slate-600">
              <Link href="/admissions" className="hover:text-sky-600 transition-colors">Admissions</Link>
              <Link href="/academic" className="hover:text-sky-600 transition-colors">Academics</Link>
              <Link href="/infrastructure" className="hover:text-sky-600 transition-colors">Campus Life</Link>
              <Link href="/management" className="hover:text-sky-600 transition-colors">Leadership</Link>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-sky-600">Portal</h3>
            <p className="text-sm text-slate-600">
              Secure access for students, parents, and faculty.
            </p>
            <Link 
              href="/login" 
              className="inline-flex items-center rounded-lg bg-gradient-to-r from-sky-500 to-sky-600 px-4 py-2 text-sm font-medium text-white transition-all hover:from-sky-600 hover:to-sky-700"
            >
              Portal Login
            </Link>
          </div>
        </div>
        
        <div className="mt-12 border-t border-sky-200 pt-8 text-center text-xs text-slate-600">
          <p>© {new Date().getFullYear()} DKTE International School. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
