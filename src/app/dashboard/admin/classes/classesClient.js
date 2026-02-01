"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";

export default function AdminClassesClient({ initialClasses, subjects, teachers }) {
  const router = useRouter();

  const [name, setName] = useState("");
  const [grade, setGrade] = useState("");
  const [section, setSection] = useState("");
  const [academicYear, setAcademicYear] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function createClass(e) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await fetch("/api/admin/classes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, grade, section, academicYear }),
    });

    setLoading(false);

    if (!res.ok) {
      const j = await res.json().catch(() => ({}));
      setError(j?.error || "Failed to create class");
      return;
    }

    setName("");
    setGrade("");
    setSection("");
    setAcademicYear("");
    router.refresh();
  }

  async function deleteClass(id) {
    if (!confirm("Delete this class?")) return;
    await fetch(`/api/admin/classes/${id}`, { method: "DELETE" });
    router.refresh();
  }

  async function addSubject(classId, subjectId) {
    await fetch(`/api/admin/classes/${classId}/subjects`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ subjectId }),
    });
    router.refresh();
  }

  async function removeSubject(classId, subjectId) {
    await fetch(`/api/admin/classes/${classId}/subjects?subjectId=${encodeURIComponent(subjectId)}`,
      { method: "DELETE" }
    );
    router.refresh();
  }

  async function addTeacher(classId, teacherId) {
    await fetch(`/api/admin/classes/${classId}/teachers`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ teacherId }),
    });
    router.refresh();
  }

  async function removeTeacher(classId, teacherId) {
    await fetch(`/api/admin/classes/${classId}/teachers?teacherId=${encodeURIComponent(teacherId)}`,
      { method: "DELETE" }
    );
    router.refresh();
  }

  return (
    <div>
      <h1 className="text-xl font-semibold text-zinc-900">Class Management</h1>
      <p className="mt-1 text-sm text-zinc-600">
        Create classes and assign subjects and teachers.
      </p>

      <div className="mt-6 rounded-2xl border border-zinc-200 p-4">
        <div className="text-sm font-semibold text-zinc-900">Create Class</div>

        {error ? (
          <div className="mt-3 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
            {error}
          </div>
        ) : null}

        <form className="mt-4 grid gap-3 md:grid-cols-2" onSubmit={createClass}>
          <div>
            <label className="text-xs font-medium text-zinc-700">Name</label>
            <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g., Grade 10" required />
          </div>
          <div>
            <label className="text-xs font-medium text-zinc-700">Grade</label>
            <Input value={grade} onChange={(e) => setGrade(e.target.value)} placeholder="e.g., 10" required />
          </div>
          <div>
            <label className="text-xs font-medium text-zinc-700">Section</label>
            <Input value={section} onChange={(e) => setSection(e.target.value)} placeholder="Optional" />
          </div>
          <div>
            <label className="text-xs font-medium text-zinc-700">Academic Year</label>
            <Input value={academicYear} onChange={(e) => setAcademicYear(e.target.value)} placeholder="Optional (e.g., 2025-26)" />
          </div>
          <div className="md:col-span-2">
            <Button type="submit" disabled={loading}>{loading ? "Creating..." : "Create"}</Button>
          </div>
        </form>
      </div>

      <div className="mt-8 space-y-4">
        {initialClasses.map((c) => (
          <div key={c.id} className="rounded-2xl border border-zinc-200 p-4">
            <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
              <div>
                <div className="text-sm font-semibold text-zinc-900">
                  {c.grade} {c.section || ""} {c.academicYear ? `(${c.academicYear})` : ""}
                </div>
                <div className="text-xs text-zinc-500">{c.name}</div>
              </div>
              <Button variant="danger" onClick={() => deleteClass(c.id)}>Delete</Button>
            </div>

            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <div className="rounded-xl border border-zinc-200 p-3">
                <div className="text-xs font-semibold text-zinc-900">Subjects</div>
                <div className="mt-2 flex flex-wrap gap-2">
                  {c.subjects.map((s) => (
                    <button
                      key={s.subjectId}
                      onClick={() => removeSubject(c.id, s.subjectId)}
                      className="rounded-full border border-zinc-200 bg-white px-3 py-1 text-xs hover:bg-zinc-50"
                      type="button"
                      title="Remove"
                    >
                      {s.subject.name}
                    </button>
                  ))}
                  {c.subjects.length === 0 ? (
                    <span className="text-xs text-zinc-500">No subjects assigned</span>
                  ) : null}
                </div>
                <div className="mt-3 flex gap-2">
                  <Select onChange={(e) => e.target.value && addSubject(c.id, e.target.value)} defaultValue="">
                    <option value="">Add subject...</option>
                    {subjects.map((s) => (
                      <option key={s.id} value={s.id}>{s.name}</option>
                    ))}
                  </Select>
                </div>
              </div>

              <div className="rounded-xl border border-zinc-200 p-3">
                <div className="text-xs font-semibold text-zinc-900">Teachers</div>
                <div className="mt-2 flex flex-wrap gap-2">
                  {c.teacherAssignments.map((t) => (
                    <button
                      key={t.teacherId}
                      onClick={() => removeTeacher(c.id, t.teacherId)}
                      className="rounded-full border border-zinc-200 bg-white px-3 py-1 text-xs hover:bg-zinc-50"
                      type="button"
                      title="Remove"
                    >
                      {t.teacher.user?.name || t.teacher.user?.email || t.teacher.employeeNo}
                    </button>
                  ))}
                  {c.teacherAssignments.length === 0 ? (
                    <span className="text-xs text-zinc-500">No teachers assigned</span>
                  ) : null}
                </div>
                <div className="mt-3">
                  <Select onChange={(e) => e.target.value && addTeacher(c.id, e.target.value)} defaultValue="">
                    <option value="">Assign teacher...</option>
                    {teachers.map((t) => (
                      <option key={t.id} value={t.id}>
                        {t.user?.name || t.user?.email || t.employeeNo}
                      </option>
                    ))}
                  </Select>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
