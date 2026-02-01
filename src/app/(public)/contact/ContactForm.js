"use client";

import { useState } from "react";

export default function ContactForm() {
  const [loading, setLoading] = useState(false);
  const [ok, setOk] = useState(false);
  const [error, setError] = useState("");

  async function onSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setOk(false);
    setError("");

    const form = new FormData(e.currentTarget);
    const payload = Object.fromEntries(form.entries());

    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    setLoading(false);

    if (!res.ok) {
      const j = await res.json().catch(() => ({}));
      setError(j?.error || "Failed to submit enquiry.");
      return;
    }

    e.currentTarget.reset();
    setOk(true);
  }

  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-6">
      {ok ? (
        <div className="mb-4 rounded-lg border border-green-200 bg-green-50 px-3 py-2 text-sm text-green-800">
          Thanks! Your message has been sent.
        </div>
      ) : null}
      {error ? (
        <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
          {error}
        </div>
      ) : null}

      <form className="space-y-4" onSubmit={onSubmit}>
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-zinc-700">Name</label>
            <input
              name="name"
              required
              className="mt-1 w-full rounded-lg border border-zinc-300 px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-700">Email</label>
            <input
              name="email"
              type="email"
              required
              className="mt-1 w-full rounded-lg border border-zinc-300 px-3 py-2"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-zinc-700">
            Phone (optional)
          </label>
          <input
            name="phone"
            className="mt-1 w-full rounded-lg border border-zinc-300 px-3 py-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-zinc-700">Message</label>
          <textarea
            name="message"
            required
            rows={5}
            className="mt-1 w-full rounded-lg border border-zinc-300 px-3 py-2"
          />
        </div>

        <button
          disabled={loading}
          className="rounded-lg bg-zinc-900 px-5 py-2 text-sm font-semibold text-white hover:bg-zinc-800 disabled:opacity-60"
          type="submit"
        >
          {loading ? "Sending..." : "Send"}
        </button>
      </form>
    </div>
  );
}
