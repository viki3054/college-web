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

export function hasPermission(user, permission) {
  const perms = user?.permissions || [];
  return Array.isArray(perms) && perms.includes(permission);
}

export async function requirePermission(permission) {
  const user = await requireUser();
  if (user?.role === "ADMIN") return user;
  if (!hasPermission(user, permission)) {
    const error = new Error("FORBIDDEN");
    error.status = 403;
    throw error;
  }
  return user;
}

export async function requireBusStaff() {
  return requirePermission("BUS_STAFF");
}

export function enforceRateLimit(req, { limit = 30, windowMs = 60_000, keyPrefix = "api" } = {}) {
  const ip = getClientIp(req);
  const key = `${keyPrefix}:${ip}`;
  const res = rateLimit({ key, limit, windowMs });
  return res;
}
