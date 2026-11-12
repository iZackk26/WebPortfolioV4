import { useCallback, useEffect, useRef, useState } from 'react';
import type { ChatFailure, ChatMessage } from '../types/chat';
import { useToast } from './useToast';
import { askMax, ChatRequestError, getSessionId, loadHistory, resetSession, saveHistory } from '../services/chatbot';

const newId = () => crypto.randomUUID();

/**
 * Conversación con Max: historial de la pestaña, envío y espera cuando el servidor
 * aplica el límite. El límite real lo decide /api/chat; aquí se avisa con un toast y
 * se muestra la cuenta atrás en el campo.
 */
export const useChatbot = () => {
  const [messages, setMessages] = useState<ChatMessage[]>(loadHistory);
  const [sending, setSending] = useState(false);
  const [cooldown, setCooldown] = useState(0);
  const sessionId = useRef<string>('');
  const { show } = useToast();

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

      setSending(true);
      setMessages((list) => [...list, { id: newId(), role: 'user', content: question }]);
      try {
        const answer = await askMax(question, sessionId.current);
        setMessages((list) => [...list, { id: newId(), role: 'assistant', content: answer }]);
      } catch (error) {
        const failure: ChatFailure = error instanceof ChatRequestError ? error.failure : { kind: 'error' };
        if (failure.kind === 'rate_limited') {
          setCooldown(failure.retryAfter);
          show({ key: 'toast.rateLimited', tone: 'warning', countdown: failure.retryAfter });
        } else {
          show({ key: failure.kind === 'unavailable' ? 'toast.chatUnavailable' : 'toast.chatError', tone: 'error', id: 'chat-failure' });
        }
      } finally {
        setSending(false);
      }
    },
    [sending, cooldown, show],
  );

  /** Empieza de cero: el agente pierde el contexto anterior (incluido el idioma) */
  const reset = useCallback(() => {
    if (sending) return;
    sessionId.current = resetSession();
    setMessages([]);
  }, [sending]);

  return { messages, sending, cooldown, send, reset };
};
