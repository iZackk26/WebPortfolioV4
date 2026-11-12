import { MessageCircle, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface ChatButtonProps {
  isOpen: boolean;
  onClick: () => void;
  /** Hover o foco: buen momento para precargar la ventana */
  onIntent?: () => void;
}

/** Botón flotante del chat. Animaciones en CSS (chat-button.css): no carga framer-motion. */
export function ChatButton({ isOpen, onClick, onIntent }: ChatButtonProps) {
  const { t } = useTranslation();

  return (
    <button
      type="button"
      onClick={onClick}
      onPointerEnter={onIntent}
      onFocus={onIntent}
      data-open={isOpen}
      className="chat-fab fixed bottom-6 right-6 z-50 flex h-14 w-14 cursor-pointer items-center justify-center rounded-full
                 bg-gradient-to-br from-[rgb(var(--color-accent))] to-[rgb(var(--color-accent-hover))]
                 shadow-2xl md:h-16 md:w-16"
      aria-label={isOpen ? t('chat.close') : t('chat.open')}
    >
      <span className="chat-fab-pulse absolute inset-0 rounded-full bg-gradient-to-br from-[rgb(var(--color-accent))] to-[rgb(var(--color-accent-hover))]" aria-hidden="true" />
      <span className="relative z-10 grid h-6 w-6 md:h-7 md:w-7" aria-hidden="true">
        <MessageCircle className="chat-fab-icon is-chat h-full w-full text-white" />
        <X className="chat-fab-icon is-close h-full w-full text-white" />
      </span>
      {!isOpen && (
        <span className="chat-fab-dot absolute -right-1 -top-1 h-3 w-3 rounded-full border-2 border-white bg-red-500 md:h-4 md:w-4" aria-hidden="true" />
      )}
    </button>
  );
}
