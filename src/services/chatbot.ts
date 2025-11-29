export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}

export interface ChatbotResponse {
  success?: boolean;
  ok?: boolean;
  response?: string;
  output?: string;   // <— lo que devuelve tu n8n ahora
  answer?: string;
  message?: string;
  data?: { response?: string; output?: string; answer?: string; message?: string };
  error?: string;
}
export interface ChatbotRequest {
  question: string;
  sessionId: string;
}

class ChatbotService {
  private apiUrl: string;
  private apiKey: string;

  constructor() {
    this.apiUrl = import.meta.env.VITE_CHATBOT_API_URL || '';
    this.apiKey = import.meta.env.VITE_CHATBOT_API_KEY || '';
  }

  async sendMessage(question: string, sessionId: string): Promise<string> {
    if (!this.apiUrl || !this.apiKey) {
      throw new Error('Chatbot API configuration is missing');
    }
    try {
      const response = await fetch(this.apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-API-Key': this.apiKey, // tu curl funciona con este header
        },
        body: JSON.stringify({ question, sessionId } as ChatbotRequest),
      });

      if (!response.ok) {
        // 👇 CORRECCIÓN DEL TYPO
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: ChatbotResponse = await response.json();

      // ⚠️ No confíes en success; toma el texto desde cualquiera de las llaves comunes
      const text =
        data.output ??
        data.response ??
        data.answer ??
        data.message ??
        data.data?.output ??
        data.data?.response ??
        data.data?.answer ??
        data.data?.message;

      if (!text || !text.trim()) {
        // si existe bandera y vino en false, úsala para el mensaje
        const serverMsg = data.error ?? 'Empty response from chatbot';
        throw new Error(serverMsg);
      }

      return text;
    } catch (error) {
      console.error('Chatbot API error:', error);
      if (error instanceof Error) {
        throw new Error(`Failed to get response from chatbot: ${error.message}`);
      }
      throw new Error('Failed to get response from chatbot. Please try again later.');
    }
  }
  generateSessionId(): string {
    // Try to get existing session ID from localStorage
    const existingSessionId = localStorage.getItem('chatbot_session_id');

    if (existingSessionId) {
      return existingSessionId;
    }

    // Generate new session ID
    const newSessionId = crypto.randomUUID();
    localStorage.setItem('chatbot_session_id', newSessionId);

    return newSessionId;
  }

  saveMessages(messages: ChatMessage[]): void {
    try {
      sessionStorage.setItem('chatbot_messages', JSON.stringify(messages));
    } catch (error) {
      console.error('Failed to save messages:', error);
    }
  }

  loadMessages(): ChatMessage[] {
    try {
      const savedMessages = sessionStorage.getItem('chatbot_messages');

      if (savedMessages) {
        return JSON.parse(savedMessages);
      }
    } catch (error) {
      console.error('Failed to load messages:', error);
    }

    // Return default welcome message
    return [
      {
        role: 'assistant',
        content: '¡Hola! Soy Max, el asistente virtual de Isaac. ¿En qué puedo ayudarte?',
        timestamp: Date.now(),
      },
    ];
  }

  clearMessages(): void {
    try {
      sessionStorage.removeItem('chatbot_messages');
    } catch (error) {
      console.error('Failed to clear messages:', error);
    }
  }
}

export const chatbotService = new ChatbotService();
