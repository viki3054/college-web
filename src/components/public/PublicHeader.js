"use client";

import Link from "next/link";
import { useState } from "react";

const nav = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/management", label: "Management" },
  { href: "/infrastructure", label: "Infrastructure" },
  { href: "/academic", label: "Academic" },
  { href: "/facilities", label: "Facilities" },
  { href: "/contact", label: "Contact" },
  { href: "/admissions", label: "Admissions" },
  { href: "/chairman", label: "Chairman" },
];

export default function PublicHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-3">
          <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-slate-900 text-sm font-semibold text-white">
            DKTE
          </span>
          <div className="flex flex-col">
            <span className="text-lg font-semibold text-slate-900">DKTE International School</span>
            <span className="text-xs text-slate-500">Excellence in Education</span>
          </div>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {nav.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className="rounded-lg px-3 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100"
            >
              {n.label}
            </Link>
          ))}
          <Link
            href="/login"
            className="ml-2 rounded-lg bg-slate-900 px-4 py-2 text-xs font-semibold text-white hover:bg-slate-800"
          >
            Login
          </Link>
        </nav>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="inline-flex items-center justify-center rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 md:hidden"
          aria-expanded={open}
          aria-label="Toggle navigation"
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {open ? (
        <div className="border-t border-slate-200 bg-white md:hidden">
          <div className="mx-auto max-w-6xl px-6 py-4">
            <div className="grid gap-2">
              {nav.map((n) => (
                <Link
                  key={n.href}
                  href={n.href}
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-slate-900"
                >
                  {n.label}
                </Link>
              ))}
              <Link
                href="/login"
                onClick={() => setOpen(false)}
                className="mt-2 rounded-lg bg-slate-900 px-3 py-2 text-center text-xs font-semibold text-white hover:bg-slate-800"
              >
                Login
              </Link>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}
