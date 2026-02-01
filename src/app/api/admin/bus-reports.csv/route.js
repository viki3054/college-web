import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/apiAuth";
import { jsonError } from "@/lib/http";

export const runtime = "nodejs";

function csvEscape(v) {
  const s = v === null || v === undefined ? "" : String(v);
  if (/[",\n\r]/.test(s)) return `"${s.replace(/"/g, '""')}"`;
  return s;
}

export async function GET(req) {
  try {
    await requireAdmin();

    const url = new URL(req.url);
    const routeId = url.searchParams.get("routeId") || "";
    const type = url.searchParams.get("type") || "";
    const from = url.searchParams.get("from") || "";
    const to = url.searchParams.get("to") || "";

    const where = {
      ...(routeId ? { routeId } : {}),
      ...(type === "ENTRY" || type === "EXIT" ? { type } : {}),
      ...(from || to
        ? {
            occurredAt: {
              ...(from ? { gte: new Date(from) } : {}),
              ...(to ? { lte: new Date(to) } : {}),
            },
          }
        : {}),
    };

    const events = await prisma.busEvent.findMany({
      where,
      orderBy: { occurredAt: "desc" },
      take: 5000,
      include: {
        route: { include: { bus: true } },
        student: { include: { user: true, class: true } },
        recordedBy: { select: { email: true, name: true } },
      },
    });

    const header = [
      "occurredAt",
      "type",
      "studentAdmissionNo",
      "studentName",
      "studentEmail",
      "class",
      "route",
      "bus",
      "recordedBy",
      "note",
    ].join(",");

    const rows = events.map((e) => {
      const classLabel = e.student?.class ? `${e.student.class.grade} ${e.student.class.section || ""}`.trim() : "";
      const recordedBy = e.recordedBy?.name || e.recordedBy?.email || "";
      return [
        csvEscape(new Date(e.occurredAt).toISOString()),
        csvEscape(e.type),
        csvEscape(e.student?.admissionNo || ""),
        csvEscape(e.student?.user?.name || ""),
        csvEscape(e.student?.user?.email || ""),
        csvEscape(classLabel),
        csvEscape(e.route?.name || ""),
        csvEscape(e.route?.bus?.name || ""),
        csvEscape(recordedBy),
        csvEscape(e.note || ""),
      ].join(",");
    });

    const csv = [header, ...rows].join("\n");

    return new Response(csv, {
      status: 200,
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": `attachment; filename="bus-report.csv"`,
      },
    });
  } catch (e) {
    return jsonError(e, e?.status || 500);
  }
}
