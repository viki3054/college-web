import { z } from "zod";

import { prisma } from "@/lib/prisma";
import { enforceRateLimit, requireAdmin } from "@/lib/apiAuth";
import { jsonError, jsonOk } from "@/lib/http";

export const runtime = "nodejs";

const patchSchema = z.object({
  noticesEnabled: z.boolean().optional(),
  eventsEnabled: z.boolean().optional(),
  attendanceEnabled: z.boolean().optional(),
  resultsEnabled: z.boolean().optional(),
  fromName: z.string().max(120).nullable().optional(),
  replyTo: z.string().max(200).nullable().optional(),
});

export async function GET() {
  try {
    await requireAdmin();

    const settings =
      (await prisma.notificationSetting.findUnique({ where: { id: "default" } })) ||
      (await prisma.notificationSetting.create({ data: { id: "default" } }));

    return jsonOk({ settings });
  } catch (e) {
    return jsonError(e, e?.status || 500);
  }
}

export async function PATCH(req) {
  const rl = enforceRateLimit(req, { keyPrefix: "admin:settings:email", limit: 30, windowMs: 60_000 });
  if (!rl.ok) return jsonError("RATE_LIMITED", 429);

  try {
    await requireAdmin();
    const body = patchSchema.parse(await req.json());

    const settings = await prisma.notificationSetting.upsert({
      where: { id: "default" },
      create: { id: "default", ...body },
      update: { ...body },
    });

    return jsonOk({ settings });
  } catch (e) {
    return jsonError(e, 400);
  }
}
