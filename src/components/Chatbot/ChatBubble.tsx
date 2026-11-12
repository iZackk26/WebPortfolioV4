import { memo } from 'react';
import type { ChatRole } from '../../types/chat';
import { renderChatMarkdown } from '../../utils/chatMarkdown';
import { MaxOrb } from './MaxOrb';

interface ChatBubbleProps {
  role: ChatRole;
  content: string;
}

/** Burbuja de mensaje. Lo del visitante va como texto plano; lo de Max con markdown seguro. */
export const ChatBubble = memo(({ role, content }: ChatBubbleProps) => {
  if (role === 'user') {
    return (
      <div className="max-row is-me">
        <div className="max-bubble">{content}</div>
      </div>
    );
  }
  return (
    <div className="max-row is-bot">
      <MaxOrb />
      <div className="max-bubble">{renderChatMarkdown(content)}</div>
    </div>
  );
});

ChatBubble.displayName = 'ChatBubble';
