import type { ChatFailure, ChatMessage } from '../types/chat';
import { CHAT_ENDPOINT, CHAT_HISTORY_KEY, CHAT_HISTORY_LIMIT, CHAT_SESSION_KEY } from '../constants/chat';

/**
 * Cliente del chat de Max. Habla solo con /api/chat (función del propio sitio): la URL de
 * n8n, su clave y los límites viven en el servidor y no se pueden tocar desde aquí.
 */
export class ChatRequestError extends Error {
  constructor(readonly failure: ChatFailure) {
    super(failure.kind);
  }
}

export const askMax = async (question: string, sessionId: string): Promise<string> => {
  let response: Response;
  try {
    response = await fetch(CHAT_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question, sessionId }),
    });
  } catch {
    throw new ChatRequestError({ kind: 'error' });
  }

  if (response.status === 429) {
    const retryAfter = Number(response.headers.get('Retry-After')) || 60;
    throw new ChatRequestError({ kind: 'rate_limited', retryAfter });
  }
  if (response.status === 503) throw new ChatRequestError({ kind: 'unavailable' });
  if (!response.ok) throw new ChatRequestError({ kind: 'error' });

  const data: unknown = await response.json().catch(() => null);
  const answer = data && typeof data === 'object' ? (data as { answer?: unknown }).answer : null;
  if (typeof answer !== 'string' || !answer.trim()) throw new ChatRequestError({ kind: 'error' });
  return answer;
};

/** Id de conversación estable por navegador, para que n8n recuerde el contexto. */
export const getSessionId = () => {
  try {
    const saved = localStorage.getItem(CHAT_SESSION_KEY);
    if (saved) return saved;
    const created = crypto.randomUUID();
    localStorage.setItem(CHAT_SESSION_KEY, created);
    return created;
  } catch {
    return crypto.randomUUID();
  }
};

const isMessage = (value: unknown): value is ChatMessage => {
  if (!value || typeof value !== 'object') return false;
  const { id, role, content } = value as Record<string, unknown>;
  return typeof id === 'string' && (role === 'user' || role === 'assistant') && typeof content === 'string';
};

/** Historial de la pestaña; lo guardado se valida antes de usarlo (puede estar alterado). */
export const loadHistory = (): ChatMessage[] => {
  try {
    const parsed: unknown = JSON.parse(sessionStorage.getItem(CHAT_HISTORY_KEY) ?? '[]');
    return Array.isArray(parsed) ? parsed.filter(isMessage).slice(-CHAT_HISTORY_LIMIT) : [];
  } catch {
    return [];
  }
};

export const saveHistory = (messages: ChatMessage[]) => {
  try {
    sessionStorage.setItem(CHAT_HISTORY_KEY, JSON.stringify(messages.slice(-CHAT_HISTORY_LIMIT)));
  } catch {
    // Sin almacenamiento: la conversación dura lo que la página
  }
};
