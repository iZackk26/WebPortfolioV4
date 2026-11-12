import { useState, KeyboardEvent } from 'react';
import { Send } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled: boolean;
}

export function ChatInput({ onSend, disabled }: ChatInputProps) {
  const { t } = useTranslation();
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (input.trim() && !disabled) {
      onSend(input);
      setInput('');
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="border-t border-[rgb(var(--color-border))] p-3 md:p-4 bg-[rgb(var(--color-card))] shrink-0">
      <div className="flex gap-2 items-center">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={t('chat.placeholder')}
          disabled={disabled}
          className="flex-1 bg-[rgb(var(--color-bg-secondary))] text-[rgb(var(--color-text-primary))] rounded-xl px-3 md:px-4 py-2 md:py-3 text-sm
                     focus:outline-none focus:ring-2 focus:ring-[rgb(var(--color-accent))]
                     disabled:opacity-50 disabled:cursor-not-allowed
                     placeholder:text-[rgb(var(--color-text-secondary))]
                     touch-manipulation border border-[rgb(var(--color-border))]"
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
        />

        <motion.button
          whileHover={{ scale: disabled ? 1 : 1.05 }}
          whileTap={{ scale: disabled ? 1 : 0.95 }}
          onClick={handleSend}
          aria-label={t('chat.send')}
          disabled={disabled || !input.trim()}
          className="bg-gradient-to-br from-[rgb(var(--color-accent))] to-[rgb(var(--color-accent-hover))] text-white
                     rounded-xl p-2.5 md:p-3 hover:shadow-lg transition-all
                     disabled:opacity-50 disabled:cursor-not-allowed
                     disabled:hover:shadow-none
                     touch-manipulation shrink-0"
        >
          <Send className="w-5 h-5" />
        </motion.button>
      </div>
    </div>
  );
}
