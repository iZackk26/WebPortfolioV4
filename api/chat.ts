import { ipAddress, waitUntil } from '@vercel/functions';
import { checkLimits, ipKey } from './_lib/limits.js';
import { fail, json, rateLimited } from './_lib/http.js';
import { isAllowedOrigin, isJson, parseChatInput, readLimitedText } from './_lib/request.js';
import { askUpstream, isUpstreamConfigured, UpstreamError } from './_lib/upstream.js';

/**
 * POST /api/chat — proxy del chat de Max hacia n8n.
 *
 * Orden de defensas, de la más barata a la más cara:
 * origen → tipo → rate-limit por IP (3/min, 120/h) y global → tamaño → forma → n8n.
 * La IP la pone Vercel (x-real-ip): el cliente no puede falsificarla con X-Forwarded-For.
 */
export async function POST(request: Request): Promise<Response> {
  if (!isAllowedOrigin(request)) return fail('forbidden_origin');
  if (!isJson(request)) return fail('unsupported_media_type');

  if (!isUpstreamConfigured()) {
    console.error('[chat] faltan CHATBOT_API_URL / CHATBOT_API_KEY');
    return fail('unavailable');
  }

  // El cupo se cobra antes de leer el body: también cuentan las peticiones mal formadas
  try {
    const limit = await checkLimits(ipKey(ipAddress(request) ?? 'unknown'));
    waitUntil(Promise.allSettled(limit.pending));
    if (!limit.allowed) return rateLimited(limit.retryAfter);
  } catch (error) {
    // Sin almacén de límites no se atiende: fallar abierto dejaría el chat sin freno
    console.error('[chat] rate-limit no disponible', error instanceof Error ? error.message : error);
    return fail('unavailable');
  }

  const raw = await readLimitedText(request);
  if (raw === null) return fail('payload_too_large');
  const input = parseChatInput(raw);
  if (!input) return fail('invalid_request');

  try {
    return json({ answer: await askUpstream(input) });
  } catch (error) {
    console.error('[chat]', error instanceof UpstreamError ? error.message : 'upstream-unknown');
    return fail('upstream_error');
  }
}

const notAllowed = () => fail('method_not_allowed', { Allow: 'POST' });
export const GET = notAllowed;
export const PUT = notAllowed;
export const PATCH = notAllowed;
export const DELETE = notAllowed;
