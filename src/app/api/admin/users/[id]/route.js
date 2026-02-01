import { z } from "zod";

import { prisma } from "@/lib/prisma";
import { jsonError, jsonOk } from "@/lib/http";
import { enforceRateLimit, requireAdmin } from "@/lib/apiAuth";

export const runtime = "nodejs";

const patchSchema = z.object({
  name: z.string().min(1).max(120).optional().or(z.literal("")),
  role: z.enum(["ADMIN", "TEACHER", "PARENT", "STUDENT"]).optional(),
  isActive: z.boolean().optional(),
});

export async function PATCH(req, { params }) {
  try {
    await requireAdmin();

    const rl = enforceRateLimit(req, { limit: 30, windowMs: 60_000, keyPrefix: "admin-users-patch" });
    if (!rl.ok) return jsonError("Too many requests", 429);

    const { id } = await params;
    const body = await req.json();
    const data = patchSchema.parse(body);

    await prisma.user.update({
      where: { id },
      data: {
        name: data.name === "" ? null : data.name,
        role: data.role,
        isActive: data.isActive,
      },
    });

    return jsonOk();
  } catch (e) {
    return jsonError(e, 400);
  }
}

export async function DELETE(req, { params }) {
  try {
    await requireAdmin();

    const rl = enforceRateLimit(req, { limit: 10, windowMs: 60_000, keyPrefix: "admin-users-delete" });
    if (!rl.ok) return jsonError("Too many requests", 429);

    const { id } = await params;
    await prisma.user.delete({ where: { id } });

    return jsonOk();
  } catch (e) {
    return jsonError(e, 400);
  }
}
