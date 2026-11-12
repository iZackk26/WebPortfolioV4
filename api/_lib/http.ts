/** Respuestas JSON del chat: sin caché, sin sniffing y sin detalles internos (CWE-209). */
const BASE_HEADERS = {
  'Content-Type': 'application/json; charset=utf-8',
  'Cache-Control': 'no-store',
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'no-referrer',
} as const;

export type ChatErrorCode =
  | 'method_not_allowed'
  | 'forbidden_origin'
  | 'unsupported_media_type'
  | 'payload_too_large'
  | 'invalid_request'
  | 'rate_limited'
  | 'unavailable'
  | 'upstream_error';

const STATUS: Record<ChatErrorCode, number> = {
  method_not_allowed: 405,
  forbidden_origin: 403,
  unsupported_media_type: 415,
  payload_too_large: 413,
  invalid_request: 400,
  rate_limited: 429,
  unavailable: 503,
  upstream_error: 502,
};

export const json = (body: unknown, status = 200, extra: Record<string, string> = {}) =>
  new Response(JSON.stringify(body), { status, headers: { ...BASE_HEADERS, ...extra } });

export const fail = (code: ChatErrorCode, extra: Record<string, string> = {}, body: Record<string, unknown> = {}) =>
  json({ error: code, ...body }, STATUS[code], extra);

export const rateLimited = (retryAfter: number) =>
  fail('rate_limited', { 'Retry-After': String(retryAfter) }, { retryAfter });
