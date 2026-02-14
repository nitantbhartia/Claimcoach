/**
 * Simple in-memory rate limiter for API routes.
 *
 * Tracks requests per user ID using a sliding window.
 * Not shared across serverless instances — that's fine for
 * a single-server MVP. Replace with Redis/Upstash for scale.
 */

interface RateWindow {
  count: number;
  resetAt: number;
}

const buckets = new Map<string, RateWindow>();

// Clean up expired entries every 5 minutes to prevent memory leak
const CLEANUP_INTERVAL = 5 * 60 * 1000;
let lastCleanup = Date.now();

function cleanup() {
  const now = Date.now();
  if (now - lastCleanup < CLEANUP_INTERVAL) return;
  lastCleanup = now;
  buckets.forEach((window, key) => {
    if (now > window.resetAt) buckets.delete(key);
  });
}

export interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  resetIn: number; // seconds
}

/**
 * Check rate limit for a given key (typically `userId:routeName`).
 *
 * @param key    Unique identifier, e.g. "user-123:analyze-offer"
 * @param limit  Max requests per window
 * @param windowMs  Window duration in milliseconds (default 60s)
 */
export function checkRateLimit(
  key: string,
  limit: number,
  windowMs: number = 60_000
): RateLimitResult {
  cleanup();

  const now = Date.now();
  const existing = buckets.get(key);

  if (!existing || now > existing.resetAt) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return { allowed: true, remaining: limit - 1, resetIn: Math.ceil(windowMs / 1000) };
  }

  existing.count++;

  if (existing.count > limit) {
    const resetIn = Math.ceil((existing.resetAt - now) / 1000);
    return { allowed: false, remaining: 0, resetIn };
  }

  return {
    allowed: true,
    remaining: limit - existing.count,
    resetIn: Math.ceil((existing.resetAt - now) / 1000),
  };
}

/**
 * Pre-configured rate limits for different route tiers.
 */
export const RATE_LIMITS = {
  /** AI analysis endpoints: 10 req/min per user */
  ai: { limit: 10, windowMs: 60_000 },
  /** AI chat: 20 req/min per user */
  chat: { limit: 20, windowMs: 60_000 },
  /** Write endpoints (create claim, expense, document): 30 req/min per user */
  write: { limit: 30, windowMs: 60_000 },
} as const;
