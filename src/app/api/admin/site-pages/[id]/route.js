import { z } from "zod";

import { prisma } from "@/lib/prisma";
import { enforceRateLimit, requireAdmin } from "@/lib/apiAuth";
import { jsonError, jsonOk } from "@/lib/http";

export const runtime = "nodejs";

const patchSchema = z.object({
  title: z.string().min(1).max(160).optional(),
  slug: z
    .string()
    .min(1)
    .max(200)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/i, "Slug must be like 'about-school'")
    .optional(),
  content: z.string().min(1).optional(),
  isPublished: z.boolean().optional(),
});

export async function PATCH(req, { params }) {
  const rl = enforceRateLimit(req, { keyPrefix: "admin:site-pages:patch", limit: 60, windowMs: 60_000 });
  if (!rl.ok) return jsonError("RATE_LIMITED", 429);

  try {
    await requireAdmin();
    const id = params?.id;
    if (!id) return jsonError("INVALID_ID", 400);
    const body = patchSchema.parse(await req.json());

    await prisma.sitePage.update({
      where: { id },
      data: {
        title: body.title ? body.title.trim() : undefined,
        slug: body.slug ? body.slug.trim().toLowerCase() : undefined,
        content: body.content,
        isPublished: body.isPublished,
      },
    });

    return jsonOk();
  } catch (e) {
    return jsonError(e, 400);
  }
}

export async function DELETE(req, { params }) {
  const rl = enforceRateLimit(req, { keyPrefix: "admin:site-pages:delete", limit: 20, windowMs: 60_000 });
  if (!rl.ok) return jsonError("RATE_LIMITED", 429);

  try {
    await requireAdmin();
    const id = params?.id;
    if (!id) return jsonError("INVALID_ID", 400);
    await prisma.sitePage.delete({ where: { id } });
    return jsonOk({ deleted: true });
  } catch (e) {
    return jsonError(e, 400);
  }
}
