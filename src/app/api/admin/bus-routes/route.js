import { z } from "zod";

import { prisma } from "@/lib/prisma";
import { enforceRateLimit, requireAdmin } from "@/lib/apiAuth";
import { jsonError, jsonOk } from "@/lib/http";

export const runtime = "nodejs";

const createSchema = z.object({
  busId: z.string().min(1),
  name: z.string().min(1).max(120),
  isActive: z.boolean().optional(),
  stops: z.array(z.string().min(1).max(120)).optional(),
});

export async function GET() {
  try {
    await requireAdmin();
    const routes = await prisma.busRoute.findMany({
      orderBy: [{ isActive: "desc" }, { name: "asc" }],
      take: 500,
      include: { bus: true, _count: { select: { assignments: true } } },
    });
    return jsonOk({ routes });
  } catch (e) {
    return jsonError(e, e?.status || 500);
  }
}

export async function POST(req) {
  const rl = enforceRateLimit(req, { keyPrefix: "admin:bus-routes", limit: 40, windowMs: 60_000 });
  if (!rl.ok) return jsonError("RATE_LIMITED", 429);

  try {
    await requireAdmin();
    const body = createSchema.parse(await req.json());

    const created = await prisma.busRoute.create({
      data: {
        busId: body.busId,
        name: body.name.trim(),
        isActive: body.isActive ?? true,
        stops: (body.stops || []).map((s) => s.trim()).filter(Boolean),
      },
      select: { id: true },
    });

    return jsonOk({ id: created.id }, { status: 201 });
  } catch (e) {
    return jsonError(e, 400);
  }
}
