"use client";

import Link from "next/link";
import { signOut } from "next-auth/react";

export default function DashboardHeader({ email, role }) {
  return (
    <header className="border-b border-zinc-200 bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="text-sm font-semibold text-zinc-900">
          Smart School
        </Link>
        <div className="flex items-center gap-3">
          <span className="text-xs text-zinc-600">
            {email} ({role})
          </span>
          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="rounded-lg border border-zinc-200 bg-white px-3 py-1.5 text-xs font-semibold text-zinc-800 hover:bg-zinc-50"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}
