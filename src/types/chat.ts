export type ChatRole = 'user' | 'assistant';

export interface ChatMessage {
  id: string;
  role: ChatRole;
  content: string;
}

/** Desde dónde se abrió el chat: define hacia qué lado se ancla la ventana */
export type ChatAnchor = 'right' | 'left';

/** Errores que el chat sabe explicar al visitante */
export type ChatFailure = { kind: 'rate_limited'; retryAfter: number } | { kind: 'unavailable' } | { kind: 'error' };
