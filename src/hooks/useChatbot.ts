import { useCallback, useEffect, useRef, useState } from 'react';
import type { ChatFailure, ChatMessage } from '../types/chat';
import { askMax, ChatRequestError, getSessionId, loadHistory, saveHistory } from '../services/chatbot';

const newId = () => crypto.randomUUID();

/**
 * Conversación con Max: historial de la pestaña, envío y espera cuando el servidor
 * aplica el límite. El límite real lo decide /api/chat; aquí solo se muestra la cuenta atrás.
 */
export const useChatbot = () => {
  const [messages, setMessages] = useState<ChatMessage[]>(loadHistory);
  const [sending, setSending] = useState(false);
  const [failure, setFailure] = useState<ChatFailure | null>(null);
  const [cooldown, setCooldown] = useState(0);
  const sessionId = useRef<string>('');

  useEffect(() => saveHistory(messages), [messages]);

  // Cuenta atrás del límite: enviar vuelve solo cuando el servidor lo permite
  useEffect(() => {
    if (cooldown <= 0) return;
    const timer = setTimeout(() => setCooldown((s) => s - 1), 1000);
    return () => clearTimeout(timer);
  }, [cooldown]);

  const send = useCallback(
    async (text: string) => {
      const question = text.trim();
      if (!question || sending || cooldown > 0) return;
      if (!sessionId.current) sessionId.current = getSessionId();

      setFailure(null);
      setSending(true);
      setMessages((list) => [...list, { id: newId(), role: 'user', content: question }]);
      try {
        const answer = await askMax(question, sessionId.current);
        setMessages((list) => [...list, { id: newId(), role: 'assistant', content: answer }]);
      } catch (error) {
        const next: ChatFailure = error instanceof ChatRequestError ? error.failure : { kind: 'error' };
        setFailure(next);
        if (next.kind === 'rate_limited') setCooldown(next.retryAfter);
      } finally {
        setSending(false);
      }
    },
    [sending, cooldown],
  );

  return { messages, sending, failure, cooldown, send };
};
