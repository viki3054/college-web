"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";

export default function AdminUsersClient({ initialUsers, classes }) {
  const router = useRouter();

  const [filter, setFilter] = useState("");
  const filtered = useMemo(() => {
    const q = filter.toLowerCase().trim();
    if (!q) return initialUsers;
    return initialUsers.filter(
      (u) =>
        u.email.toLowerCase().includes(q) ||
        (u.name || "").toLowerCase().includes(q) ||
        u.role.toLowerCase().includes(q)
    );
  }, [filter, initialUsers]);

  const [kind, setKind] = useState("STUDENT");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [admissionNo, setAdmissionNo] = useState("");
  const [employeeNo, setEmployeeNo] = useState("");
  const [phone, setPhone] = useState("");
  const [classId, setClassId] = useState("");
  const [childAdmissionNo, setChildAdmissionNo] = useState("");
  const [relation, setRelation] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function handleKindChange(value) {
    setKind(value);
    setAdmissionNo("");
    setEmployeeNo("");
    setPhone("");
    setClassId("");
    setChildAdmissionNo("");
    setRelation("");
  }

  async function createUser(e) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const roleMap = {
      USER: "ADMIN",
      STUDENT: "STUDENT",
      TEACHER: "TEACHER",
      PARENT: "PARENT",
    };

    const payload = {
      kind,
      email,
      name,
      password,
      role: roleMap[kind],
    };

    if (kind === "STUDENT") {
      payload.admissionNo = admissionNo;
      payload.classId = classId;
    }

    if (kind === "TEACHER") {
      payload.employeeNo = employeeNo;
      payload.phone = phone;
    }

    if (kind === "PARENT") {
      payload.phone = phone;
      payload.childAdmissionNo = childAdmissionNo;
      payload.relation = relation;
    }

    const res = await fetch("/api/admin/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    setLoading(false);

    if (!res.ok) {
      const j = await res.json().catch(() => ({}));
      setError(j?.error || "Failed to create user");
      return;
    }

    setEmail("");
    setName("");
    setPassword("");
    setAdmissionNo("");
    setEmployeeNo("");
    setPhone("");
    setClassId("");
    setChildAdmissionNo("");
    setRelation("");

    router.refresh();
  }

  async function toggleActive(u) {
    await fetch(`/api/admin/users/${u.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isActive: !u.isActive }),
    });
    router.refresh();
  }

  async function changeRole(u, role) {
    await fetch(`/api/admin/users/${u.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ role }),
    });
    router.refresh();
  }

  return (
    <div>
      <h1 className="text-xl font-semibold text-zinc-900">User Management</h1>
      <p className="mt-1 text-sm text-zinc-600">
        Create and manage Admin/Teacher/Parent/Student accounts.
      </p>

      <div className="mt-6 rounded-2xl border border-zinc-200 p-4">
        <div className="text-sm font-semibold text-zinc-900">Create Account</div>

        {error ? (
          <div className="mt-3 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
            {error}
          </div>
        ) : null}

        <form className="mt-4 grid gap-3 md:grid-cols-2" onSubmit={createUser}>
          <div>
            <label className="text-xs font-medium text-zinc-700">Kind</label>
            <Select value={kind} onChange={(e) => handleKindChange(e.target.value)}>
              <option value="STUDENT">Student</option>
              <option value="PARENT">Parent</option>
              <option value="TEACHER">Teacher</option>
              <option value="USER">Admin/Staff</option>
            </Select>
          </div>

          <div>
            <label className="text-xs font-medium text-zinc-700">Email</label>
            <Input value={email} onChange={(e) => setEmail(e.target.value)} required type="email" />
          </div>

          <div>
            <label className="text-xs font-medium text-zinc-700">Name</label>
            <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Optional" />
          </div>

          <div>
            <label className="text-xs font-medium text-zinc-700">Password</label>
            <Input value={password} onChange={(e) => setPassword(e.target.value)} required type="password" />
          </div>

          {kind === "STUDENT" ? (
            <>
              <div>
                <label className="text-xs font-medium text-zinc-700">Admission No</label>
                <Input value={admissionNo} onChange={(e) => setAdmissionNo(e.target.value)} required />
              </div>
              <div>
                <label className="text-xs font-medium text-zinc-700">Class</label>
                <Select value={classId} onChange={(e) => setClassId(e.target.value)}>
                  <option value="">(Unassigned)</option>
                  {classes.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.grade} {c.section || ""} {c.academicYear ? `(${c.academicYear})` : ""}
                    </option>
                  ))}
                </Select>
              </div>
            </>
          ) : null}

          {kind === "TEACHER" ? (
            <>
              <div>
                <label className="text-xs font-medium text-zinc-700">Employee No</label>
                <Input value={employeeNo} onChange={(e) => setEmployeeNo(e.target.value)} required />
              </div>
              <div>
                <label className="text-xs font-medium text-zinc-700">Phone</label>
                <Input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Optional" />
              </div>
            </>
          ) : null}

          {kind === "PARENT" ? (
            <>
              <div>
                <label className="text-xs font-medium text-zinc-700">Phone</label>
                <Input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Optional" />
              </div>
              <div>
                <label className="text-xs font-medium text-zinc-700">Link Child (Admission No)</label>
                <Input value={childAdmissionNo} onChange={(e) => setChildAdmissionNo(e.target.value)} placeholder="Optional" />
              </div>
              <div className="md:col-span-2">
                <label className="text-xs font-medium text-zinc-700">Relation</label>
                <Input value={relation} onChange={(e) => setRelation(e.target.value)} placeholder="Optional (e.g., Father/Mother/Guardian)" />
              </div>
            </>
          ) : null}

          <div className="md:col-span-2">
            <Button type="submit" disabled={loading}>
              {loading ? "Creating..." : "Create"}
            </Button>
          </div>
        </form>
      </div>

      <div className="mt-8 rounded-2xl border border-zinc-200 p-4">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="text-sm font-semibold text-zinc-900">All Users</div>
          <div className="w-full md:max-w-xs">
            <Input
              placeholder="Search by email, name, role"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            />
          </div>
        </div>

        <div className="mt-4 overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="text-left text-xs text-zinc-500">
                <th className="py-2">Email</th>
                <th className="py-2">Name</th>
                <th className="py-2">Role</th>
                <th className="py-2">Active</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((u) => (
                <tr key={u.id} className="border-t border-zinc-200">
                  <td className="py-2 pr-4 whitespace-nowrap">{u.email}</td>
                  <td className="py-2 pr-4 whitespace-nowrap">{u.name || "-"}</td>
                  <td className="py-2 pr-4">
                    <Select value={u.role} onChange={(e) => changeRole(u, e.target.value)}>
                      <option value="ADMIN">ADMIN</option>
                      <option value="TEACHER">TEACHER</option>
                      <option value="PARENT">PARENT</option>
                      <option value="STUDENT">STUDENT</option>
                    </Select>
                  </td>
                  <td className="py-2">
                    <Button variant="secondary" onClick={() => toggleActive(u)}>
                      {u.isActive ? "Disable" : "Enable"}
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
