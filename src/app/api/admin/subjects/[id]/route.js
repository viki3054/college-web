import { prisma } from "@/lib/prisma";
import { jsonError, jsonOk } from "@/lib/http";
import { enforceRateLimit, requireAdmin } from "@/lib/apiAuth";

export const runtime = "nodejs";

export async function DELETE(req, { params }) {
  try {
    await requireAdmin();

    const rl = enforceRateLimit(req, { limit: 10, windowMs: 60_000, keyPrefix: "admin-subjects-delete" });
    if (!rl.ok) return jsonError("Too many requests", 429);

    await prisma.subject.delete({ where: { id: params.id } });
    return jsonOk();
  } catch (e) {
    return jsonError(e, 400);
  }
}
