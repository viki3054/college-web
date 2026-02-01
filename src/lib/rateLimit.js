const globalForRateLimit = globalThis;

if (!globalForRateLimit.__rateLimitStore) {
  globalForRateLimit.__rateLimitStore = new Map();
}

const store = globalForRateLimit.__rateLimitStore;

export function rateLimit({ key, limit, windowMs }) {
  const now = Date.now();
  const rec = store.get(key) || { count: 0, resetAt: now + windowMs };

  if (now > rec.resetAt) {
    rec.count = 0;
    rec.resetAt = now + windowMs;
  }

  rec.count += 1;
  store.set(key, rec);

  return {
    ok: rec.count <= limit,
    remaining: Math.max(0, limit - rec.count),
    resetAt: rec.resetAt,
  };
}
