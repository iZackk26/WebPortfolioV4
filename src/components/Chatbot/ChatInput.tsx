import { useState, KeyboardEvent } from 'react';
import { Send } from 'lucide-react';
import { motion } from 'framer-motion';

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled: boolean;
}

export function ChatInput({ onSend, disabled }: ChatInputProps) {
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
    <div className="border-t border-[#414868] p-4 bg-[#1a1b26]">
      <div className="flex gap-2 items-center">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Escribe tu mensaje..."
          disabled={disabled}
          className="flex-1 bg-[#24283b] text-[#c0caf5] rounded-xl px-4 py-3 text-sm
                     focus:outline-none focus:ring-2 focus:ring-[#7aa2f7]
                     disabled:opacity-50 disabled:cursor-not-allowed
                     placeholder:text-[#565f89]"
        />

        <motion.button
          whileHover={{ scale: disabled ? 1 : 1.05 }}
          whileTap={{ scale: disabled ? 1 : 0.95 }}
          onClick={handleSend}
          disabled={disabled || !input.trim()}
          className="bg-gradient-to-br from-[#7aa2f7] to-[#bb9af7] text-white
                     rounded-xl p-3 hover:shadow-lg transition-all
                     disabled:opacity-50 disabled:cursor-not-allowed
                     disabled:hover:shadow-none"
        >
          <Send className="w-5 h-5" />
        </motion.button>
      </div>
    </div>
  );
}
