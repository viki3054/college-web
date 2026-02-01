import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { requireTeacher, enforceRateLimit } from "@/lib/apiAuth";
import { jsonError, jsonOk } from "@/lib/http";
import { getTeacherContext, assertTeacherHasClass, assertTeacherHasSubjectIfAssigned } from "@/lib/teacherAccess";

async function fileToBytes(file) {
  const arrayBuffer = await file.arrayBuffer();
  return Buffer.from(arrayBuffer);
}

export async function POST(req) {
  const rl = enforceRateLimit(req, { keyPrefix: "teacher:materials", limit: 10, windowMs: 60_000 });
  if (!rl.ok) return jsonError("RATE_LIMITED", 429);

  try {
    const user = await requireTeacher();
    const form = await req.formData();

    const classId = String(form.get("classId") || "");
    const subjectId = form.get("subjectId") ? String(form.get("subjectId")) : null;
    const title = String(form.get("title") || "");
    const description = form.get("description") ? String(form.get("description")) : "";
    const youtubeUrl = form.get("youtubeUrl") ? String(form.get("youtubeUrl")) : "";

    if (!classId || title.length < 3) {
      return jsonError("INVALID_INPUT", 400);
    }

    const ctx = await getTeacherContext(user.id);
    assertTeacherHasClass(ctx, classId);
    assertTeacherHasSubjectIfAssigned(ctx, subjectId);

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

    const material = await prisma.studyMaterial.create({
      data: {
        kind: "STUDY_MATERIAL",
        classId,
        subjectId,
        title,
        description: description || null,
        youtubeUrl: youtubeUrl || null,
        attachmentName,
        attachmentMime,
        attachmentBytes,
        createdById: user.id,
      },
    });

    return jsonOk({ id: material.id });
  } catch (err) {
    return NextResponse.json(
      { ok: false, error: err?.message || "BAD_REQUEST" },
      { status: err?.status || 400 }
    );
  }
}
