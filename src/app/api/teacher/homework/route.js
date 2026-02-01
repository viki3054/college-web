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
  const rl = enforceRateLimit(req, { keyPrefix: "teacher:homework", limit: 10, windowMs: 60_000 });
  if (!rl.ok) return jsonError("RATE_LIMITED", 429);

  try {
    const user = await requireTeacher();
    const form = await req.formData();

    const classId = String(form.get("classId") || "");
    const subjectId = form.get("subjectId") ? String(form.get("subjectId")) : null;
    const title = String(form.get("title") || "");
    const description = String(form.get("description") || "");
    const dueAtStr = form.get("dueAt") ? String(form.get("dueAt")) : "";
    const dueAt = dueAtStr ? new Date(dueAtStr) : null;

    if (!classId || title.length < 3 || description.length < 5) {
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
      // Basic guard for serverless limits
      if (file.size > 4 * 1024 * 1024) {
        return jsonError("FILE_TOO_LARGE", 413);
      }
      attachmentName = file.name;
      attachmentMime = file.type;
      attachmentBytes = await fileToBytes(file);
    }

    const hw = await prisma.homework.create({
      data: {
        classId,
        subjectId,
        title,
        description,
        dueAt,
        attachmentName,
        attachmentMime,
        attachmentBytes,
        createdById: user.id,
      },
    });

    return jsonOk({ id: hw.id });
  } catch (err) {
    return NextResponse.json(
      { ok: false, error: err?.message || "BAD_REQUEST" },
      { status: err?.status || 400 }
    );
  }
}
