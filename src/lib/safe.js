export function toInt(v, fallback = null) {
  const n = Number(v);
  if (!Number.isFinite(n)) return fallback;
  return Math.trunc(n);
}

export function toFloat(v, fallback = null) {
  const n = Number(v);
  if (!Number.isFinite(n)) return fallback;
  return n;
}
