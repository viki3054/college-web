import { z } from "zod";

import { prisma } from "@/lib/prisma";
import { jsonError, jsonOk } from "@/lib/http";
import { enforceRateLimit, requireAdmin } from "@/lib/apiAuth";

export const runtime = "nodejs";

const createSchema = z.object({
  name: z.string().min(1).max(80),
  grade: z.string().min(1).max(40),
  section: z.string().max(20).optional().or(z.literal("")),
  academicYear: z.string().max(20).optional().or(z.literal("")),
});

export async function GET(req) {
  try {
    await requireAdmin();

    const classes = await prisma.class.findMany({
      orderBy: [{ academicYear: "desc" }, { grade: "asc" }, { section: "asc" }],
      include: {
        subjects: { include: { subject: true } },
        teacherAssignments: { include: { teacher: { include: { user: true } } } },
      },
      take: 200,
    });

    return jsonOk({ classes });
  } catch (e) {
    return jsonError(e, e?.status || 500);
  }
}

export async function POST(req) {
  try {
    await requireAdmin();

    const rl = enforceRateLimit(req, { limit: 30, windowMs: 60_000, keyPrefix: "admin-classes-write" });
    if (!rl.ok) return jsonError("Too many requests", 429);

    const body = await req.json();
    const data = createSchema.parse(body);

    const created = await prisma.class.create({
      data: {
        name: data.name,
        grade: data.grade,
        section: data.section || null,
        academicYear: data.academicYear || null,
      },
      select: { id: true },
    });

    return jsonOk({ id: created.id }, { status: 201 });
  } catch (e) {
    return jsonError(e, 400);
  }
}
