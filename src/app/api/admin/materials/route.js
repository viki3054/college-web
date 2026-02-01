import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { enforceRateLimit, requireAdmin } from "@/lib/apiAuth";
import { jsonError, jsonOk } from "@/lib/http";

export const runtime = "nodejs";

async function fileToBytes(file) {
  const arrayBuffer = await file.arrayBuffer();
  return Buffer.from(arrayBuffer);
}

export async function GET() {
  try {
    await requireAdmin();
    const materials = await prisma.studyMaterial.findMany({
      orderBy: { createdAt: "desc" },
      take: 200,
      select: {
        id: true,
        title: true,
        description: true,
        youtubeUrl: true,
        attachmentName: true,
        attachmentUrl: true,
        createdAt: true,
        class: { select: { id: true, grade: true, section: true, academicYear: true } },
        subject: { select: { id: true, name: true, code: true } },
      },
    });
    return jsonOk({ materials });
  } catch (e) {
    return jsonError(e, e?.status || 500);
  }
}

export async function POST(req) {
  const rl = enforceRateLimit(req, { keyPrefix: "admin:materials", limit: 20, windowMs: 60_000 });
  if (!rl.ok) return jsonError("RATE_LIMITED", 429);

  try {
    const user = await requireAdmin();
    const form = await req.formData();

    const classId = String(form.get("classId") || "");
    const subjectId = form.get("subjectId") ? String(form.get("subjectId")) : null;
    const title = String(form.get("title") || "");
    const description = form.get("description") ? String(form.get("description")) : "";
    const youtubeUrl = form.get("youtubeUrl") ? String(form.get("youtubeUrl")) : "";

    if (!classId || title.trim().length < 3) {
      return jsonError("INVALID_INPUT", 400);
    }

    let attachmentName = null;
    let attachmentMime = null;
    let attachmentBytes = null;

    const file = form.get("file");
    if (file && typeof file === "object" && file.arrayBuffer) {
      if (file.size > 4 * 1024 * 1024) {
        return jsonError("FILE_TOO_LARGE", 413);
      }
      attachmentName = file.name;
      attachmentMime = file.type;
      attachmentBytes = await fileToBytes(file);
    }

    const created = await prisma.studyMaterial.create({
      data: {
        kind: "STUDY_MATERIAL",
        classId,
        subjectId,
        title: title.trim(),
        description: description ? description.trim() : null,
        youtubeUrl: youtubeUrl ? youtubeUrl.trim() : null,
        attachmentName,
        attachmentMime,
        attachmentBytes,
        createdById: user.id,
      },
      select: { id: true },
    });

    return jsonOk({ id: created.id }, { status: 201 });
  } catch (e) {
    return NextResponse.json(
      { ok: false, error: e?.message || "BAD_REQUEST" },
      { status: e?.status || 400 }
    );
  }
}
