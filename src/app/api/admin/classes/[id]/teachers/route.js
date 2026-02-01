import { z } from "zod";

import { prisma } from "@/lib/prisma";
import { jsonError, jsonOk } from "@/lib/http";
import { enforceRateLimit, requireAdmin } from "@/lib/apiAuth";

export const runtime = "nodejs";

const schema = z.object({
  teacherId: z.string().min(1),
});

export async function POST(req, { params }) {
  try {
    await requireAdmin();

    const rl = enforceRateLimit(req, { limit: 40, windowMs: 60_000, keyPrefix: "admin-class-teacher" });
    if (!rl.ok) return jsonError("Too many requests", 429);

    const { id } = await params;
    const body = await req.json();
    const data = schema.parse(body);

    await prisma.teacherClass.create({
      data: {
        classId: id,
        teacherId: data.teacherId,
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

    const rl = enforceRateLimit(req, { limit: 40, windowMs: 60_000, keyPrefix: "admin-class-teacher-del" });
    if (!rl.ok) return jsonError("Too many requests", 429);

    const { id } = await params;
    const url = new URL(req.url);
    const teacherId = url.searchParams.get("teacherId");
    if (!teacherId) return jsonError("teacherId required", 400);

    await prisma.teacherClass.delete({
      where: { teacherId_classId: { teacherId, classId: id } },
    });

    return jsonOk();
  } catch (e) {
    return jsonError(e, 400);
  }
}
