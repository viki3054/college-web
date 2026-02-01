"use client";

import { useEffect, useMemo, useState } from "react";

export default function ClassPicker({ value, onChange }) {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      const res = await fetch("/api/teacher/classes");
      const j = await res.json().catch(() => ({}));
      if (!cancelled) {
        setClasses(j?.classes || []);
        setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const label = useMemo(() => {
    const c = classes.find((x) => x.id === value);
    if (!c) return "";
    return `${c.grade}${c.section ? " " + c.section : ""}${c.academicYear ? " • " + c.academicYear : ""}`;
  }, [classes, value]);

  return (
    <div>
      <label className="block text-sm font-medium text-zinc-700">Class</label>
      <select
        className="mt-1 w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={loading}
      >
        <option value="">{loading ? "Loading..." : "Select class"}</option>
        {classes.map((c) => (
          <option key={c.id} value={c.id}>
            {c.grade} {c.section || ""} {c.academicYear ? `(${c.academicYear})` : ""}
          </option>
        ))}
      </select>
      {label ? <div className="mt-1 text-xs text-zinc-500">{label}</div> : null}
    </div>
  );
}
