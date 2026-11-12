import type { ChatInput } from './request.js';
import type { VisitorContext } from './visitor.js';

/** Espera máxima a n8n: una respuesta colgada no debe retener la función (CWE-400) */
const UPSTREAM_TIMEOUT_MS = 20_000;
/** Tope de la respuesta que se reenvía al navegador */
const MAX_ANSWER_CHARS = 4000;

/** Llaves en las que el agente puede devolver el texto (Visione Flow: data.output) */
const TEXT_KEYS = ['output', 'response', 'answer', 'message'] as const;

type UpstreamBody = Partial<Record<(typeof TEXT_KEYS)[number], unknown>> & { data?: Record<string, unknown> };

const pickText = (body: UpstreamBody): string | null => {
  for (const source of [body, body.data ?? {}]) {
    for (const key of TEXT_KEYS) {
      const value = (source as Record<string, unknown>)[key];
      if (typeof value === 'string' && value.trim()) return value.trim();
    }
  }
  return null;
};

export class UpstreamError extends Error {}

export const isUpstreamConfigured = () => Boolean(process.env.CHATBOT_API_URL);

/**
 * Pregunta al agente (webhook web de Visione Flow). La URL y la clave son variables del
 * servidor (sin VITE_): nunca viajan al navegador (CWE-798 / CWE-522).
 * De la respuesta solo se toma el texto: el webhook a veces adjunta el registro de
 * ejecución (executionResult) con el prompt de sistema, y eso no debe llegar al visitante.
 * visitor viaja en metadata (hash de la IP, geo, dispositivo, página): Flow lo guarda para la analítica.
 */
export const askUpstream = async ({ question, sessionId }: ChatInput, visitor: VisitorContext): Promise<string> => {
  const url = process.env.CHATBOT_API_URL;
  const key = process.env.CHATBOT_API_KEY;
  if (!url) throw new UpstreamError('upstream-not-configured');

  let response: Response;
  try {
    response = await fetch(url, {
      method: 'POST',
      // La clave es opcional: se manda solo si el webhook la exige
      headers: { 'Content-Type': 'application/json', ...(key ? { 'X-API-Key': key } : {}) },
      // El endpoint /web de Flow solo reenvía message y metadata al flujo: lo demás se pierde
      body: JSON.stringify({ message: question, sessionId, metadata: visitor }),
      signal: AbortSignal.timeout(UPSTREAM_TIMEOUT_MS),
      redirect: 'error',
    });
  } catch {
    throw new UpstreamError('upstream-unreachable');
  }
  if (!response.ok) throw new UpstreamError(`upstream-status-${response.status}`);

  let body: UpstreamBody;
  try {
    body = (await response.json()) as UpstreamBody;
  } catch {
    throw new UpstreamError('upstream-invalid-json');
  }
  const text = pickText(body);
  if (!text) throw new UpstreamError('upstream-empty');
  return text.slice(0, MAX_ANSWER_CHARS);
};
