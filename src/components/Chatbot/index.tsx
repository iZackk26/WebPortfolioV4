import { lazy, Suspense, useEffect, useState } from 'react';
import { useChatbot } from '../../hooks/useChatbot';
import { ChatButton } from './ChatButton';
import { retryImport } from '../../utils/retryImport';

// La ventana (con framer-motion) solo se descarga cuando alguien abre el chat
const loadChatWindow = () => retryImport(() => import('./ChatWindow'));
const ChatWindow = lazy(() => loadChatWindow().then((m) => ({ default: m.ChatWindow })));

export function Chatbot() {
  const { messages, isLoading, isOpen, sendMessage, toggleChat, closeChat } = useChatbot();
  const [requested, setRequested] = useState(false);

  // Una vez abierto queda montado para que la animación de cierre funcione
  useEffect(() => {
    if (isOpen) setRequested(true);
  }, [isOpen]);

  return (
    <>
      <ChatButton isOpen={isOpen} onClick={toggleChat} onIntent={loadChatWindow} />
      {requested && (
        <Suspense fallback={null}>
          <ChatWindow
            isOpen={isOpen}
            messages={messages}
            isLoading={isLoading}
            onClose={closeChat}
            onSendMessage={sendMessage}
          />
        </Suspense>
      )}
    </>
  );
}
