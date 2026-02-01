import { z } from "zod";

import { prisma } from "@/lib/prisma";
import { enforceRateLimit, requireAdmin } from "@/lib/apiAuth";
import { jsonError, jsonOk } from "@/lib/http";
import { notifyResultsPublished } from "@/lib/notify";

export const runtime = "nodejs";

const schema = z.object({
  classId: z.string().min(1),
  subjectId: z.string().min(1).nullable().optional(),
  term: z.string().min(1).max(50),
  examName: z.string().min(1).max(80),
  publish: z.boolean(),
});

async function getStudentIdsInClass(classId) {
  const students = await prisma.student.findMany({
    where: { classId },
    select: { id: true },
    take: 2000,
  });
  return students.map((s) => s.id);
}

export async function GET(req) {
  try {
    await requireAdmin();
    const url = new URL(req.url);
    const classId = url.searchParams.get("classId") || "";
    const term = url.searchParams.get("term") || "";
    const examName = url.searchParams.get("examName") || "";
    const subjectId = url.searchParams.get("subjectId") || "";

    if (!classId || !term || !examName) {
      return jsonOk({ total: 0, published: 0, unpublished: 0 });
    }

    const studentIds = await getStudentIdsInClass(classId);
    if (studentIds.length === 0) return jsonOk({ total: 0, published: 0, unpublished: 0 });

    const where = {
      studentId: { in: studentIds },
      term,
      examName,
      ...(subjectId ? { subjectId } : {}),
    };

    const [total, published] = await Promise.all([
      prisma.result.count({ where }),
      prisma.result.count({ where: { ...where, publishedAt: { not: null } } }),
    ]);

    return jsonOk({ total, published, unpublished: total - published });
  } catch (e) {
    return jsonError(e, e?.status || 500);
  }
}

export async function POST(req) {
  const rl = enforceRateLimit(req, { keyPrefix: "admin:results:publish", limit: 20, windowMs: 60_000 });
  if (!rl.ok) return jsonError("RATE_LIMITED", 429);

  try {
    const user = await requireAdmin();
    const body = schema.parse(await req.json());

    const studentIds = await getStudentIdsInClass(body.classId);
    if (studentIds.length === 0) return jsonOk({ updated: 0 });

    const where = {
      studentId: { in: studentIds },
      term: body.term,
      examName: body.examName,
      ...(body.subjectId ? { subjectId: body.subjectId } : {}),
    };

    const now = new Date();
    const data = body.publish
      ? { publishedAt: now, publishedById: user.id }
      : { publishedAt: null, publishedById: null };

    const matching = body.publish
      ? await prisma.result.findMany({
          where: { ...where, publishedAt: null },
          select: { studentId: true },
          take: 500,
        })
      : [];

    const res = await prisma.result.updateMany({ where, data });

    if (body.publish) {
      const uniqueStudentIds = Array.from(new Set(matching.map((m) => m.studentId)));
      for (const studentId of uniqueStudentIds) {
        await notifyResultsPublished({
          studentId,
          term: body.term,
          examName: body.examName,
        });
      }
    }

    return jsonOk({ updated: res.count, publish: body.publish });
  } catch (e) {
    return jsonError(e, 400);
  }
}
