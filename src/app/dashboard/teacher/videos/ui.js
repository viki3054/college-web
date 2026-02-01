"use client";

import { useEffect, useState } from "react";
import ClassPicker from "@/components/teacher/ClassPicker";

export default function TeacherVideosForm() {
  const [classId, setClassId] = useState("");
  const [subjects, setSubjects] = useState([]);
  const [subjectId, setSubjectId] = useState("");
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");

  function onClassChange(nextClassId) {
    setClassId(nextClassId);
    setSubjects([]);
    setSubjectId("");
    setMsg("");
  }

  useEffect(() => {
    if (!classId) return;

    let cancelled = false;
    (async () => {
      const res = await fetch(`/api/teacher/classes/${classId}/subjects`);
      const j = await res.json().catch(() => ({}));
      if (!cancelled) setSubjects(j?.subjects || []);
    })();

    return () => {
      cancelled = true;
    };
  }, [classId]);

  async function submit() {
    setSaving(true);
    setMsg("");

    const res = await fetch("/api/teacher/videos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ classId: classId || null, subjectId: subjectId || null, title, url }),
    });
    const j = await res.json().catch(() => ({}));

    setSaving(false);

    if (!res.ok) {
      setMsg(j?.error || "Failed to save.");
      return;
    }

    setTitle("");
    setUrl("");
    setMsg("Video link saved.");
  }

  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-3">
        <ClassPicker value={classId} onChange={onClassChange} />
        <div>
          <label className="block text-sm font-medium text-zinc-700">Subject (optional)</label>
          <select
            className="mt-1 w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm"
            value={subjectId}
            onChange={(e) => setSubjectId(e.target.value)}
            disabled={!classId}
          >
            <option value="">Select subject</option>
            {subjects.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-zinc-700">Title</label>
          <input
            className="mt-1 w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Algebra Basics"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-zinc-700">YouTube URL</label>
        <input
          className="mt-1 w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://www.youtube.com/watch?v=..."
        />
      </div>

      {msg ? (
        <div className="rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm text-zinc-700">
          {msg}
        </div>
      ) : null}

      <button
        disabled={!classId || title.length < 3 || url.length < 10 || saving}
        onClick={submit}
        className="rounded-lg bg-zinc-900 px-5 py-2 text-sm font-semibold text-white hover:bg-zinc-800 disabled:opacity-60"
      >
        {saving ? "Saving..." : "Save Video Link"}
      </button>
    </div>
  );
}
