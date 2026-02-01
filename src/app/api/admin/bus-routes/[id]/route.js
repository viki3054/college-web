import { z } from "zod";

import { prisma } from "@/lib/prisma";
import { enforceRateLimit, requireAdmin } from "@/lib/apiAuth";
import { jsonError, jsonOk } from "@/lib/http";

export const runtime = "nodejs";

const patchSchema = z.object({
  name: z.string().min(1).max(120).optional(),
  isActive: z.boolean().optional(),
  stops: z.array(z.string().min(1).max(120)).optional(),
});

export async function PATCH(req, { params }) {
  const rl = enforceRateLimit(req, { keyPrefix: "admin:bus-routes:patch", limit: 80, windowMs: 60_000 });
  if (!rl.ok) return jsonError("RATE_LIMITED", 429);

  try {
    await requireAdmin();
    const id = params?.id;
    if (!id) return jsonError("INVALID_ID", 400);
    const body = patchSchema.parse(await req.json());

    await prisma.busRoute.update({
      where: { id },
      data: {
        name: body.name ? body.name.trim() : undefined,
        isActive: body.isActive,
        stops: body.stops ? body.stops.map((s) => s.trim()).filter(Boolean) : undefined,
      },
    });

    return jsonOk();
  } catch (e) {
    return jsonError(e, 400);
  }
}

export async function DELETE(req, { params }) {
  const rl = enforceRateLimit(req, { keyPrefix: "admin:bus-routes:delete", limit: 30, windowMs: 60_000 });
  if (!rl.ok) return jsonError("RATE_LIMITED", 429);

  try {
    await requireAdmin();
    const id = params?.id;
    if (!id) return jsonError("INVALID_ID", 400);
    await prisma.busRoute.delete({ where: { id } });
    return jsonOk({ deleted: true });
  } catch (e) {
    return jsonError(e, 400);
  }
}
