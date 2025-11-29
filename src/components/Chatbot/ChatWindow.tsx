import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Bot, Loader2 } from 'lucide-react';
import { ChatMessage } from './ChatMessage';
import { ChatInput } from './ChatInput';
import { ChatMessage as ChatMessageType } from '../../services/chatbot';

interface ChatWindowProps {
  isOpen: boolean;
  messages: ChatMessageType[];
  isLoading: boolean;
  onClose: () => void;
  onSendMessage: (message: string) => void;
}

export function ChatWindow({ isOpen, messages, isLoading, onClose, onSendMessage }: ChatWindowProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isLoading]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop for mobile */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
            onClick={onClose}
          />

          {/* Chat Window */}
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="fixed z-50
                       bottom-4 right-4 left-4 md:bottom-24 md:right-6 md:left-auto
                       w-auto md:w-[380px] h-[calc(100vh-2rem)] md:h-[500px]
                       bg-[#24283b] rounded-2xl shadow-2xl
                       flex flex-col overflow-hidden
                       border border-[#414868]"
          >
            {/* Header */}
            <div className="bg-gradient-to-br from-[#7aa2f7] to-[#bb9af7] p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#1a1b26] flex items-center justify-center">
                  <Bot className="w-6 h-6 text-[#7aa2f7]" />
                </div>
                <div>
                  <h3 className="text-white font-semibold">Max</h3>
                  <p className="text-white/80 text-xs">Isaac's AI Assistant</p>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className="text-white/80 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </motion.button>
            </div>

            {/* Messages Area */}
            <div
              ref={messagesContainerRef}
              className="flex-1 overflow-y-auto p-4 bg-[#1f2335] scrollbar-thin scrollbar-thumb-[#414868] scrollbar-track-transparent"
            >
              {messages.map((message, index) => (
                <ChatMessage key={`${message.timestamp}-${index}`} message={message} index={index} />
              ))}

              {/* Loading Indicator */}
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex gap-3 mb-4"
                >
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#1a1b26] border border-[#414868] flex items-center justify-center">
                    <Bot className="w-5 h-5 text-[#7aa2f7]" />
                  </div>
                  <div className="bg-[#1a1b26] border border-[#414868] rounded-2xl px-4 py-3">
                    <div className="flex items-center gap-2 text-[#7aa2f7]">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span className="text-sm">Escribiendo...</span>
                    </div>
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <ChatInput onSend={onSendMessage} disabled={isLoading} />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
