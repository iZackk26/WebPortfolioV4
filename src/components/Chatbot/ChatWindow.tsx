import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Bot, Loader2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
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
  const { t } = useTranslation();
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
                       bottom-0 right-0 left-0 md:bottom-24 md:right-6 md:left-auto
                       w-full md:w-[380px] max-h-[100dvh] md:h-[500px]
                       bg-[rgb(var(--color-card))] rounded-t-2xl md:rounded-2xl shadow-2xl
                       flex flex-col overflow-hidden
                       border-t border-[rgb(var(--color-border))] md:border"
            style={{
              height: 'auto',
              maxHeight: '85vh',
              paddingBottom: 'max(env(safe-area-inset-bottom, 0px), 0px)'
            }}
          >
            {/* Header */}
            <div className="bg-gradient-to-br from-[rgb(var(--color-accent))] to-[rgb(var(--color-accent-hover))] p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[rgb(var(--color-bg-primary))] flex items-center justify-center border border-[rgb(var(--color-border))]">
                  <Bot className="w-6 h-6 text-[rgb(var(--color-accent))]" />
                </div>
                <div>
                  <h3 className="text-white font-semibold">Max</h3>
                  <p className="text-white/80 text-xs">{t('chat.subtitle')}</p>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                aria-label={t('chat.close')}
                className="text-white/80 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </motion.button>
            </div>

            {/* Messages Area */}
            <div
              ref={messagesContainerRef}
              className="flex-1 overflow-y-auto p-4 bg-[rgb(var(--color-bg-secondary))] scrollbar-thin scrollbar-thumb-[rgb(var(--color-border))] scrollbar-track-transparent min-h-0"
              style={{
                maxHeight: 'calc(85vh - 140px)',
                overscrollBehavior: 'contain'
              }}
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
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[rgb(var(--color-card))] border border-[rgb(var(--color-border))] flex items-center justify-center">
                    <Bot className="w-5 h-5 text-[rgb(var(--color-accent))]" />
                  </div>
                  <div className="bg-[rgb(var(--color-card))] border border-[rgb(var(--color-border))] rounded-2xl px-4 py-3">
                    <div className="flex items-center gap-2 text-[rgb(var(--color-accent))]">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span className="text-sm">{t('chat.typing')}</span>
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
