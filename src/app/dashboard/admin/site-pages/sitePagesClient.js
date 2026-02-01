"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";

function slugify(v) {
  return String(v || "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 200);
}

export default function SitePagesClient({ initialPages }) {
  const router = useRouter();

  const [filter, setFilter] = useState("");
  const pages = useMemo(() => {
    const q = filter.trim().toLowerCase();
    if (!q) return initialPages;
    return initialPages.filter(
      (p) => (p.title || "").toLowerCase().includes(q) || (p.slug || "").toLowerCase().includes(q)
    );
  }, [filter, initialPages]);

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [content, setContent] = useState("");
  const [isPublished, setIsPublished] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function create(e) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await fetch("/api/admin/site-pages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title,
        slug: slug || slugify(title),
        content,
        isPublished,
      }),
    });

    setLoading(false);
    if (!res.ok) {
      const j = await res.json().catch(() => ({}));
      setError(j?.error || "Failed to create page");
      return;
    }

    setTitle("");
    setSlug("");
    setContent("");
    setIsPublished(false);
    router.refresh();
  }

  async function togglePublish(p) {
    await fetch(`/api/admin/site-pages/${p.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isPublished: !p.isPublished }),
    });
    router.refresh();
  }

  async function remove(p) {
    if (!confirm(`Delete '${p.title}'?`)) return;
    await fetch(`/api/admin/site-pages/${p.id}`, { method: "DELETE" });
    router.refresh();
  }

  return (
    <div>
      <h1 className="text-xl font-semibold text-zinc-900">Website Pages</h1>
      <p className="mt-1 text-sm text-zinc-600">
        Add public pages (for example: About, Admissions, Facilities). Content is stored as plain text.
      </p>

      <div className="mt-6 rounded-2xl border border-zinc-200 p-4">
        <div className="text-sm font-semibold text-zinc-900">Create Page</div>

        {error ? (
          <div className="mt-3 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
            {error}
          </div>
        ) : null}

        <form className="mt-4 grid gap-3" onSubmit={create}>
          <div className="grid gap-3 md:grid-cols-2">
            <div>
              <label className="text-xs font-medium text-zinc-700">Title</label>
              <Input value={title} onChange={(e) => {
                const t = e.target.value;
                setTitle(t);
                if (!slug) setSlug(slugify(t));
              }} required />
            </div>
            <div>
              <label className="text-xs font-medium text-zinc-700">Slug</label>
              <Input value={slug} onChange={(e) => setSlug(slugify(e.target.value))} placeholder="about-school" />
              <div className="mt-1 text-xs text-zinc-500">Public URL: /p/{slug || "your-slug"}</div>
            </div>
          </div>

          <div>
            <label className="text-xs font-medium text-zinc-700">Content</label>
            <Textarea rows={10} value={content} onChange={(e) => setContent(e.target.value)} required />
          </div>

          <label className="flex items-center gap-2 text-sm text-zinc-800">
            <input type="checkbox" checked={isPublished} onChange={(e) => setIsPublished(e.target.checked)} />
            Publish now
          </label>

          <div>
            <Button type="submit" disabled={loading}>
              {loading ? "Creating..." : "Create"}
            </Button>
          </div>
        </form>
      </div>

      <div className="mt-8 rounded-2xl border border-zinc-200 p-4">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="text-sm font-semibold text-zinc-900">All Pages</div>
          <div className="w-full md:max-w-xs">
            <Input placeholder="Search by title or slug" value={filter} onChange={(e) => setFilter(e.target.value)} />
          </div>
        </div>

        <div className="mt-4 overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="text-left text-xs text-zinc-500">
                <th className="py-2">Title</th>
                <th className="py-2">Slug</th>
                <th className="py-2">Published</th>
                <th className="py-2">Source</th>
                <th className="py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {pages.length === 0 ? (
                <tr>
                  <td className="py-3 text-zinc-500" colSpan={5}>No pages.</td>
                </tr>
              ) : (
                pages.map((p) => (
                  <tr key={p.id} className="border-t border-zinc-200">
                    <td className="py-2 pr-4 font-medium text-zinc-900">{p.title}</td>
                    <td className="py-2 pr-4 text-zinc-700">{p.slug}</td>
                    <td className="py-2 pr-4 text-zinc-700">{p.isPublished ? "Yes" : "No"}</td>
                    <td className="py-2 pr-4 text-zinc-700">
                      {p.sourceUrl ? (
                        <a className="text-xs underline" href={p.sourceUrl} target="_blank" rel="noreferrer">
                          Original
                        </a>
                      ) : (
                        <span className="text-xs text-zinc-500">-</span>
                      )}
                    </td>
                    <td className="py-2 flex flex-wrap gap-2">
                      <Button variant="secondary" onClick={() => togglePublish(p)}>
                        {p.isPublished ? "Unpublish" : "Publish"}
                      </Button>
                      <a
                        className="inline-flex items-center justify-center rounded-lg border border-zinc-200 bg-white px-4 py-2 text-sm font-semibold text-zinc-900 hover:bg-zinc-50"
                        href={`/p/${p.slug}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        View
                      </a>
                      <Button variant="danger" onClick={() => remove(p)}>Delete</Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
