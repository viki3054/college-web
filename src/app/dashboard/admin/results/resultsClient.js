"use client";

import { useMemo, useState } from "react";

import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";

export default function AdminResultsClient({ classes, subjects }) {
  const [classId, setClassId] = useState("");
  const [subjectId, setSubjectId] = useState("");
  const [term, setTerm] = useState("");
  const [examName, setExamName] = useState("");
  const [publish, setPublish] = useState(true);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [summary, setSummary] = useState(null);

  const canSubmit = useMemo(() => {
    return Boolean(classId && term.trim().length > 0 && examName.trim().length > 0);
  }, [classId, term, examName]);

  async function preview() {
    setLoading(true);
    setError("");
    setSummary(null);

    const qs = new URLSearchParams();
    qs.set("classId", classId);
    if (subjectId) qs.set("subjectId", subjectId);
    qs.set("term", term);
    qs.set("examName", examName);

    const res = await fetch(`/api/admin/results/publish?${qs.toString()}`);
    setLoading(false);

    if (!res.ok) {
      const j = await res.json().catch(() => ({}));
      setError(j?.error || "Failed to preview");
      return;
    }
    const j = await res.json();
    setSummary(j);
  }

  async function apply() {
    if (!canSubmit) return;
    setLoading(true);
    setError("");

    const payload = {
      classId,
      subjectId: subjectId || null,
      term,
      examName,
      publish,
    };

    const res = await fetch("/api/admin/results/publish", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    setLoading(false);

    if (!res.ok) {
      const j = await res.json().catch(() => ({}));
      setError(j?.error || "Failed to apply");
      return;
    }

    await preview();
  }

  return (
    <div>
      <h1 className="text-xl font-semibold text-zinc-900">Results Publishing</h1>
      <p className="mt-1 text-sm text-zinc-600">
        Publish/unpublish results for a class and exam. Publishing triggers email notifications (if enabled).
      </p>

      <div className="mt-6 rounded-2xl border border-zinc-200 p-4">
        <div className="text-sm font-semibold text-zinc-900">Select Target</div>

        {error ? (
          <div className="mt-3 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
            {error}
          </div>
        ) : null}

        <div className="mt-4 grid gap-3 md:grid-cols-2">
          <div>
            <label className="text-xs font-medium text-zinc-700">Class</label>
            <Select value={classId} onChange={(e) => setClassId(e.target.value)}>
              <option value="">Select class</option>
              {classes.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.grade} {c.section || ""} {c.academicYear ? `(${c.academicYear})` : ""}
                </option>
              ))}
            </Select>
          </div>
          <div>
            <label className="text-xs font-medium text-zinc-700">Subject (optional)</label>
            <Select value={subjectId} onChange={(e) => setSubjectId(e.target.value)}>
              <option value="">(All subjects)</option>
              {subjects.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name} ({s.code})
                </option>
              ))}
            </Select>
          </div>
          <div>
            <label className="text-xs font-medium text-zinc-700">Term</label>
            <Input value={term} onChange={(e) => setTerm(e.target.value)} placeholder="e.g., Term 1" />
          </div>
          <div>
            <label className="text-xs font-medium text-zinc-700">Exam Name</label>
            <Input value={examName} onChange={(e) => setExamName(e.target.value)} placeholder="e.g., Midterm" />
          </div>
          <div>
            <label className="text-xs font-medium text-zinc-700">Action</label>
            <Select value={publish ? "publish" : "unpublish"} onChange={(e) => setPublish(e.target.value === "publish")}>
              <option value="publish">Publish</option>
              <option value="unpublish">Unpublish</option>
            </Select>
          </div>
          <div className="flex items-end justify-end gap-2">
            <Button disabled={loading || !canSubmit} onClick={preview} type="button">
              {loading ? "Loading..." : "Preview"}
            </Button>
            <Button disabled={loading || !canSubmit} onClick={apply} type="button">
              {publish ? "Apply Publish" : "Apply Unpublish"}
            </Button>
          </div>
        </div>
      </div>

      <div className="mt-6 rounded-2xl border border-zinc-200 bg-white p-4">
        <div className="text-sm font-semibold text-zinc-900">Preview</div>
        {!summary ? (
          <div className="mt-2 text-sm text-zinc-600">Choose filters and click Preview.</div>
        ) : (
          <div className="mt-3 grid gap-3 md:grid-cols-3">
            <div className="rounded-xl border border-zinc-200 p-3">
              <div className="text-xs font-semibold text-zinc-500">Matching Results</div>
              <div className="mt-1 text-xl font-semibold text-zinc-900">{summary.total || 0}</div>
            </div>
            <div className="rounded-xl border border-zinc-200 p-3">
              <div className="text-xs font-semibold text-zinc-500">Published</div>
              <div className="mt-1 text-xl font-semibold text-zinc-900">{summary.published || 0}</div>
            </div>
            <div className="rounded-xl border border-zinc-200 p-3">
              <div className="text-xs font-semibold text-zinc-500">Unpublished</div>
              <div className="mt-1 text-xl font-semibold text-zinc-900">{summary.unpublished || 0}</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
