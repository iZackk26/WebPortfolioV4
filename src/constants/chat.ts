/** Función del propio sitio que hace de proxy hacia n8n (api/chat.ts) */
export const CHAT_ENDPOINT = '/api/chat';

/** Mismo tope que valida el servidor (api/_lib/request.ts) */
export const CHAT_MAX_QUESTION_CHARS = 500;

export const CHAT_SESSION_KEY = 'chatbot_session_id';
export const CHAT_HISTORY_KEY = 'max_chat_history';
/** Mensajes que se conservan en la pestaña */
export const CHAT_HISTORY_LIMIT = 40;

/** Retrato de Max (pixel art) dentro del orbe */
export const MAX_AVATAR = '/max/max.webp';

/** Tiempos de la ventana: crece desde el lanzador y se recoge hacia él */
export const CHAT_MOTION = {
  openMs: 500,
  closeMs: 360,
  closeDelayMs: 70,
  /** Momento de la apertura en que entra el contenido */
  contentAt: 0.45,
  glide: 'cubic-bezier(0.32, 0.72, 0, 1)',
  accelerate: 'cubic-bezier(0.4, 0, 0.9, 0.4)',
} as const;
