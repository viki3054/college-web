"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";

export default function AdminTimetablesClient({ initialTimetables, classes }) {
  const router = useRouter();

  const [filter, setFilter] = useState("");
  const filtered = useMemo(() => {
    const q = filter.toLowerCase().trim();
    if (!q) return initialTimetables;
    return initialTimetables.filter((t) => {
      const cls = t.class ? `${t.class.grade} ${t.class.section || ""} ${t.class.academicYear || ""}` : "";
      return (t.title || "").toLowerCase().includes(q) || cls.toLowerCase().includes(q);
    });
  }, [filter, initialTimetables]);

  const [classId, setClassId] = useState("");
  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function uploadTimetable(e) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const form = new FormData();
    form.set("classId", classId);
    form.set("title", title);
    if (file) form.set("file", file);

    const res = await fetch("/api/admin/timetables", { method: "POST", body: form });
    setLoading(false);

    if (!res.ok) {
      const j = await res.json().catch(() => ({}));
      setError(j?.error || "Failed to upload timetable");
      return;
    }

    setTitle("");
    setFile(null);
    router.refresh();
  }

  async function deleteTimetable(id) {
    if (!confirm("Delete this timetable?")) return;
    await fetch(`/api/admin/timetables/${id}`, { method: "DELETE" });
    router.refresh();
  }

  return (
    <div>
      <h1 className="text-xl font-semibold text-zinc-900">Timetables</h1>
      <p className="mt-1 text-sm text-zinc-600">Upload timetable PDFs/images for classes.</p>

      <div className="mt-6 rounded-2xl border border-zinc-200 p-4">
        <div className="text-sm font-semibold text-zinc-900">Upload Timetable</div>

        {error ? (
          <div className="mt-3 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
            {error}
          </div>
        ) : null}

        <form className="mt-4 grid gap-3 md:grid-cols-2" onSubmit={uploadTimetable}>
          <div>
            <label className="text-xs font-medium text-zinc-700">Class</label>
            <Select value={classId} onChange={(e) => setClassId(e.target.value)} required>
              <option value="">Select class</option>
              {classes.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.grade} {c.section || ""} {c.academicYear ? `(${c.academicYear})` : ""}
                </option>
              ))}
            </Select>
          </div>

          <div>
            <label className="text-xs font-medium text-zinc-700">Title</label>
            <Input value={title} onChange={(e) => setTitle(e.target.value)} required placeholder="e.g., Term 1 Timetable" />
          </div>

          <div className="md:col-span-2">
            <label className="text-xs font-medium text-zinc-700">File (max 4MB)</label>
            <input
              type="file"
              className="mt-1 block w-full rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              required
            />
          </div>

          <div className="md:col-span-2 flex items-center justify-end gap-2">
            <Button disabled={loading} type="submit">
              {loading ? "Uploading..." : "Upload"}
            </Button>
          </div>
        </form>
      </div>

      <div className="mt-6 flex items-center justify-between gap-3">
        <div className="text-sm font-semibold text-zinc-900">Recent Timetables</div>
        <div className="w-full max-w-xs">
          <Input value={filter} onChange={(e) => setFilter(e.target.value)} placeholder="Search..." />
        </div>
      </div>

      <div className="mt-4 overflow-x-auto rounded-2xl border border-zinc-200">
        <table className="w-full min-w-[1100px] text-left text-sm">
          <thead className="bg-zinc-50">
            <tr className="text-xs text-zinc-500">
              <th className="p-3">Title</th>
              <th className="p-3">Class</th>
              <th className="p-3">File</th>
              <th className="p-3">Created</th>
              <th className="p-3">Download</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td className="p-3 text-zinc-500" colSpan={6}>
                  No timetables uploaded.
                </td>
              </tr>
            ) : (
              filtered.map((t) => (
                <tr key={t.id} className="border-t border-zinc-200">
                  <td className="p-3 font-medium text-zinc-900">{t.title}</td>
                  <td className="p-3 text-zinc-700">
                    {t.class ? `${t.class.grade} ${t.class.section || ""}`.trim() : "-"}
                  </td>
                  <td className="p-3 text-zinc-700">{t.uploadedFile?.name || "-"}</td>
                  <td className="p-3 text-zinc-700">{new Date(t.createdAt).toLocaleString()}</td>
                  <td className="p-3">
                    {t.uploadedFile?.id ? (
                      <Link
                        className="rounded-lg border border-zinc-200 bg-white px-3 py-1.5 text-xs font-semibold text-zinc-800 hover:bg-zinc-50"
                        href={`/api/download/timetable/${t.uploadedFile.id}`}
                      >
                        Download
                      </Link>
                    ) : (
                      <span className="text-xs text-zinc-500">-</span>
                    )}
                  </td>
                  <td className="p-3">
                    <button
                      className="rounded-lg border border-red-200 bg-white px-3 py-1.5 text-xs font-semibold text-red-700 hover:bg-red-50"
                      onClick={() => deleteTimetable(t.id)}
                      type="button"
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
