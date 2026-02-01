import { z } from "zod";

import { prisma } from "@/lib/prisma";
import { jsonError, jsonOk } from "@/lib/http";
import { enforceRateLimit, requireAdmin } from "@/lib/apiAuth";

export const runtime = "nodejs";

const createSchema = z.object({
  name: z.string().min(1).max(120),
  code: z.string().min(1).max(30),
});

export async function GET() {
  try {
    await requireAdmin();

    const subjects = await prisma.subject.findMany({
      orderBy: { name: "asc" },
      take: 500,
    });

    return jsonOk({ subjects });
  } catch (e) {
    return jsonError(e, e?.status || 500);
  }
}

export async function POST(req) {
  try {
    await requireAdmin();

    const rl = enforceRateLimit(req, { limit: 30, windowMs: 60_000, keyPrefix: "admin-subjects-write" });
    if (!rl.ok) return jsonError("Too many requests", 429);

    const body = await req.json();
    const data = createSchema.parse(body);

    const created = await prisma.subject.create({
      data: { name: data.name, code: data.code },
      select: { id: true },
    });

    return jsonOk({ id: created.id }, { status: 201 });
  } catch (e) {
    return jsonError(e, 400);
  }
}
