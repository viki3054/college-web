"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";

export default function AdminMaterialsClient({ initialMaterials, classes, subjects }) {
  const router = useRouter();

  const [filter, setFilter] = useState("");
  const filtered = useMemo(() => {
    const q = filter.toLowerCase().trim();
    if (!q) return initialMaterials;
    return initialMaterials.filter((m) => {
      const subject = m.subject ? `${m.subject.name} ${m.subject.code}` : "";
      const cls = m.class ? `${m.class.grade} ${m.class.section || ""} ${m.class.academicYear || ""}` : "";
      return (
        (m.title || "").toLowerCase().includes(q) ||
        (m.description || "").toLowerCase().includes(q) ||
        subject.toLowerCase().includes(q) ||
        cls.toLowerCase().includes(q)
      );
    });
  }, [filter, initialMaterials]);

  const [classId, setClassId] = useState("");
  const [subjectId, setSubjectId] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function createMaterial(e) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const form = new FormData();
    form.set("classId", classId);
    if (subjectId) form.set("subjectId", subjectId);
    form.set("title", title);
    if (description) form.set("description", description);
    if (youtubeUrl) form.set("youtubeUrl", youtubeUrl);
    if (file) form.set("file", file);

    const res = await fetch("/api/admin/materials", { method: "POST", body: form });
    setLoading(false);

    if (!res.ok) {
      const j = await res.json().catch(() => ({}));
      setError(j?.error || "Failed to create material");
      return;
    }

    setTitle("");
    setDescription("");
    setYoutubeUrl("");
    setFile(null);
    router.refresh();
  }

  async function deleteMaterial(id) {
    if (!confirm("Delete this material?")) return;
    await fetch(`/api/admin/materials/${id}`, { method: "DELETE" });
    router.refresh();
  }

  return (
    <div>
      <h1 className="text-xl font-semibold text-zinc-900">Study Materials</h1>
      <p className="mt-1 text-sm text-zinc-600">Upload materials and links for classes.</p>

      <div className="mt-6 rounded-2xl border border-zinc-200 p-4">
        <div className="text-sm font-semibold text-zinc-900">Add Material</div>

        {error ? (
          <div className="mt-3 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
            {error}
          </div>
        ) : null}

        <form className="mt-4 grid gap-3 md:grid-cols-2" onSubmit={createMaterial}>
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
            <label className="text-xs font-medium text-zinc-700">Subject (optional)</label>
            <Select value={subjectId} onChange={(e) => setSubjectId(e.target.value)}>
              <option value="">(None)</option>
              {subjects.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name} ({s.code})
                </option>
              ))}
            </Select>
          </div>

          <div className="md:col-span-2">
            <label className="text-xs font-medium text-zinc-700">Title</label>
            <Input value={title} onChange={(e) => setTitle(e.target.value)} required placeholder="e.g., Chapter 3 Notes" />
          </div>

          <div className="md:col-span-2">
            <label className="text-xs font-medium text-zinc-700">Description (optional)</label>
            <Input value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Short description" />
          </div>

          <div className="md:col-span-2">
            <label className="text-xs font-medium text-zinc-700">YouTube URL (optional)</label>
            <Input value={youtubeUrl} onChange={(e) => setYoutubeUrl(e.target.value)} placeholder="https://www.youtube.com/watch?v=..." />
          </div>

          <div className="md:col-span-2">
            <label className="text-xs font-medium text-zinc-700">Attachment (optional, max 4MB)</label>
            <input
              type="file"
              className="mt-1 block w-full rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
            />
          </div>

          <div className="md:col-span-2 flex items-center justify-end gap-2">
            <Button disabled={loading} type="submit">
              {loading ? "Saving..." : "Create"}
            </Button>
          </div>
        </form>
      </div>

      <div className="mt-6 flex items-center justify-between gap-3">
        <div className="text-sm font-semibold text-zinc-900">Recent Materials</div>
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
              <th className="p-3">Subject</th>
              <th className="p-3">Link</th>
              <th className="p-3">Attachment</th>
              <th className="p-3">Created</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td className="p-3 text-zinc-500" colSpan={7}>
                  No materials found.
                </td>
              </tr>
            ) : (
              filtered.map((m) => (
                <tr key={m.id} className="border-t border-zinc-200">
                  <td className="p-3 font-medium text-zinc-900">{m.title}</td>
                  <td className="p-3 text-zinc-700">
                    {m.class ? `${m.class.grade} ${m.class.section || ""}`.trim() : "-"}
                  </td>
                  <td className="p-3 text-zinc-700">
                    {m.subject ? `${m.subject.name} (${m.subject.code})` : "-"}
                  </td>
                  <td className="p-3">
                    {m.youtubeUrl ? (
                      <a className="text-xs font-semibold text-blue-700 hover:underline" href={m.youtubeUrl} target="_blank" rel="noreferrer">
                        Open
                      </a>
                    ) : (
                      <span className="text-xs text-zinc-500">-</span>
                    )}
                  </td>
                  <td className="p-3">
                    {m.attachmentBytes || m.attachmentUrl ? (
                      <Link
                        className="rounded-lg border border-zinc-200 bg-white px-3 py-1.5 text-xs font-semibold text-zinc-800 hover:bg-zinc-50"
                        href={`/api/download/materials/${m.id}`}
                      >
                        Download
                      </Link>
                    ) : (
                      <span className="text-xs text-zinc-500">-</span>
                    )}
                  </td>
                  <td className="p-3 text-zinc-700">{new Date(m.createdAt).toLocaleString()}</td>
                  <td className="p-3">
                    <button
                      className="rounded-lg border border-red-200 bg-white px-3 py-1.5 text-xs font-semibold text-red-700 hover:bg-red-50"
                      onClick={() => deleteMaterial(m.id)}
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
