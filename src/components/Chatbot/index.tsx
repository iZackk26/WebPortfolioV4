import { useChatbot } from '../../hooks/useChatbot';
import { ChatButton } from './ChatButton';
import { ChatWindow } from './ChatWindow';

export function Chatbot() {
  const {
    messages,
    isLoading,
    isOpen,
    sendMessage,
    toggleChat,
    closeChat,
  } = useChatbot();

  return (
    <>
      <ChatButton isOpen={isOpen} onClick={toggleChat} />
      <ChatWindow
        isOpen={isOpen}
        messages={messages}
        isLoading={isLoading}
        onClose={closeChat}
        onSendMessage={sendMessage}
      />
    </>
  );
}
