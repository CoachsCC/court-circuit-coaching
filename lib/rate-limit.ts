import "server-only";

/**
 * Limiteur de débit en mémoire, par clé (IP). Fenêtre glissante simple.
 *
 * ⚠️ Portée : l'instance serverless courante. Sur Vercel, plusieurs instances
 * peuvent coexister, donc ce garde-fou n'est PAS un plafond global strict — il
 * absorbe les rafales d'un même client sur une instance chaude, ce qui suffit à
 * casser un script de spam basique sans dépendance ni infrastructure. Pour un
 * plafond réellement global, doubler d'une règle Vercel Firewall (dashboard) ou
 * d'un store partagé (Upstash Redis + @upstash/ratelimit).
 */
type Hits = number[];

const buckets = new Map<string, Hits>();

// Le nettoyage opportuniste évite que la Map grossisse sans fin sur une instance
// longue durée. On purge les seaux vidés à chaque passage.
function prune(now: number, windowMs: number) {
  for (const [key, hits] of buckets) {
    const fresh = hits.filter((t) => now - t < windowMs);
    if (fresh.length) buckets.set(key, fresh);
    else buckets.delete(key);
  }
}

export type RateLimitResult = { ok: boolean; retryAfter: number };

export function rateLimit(
  key: string,
  { limit, windowMs }: { limit: number; windowMs: number },
): RateLimitResult {
  const now = Date.now();
  const hits = (buckets.get(key) ?? []).filter((t) => now - t < windowMs);

  if (hits.length >= limit) {
    const retryAfter = Math.ceil((windowMs - (now - hits[0])) / 1000);
    return { ok: false, retryAfter };
  }

  hits.push(now);
  buckets.set(key, hits);
  if (buckets.size > 500) prune(now, windowMs);
  return { ok: true, retryAfter: 0 };
}

/** Extrait l'IP client derrière le proxy Vercel. */
export function clientIp(request: Request): string {
  const fwd = request.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0].trim();
  return request.headers.get("x-real-ip")?.trim() || "unknown";
}
