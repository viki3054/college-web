import { prisma } from "@/lib/prisma";
import { enforceRateLimit, requireAdmin } from "@/lib/apiAuth";
import { jsonError, jsonOk } from "@/lib/http";

export const runtime = "nodejs";

export async function DELETE(req, { params }) {
  const rl = enforceRateLimit(req, { keyPrefix: "admin:materials:delete", limit: 30, windowMs: 60_000 });
  if (!rl.ok) return jsonError("RATE_LIMITED", 429);

  try {
    await requireAdmin();
    const id = params?.id;
    if (!id) return jsonError("INVALID_ID", 400);

    await prisma.studyMaterial.delete({ where: { id } });
    return jsonOk({ deleted: true });
  } catch (e) {
    return jsonError(e, e?.status || 500);
  }
}
