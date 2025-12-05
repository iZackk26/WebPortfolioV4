import { motion } from 'framer-motion';
import { Bot, User } from 'lucide-react';
import { ChatMessage as ChatMessageType } from '../../services/chatbot';

interface ChatMessageProps {
  message: ChatMessageType;
  index: number;
}

export function ChatMessage({ message, index }: ChatMessageProps) {
  const isUser = message.role === 'user';

  // Simple markdown parser for basic formatting
  const parseMarkdown = (text: string) => {
    // Replace **bold** with <strong>
    let parsed = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

    // Replace *italic* with <em>
    parsed = parsed.replace(/\*(.*?)\*/g, '<em>$1</em>');

    // Replace - list items
    parsed = parsed.replace(/^- (.+)$/gm, '<li>$1</li>');

    // Wrap consecutive <li> items in <ul>
    parsed = parsed.replace(/(<li>.*<\/li>\n?)+/g, '<ul class="list-disc ml-4 my-2">$&</ul>');

    // Replace line breaks with <br>
    parsed = parsed.replace(/\n/g, '<br>');

    return parsed;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className={`flex gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'} mb-4`}
    >
      <div
        className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
          isUser
            ? 'bg-gradient-to-br from-[rgb(var(--color-accent))] to-[rgb(var(--color-accent-hover))]'
            : 'bg-[rgb(var(--color-card))] border border-[rgb(var(--color-border))]'
        }`}
      >
        {isUser ? (
          <User className="w-5 h-5 text-white" />
        ) : (
          <Bot className="w-5 h-5 text-[rgb(var(--color-accent))]" />
        )}
      </div>

      <div
        className={`flex-1 max-w-[75%] rounded-2xl px-4 py-3 ${
          isUser
            ? 'bg-gradient-to-br from-[rgb(var(--color-accent))] to-[rgb(var(--color-accent-hover))] text-white'
            : 'bg-[rgb(var(--color-card))] border border-[rgb(var(--color-border))] text-[rgb(var(--color-text-primary))]'
        }`}
      >
        <div
          className="text-sm leading-relaxed"
          dangerouslySetInnerHTML={{ __html: parseMarkdown(message.content) }}
        />
      </div>
    </motion.div>
  );
}
