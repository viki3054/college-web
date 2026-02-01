import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { requireUser, requireRole } from "@/lib/auth";
import { enforceRateLimit } from "@/lib/apiAuth";
import { jsonError } from "@/lib/http";
import { canUserAccessClass } from "@/lib/classAccess";
import { safeFilename } from "@/app/api/download/_util";

export async function GET(req, { params }) {
  const rl = enforceRateLimit(req, { keyPrefix: "download:materials", limit: 120, windowMs: 60_000 });
  if (!rl.ok) return jsonError("RATE_LIMITED", 429);

  try {
    const user = await requireUser();
    requireRole(user, ["ADMIN", "TEACHER", "STUDENT", "PARENT"]);

    const id = params?.id;
    if (!id) return jsonError("BAD_REQUEST", 400);

    const mat = await prisma.studyMaterial.findUnique({
      where: { id },
      select: {
        classId: true,
        attachmentName: true,
        attachmentMime: true,
        attachmentBytes: true,
        attachmentUrl: true,
      },
    });

    if (!mat) return jsonError("NOT_FOUND", 404);

    const allowed = await canUserAccessClass(user, mat.classId);
    if (!allowed) return jsonError("FORBIDDEN", 403);

    if (mat.attachmentUrl && !mat.attachmentBytes) {
      return NextResponse.redirect(mat.attachmentUrl);
    }

    if (!mat.attachmentBytes) return jsonError("NO_ATTACHMENT", 404);

    const filename = safeFilename(mat.attachmentName || `material-${id}`);
    const mime = mat.attachmentMime || "application/octet-stream";

    return new Response(Buffer.from(mat.attachmentBytes), {
      headers: {
        "Content-Type": mime,
        "Content-Disposition": `attachment; filename="${filename}"`,
        "Cache-Control": "private, no-store",
      },
    });
  } catch (err) {
    return NextResponse.json(
      { ok: false, error: err?.message || "BAD_REQUEST" },
      { status: err?.status || 400 }
    );
  }
}
