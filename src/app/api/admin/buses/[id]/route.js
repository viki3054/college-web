import { z } from "zod";

import { prisma } from "@/lib/prisma";
import { enforceRateLimit, requireAdmin } from "@/lib/apiAuth";
import { jsonError, jsonOk } from "@/lib/http";

export const runtime = "nodejs";

const patchSchema = z.object({
  name: z.string().min(1).max(120).optional(),
  number: z.string().max(50).nullable().optional(),
  plateNo: z.string().max(50).nullable().optional(),
  capacity: z.number().int().min(1).max(200).nullable().optional(),
  isActive: z.boolean().optional(),
});

export async function PATCH(req, { params }) {
  const rl = enforceRateLimit(req, { keyPrefix: "admin:buses:patch", limit: 60, windowMs: 60_000 });
  if (!rl.ok) return jsonError("RATE_LIMITED", 429);

  try {
    await requireAdmin();
    const id = params?.id;
    if (!id) return jsonError("INVALID_ID", 400);
    const body = patchSchema.parse(await req.json());

    await prisma.bus.update({
      where: { id },
      data: {
        name: body.name ? body.name.trim() : undefined,
        number: body.number === undefined ? undefined : body.number ? body.number.trim() : null,
        plateNo: body.plateNo === undefined ? undefined : body.plateNo ? body.plateNo.trim() : null,
        capacity: body.capacity === undefined ? undefined : body.capacity,
        isActive: body.isActive,
      },
    });

    return jsonOk();
  } catch (e) {
    return jsonError(e, 400);
  }
}

export async function DELETE(req, { params }) {
  const rl = enforceRateLimit(req, { keyPrefix: "admin:buses:delete", limit: 20, windowMs: 60_000 });
  if (!rl.ok) return jsonError("RATE_LIMITED", 429);

  try {
    await requireAdmin();
    const id = params?.id;
    if (!id) return jsonError("INVALID_ID", 400);

    await prisma.bus.delete({ where: { id } });
    return jsonOk({ deleted: true });
  } catch (e) {
    return jsonError(e, 400);
  }
}
