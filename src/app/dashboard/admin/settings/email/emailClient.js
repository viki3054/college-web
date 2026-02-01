"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

export default function AdminEmailSettingsClient({ initialSettings, templates }) {
  const router = useRouter();

  const [noticesEnabled, setNoticesEnabled] = useState(Boolean(initialSettings.noticesEnabled));
  const [eventsEnabled, setEventsEnabled] = useState(Boolean(initialSettings.eventsEnabled));
  const [attendanceEnabled, setAttendanceEnabled] = useState(Boolean(initialSettings.attendanceEnabled));
  const [resultsEnabled, setResultsEnabled] = useState(Boolean(initialSettings.resultsEnabled));
  const [fromName, setFromName] = useState(initialSettings.fromName || "");
  const [replyTo, setReplyTo] = useState(initialSettings.replyTo || "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function save() {
    setLoading(true);
    setError("");

    const res = await fetch("/api/admin/settings/email", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        noticesEnabled,
        eventsEnabled,
        attendanceEnabled,
        resultsEnabled,
        fromName: fromName || null,
        replyTo: replyTo || null,
      }),
    });

    setLoading(false);

    if (!res.ok) {
      const j = await res.json().catch(() => ({}));
      setError(j?.error || "Failed to save settings");
      return;
    }
    router.refresh();
  }

  return (
    <div>
      <h1 className="text-xl font-semibold text-zinc-900">Email & Notification Settings</h1>
      <p className="mt-1 text-sm text-zinc-600">Control which events send emails and tweak sender metadata.</p>

      <div className="mt-6 rounded-2xl border border-zinc-200 p-4">
        <div className="text-sm font-semibold text-zinc-900">Notification Toggles</div>

        {error ? (
          <div className="mt-3 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
            {error}
          </div>
        ) : null}

        <div className="mt-4 grid gap-3 md:grid-cols-2">
          <label className="flex items-center gap-2 text-sm text-zinc-800">
            <input type="checkbox" checked={noticesEnabled} onChange={(e) => setNoticesEnabled(e.target.checked)} />
            Notices emails
          </label>
          <label className="flex items-center gap-2 text-sm text-zinc-800">
            <input type="checkbox" checked={eventsEnabled} onChange={(e) => setEventsEnabled(e.target.checked)} />
            Events emails
          </label>
          <label className="flex items-center gap-2 text-sm text-zinc-800">
            <input
              type="checkbox"
              checked={attendanceEnabled}
              onChange={(e) => setAttendanceEnabled(e.target.checked)}
            />
            Attendance emails
          </label>
          <label className="flex items-center gap-2 text-sm text-zinc-800">
            <input type="checkbox" checked={resultsEnabled} onChange={(e) => setResultsEnabled(e.target.checked)} />
            Results emails
          </label>
        </div>

        <div className="mt-6 grid gap-3 md:grid-cols-2">
          <div>
            <label className="text-xs font-medium text-zinc-700">From Name (optional)</label>
            <Input value={fromName} onChange={(e) => setFromName(e.target.value)} placeholder="Smart School" />
          </div>
          <div>
            <label className="text-xs font-medium text-zinc-700">Reply-To (optional)</label>
            <Input value={replyTo} onChange={(e) => setReplyTo(e.target.value)} placeholder="support@school.example" />
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <Button disabled={loading} onClick={save}>
            {loading ? "Saving..." : "Save"}
          </Button>
        </div>
      </div>

      <div className="mt-6 overflow-x-auto rounded-2xl border border-zinc-200">
        <table className="w-full min-w-[900px] text-left text-sm">
          <thead className="bg-zinc-50">
            <tr className="text-xs text-zinc-500">
              <th className="p-3">Template Key</th>
              <th className="p-3">Subject</th>
              <th className="p-3">Active</th>
              <th className="p-3">Updated</th>
            </tr>
          </thead>
          <tbody>
            {templates.length === 0 ? (
              <tr>
                <td className="p-3 text-zinc-500" colSpan={4}>
                  No templates.
                </td>
              </tr>
            ) : (
              templates.map((t) => (
                <tr key={t.id} className="border-t border-zinc-200">
                  <td className="p-3 font-medium text-zinc-900">{t.key}</td>
                  <td className="p-3 text-zinc-700">{t.subject}</td>
                  <td className="p-3 text-zinc-700">{t.isActive ? "Yes" : "No"}</td>
                  <td className="p-3 text-zinc-700">{new Date(t.updatedAt).toLocaleString()}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
