import { z } from "zod";

import { prisma } from "@/lib/prisma";
import { jsonError, jsonOk } from "@/lib/http";
import { enforceRateLimit, requireAdmin } from "@/lib/apiAuth";

export const runtime = "nodejs";

const patchSchema = z.object({
  name: z.string().min(1).max(80).optional(),
  grade: z.string().min(1).max(40).optional(),
  section: z.string().max(20).optional().or(z.literal("")),
  academicYear: z.string().max(20).optional().or(z.literal("")),
});

export async function PATCH(req, { params }) {
  try {
    await requireAdmin();

    const rl = enforceRateLimit(req, { limit: 40, windowMs: 60_000, keyPrefix: "admin-classes-patch" });
    if (!rl.ok) return jsonError("Too many requests", 429);

    const body = await req.json();
    const data = patchSchema.parse(body);

    await prisma.class.update({
      where: { id: params.id },
      data: {
        name: data.name,
        grade: data.grade,
        section: data.section === "" ? null : data.section,
        academicYear: data.academicYear === "" ? null : data.academicYear,
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

    const rl = enforceRateLimit(req, { limit: 10, windowMs: 60_000, keyPrefix: "admin-classes-delete" });
    if (!rl.ok) return jsonError("Too many requests", 429);

    await prisma.class.delete({ where: { id: params.id } });
    return jsonOk();
  } catch (e) {
    return jsonError(e, 400);
  }
}
