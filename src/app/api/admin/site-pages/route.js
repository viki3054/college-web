import { z } from "zod";

import { prisma } from "@/lib/prisma";
import { enforceRateLimit, requireAdmin } from "@/lib/apiAuth";
import { jsonError, jsonOk } from "@/lib/http";

export const runtime = "nodejs";

const createSchema = z.object({
  title: z.string().min(1).max(160),
  slug: z
    .string()
    .min(1)
    .max(200)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/i, "Slug must be like 'about-school'"),
  content: z.string().min(1),
  isPublished: z.boolean().optional(),
});

export async function GET() {
  try {
    await requireAdmin();
    const pages = await prisma.sitePage.findMany({
      orderBy: [{ updatedAt: "desc" }],
      take: 500,
    });
    return jsonOk({ pages });
  } catch (e) {
    return jsonError(e, e?.status || 500);
  }
}

export async function POST(req) {
  const rl = enforceRateLimit(req, { keyPrefix: "admin:site-pages", limit: 30, windowMs: 60_000 });
  if (!rl.ok) return jsonError("RATE_LIMITED", 429);

  try {
    await requireAdmin();
    const body = createSchema.parse(await req.json());

    const created = await prisma.sitePage.create({
      data: {
        title: body.title.trim(),
        slug: body.slug.trim().toLowerCase(),
        content: body.content,
        isPublished: body.isPublished ?? false,
      },
      select: { id: true },
    });

    return jsonOk({ id: created.id }, { status: 201 });
  } catch (e) {
    return jsonError(e, 400);
  }
}
