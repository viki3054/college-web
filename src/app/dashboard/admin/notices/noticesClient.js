"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import Textarea from "@/components/ui/Textarea";

export default function AdminNoticesClient({ initialNotices, classes }) {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [classId, setClassId] = useState("");
  const [audienceRole, setAudienceRole] = useState("");
  const [sendEmails, setSendEmails] = useState(true);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function createNotice(e) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const payload = {
      title,
      content,
      classId,
      audienceRole: audienceRole || undefined,
      isPublished: true,
      sendEmails,
    };

    const res = await fetch("/api/admin/notices", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    setLoading(false);

    if (!res.ok) {
      const j = await res.json().catch(() => ({}));
      setError(j?.error || "Failed to create notice");
      return;
    }

    setTitle("");
    setContent("");
    setClassId("");
    setAudienceRole("");
    setSendEmails(true);

    router.refresh();
  }

  return (
    <div>
      <h1 className="text-xl font-semibold text-zinc-900">Notice Management</h1>
      <p className="mt-1 text-sm text-zinc-600">Create and publish school announcements.</p>

      <div className="mt-6 rounded-2xl border border-zinc-200 p-4">
        <div className="text-sm font-semibold text-zinc-900">Create Notice</div>

        {error ? (
          <div className="mt-3 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
            {error}
          </div>
        ) : null}

        <form className="mt-4 grid gap-3" onSubmit={createNotice}>
          <div>
            <label className="text-xs font-medium text-zinc-700">Title</label>
            <Input value={title} onChange={(e) => setTitle(e.target.value)} required />
          </div>
          <div>
            <label className="text-xs font-medium text-zinc-700">Content</label>
            <Textarea value={content} onChange={(e) => setContent(e.target.value)} required rows={5} />
          </div>

          <div className="grid gap-3 md:grid-cols-2">
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
          </div>

          <label className="flex items-center gap-2 text-sm text-zinc-700">
            <input
              type="checkbox"
              checked={sendEmails}
              onChange={(e) => setSendEmails(e.target.checked)}
            />
            Send email notifications
          </label>

          <div>
            <Button type="submit" disabled={loading}>{loading ? "Publishing..." : "Publish"}</Button>
          </div>
        </form>
      </div>

      <div className="mt-8 rounded-2xl border border-zinc-200 p-4">
        <div className="text-sm font-semibold text-zinc-900">Recent Notices</div>
        <div className="mt-4 space-y-3">
          {initialNotices.length === 0 ? (
            <div className="text-sm text-zinc-500">No notices yet.</div>
          ) : (
            initialNotices.map((n) => (
              <div key={n.id} className="rounded-2xl border border-zinc-200 p-4">
                <div className="text-sm font-semibold text-zinc-900">{n.title}</div>
                <div className="mt-1 text-xs text-zinc-500">
                  {new Date(n.publishedAt).toLocaleString()}
                  {n.class ? ` • ${n.class.grade} ${n.class.section || ""}` : ""}
                  {n.audienceRole ? ` • ${n.audienceRole}` : ""}
                </div>
                <div className="mt-2 whitespace-pre-wrap text-sm text-zinc-600">
                  {n.content}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
