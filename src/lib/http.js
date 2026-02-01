import { NextResponse } from "next/server";

export function jsonOk(data = {}, init) {
  return NextResponse.json({ ok: true, ...data }, init);
}

export function jsonError(error, status = 400, extra = {}) {
  const message = typeof error === "string" ? error : error?.message;
  return NextResponse.json(
    { ok: false, error: message || "Request failed", ...extra },
    { status }
  );
}

export function getClientIp(req) {
  // Vercel/Proxies
  const xf = req.headers.get("x-forwarded-for");
  if (xf) return xf.split(",")[0].trim();
  const xr = req.headers.get("x-real-ip");
  if (xr) return xr.trim();
  return "unknown";
}
