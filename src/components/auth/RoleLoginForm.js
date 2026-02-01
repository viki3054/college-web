"use client";

import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";

export default function RoleLoginForm({
  title,
  subtitle,
  roleLabel,
  defaultCallbackUrl = "/dashboard",
  helperText,
  showRoleLinks = false,
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = useMemo(
    () => searchParams.get("callbackUrl") || defaultCallbackUrl,
    [searchParams, defaultCallbackUrl]
  );

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function onSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
      callbackUrl,
    });

    setLoading(false);

    if (!res?.ok) {
      setError("Invalid email or password.");
      return;
    }

    router.push(res.url || callbackUrl);
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto flex min-h-screen w-full max-w-md flex-col justify-center px-6">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-semibold text-slate-900">{title}</h1>
            {roleLabel ? (
              <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-600">
                {roleLabel}
              </span>
            ) : null}
          </div>
          <p className="mt-1 text-sm text-slate-600">{subtitle}</p>

          {error ? (
            <div className="mt-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
              {error}
            </div>
          ) : null}

          <form onSubmit={onSubmit} className="mt-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700">Email</label>
              <input
                className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 outline-none placeholder:text-slate-500 focus:border-slate-900"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700">Password</label>
              <input
                className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 outline-none placeholder:text-slate-500 focus:border-slate-900"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="inline-flex w-full items-center justify-center rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800 disabled:opacity-60"
            >
              {loading ? "Signing in..." : "Sign in"}
            </button>
          </form>

          {helperText ? (
            <p className="mt-4 text-xs text-slate-500">{helperText}</p>
          ) : null}

          {showRoleLinks ? (
            <div className="mt-6 grid gap-2 text-xs">
              <a className="rounded-lg border border-slate-200 px-3 py-2 text-center text-slate-600 hover:bg-slate-50" href="/login/student">
                Student Login
              </a>
              <a className="rounded-lg border border-slate-200 px-3 py-2 text-center text-slate-600 hover:bg-slate-50" href="/login/teacher">
                Teacher Login
              </a>
              <a className="rounded-lg border border-slate-200 px-3 py-2 text-center text-slate-600 hover:bg-slate-50" href="/login/admin">
                Admin Login
              </a>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
