export interface Message {
  id: string;
  role: "user" | "assistant" | "error";
  content: string;
  timestamp: Date;
}

export interface ServerStatus {
  connected: boolean;
  provider: string | null;
  message: string;
}

export interface ChatResponse {
  success: boolean;
  data?: {
    response: string;
    conversationId: string;
  };
  error?: {
    message: string;
  };
}
