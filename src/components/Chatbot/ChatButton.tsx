import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X } from 'lucide-react';

interface ChatButtonProps {
  isOpen: boolean;
  onClick: () => void;
}

export function ChatButton({ isOpen, onClick }: ChatButtonProps) {
  return (
    <motion.button
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 0.5, type: 'spring', stiffness: 260, damping: 20 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={onClick}
      className="fixed bottom-6 right-6 z-50 w-14 h-14 md:w-16 md:h-16
                 bg-gradient-to-br from-[#7aa2f7] to-[#bb9af7]
                 rounded-full shadow-2xl
                 flex items-center justify-center
                 cursor-pointer
                 transition-all duration-300
                 hover:shadow-[0_0_30px_rgba(122,162,247,0.5)]
                 group"
      aria-label={isOpen ? 'Close chat' : 'Open chat'}
    >
      {/* Pulse effect */}
      <motion.div
        className="absolute inset-0 rounded-full bg-gradient-to-br from-[#7aa2f7] to-[#bb9af7]"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.5, 0, 0.5],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Icon */}
      <div className="relative z-10">
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X className="w-6 h-6 md:w-7 md:h-7 text-white" />
            </motion.div>
          ) : (
            <motion.div
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <MessageCircle className="w-6 h-6 md:w-7 md:h-7 text-white" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Notification dot (optional - can be used for unread messages) */}
      {!isOpen && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute -top-1 -right-1 w-3 h-3 md:w-4 md:h-4 bg-red-500 rounded-full border-2 border-white"
        />
      )}
    </motion.button>
  );
}
