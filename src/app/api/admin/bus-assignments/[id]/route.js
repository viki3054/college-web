import { z } from "zod";

import { prisma } from "@/lib/prisma";
import { enforceRateLimit, requireAdmin } from "@/lib/apiAuth";
import { jsonError, jsonOk } from "@/lib/http";

export const runtime = "nodejs";

const patchSchema = z.object({
  isActive: z.boolean().optional(),
});

export async function PATCH(req, { params }) {
  const rl = enforceRateLimit(req, { keyPrefix: "admin:bus-assignments:patch", limit: 80, windowMs: 60_000 });
  if (!rl.ok) return jsonError("RATE_LIMITED", 429);

  try {
    await requireAdmin();
    const id = params?.id;
    if (!id) return jsonError("INVALID_ID", 400);

    const body = patchSchema.parse(await req.json());
    const nextActive = body.isActive;

    await prisma.busAssignment.update({
      where: { id },
      data: {
        isActive: nextActive,
        unassignedAt: nextActive === false ? new Date() : null,
      },
    });

    return jsonOk();
  } catch (e) {
    return jsonError(e, 400);
  }
}
