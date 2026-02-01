"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";

export default function AdminBusAssignmentsClient({ routes, students, initialAssignments }) {
  const router = useRouter();

  const [routeId, setRouteId] = useState("");
  const [studentId, setStudentId] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [filter, setFilter] = useState("");
  const filtered = useMemo(() => {
    const q = filter.toLowerCase().trim();
    if (!q) return initialAssignments;
    return initialAssignments.filter((a) => {
      const studentLabel = `${a.student?.admissionNo || ""} ${a.student?.user?.name || ""} ${a.student?.user?.email || ""}`;
      const routeLabel = `${a.route?.name || ""} ${a.route?.bus?.name || ""}`;
      return studentLabel.toLowerCase().includes(q) || routeLabel.toLowerCase().includes(q);
    });
  }, [filter, initialAssignments]);

  async function assign(e) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await fetch("/api/admin/bus-assignments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ routeId, studentId }),
    });
    setLoading(false);

    if (!res.ok) {
      const j = await res.json().catch(() => ({}));
      setError(j?.error || "Failed to assign");
      return;
    }

    setRouteId("");
    setStudentId("");
    router.refresh();
  }

  async function unassign(a) {
    if (!confirm("Unassign this student from the route?")) return;
    await fetch(`/api/admin/bus-assignments/${a.id}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ isActive: false }) });
    router.refresh();
  }

  return (
    <div>
      <h1 className="text-xl font-semibold text-zinc-900">Bus Assignments</h1>
      <p className="mt-1 text-sm text-zinc-600">Assign students to bus routes (required for entry/exit tracking).</p>

      <div className="mt-6 rounded-2xl border border-zinc-200 p-4">
        <div className="text-sm font-semibold text-zinc-900">Assign Student</div>

        {error ? (
          <div className="mt-3 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">{error}</div>
        ) : null}

        <form className="mt-4 grid gap-3 md:grid-cols-2" onSubmit={assign}>
          <div>
            <label className="text-xs font-medium text-zinc-700">Route</label>
            <Select value={routeId} onChange={(e) => setRouteId(e.target.value)} required>
              <option value="">Select route</option>
              {routes.map((r) => (
                <option key={r.id} value={r.id}>
                  {r.name} — {r.bus?.name || "Bus"}
                </option>
              ))}
            </Select>
          </div>

          <div>
            <label className="text-xs font-medium text-zinc-700">Student</label>
            <Select value={studentId} onChange={(e) => setStudentId(e.target.value)} required>
              <option value="">Select student</option>
              {students.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.admissionNo} — {s.user?.name || s.user?.email}
                  {s.class ? ` (${s.class.grade}${s.class.section ? s.class.section : ""})` : ""}
                </option>
              ))}
            </Select>
          </div>

          <div className="md:col-span-2 flex justify-end">
            <Button disabled={loading} type="submit">{loading ? "Saving..." : "Assign"}</Button>
          </div>
        </form>
      </div>

      <div className="mt-6 flex items-center justify-between gap-3">
        <div className="text-sm font-semibold text-zinc-900">Assignments</div>
        <div className="w-full max-w-xs">
          <Input value={filter} onChange={(e) => setFilter(e.target.value)} placeholder="Search..." />
        </div>
      </div>

      <div className="mt-4 overflow-x-auto rounded-2xl border border-zinc-200">
        <table className="w-full min-w-[1200px] text-left text-sm">
          <thead className="bg-zinc-50">
            <tr className="text-xs text-zinc-500">
              <th className="p-3">Student</th>
              <th className="p-3">Route</th>
              <th className="p-3">Bus</th>
              <th className="p-3">Active</th>
              <th className="p-3">Assigned</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td className="p-3 text-zinc-500" colSpan={6}>
                  No assignments.
                </td>
              </tr>
            ) : (
              filtered.map((a) => (
                <tr key={a.id} className="border-t border-zinc-200">
                  <td className="p-3">
                    <div className="font-medium text-zinc-900">{a.student?.admissionNo}</div>
                    <div className="text-xs text-zinc-500">{a.student?.user?.name || a.student?.user?.email}</div>
                  </td>
                  <td className="p-3 text-zinc-700">{a.route?.name || "-"}</td>
                  <td className="p-3 text-zinc-700">{a.route?.bus?.name || "-"}</td>
                  <td className="p-3 text-zinc-700">{a.isActive ? "Yes" : "No"}</td>
                  <td className="p-3 text-zinc-700">{new Date(a.assignedAt).toLocaleString()}</td>
                  <td className="p-3">
                    {a.isActive ? (
                      <button
                        className="rounded-lg border border-zinc-200 bg-white px-3 py-1.5 text-xs font-semibold text-zinc-800 hover:bg-zinc-50"
                        type="button"
                        onClick={() => unassign(a)}
                      >
                        Unassign
                      </button>
                    ) : (
                      <span className="text-xs text-zinc-500">-</span>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
