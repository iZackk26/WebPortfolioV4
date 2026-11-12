import { lazy, Suspense } from 'react';
import { useChat } from '../../hooks/useChat';
import { loadChatWindow } from './loadChatWindow';

const ChatWindow = lazy(() => loadChatWindow().then((m) => ({ default: m.ChatWindow })));

/** Monta la ventana de Max la primera vez que alguien la abre; después queda para animar el cierre. */
export function Chatbot() {
  const { requested } = useChat();
  if (!requested) return null;
  return (
    <Suspense fallback={null}>
      <ChatWindow />
    </Suspense>
  );
}
