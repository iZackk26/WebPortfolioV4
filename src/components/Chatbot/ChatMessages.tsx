import { useEffect, useMemo, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import type { ChatMessage } from '../../types/chat';
import { ChatBubble } from './ChatBubble';
import { MaxOrb } from './MaxOrb';

interface ChatMessagesProps {
  messages: ChatMessage[];
  sending: boolean;
  cooldown: number;
  onAsk: (question: string) => void;
}

/** Conversación: saludo, mensajes, "escribiendo…" y sugerencias pendientes. Los avisos van en toasts. */
export const ChatMessages = ({ messages, sending, cooldown, onAsk }: ChatMessagesProps) => {
  const { t } = useTranslation();
  const endRef = useRef<HTMLDivElement>(null);
  const suggestions = t('chat.suggestions', { returnObjects: true }) as string[];
  const asked = useMemo(() => new Set(messages.filter((m) => m.role === 'user').map((m) => m.content)), [messages]);
  const pending = suggestions.filter((q) => !asked.has(q));

  useEffect(() => {
    endRef.current?.scrollIntoView({ block: 'end', behavior: 'smooth' });
  }, [messages.length, sending]);

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
