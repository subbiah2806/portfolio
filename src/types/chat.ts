/**
 * Chat Types
 * TypeScript type definitions for the AI chatbot feature
 */

/**
 * Represents a single chat message
 */
export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  isStreaming?: boolean;
}

/**
 * Represents the overall chat state
 */
export interface ChatState {
  messages: ChatMessage[];
  isLoading: boolean;
  error: string | null;
}

/**
 * Configuration for the chat service
 */
export interface ChatServiceConfig {
  apiKey: string;
  model?: string;
  maxTokens?: number;
  temperature?: number;
}

/**
 * Options for sending a chat message
 */
export interface SendMessageOptions {
  onStream?: (text: string) => void;
  onComplete?: (message: ChatMessage) => void;
  onError?: (error: Error) => void;
}

/**
 * Response from the chat service
 */
export interface ChatServiceResponse {
  message: ChatMessage;
  error?: Error;
}
