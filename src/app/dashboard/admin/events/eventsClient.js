"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import Textarea from "@/components/ui/Textarea";

export default function AdminEventsClient({ initialEvents, classes }) {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [startAt, setStartAt] = useState("");
  const [endAt, setEndAt] = useState("");
  const [classId, setClassId] = useState("");
  const [audienceRole, setAudienceRole] = useState("");
  const [sendEmails, setSendEmails] = useState(true);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function createEvent(e) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const payload = {
      title,
      description,
      location,
      startAt,
      endAt,
      classId,
      audienceRole: audienceRole || undefined,
      isPublished: true,
      sendEmails,
    };

    const res = await fetch("/api/admin/events", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    setLoading(false);

    if (!res.ok) {
      const j = await res.json().catch(() => ({}));
      setError(j?.error || "Failed to create event");
      return;
    }

    setTitle("");
    setDescription("");
    setLocation("");
    setStartAt("");
    setEndAt("");
    setClassId("");
    setAudienceRole("");
    setSendEmails(true);

    router.refresh();
  }

  return (
    <div>
      <h1 className="text-xl font-semibold text-zinc-900">Event Management</h1>
      <p className="mt-1 text-sm text-zinc-600">Create and publish school events.</p>

      <div className="mt-6 rounded-2xl border border-zinc-200 p-4">
        <div className="text-sm font-semibold text-zinc-900">Create Event</div>

        {error ? (
          <div className="mt-3 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
            {error}
          </div>
        ) : null}

        <form className="mt-4 grid gap-3" onSubmit={createEvent}>
          <div>
            <label className="text-xs font-medium text-zinc-700">Title</label>
            <Input value={title} onChange={(e) => setTitle(e.target.value)} required />
          </div>
          <div>
            <label className="text-xs font-medium text-zinc-700">Description</label>
            <Textarea value={description} onChange={(e) => setDescription(e.target.value)} required rows={5} />
          </div>

          <div className="grid gap-3 md:grid-cols-2">
            <div>
              <label className="text-xs font-medium text-zinc-700">Location</label>
              <Input value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Optional" />
            </div>
            <div>
              <label className="text-xs font-medium text-zinc-700">Start</label>
              <Input value={startAt} onChange={(e) => setStartAt(e.target.value)} required type="datetime-local" />
            </div>
            <div>
              <label className="text-xs font-medium text-zinc-700">End</label>
              <Input value={endAt} onChange={(e) => setEndAt(e.target.value)} type="datetime-local" />
            </div>
            <div>
              <label className="text-xs font-medium text-zinc-700">Class (optional)</label>
              <Select value={classId} onChange={(e) => setClassId(e.target.value)}>
                <option value="">All classes</option>
                {classes.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.grade} {c.section || ""} {c.academicYear ? `(${c.academicYear})` : ""}
                  </option>
                ))}
              </Select>
            </div>
          </div>

          <div className="grid gap-3 md:grid-cols-2">
            <div>
              <label className="text-xs font-medium text-zinc-700">Audience Role (optional)</label>
              <Select value={audienceRole} onChange={(e) => setAudienceRole(e.target.value)}>
                <option value="">All roles</option>
                <option value="STUDENT">STUDENT</option>
                <option value="PARENT">PARENT</option>
                <option value="TEACHER">TEACHER</option>
                <option value="ADMIN">ADMIN</option>
              </Select>
            </div>
            <label className="mt-6 flex items-center gap-2 text-sm text-zinc-700">
              <input
                type="checkbox"
                checked={sendEmails}
                onChange={(e) => setSendEmails(e.target.checked)}
              />
              Send email notifications
            </label>
          </div>

          <div>
            <Button type="submit" disabled={loading}>{loading ? "Publishing..." : "Publish"}</Button>
          </div>
        </form>
      </div>

      <div className="mt-8 rounded-2xl border border-zinc-200 p-4">
        <div className="text-sm font-semibold text-zinc-900">Recent Events</div>
        <div className="mt-4 space-y-3">
          {initialEvents.length === 0 ? (
            <div className="text-sm text-zinc-500">No events yet.</div>
          ) : (
            initialEvents.map((ev) => (
              <div key={ev.id} className="rounded-2xl border border-zinc-200 p-4">
                <div className="text-sm font-semibold text-zinc-900">{ev.title}</div>
                <div className="mt-1 text-xs text-zinc-500">
                  {new Date(ev.startAt).toLocaleString()}
                  {ev.location ? ` • ${ev.location}` : ""}
                  {ev.class ? ` • ${ev.class.grade} ${ev.class.section || ""}` : ""}
                  {ev.audienceRole ? ` • ${ev.audienceRole}` : ""}
                </div>
                <div className="mt-2 whitespace-pre-wrap text-sm text-zinc-600">
                  {ev.description}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
