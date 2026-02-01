import Link from "next/link";

import { prisma } from "@/lib/prisma";

export const metadata = { title: "Admin • Bus Logs" };

export default async function AdminBusLogsPage({ searchParams }) {
  const routeId = searchParams?.routeId || "";
  const type = searchParams?.type || "";

  const [routes, events] = await Promise.all([
    prisma.busRoute.findMany({
      where: { isActive: true },
      orderBy: { name: "asc" },
      select: { id: true, name: true, bus: { select: { name: true } } },
      take: 500,
    }),
    prisma.busEvent.findMany({
      where: {
        ...(routeId ? { routeId } : {}),
        ...(type === "ENTRY" || type === "EXIT" ? { type } : {}),
      },
      orderBy: { occurredAt: "desc" },
      take: 250,
      include: {
        route: { include: { bus: true } },
        student: { include: { user: true, class: true } },
        recordedBy: { select: { email: true, name: true } },
      },
    }),
  ]);

  const qs = new URLSearchParams();
  if (routeId) qs.set("routeId", routeId);
  if (type) qs.set("type", type);

  return (
    <div>
      <h1 className="text-xl font-semibold text-zinc-900">Bus Attendance History</h1>
      <p className="mt-1 text-sm text-zinc-600">Complete bus movement logs (entry/exit).</p>

      <div className="mt-6 flex flex-wrap items-end gap-3 rounded-2xl border border-zinc-200 p-4">
        <div>
          <div className="text-xs font-medium text-zinc-700">Route</div>
          <div className="mt-1 flex flex-wrap gap-2">
            <Link
              className={`rounded-full border px-3 py-1 text-xs ${
                !routeId ? "border-zinc-900 bg-zinc-900 text-white" : "border-zinc-200 bg-white text-zinc-800 hover:bg-zinc-50"
              }`}
              href={`/dashboard/admin/bus-logs?${new URLSearchParams({ ...(type ? { type } : {}) }).toString()}`}
            >
              All
            </Link>
            {routes.slice(0, 10).map((r) => (
              <Link
                key={r.id}
                className={`rounded-full border px-3 py-1 text-xs ${
                  routeId === r.id
                    ? "border-zinc-900 bg-zinc-900 text-white"
                    : "border-zinc-200 bg-white text-zinc-800 hover:bg-zinc-50"
                }`}
                href={`/dashboard/admin/bus-logs?${new URLSearchParams({ routeId: r.id, ...(type ? { type } : {}) }).toString()}`}
              >
                {r.name}
              </Link>
            ))}
          </div>
          <div className="mt-2 text-xs text-zinc-500">Showing first 10 routes as quick filters.</div>
        </div>

        <div>
          <div className="text-xs font-medium text-zinc-700">Type</div>
          <div className="mt-1 flex gap-2">
            {[
              { label: "All", value: "" },
              { label: "Entry", value: "ENTRY" },
              { label: "Exit", value: "EXIT" },
            ].map((t) => (
              <Link
                key={t.value || "all"}
                className={`rounded-full border px-3 py-1 text-xs ${
                  (type || "") === t.value
                    ? "border-zinc-900 bg-zinc-900 text-white"
                    : "border-zinc-200 bg-white text-zinc-800 hover:bg-zinc-50"
                }`}
                href={`/dashboard/admin/bus-logs?${new URLSearchParams({ ...(routeId ? { routeId } : {}), ...(t.value ? { type: t.value } : {}) }).toString()}`}
              >
                {t.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="ml-auto">
          <Link
            className="rounded-lg border border-zinc-200 bg-white px-3 py-2 text-xs font-semibold text-zinc-800 hover:bg-zinc-50"
            href={`/api/admin/bus-reports.csv?${qs.toString()}`}
          >
            Export CSV
          </Link>
        </div>
      </div>

      <div className="mt-6 overflow-x-auto rounded-2xl border border-zinc-200">
        <table className="w-full min-w-[1200px] text-left text-sm">
          <thead className="bg-zinc-50">
            <tr className="text-xs text-zinc-500">
              <th className="p-3">Time</th>
              <th className="p-3">Type</th>
              <th className="p-3">Student</th>
              <th className="p-3">Class</th>
              <th className="p-3">Route</th>
              <th className="p-3">Bus</th>
              <th className="p-3">Recorded By</th>
            </tr>
          </thead>
          <tbody>
            {events.length === 0 ? (
              <tr>
                <td className="p-3 text-zinc-500" colSpan={7}>
                  No events.
                </td>
              </tr>
            ) : (
              events.map((e) => (
                <tr key={e.id} className="border-t border-zinc-200">
                  <td className="p-3 text-zinc-700">{new Date(e.occurredAt).toLocaleString()}</td>
                  <td className="p-3 font-semibold text-zinc-900">{e.type}</td>
                  <td className="p-3 text-zinc-700">
                    <div className="font-medium text-zinc-900">{e.student?.admissionNo}</div>
                    <div className="text-xs text-zinc-500">{e.student?.user?.name || e.student?.user?.email}</div>
                  </td>
                  <td className="p-3 text-zinc-700">
                    {e.student?.class ? `${e.student.class.grade} ${e.student.class.section || ""}`.trim() : "-"}
                  </td>
                  <td className="p-3 text-zinc-700">{e.route?.name || "-"}</td>
                  <td className="p-3 text-zinc-700">{e.route?.bus?.name || "-"}</td>
                  <td className="p-3 text-zinc-700">{e.recordedBy?.name || e.recordedBy?.email || "-"}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
