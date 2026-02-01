"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

export default function AdminSubjectsClient({ initialSubjects }) {
  const router = useRouter();

  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function createSubject(e) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await fetch("/api/admin/subjects", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, code }),
    });

    setLoading(false);

    if (!res.ok) {
      const j = await res.json().catch(() => ({}));
      setError(j?.error || "Failed to create subject");
      return;
    }

    setName("");
    setCode("");
    router.refresh();
  }

  async function deleteSubject(id) {
    if (!confirm("Delete this subject?")) return;
    await fetch(`/api/admin/subjects/${id}`, { method: "DELETE" });
    router.refresh();
  }

  return (
    <div>
      <h1 className="text-xl font-semibold text-zinc-900">Subject Management</h1>
      <p className="mt-1 text-sm text-zinc-600">Create and manage subjects.</p>

      <div className="mt-6 rounded-2xl border border-zinc-200 p-4">
        <div className="text-sm font-semibold text-zinc-900">Create Subject</div>
        {error ? (
          <div className="mt-3 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
            {error}
          </div>
        ) : null}

        <form className="mt-4 grid gap-3 md:grid-cols-2" onSubmit={createSubject}>
          <div>
            <label className="text-xs font-medium text-zinc-700">Name</label>
            <Input value={name} onChange={(e) => setName(e.target.value)} required />
          </div>
          <div>
            <label className="text-xs font-medium text-zinc-700">Code</label>
            <Input value={code} onChange={(e) => setCode(e.target.value)} required />
          </div>
          <div className="md:col-span-2">
            <Button type="submit" disabled={loading}>{loading ? "Creating..." : "Create"}</Button>
          </div>
        </form>
      </div>

      <div className="mt-8 overflow-x-auto rounded-2xl border border-zinc-200 p-4">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="text-left text-xs text-zinc-500">
              <th className="py-2">Name</th>
              <th className="py-2">Code</th>
              <th className="py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {initialSubjects.map((s) => (
              <tr key={s.id} className="border-t border-zinc-200">
                <td className="py-2 pr-4">{s.name}</td>
                <td className="py-2 pr-4">{s.code}</td>
                <td className="py-2">
                  <Button variant="danger" onClick={() => deleteSubject(s.id)}>Delete</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
