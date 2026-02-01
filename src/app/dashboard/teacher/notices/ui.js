"use client";

import { useState } from "react";
import ClassPicker from "@/components/teacher/ClassPicker";

export default function TeacherNoticeForm() {
  const [classId, setClassId] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");

  async function submit() {
    setSaving(true);
    setMsg("");

    const res = await fetch("/api/teacher/notices", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ classId, title, content, isPublished: true }),
    });
    const j = await res.json().catch(() => ({}));

    setSaving(false);

    if (!res.ok) {
      setMsg(j?.error || "Failed to publish notice.");
      return;
    }

    setTitle("");
    setContent("");
    setMsg("Notice published.");
  }

  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2">
        <ClassPicker value={classId} onChange={setClassId} />
        <div>
          <label className="block text-sm font-medium text-zinc-700">Title</label>
          <input
            className="mt-1 w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Homework submission reminder"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-zinc-700">Content</label>
        <textarea
          className="mt-1 w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm"
          rows={6}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write the notice..."
        />
      </div>

      {msg ? (
        <div className="rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm text-zinc-700">
          {msg}
        </div>
      ) : null}

      <button
        disabled={!classId || title.length < 3 || content.length < 5 || saving}
        onClick={submit}
        className="rounded-lg bg-zinc-900 px-5 py-2 text-sm font-semibold text-white hover:bg-zinc-800 disabled:opacity-60"
      >
        {saving ? "Publishing..." : "Publish Notice"}
      </button>
    </div>
  );
}
