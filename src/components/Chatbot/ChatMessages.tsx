import { useEffect, useMemo, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import type { ChatFailure, ChatMessage } from '../../types/chat';
import { ChatBubble } from './ChatBubble';
import { MaxOrb } from './MaxOrb';

interface ChatMessagesProps {
  messages: ChatMessage[];
  sending: boolean;
  failure: ChatFailure | null;
  cooldown: number;
  onAsk: (question: string) => void;
}

/** Conversación: saludo, mensajes, "escribiendo…", avisos y sugerencias pendientes. */
export const ChatMessages = ({ messages, sending, failure, cooldown, onAsk }: ChatMessagesProps) => {
  const { t } = useTranslation();
  const endRef = useRef<HTMLDivElement>(null);
  const suggestions = t('chat.suggestions', { returnObjects: true }) as string[];
  const asked = useMemo(() => new Set(messages.filter((m) => m.role === 'user').map((m) => m.content)), [messages]);
  const pending = suggestions.filter((q) => !asked.has(q));

  useEffect(() => {
    endRef.current?.scrollIntoView({ block: 'end', behavior: 'smooth' });
  }, [messages.length, sending, failure]);

  const notice =
    failure?.kind === 'rate_limited'
      ? t('chat.rateLimited', { seconds: cooldown || failure.retryAfter })
      : failure?.kind === 'unavailable'
        ? t('chat.unavailable')
        : failure
          ? t('chat.error')
          : null;

  return (
    <div className="max-chat-msgs" aria-live="polite">
      {/* El saludo sale de las traducciones: cambia con el idioma y no se guarda */}
      <ChatBubble role="assistant" content={t('chat.welcome')} />
      {messages.map((message) => (
        <ChatBubble key={message.id} role={message.role} content={message.content} />
      ))}
      {sending && (
        <div className="max-row is-bot">
          <MaxOrb />
          <div className="max-bubble max-typing" role="status" aria-label={t('chat.typing')}>
            <i />
            <i />
            <i />
          </div>
        </div>
      )}
      {notice && <ChatBubble role="assistant" content={notice} tone="notice" />}
      {!sending && pending.length > 0 && (
        <div className="max-chips">
          {pending.map((question) => (
            <button key={question} type="button" className="max-chip silver-fill" onClick={() => onAsk(question)} disabled={cooldown > 0}>
              {question}
            </button>
          ))}
        </div>
      )}
      <div ref={endRef} />
    </div>
  );
};
