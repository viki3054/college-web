import { requireRole, requireUser } from "@/lib/auth";
import { rateLimit } from "@/lib/rateLimit";
import { getClientIp } from "@/lib/http";

export async function requireAdmin() {
  const user = await requireUser();
  requireRole(user, ["ADMIN"]);
  return user;
}

export async function requireTeacher() {
  const user = await requireUser();
  requireRole(user, ["TEACHER"]);
  return user;
}

export async function requireParent() {
  const user = await requireUser();
  requireRole(user, ["PARENT"]);
  return user;
}

export async function requireStudent() {
  const user = await requireUser();
  requireRole(user, ["STUDENT"]);
  return user;
}

export function enforceRateLimit(req, { limit = 30, windowMs = 60_000, keyPrefix = "api" } = {}) {
  const ip = getClientIp(req);
  const key = `${keyPrefix}:${ip}`;
  const res = rateLimit({ key, limit, windowMs });
  return res;
}
