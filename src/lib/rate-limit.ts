/**
 * In-memory sliding-window rate limiter.
 *
 * Keyed by an arbitrary string (user ID, IP, etc.).
 * State lives in the Node.js process — sufficient for a single-instance MVP.
 * For multi-instance deployments, swap this out for a Redis-backed solution
 * (e.g., Upstash Ratelimit).
 */

const timestamps = new Map<string, number[]>();

/**
 * Check whether a key is within the allowed rate.
 * @param key       - Unique key to rate-limit (e.g. user ID)
 * @param limit     - Max requests allowed within the window
 * @param windowMs  - Window duration in milliseconds
 */
export function checkRateLimit(
  key: string,
  limit: number,
  windowMs: number
): { allowed: boolean; remaining: number; resetInMs: number } {
  const now = Date.now();
  const windowStart = now - windowMs;

  // Prune stale entries for this key
  const existing = (timestamps.get(key) ?? []).filter((t) => t > windowStart);

  if (existing.length >= limit) {
    const oldest = existing[0];
    const resetInMs = oldest + windowMs - now;
    return { allowed: false, remaining: 0, resetInMs };
  }

  existing.push(now);
  timestamps.set(key, existing);

  // Periodically garbage-collect keys with no recent activity (~1% of requests)
  if (Math.random() < 0.01) {
    Array.from(timestamps.entries()).forEach(([k, ts]) => {
      if (ts.every((t: number) => t <= windowStart)) timestamps.delete(k);
    });
  }

  return { allowed: true, remaining: limit - existing.length, resetInMs: 0 };
}

// Pre-configured limit for AI endpoints: 15 requests per minute per user.
// Covers the heaviest legitimate use case (running all analyses on one claim)
// while blocking automated abuse.
export function checkAIRateLimit(userId: string) {
  return checkRateLimit(`ai:${userId}`, 15, 60_000);
}
