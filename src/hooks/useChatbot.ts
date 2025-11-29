import { useState, useEffect, useCallback } from 'react';
import { chatbotService, ChatMessage } from '../services/chatbot';

export function useChatbot() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [sessionId, setSessionId] = useState('');
  const [error, setError] = useState<string | null>(null);

  // Initialize session ID and load messages
  useEffect(() => {
    const id = chatbotService.generateSessionId();
    setSessionId(id);

    const loadedMessages = chatbotService.loadMessages();
    setMessages(loadedMessages);
  }, []);

  // Save messages whenever they change
  useEffect(() => {
    if (messages.length > 0) {
      chatbotService.saveMessages(messages);
    }
  }, [messages]);

  const sendMessage = useCallback(
    async (content: string) => {
      if (!content.trim() || isLoading) return;

      setError(null);

      // Add user message
      const userMessage: ChatMessage = {
        role: 'user',
        content: content.trim(),
        timestamp: Date.now(),
      };

      setMessages((prev) => [...prev, userMessage]);
      setIsLoading(true);

      try {
        // Get bot response
        const response = await chatbotService.sendMessage(content.trim(), sessionId);

        // Add assistant message
        const assistantMessage: ChatMessage = {
          role: 'assistant',
          content: response,
          timestamp: Date.now(),
        };

        setMessages((prev) => [...prev, assistantMessage]);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Something went wrong';
        setError(errorMessage);

        // Add error message from assistant
        const errorResponse: ChatMessage = {
          role: 'assistant',
          content: `Lo siento, hubo un error al procesar tu mensaje. ${errorMessage}`,
          timestamp: Date.now(),
        };

        setMessages((prev) => [...prev, errorResponse]);
      } finally {
        setIsLoading(false);
      }
    },
    [isLoading, sessionId]
  );

  const toggleChat = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const closeChat = useCallback(() => {
    setIsOpen(false);
  }, []);

  const openChat = useCallback(() => {
    setIsOpen(true);
  }, []);

  const clearChat = useCallback(() => {
    chatbotService.clearMessages();
    const defaultMessages = chatbotService.loadMessages();
    setMessages(defaultMessages);
  }, []);

  return {
    messages,
    isLoading,
    isOpen,
    error,
    sendMessage,
    toggleChat,
    closeChat,
    openChat,
    clearChat,
  };
}
