import { z } from "zod";

import { prisma } from "@/lib/prisma";
import { enforceRateLimit, requireAdmin } from "@/lib/apiAuth";
import { jsonError, jsonOk } from "@/lib/http";

export const runtime = "nodejs";

const createSchema = z.object({
  routeId: z.string().min(1),
  studentId: z.string().min(1),
});

export async function GET() {
  try {
    await requireAdmin();
    const assignments = await prisma.busAssignment.findMany({
      orderBy: [{ isActive: "desc" }, { assignedAt: "desc" }],
      take: 500,
      include: { route: { include: { bus: true } }, student: { include: { user: true, class: true } } },
    });
    return jsonOk({ assignments });
  } catch (e) {
    return jsonError(e, e?.status || 500);
  }
}

export async function POST(req) {
  const rl = enforceRateLimit(req, { keyPrefix: "admin:bus-assign", limit: 60, windowMs: 60_000 });
  if (!rl.ok) return jsonError("RATE_LIMITED", 429);

  try {
    await requireAdmin();
    const body = createSchema.parse(await req.json());

    const existing = await prisma.busAssignment.findUnique({
      where: { routeId_studentId: { routeId: body.routeId, studentId: body.studentId } },
      select: { id: true, isActive: true },
    });

    if (existing) {
      await prisma.busAssignment.update({
        where: { id: existing.id },
        data: { isActive: true, unassignedAt: null },
      });
      return jsonOk({ id: existing.id, reactivated: true });
    }

    const created = await prisma.busAssignment.create({
      data: {
        routeId: body.routeId,
        studentId: body.studentId,
        isActive: true,
      },
      select: { id: true },
    });

    return jsonOk({ id: created.id }, { status: 201 });
  } catch (e) {
    return jsonError(e, 400);
  }
}
