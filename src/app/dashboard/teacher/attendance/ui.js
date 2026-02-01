"use client";

import { useEffect, useMemo, useState } from "react";
import ClassPicker from "@/components/teacher/ClassPicker";

const statuses = [
  { v: "PRESENT", label: "Present" },
  { v: "ABSENT", label: "Absent" },
  { v: "LATE", label: "Late" },
  { v: "EXCUSED", label: "Excused" },
];

export default function TeacherAttendanceForm() {
  const [classId, setClassId] = useState("");
  const [subjectId, setSubjectId] = useState("");
  const [date, setDate] = useState(() => new Date().toISOString().slice(0, 10));
  const [students, setStudents] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");

  function onClassChange(nextClassId) {
    setClassId(nextClassId);
    setStudents([]);
    setSubjects([]);
    setSubjectId("");
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
        const list = (sJ?.students || []).map((s) => ({
          id: s.id,
          rollNo: s.rollNo,
          admissionNo: s.admissionNo,
          name: s.user?.name || s.user?.email,
          status: "PRESENT",
        }));
        setStudents(list);
        setSubjects(subJ?.subjects || []);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [classId]);

  const canSubmit = useMemo(() => classId && students.length > 0 && date, [classId, students, date]);

  async function submit() {
    setSaving(true);
    setMsg("");

    const payload = {
      classId,
      subjectId: subjectId || null,
      date,
      entries: students.map((s) => ({ studentId: s.id, status: s.status })),
    };

    const res = await fetch("/api/teacher/attendance", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const j = await res.json().catch(() => ({}));

    setSaving(false);
    setMsg(res.ok ? "Attendance saved." : j?.error || "Failed to save.");
  }

  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-3">
        <ClassPicker value={classId} onChange={onClassChange} />

        <div>
          <label className="block text-sm font-medium text-zinc-700">Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="mt-1 w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-zinc-700">Subject (optional)</label>
          <select
            className="mt-1 w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm"
            value={subjectId}
            onChange={(e) => setSubjectId(e.target.value)}
            disabled={!classId}
          >
            <option value="">General</option>
            {subjects.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name} ({s.code})
              </option>
            ))}
          </select>
        </div>
      </div>

      {msg ? (
        <div className="rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm text-zinc-700">
          {msg}
        </div>
      ) : null}

      <div className="overflow-x-auto rounded-2xl border border-zinc-200">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead className="bg-zinc-50">
            <tr className="text-xs text-zinc-500">
              <th className="p-3">Roll</th>
              <th className="p-3">Student</th>
              <th className="p-3">Status</th>
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
                  <td className="p-3">
                    <div className="font-medium text-zinc-900">{s.name}</div>
                    <div className="text-xs text-zinc-500">{s.admissionNo}</div>
                  </td>
                  <td className="p-3">
                    <select
                      className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm"
                      value={s.status}
                      onChange={(e) => {
                        const v = e.target.value;
                        setStudents((prev) => {
                          const next = [...prev];
                          next[idx] = { ...next[idx], status: v };
                          return next;
                        });
                      }}
                    >
                      {statuses.map((st) => (
                        <option key={st.v} value={st.v}>
                          {st.label}
                        </option>
                      ))}
                    </select>
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
        {saving ? "Saving..." : "Save Attendance"}
      </button>
    </div>
  );
}
