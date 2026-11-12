import { useContext } from 'react';
import { ChatContext } from '../context/chatContext';

/** Estado del chat de Max compartido entre el navbar (lanzadores) y la ventana. */
export const useChat = () => {
  const value = useContext(ChatContext);
  if (!value) throw new Error('useChat debe usarse dentro de <ChatProvider>');
  return value;
};
