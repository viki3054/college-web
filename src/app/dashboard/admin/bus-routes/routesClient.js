"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";

function parseStops(value) {
  const s = String(value || "")
    .split("\n")
    .map((x) => x.trim())
    .filter(Boolean);
  return Array.from(new Set(s));
}

export default function AdminBusRoutesClient({ initialRoutes, buses }) {
  const router = useRouter();

  const [filter, setFilter] = useState("");
  const filtered = useMemo(() => {
    const q = filter.toLowerCase().trim();
    if (!q) return initialRoutes;
    return initialRoutes.filter((r) => {
      const busLabel = r.bus ? `${r.bus.name} ${r.bus.number || ""} ${r.bus.plateNo || ""}` : "";
      return (r.name || "").toLowerCase().includes(q) || busLabel.toLowerCase().includes(q);
    });
  }, [filter, initialRoutes]);

  const [busId, setBusId] = useState("");
  const [name, setName] = useState("");
  const [stopsText, setStopsText] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function createRoute(e) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const payload = {
      busId,
      name,
      isActive,
      stops: parseStops(stopsText),
    };

    const res = await fetch("/api/admin/bus-routes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    setLoading(false);
    if (!res.ok) {
      const j = await res.json().catch(() => ({}));
      setError(j?.error || "Failed to create route");
      return;
    }

    setBusId("");
    setName("");
    setStopsText("");
    setIsActive(true);
    router.refresh();
  }

  async function toggleActive(route) {
    await fetch(`/api/admin/bus-routes/${route.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isActive: !route.isActive }),
    });
    router.refresh();
  }

  async function updateStops(route) {
    const current = (route.stops || []).join("\n");
    const next = prompt("Edit stops (one per line):", current);
    if (next === null) return;
    await fetch(`/api/admin/bus-routes/${route.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ stops: parseStops(next) }),
    });
    router.refresh();
  }

  async function remove(route) {
    if (!confirm(`Delete route '${route.name}'?`)) return;
    await fetch(`/api/admin/bus-routes/${route.id}`, { method: "DELETE" });
    router.refresh();
  }

  return (
    <div>
      <h1 className="text-xl font-semibold text-zinc-900">Bus Routes</h1>
      <p className="mt-1 text-sm text-zinc-600">Create routes under buses and optionally define stop names.</p>

      <div className="mt-6 rounded-2xl border border-zinc-200 p-4">
        <div className="text-sm font-semibold text-zinc-900">Create Route</div>

        {error ? (
          <div className="mt-3 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
            {error}
          </div>
        ) : null}

        <form className="mt-4 grid gap-3 md:grid-cols-2" onSubmit={createRoute}>
          <div>
            <label className="text-xs font-medium text-zinc-700">Bus</label>
            <Select value={busId} onChange={(e) => setBusId(e.target.value)} required>
              <option value="">Select bus</option>
              {buses.map((b) => (
                <option key={b.id} value={b.id}>
                  {b.name} {b.number ? `(#${b.number})` : ""} {b.plateNo ? `(${b.plateNo})` : ""}
                </option>
              ))}
            </Select>
          </div>
          <div>
            <label className="text-xs font-medium text-zinc-700">Active</label>
            <Select value={isActive ? "true" : "false"} onChange={(e) => setIsActive(e.target.value === "true")}>
              <option value="true">Active</option>
              <option value="false">Inactive</option>
            </Select>
          </div>
          <div className="md:col-span-2">
            <label className="text-xs font-medium text-zinc-700">Route Name</label>
            <Input value={name} onChange={(e) => setName(e.target.value)} required placeholder="e.g., North Route" />
          </div>
          <div className="md:col-span-2">
            <label className="text-xs font-medium text-zinc-700">Stops (optional, one per line)</label>
            <textarea
              className="mt-1 w-full rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm"
              rows={5}
              value={stopsText}
              onChange={(e) => setStopsText(e.target.value)}
              placeholder="Stop 1\nStop 2\nStop 3"
            />
          </div>
          <div className="md:col-span-2 flex justify-end">
            <Button disabled={loading} type="submit">{loading ? "Saving..." : "Create"}</Button>
          </div>
        </form>
      </div>

      <div className="mt-6 flex items-center justify-between gap-3">
        <div className="text-sm font-semibold text-zinc-900">Routes</div>
        <div className="w-full max-w-xs">
          <Input value={filter} onChange={(e) => setFilter(e.target.value)} placeholder="Search..." />
        </div>
      </div>

      <div className="mt-4 overflow-x-auto rounded-2xl border border-zinc-200">
        <table className="w-full min-w-[1100px] text-left text-sm">
          <thead className="bg-zinc-50">
            <tr className="text-xs text-zinc-500">
              <th className="p-3">Route</th>
              <th className="p-3">Bus</th>
              <th className="p-3">Stops</th>
              <th className="p-3">Assigned</th>
              <th className="p-3">Active</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td className="p-3 text-zinc-500" colSpan={6}>
                  No routes.
                </td>
              </tr>
            ) : (
              filtered.map((r) => (
                <tr key={r.id} className="border-t border-zinc-200">
                  <td className="p-3 font-medium text-zinc-900">{r.name}</td>
                  <td className="p-3 text-zinc-700">{r.bus?.name || "-"}</td>
                  <td className="p-3 text-zinc-700">{(r.stops || []).length || 0}</td>
                  <td className="p-3 text-zinc-700">{r._count?.assignments ?? 0}</td>
                  <td className="p-3 text-zinc-700">{r.isActive ? "Yes" : "No"}</td>
                  <td className="p-3 flex gap-2">
                    <button
                      className="rounded-lg border border-zinc-200 bg-white px-3 py-1.5 text-xs font-semibold text-zinc-800 hover:bg-zinc-50"
                      type="button"
                      onClick={() => updateStops(r)}
                    >
                      Edit Stops
                    </button>
                    <button
                      className="rounded-lg border border-zinc-200 bg-white px-3 py-1.5 text-xs font-semibold text-zinc-800 hover:bg-zinc-50"
                      type="button"
                      onClick={() => toggleActive(r)}
                    >
                      {r.isActive ? "Deactivate" : "Activate"}
                    </button>
                    <button
                      className="rounded-lg border border-red-200 bg-white px-3 py-1.5 text-xs font-semibold text-red-700 hover:bg-red-50"
                      type="button"
                      onClick={() => remove(r)}
                    >
                      Delete
                    </button>
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
