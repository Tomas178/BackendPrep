export function formatRateLimitKey(key: string): string {
  return `ratelimit:${key}`;
}
