"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";

export default function AdminBusesClient({ initialBuses }) {
  const router = useRouter();

  const [filter, setFilter] = useState("");
  const filtered = useMemo(() => {
    const q = filter.toLowerCase().trim();
    if (!q) return initialBuses;
    return initialBuses.filter((b) => {
      return (
        (b.name || "").toLowerCase().includes(q) ||
        (b.number || "").toLowerCase().includes(q) ||
        (b.plateNo || "").toLowerCase().includes(q)
      );
    });
  }, [filter, initialBuses]);

  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [plateNo, setPlateNo] = useState("");
  const [capacity, setCapacity] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function createBus(e) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const payload = {
      name,
      number: number || null,
      plateNo: plateNo || null,
      capacity: capacity ? Number(capacity) : null,
      isActive,
    };

    const res = await fetch("/api/admin/buses", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    setLoading(false);
    if (!res.ok) {
      const j = await res.json().catch(() => ({}));
      setError(j?.error || "Failed to create bus");
      return;
    }

    setName("");
    setNumber("");
    setPlateNo("");
    setCapacity("");
    setIsActive(true);
    router.refresh();
  }

  async function toggleActive(bus) {
    await fetch(`/api/admin/buses/${bus.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isActive: !bus.isActive }),
    });
    router.refresh();
  }

  async function remove(bus) {
    if (!confirm(`Delete bus '${bus.name}'?`)) return;
    await fetch(`/api/admin/buses/${bus.id}`, { method: "DELETE" });
    router.refresh();
  }

  return (
    <div>
      <h1 className="text-xl font-semibold text-zinc-900">Bus Management</h1>
      <p className="mt-1 text-sm text-zinc-600">Create buses and manage active status.</p>

      <div className="mt-6 rounded-2xl border border-zinc-200 p-4">
        <div className="text-sm font-semibold text-zinc-900">Create Bus</div>

        {error ? (
          <div className="mt-3 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
            {error}
          </div>
        ) : null}

        <form className="mt-4 grid gap-3 md:grid-cols-2" onSubmit={createBus}>
          <div className="md:col-span-2">
            <label className="text-xs font-medium text-zinc-700">Name</label>
            <Input value={name} onChange={(e) => setName(e.target.value)} required placeholder="e.g., Bus A" />
          </div>
          <div>
            <label className="text-xs font-medium text-zinc-700">Bus Number (optional)</label>
            <Input value={number} onChange={(e) => setNumber(e.target.value)} placeholder="e.g., 12" />
          </div>
          <div>
            <label className="text-xs font-medium text-zinc-700">Plate No (optional)</label>
            <Input value={plateNo} onChange={(e) => setPlateNo(e.target.value)} placeholder="e.g., AB-1234" />
          </div>
          <div>
            <label className="text-xs font-medium text-zinc-700">Capacity (optional)</label>
            <Input value={capacity} onChange={(e) => setCapacity(e.target.value)} inputMode="numeric" placeholder="e.g., 45" />
          </div>
          <div>
            <label className="text-xs font-medium text-zinc-700">Active</label>
            <Select value={isActive ? "true" : "false"} onChange={(e) => setIsActive(e.target.value === "true")}
            >
              <option value="true">Active</option>
              <option value="false">Inactive</option>
            </Select>
          </div>
          <div className="md:col-span-2 flex justify-end">
            <Button disabled={loading} type="submit">{loading ? "Saving..." : "Create"}</Button>
          </div>
        </form>
      </div>

      <div className="mt-6 flex items-center justify-between gap-3">
        <div className="text-sm font-semibold text-zinc-900">Buses</div>
        <div className="w-full max-w-xs">
          <Input value={filter} onChange={(e) => setFilter(e.target.value)} placeholder="Search..." />
        </div>
      </div>

      <div className="mt-4 overflow-x-auto rounded-2xl border border-zinc-200">
        <table className="w-full min-w-[920px] text-left text-sm">
          <thead className="bg-zinc-50">
            <tr className="text-xs text-zinc-500">
              <th className="p-3">Name</th>
              <th className="p-3">Number</th>
              <th className="p-3">Plate</th>
              <th className="p-3">Capacity</th>
              <th className="p-3">Active</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td className="p-3 text-zinc-500" colSpan={6}>
                  No buses.
                </td>
              </tr>
            ) : (
              filtered.map((b) => (
                <tr key={b.id} className="border-t border-zinc-200">
                  <td className="p-3 font-medium text-zinc-900">{b.name}</td>
                  <td className="p-3 text-zinc-700">{b.number || "-"}</td>
                  <td className="p-3 text-zinc-700">{b.plateNo || "-"}</td>
                  <td className="p-3 text-zinc-700">{b.capacity ?? "-"}</td>
                  <td className="p-3 text-zinc-700">{b.isActive ? "Yes" : "No"}</td>
                  <td className="p-3 flex gap-2">
                    <button
                      className="rounded-lg border border-zinc-200 bg-white px-3 py-1.5 text-xs font-semibold text-zinc-800 hover:bg-zinc-50"
                      type="button"
                      onClick={() => toggleActive(b)}
                    >
                      {b.isActive ? "Deactivate" : "Activate"}
                    </button>
                    <button
                      className="rounded-lg border border-red-200 bg-white px-3 py-1.5 text-xs font-semibold text-red-700 hover:bg-red-50"
                      type="button"
                      onClick={() => remove(b)}
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
