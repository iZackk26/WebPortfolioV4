/**
 * Validación de la petición del chat. Todo lo que llega del navegador se trata como
 * hostil: origen, tipo, tamaño y forma del body (CAPEC-153 entrada no validada).
 */
export const MAX_BODY_BYTES = 4096;
export const MAX_QUESTION_CHARS = 500;

const PRODUCTION_ORIGINS = ['https://izackk.com', 'https://www.izackk.com'];
const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
// Controles invisibles y de dirección (U+202E y compañía) que se usan para disfrazar texto
// eslint-disable-next-line no-control-regex -- quitar caracteres de control es justamente el objetivo
const CONTROL = /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F\u200B-\u200F\u202A-\u202E\u2066-\u2069]/g;

export interface ChatInput {
  question: string;
  sessionId: string;
}

const allowedOrigins = () => {
  const origins = new Set(PRODUCTION_ORIGINS);
  // Previews y dominio propio del deploy, que Vercel inyecta en el servidor
  for (const host of [process.env.VERCEL_URL, process.env.VERCEL_BRANCH_URL, process.env.VERCEL_PROJECT_PRODUCTION_URL]) {
    if (host) origins.add(`https://${host}`);
  }
  if (process.env.VERCEL_ENV === 'development') origins.add('http://localhost:3000');
  return origins;
};

/**
 * Solo el propio sitio puede usar el chat desde un navegador. No reemplaza al rate-limit
 * (un script puede falsificar Origin), pero corta el uso embebido en otras webs (CSRF).
 */
export const isAllowedOrigin = (request: Request) => {
  const origin = request.headers.get('origin');
  return Boolean(origin && allowedOrigins().has(origin));
};

export const isJson = (request: Request) =>
  (request.headers.get('content-type') ?? '').toLowerCase().startsWith('application/json');

/** Lee el body con tope de bytes sin confiar en Content-Length (puede mentir o faltar). */
export const readLimitedText = async (request: Request): Promise<string | null> => {
  const declared = Number(request.headers.get('content-length') ?? 0);
  if (declared > MAX_BODY_BYTES) return null;
  const reader = request.body?.getReader();
  if (!reader) return '';
  const chunks: Uint8Array[] = [];
  let size = 0;
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    size += value.byteLength;
    if (size > MAX_BODY_BYTES) {
      await reader.cancel();
      return null;
    }
    chunks.push(value);
  }
  return new TextDecoder().decode(Buffer.concat(chunks));
};

/** Devuelve la entrada limpia o null si no tiene la forma exacta esperada. */
export const parseChatInput = (raw: string): ChatInput | null => {
  let data: unknown;
  try {
    data = JSON.parse(raw);
  } catch {
    return null;
  }
  if (!data || typeof data !== 'object' || Array.isArray(data)) return null;
  const { question, sessionId } = data as Record<string, unknown>;
  if (typeof question !== 'string' || typeof sessionId !== 'string' || !UUID.test(sessionId)) return null;

  const clean = question.normalize('NFC').replace(CONTROL, '').trim();
  if (!clean || clean.length > MAX_QUESTION_CHARS) return null;
  return { question: clean, sessionId: sessionId.toLowerCase() };
};
