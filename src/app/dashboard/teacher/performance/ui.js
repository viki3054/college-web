"use client";

import { useEffect, useMemo, useState } from "react";
import ClassPicker from "@/components/teacher/ClassPicker";

function pct(present, total) {
  if (!total) return "-";
  return `${Math.round((present / total) * 100)}%`;
}

export default function TeacherPerformanceView() {
  const [classId, setClassId] = useState("");
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  function onClassChange(nextClassId) {
    setClassId(nextClassId);
    setRows([]);
    setMsg("");
  }

  useEffect(() => {
    if (!classId) return;

    let cancelled = false;
    (async () => {
      setLoading(true);
      const res = await fetch(`/api/teacher/performance?classId=${encodeURIComponent(classId)}`);
      const j = await res.json().catch(() => ({}));
      if (!cancelled) {
        setRows(j?.rows || []);
        setMsg(res.ok ? "" : j?.error || "Failed to load.");
        setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [classId]);

  const hasData = useMemo(() => rows.length > 0, [rows]);

  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-3">
        <ClassPicker value={classId} onChange={onClassChange} />
      </div>

      {msg ? (
        <div className="rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm text-zinc-700">
          {msg}
        </div>
      ) : null}

      <div className="overflow-x-auto rounded-2xl border border-zinc-200">
        <table className="w-full min-w-[760px] text-left text-sm">
          <thead className="bg-zinc-50">
            <tr className="text-xs text-zinc-500">
              <th className="p-3">Student</th>
              <th className="p-3">Attendance</th>
              <th className="p-3">Avg Marks</th>
              <th className="p-3">Results Count</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td className="p-3 text-zinc-500" colSpan={4}>
                  Loading...
                </td>
              </tr>
            ) : !hasData ? (
              <tr>
                <td className="p-3 text-zinc-500" colSpan={4}>
                  Select a class to view performance.
                </td>
              </tr>
            ) : (
              rows.map((r) => (
                <tr key={r.studentId} className="border-t border-zinc-200">
                  <td className="p-3">
                    <div className="font-medium text-zinc-900">{r.name}</div>
                    <div className="text-xs text-zinc-500">{r.admissionNo}</div>
                  </td>
                  <td className="p-3 text-zinc-700">{pct(r.presentCount, r.attendanceCount)}</td>
                  <td className="p-3 text-zinc-700">
                    {r.avgPercent === null ? "-" : `${Math.round(r.avgPercent)}%`}
                  </td>
                  <td className="p-3 text-zinc-700">{r.resultsCount}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
