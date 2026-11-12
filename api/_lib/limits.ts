import { createHash } from 'node:crypto';
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

/**
 * Límites del chat de Max. Viven solo en el servidor: nada que llegue desde el navegador
 * (headers, body, query) puede cambiarlos. Cambiarlos exige editar este archivo y desplegar.
 */
export const LIMITS = {
  perMinute: { requests: 3, window: '1 m' },
  perHour: { requests: 120, window: '1 h' },
  // Techo de todo el sitio: frena un abuso repartido entre muchas IPs (botnet) y protege la cuota de n8n
  globalPerHour: { requests: 1000, window: '1 h' },
} as const;

export interface LimitResult {
  allowed: boolean;
  /** Segundos hasta poder volver a preguntar */
  retryAfter: number;
  /** Promesas de analítica/sincronización que la función debe esperar con waitUntil */
  pending: Promise<unknown>[];
}

const readRedis = () => {
  // La integración de Upstash en Vercel expone una de estas dos parejas
  const url = process.env.UPSTASH_REDIS_REST_URL ?? process.env.KV_REST_API_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN ?? process.env.KV_REST_API_TOKEN;
  return url && token ? new Redis({ url, token }) : null;
};

const build = (redis: Redis, prefix: string, { requests, window }: { requests: number; window: `${number} ${'m' | 'h'}` }) =>
  new Ratelimit({
    redis,
    prefix: `max-chat:${prefix}`,
    limiter: Ratelimit.slidingWindow(requests, window),
    // timeout 0: la librería no deja pasar por demora (con > 0 respondería success); el tope lo pone withTimeout
    timeout: 0,
    analytics: false,
  });

let limiters: { minute: Ratelimit; hour: Ratelimit; global: Ratelimit } | null = null;

const getLimiters = () => {
  if (limiters) return limiters;
  const redis = readRedis();
  if (!redis) return null;
  limiters = {
    minute: build(redis, 'ip-minute', LIMITS.perMinute),
    hour: build(redis, 'ip-hour', LIMITS.perHour),
    global: build(redis, 'global-hour', LIMITS.globalPerHour),
  };
  return limiters;
};

/** La IP no se guarda en claro: se usa su hash con sal del servidor como clave. */
export const ipKey = (ip: string) =>
  createHash('sha256').update(`${process.env.RATE_LIMIT_SALT ?? 'max-chat'}:${ip}`).digest('hex');

/** Tope propio de espera a Redis: si se cumple, se rechaza (la librería, en cambio, dejaría pasar) */
const STORE_TIMEOUT_MS = 3000;

const withTimeout = async <T>(promise: Promise<T>): Promise<T> => {
  let timer: ReturnType<typeof setTimeout> | undefined;
  const timeout = new Promise<never>((_, reject) => {
    timer = setTimeout(() => reject(new Error('rate-limit-store-timeout')), STORE_TIMEOUT_MS);
  });
  try {
    return await Promise.race([promise, timeout]);
  } finally {
    clearTimeout(timer);
  }
};

const seconds = (resetMs: number) => Math.max(1, Math.ceil((resetMs - Date.now()) / 1000));

/**
 * Aplica minuto → hora → global, en ese orden, para no consumir cupo de la hora cuando
 * ya se pasó el del minuto. Sin Redis configurado lanza: el chat falla cerrado.
 */
/** Lo que se usa de un limitador; permite probar la regla sin Redis */
export interface Limiter {
  limit: (id: string) => Promise<{ success: boolean; reset: number; pending: Promise<unknown> }>;
}

export const checkWith = async (active: { minute: Limiter; hour: Limiter; global: Limiter }, key: string): Promise<LimitResult> => {
  const pending: Promise<unknown>[] = [];
  for (const [limiter, id] of [[active.minute, key], [active.hour, key], [active.global, 'all']] as const) {
    const result = await withTimeout(limiter.limit(id));
    pending.push(result.pending);
    if (!result.success) return { allowed: false, retryAfter: seconds(result.reset), pending };
  }
  return { allowed: true, retryAfter: 0, pending };
};

export const checkLimits = async (key: string): Promise<LimitResult> => {
  const active = getLimiters();
  if (!active) throw new Error('rate-limit-store-missing');
  return checkWith(active, key);
};
