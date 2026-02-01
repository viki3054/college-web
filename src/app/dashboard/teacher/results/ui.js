"use client";

import { useEffect, useMemo, useState } from "react";
import ClassPicker from "@/components/teacher/ClassPicker";

export default function TeacherResultsForm() {
  const [classId, setClassId] = useState("");
  const [subjects, setSubjects] = useState([]);
  const [subjectId, setSubjectId] = useState("");
  const [term, setTerm] = useState("Term 1");
  const [examName, setExamName] = useState("Unit Test");
  const [maxMarks, setMaxMarks] = useState(100);
  const [students, setStudents] = useState([]);
  const [publish, setPublish] = useState(false);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");

  function onClassChange(nextClassId) {
    setClassId(nextClassId);
    setSubjects([]);
    setSubjectId("");
    setStudents([]);
    setMsg("");
  }

  useEffect(() => {
    if (!classId) return;

    let cancelled = false;
    (async () => {
      const [sRes, subRes] = await Promise.all([
        fetch(`/api/teacher/classes/${classId}/students`),
        fetch(`/api/teacher/classes/${classId}/subjects`),
      ]);
      const sJ = await sRes.json().catch(() => ({}));
      const subJ = await subRes.json().catch(() => ({}));
      if (!cancelled) {
        setSubjects(subJ?.subjects || []);
        setStudents(
          (sJ?.students || []).map((s) => ({
            id: s.id,
            name: s.user?.name || s.user?.email,
            rollNo: s.rollNo,
            marks: "",
          }))
        );
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [classId]);

  const canSubmit = useMemo(
    () => classId && subjectId && term.trim() && examName.trim() && students.length > 0,
    [classId, subjectId, term, examName, students]
  );

  async function submit() {
    setSaving(true);
    setMsg("");

    const results = students
      .filter((s) => s.marks !== "")
      .map((s) => ({ studentId: s.id, marks: Number(s.marks), maxMarks: Number(maxMarks) }));

    const res = await fetch("/api/teacher/results", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ classId, subjectId, term, examName, publish, results }),
    });

    const j = await res.json().catch(() => ({}));
    setSaving(false);

    setMsg(res.ok ? (publish ? "Results published." : "Results saved.") : j?.error || "Failed.");
  }

  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-3">
        <ClassPicker value={classId} onChange={onClassChange} />

        <div>
          <label className="block text-sm font-medium text-zinc-700">Subject</label>
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
          <label className="block text-sm font-medium text-zinc-700">Max Marks</label>
          <input
            className="mt-1 w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm"
            type="number"
            value={maxMarks}
            onChange={(e) => setMaxMarks(e.target.value)}
            min={1}
          />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div>
          <label className="block text-sm font-medium text-zinc-700">Term</label>
          <input
            className="mt-1 w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm"
            value={term}
            onChange={(e) => setTerm(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-zinc-700">Exam Name</label>
          <input
            className="mt-1 w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm"
            value={examName}
            onChange={(e) => setExamName(e.target.value)}
          />
        </div>
        <div className="flex items-end">
          <label className="inline-flex items-center gap-2 text-sm text-zinc-700">
            <input type="checkbox" checked={publish} onChange={(e) => setPublish(e.target.checked)} />
            Publish (send emails)
          </label>
        </div>
      </div>

      {msg ? (
        <div className="rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm text-zinc-700">
          {msg}
        </div>
      ) : null}

      <div className="overflow-x-auto rounded-2xl border border-zinc-200">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead className="bg-zinc-50">
            <tr className="text-xs text-zinc-500">
              <th className="p-3">Roll</th>
              <th className="p-3">Student</th>
              <th className="p-3">Marks</th>
            </tr>
          </thead>
          <tbody>
            {students.length === 0 ? (
              <tr>
                <td className="p-3 text-zinc-500" colSpan={3}>
                  Select a class to load students.
                </td>
              </tr>
            ) : (
              students.map((s, idx) => (
                <tr key={s.id} className="border-t border-zinc-200">
                  <td className="p-3 text-zinc-600">{s.rollNo ?? "-"}</td>
                  <td className="p-3 font-medium text-zinc-900">{s.name}</td>
                  <td className="p-3">
                    <input
                      type="number"
                      className="w-40 rounded-lg border border-zinc-300 px-3 py-2 text-sm"
                      value={s.marks}
                      onChange={(e) => {
                        const v = e.target.value;
                        setStudents((prev) => {
                          const next = [...prev];
                          next[idx] = { ...next[idx], marks: v };
                          return next;
                        });
                      }}
                      min={0}
                    />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <button
        disabled={!canSubmit || saving}
        onClick={submit}
        className="rounded-lg bg-zinc-900 px-5 py-2 text-sm font-semibold text-white hover:bg-zinc-800 disabled:opacity-60"
      >
        {saving ? "Saving..." : publish ? "Publish Results" : "Save Results"}
      </button>
    </div>
  );
}
