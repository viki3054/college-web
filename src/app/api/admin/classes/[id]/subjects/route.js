import { z } from "zod";

import { prisma } from "@/lib/prisma";
import { jsonError, jsonOk } from "@/lib/http";
import { enforceRateLimit, requireAdmin } from "@/lib/apiAuth";

export const runtime = "nodejs";

const schema = z.object({
  subjectId: z.string().min(1),
});

export async function POST(req, { params }) {
  try {
    await requireAdmin();

    const rl = enforceRateLimit(req, { limit: 40, windowMs: 60_000, keyPrefix: "admin-class-subject" });
    if (!rl.ok) return jsonError("Too many requests", 429);

    const { id } = await params;
    const body = await req.json();
    const data = schema.parse(body);

    await prisma.classSubject.create({
      data: {
        classId: id,
        subjectId: data.subjectId,
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

    const rl = enforceRateLimit(req, { limit: 40, windowMs: 60_000, keyPrefix: "admin-class-subject-del" });
    if (!rl.ok) return jsonError("Too many requests", 429);

    const { id } = await params;
    const url = new URL(req.url);
    const subjectId = url.searchParams.get("subjectId");
    if (!subjectId) return jsonError("subjectId required", 400);

    await prisma.classSubject.delete({
      where: { classId_subjectId: { classId: id, subjectId } },
    });

    return jsonOk();
  } catch (e) {
    return jsonError(e, 400);
  }
}
