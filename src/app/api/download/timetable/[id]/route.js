import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { requireUser, requireRole } from "@/lib/auth";
import { enforceRateLimit } from "@/lib/apiAuth";
import { jsonError } from "@/lib/http";
import { canUserAccessClass } from "@/lib/classAccess";
import { safeFilename } from "@/app/api/download/_util";

export async function GET(req, { params }) {
  const rl = enforceRateLimit(req, { keyPrefix: "download:timetable", limit: 120, windowMs: 60_000 });
  if (!rl.ok) return jsonError("RATE_LIMITED", 429);

  try {
    const user = await requireUser();
    requireRole(user, ["ADMIN", "TEACHER", "STUDENT", "PARENT"]);

    const id = params?.id;
    if (!id) return jsonError("BAD_REQUEST", 400);

    const file = await prisma.uploadedFile.findUnique({
      where: { id },
      select: {
        name: true,
        mimeType: true,
        bytes: true,
        timetable: { select: { classId: true } },
      },
    });

    if (!file) return jsonError("NOT_FOUND", 404);

    const classId = file.timetable?.classId || null;
    if (user.role !== "ADMIN") {
      if (!classId) return jsonError("NOT_FOUND", 404);
      const allowed = await canUserAccessClass(user, classId);
      if (!allowed) return jsonError("FORBIDDEN", 403);
    }

    const filename = safeFilename(file.name || `timetable-${id}`);
    const mime = file.mimeType || "application/octet-stream";

    return new Response(Buffer.from(file.bytes), {
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
