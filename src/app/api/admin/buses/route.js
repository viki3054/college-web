import { z } from "zod";

import { prisma } from "@/lib/prisma";
import { enforceRateLimit, requireAdmin } from "@/lib/apiAuth";
import { jsonError, jsonOk } from "@/lib/http";

export const runtime = "nodejs";

const createSchema = z.object({
  name: z.string().min(1).max(120),
  number: z.string().max(50).nullable().optional(),
  plateNo: z.string().max(50).nullable().optional(),
  capacity: z.number().int().min(1).max(200).nullable().optional(),
  isActive: z.boolean().optional(),
});

export async function GET() {
  try {
    await requireAdmin();
    const buses = await prisma.bus.findMany({
      orderBy: [{ isActive: "desc" }, { name: "asc" }],
      take: 500,
    });
    return jsonOk({ buses });
  } catch (e) {
    return jsonError(e, e?.status || 500);
  }
}

export async function POST(req) {
  const rl = enforceRateLimit(req, { keyPrefix: "admin:buses", limit: 30, windowMs: 60_000 });
  if (!rl.ok) return jsonError("RATE_LIMITED", 429);

  try {
    await requireAdmin();
    const body = createSchema.parse(await req.json());

    const created = await prisma.bus.create({
      data: {
        name: body.name.trim(),
        number: body.number ? body.number.trim() : null,
        plateNo: body.plateNo ? body.plateNo.trim() : null,
        capacity: body.capacity ?? null,
        isActive: body.isActive ?? true,
      },
      select: { id: true },
    });

    return jsonOk({ id: created.id }, { status: 201 });
  } catch (e) {
    return jsonError(e, 400);
  }
}
