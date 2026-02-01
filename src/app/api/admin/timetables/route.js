import crypto from "crypto";
import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { enforceRateLimit, requireAdmin } from "@/lib/apiAuth";
import { jsonError, jsonOk } from "@/lib/http";

export const runtime = "nodejs";

async function fileToBuffer(file) {
  const arrayBuffer = await file.arrayBuffer();
  return Buffer.from(arrayBuffer);
}

export async function GET() {
  try {
    await requireAdmin();
    const timetables = await prisma.timetable.findMany({
      orderBy: { createdAt: "desc" },
      take: 200,
      select: {
        id: true,
        title: true,
        createdAt: true,
        classId: true,
        uploadedFile: { select: { id: true, name: true, size: true, mimeType: true } },
      },
    });
    return jsonOk({ timetables });
  } catch (e) {
    return jsonError(e, e?.status || 500);
  }
}

export async function POST(req) {
  const rl = enforceRateLimit(req, { keyPrefix: "admin:timetables", limit: 10, windowMs: 60_000 });
  if (!rl.ok) return jsonError("RATE_LIMITED", 429);

  try {
    const user = await requireAdmin();
    const form = await req.formData();

    const classId = String(form.get("classId") || "");
    const title = String(form.get("title") || "");
    const file = form.get("file");

    if (!classId || title.trim().length < 3 || !file || typeof file !== "object" || !file.arrayBuffer) {
      return jsonError("INVALID_INPUT", 400);
    }

    if (file.size > 4 * 1024 * 1024) {
      return jsonError("FILE_TOO_LARGE", 413);
    }

    const bytes = await fileToBuffer(file);
    const sha256 = crypto.createHash("sha256").update(bytes).digest("hex");

    const created = await prisma.$transaction(async (tx) => {
      const uploaded = await tx.uploadedFile.create({
        data: {
          name: file.name,
          mimeType: file.type || "application/octet-stream",
          bytes,
          size: file.size,
          sha256,
          uploadedById: user.id,
        },
        select: { id: true },
      });

      const timetable = await tx.timetable.create({
        data: {
          classId,
          title: title.trim(),
          uploadedFileId: uploaded.id,
        },
        select: { id: true, uploadedFileId: true },
      });

      return timetable;
    });

    return jsonOk({ id: created.id, uploadedFileId: created.uploadedFileId }, { status: 201 });
  } catch (e) {
    return NextResponse.json(
      { ok: false, error: e?.message || "BAD_REQUEST" },
      { status: e?.status || 400 }
    );
  }
}
