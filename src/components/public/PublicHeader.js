"use client";

import Link from "next/link";
import { useState } from "react";

const nav = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/academic", label: "Academics" },
  { href: "/infrastructure", label: "Campus" },
  { href: "/facilities", label: "Facilities" },
  { href: "/management", label: "Leadership" },
  { href: "/admissions", label: "Admissions" },
  { href: "/contact", label: "Contact" },
];

export default function PublicHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 glass-panel border-b border-sky-200">
      <div className="mx-auto max-w-6xl px-6 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="relative h-12 w-12 overflow-hidden rounded-xl bg-gradient-to-br from-sky-400 via-sky-500 to-sky-600 shadow-lg shadow-sky-500/30">
              <span className="flex h-full items-center justify-center text-base font-bold text-white">
                DI
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold text-slate-900">DKTE</span>
              <span className="text-xs font-medium text-sky-600">International School</span>
            </div>
          </Link>
          <div className="flex items-center gap-4">
            <nav className="hidden items-center gap-1 text-sm font-medium text-slate-700 lg:flex">
              {nav.map((n) => (
                <Link
                  key={n.href}
                  href={n.href}
                  className="rounded-xl px-3 py-2 transition hover:bg-sky-50 hover:text-sky-600"
                >
                  {n.label}
                </Link>
              ))}
            </nav>
            <div className="hidden items-center gap-3 lg:flex">
              <Link
                href="/admissions"
                className="rounded-full border border-sky-300 px-4 py-2 text-xs font-semibold text-sky-600 transition hover:border-sky-400 hover:bg-sky-50"
              >
                Admissions
              </Link>
              <Link
                href="/login"
                className="rounded-full bg-gradient-to-r from-sky-500 to-sky-600 px-4 py-2 text-xs font-semibold text-white transition hover:from-sky-600 hover:to-sky-700"
              >
                Portal
              </Link>
            </div>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              className="glass-panel rounded-xl p-2 text-sm font-semibold text-slate-700 lg:hidden"
            >
              Menu
            </button>
          </div>
        </div>
      </div>

      {open ? (
        <div className="glass-panel border-t border-sky-200 lg:hidden">
          <div className="mx-auto max-w-6xl px-6 py-4">
            <div className="space-y-2">
              {nav.map((n) => (
                <Link
                  key={n.href}
                  href={n.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-xl px-4 py-3 text-sm font-medium text-slate-700 hover:bg-sky-50 hover:text-sky-600"
                >
                  {n.label}
                </Link>
              ))}
              <div className="space-y-2 pt-4 border-t border-sky-200">
                <Link
                  href="/admissions"
                  onClick={() => setOpen(false)}
                  className="block rounded-full border border-sky-300 px-4 py-3 text-center text-sm font-semibold text-sky-600 hover:bg-sky-50"
                >
                  Admissions
                </Link>
                <Link
                  href="/login"
                  onClick={() => setOpen(false)}
                  className="block rounded-full bg-gradient-to-r from-sky-500 to-sky-600 px-4 py-3 text-center text-sm font-semibold text-white hover:from-sky-600 hover:to-sky-700"
                >
                  Portal Login
                </Link>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}
