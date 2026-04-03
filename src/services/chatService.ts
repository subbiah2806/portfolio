/**
 * Chat Service
 * Handles communication with Anthropic AI API for chatbot functionality
 */

import Anthropic from '@anthropic-ai/sdk';
import type {
  ChatMessage,
  ChatServiceConfig,
  SendMessageOptions,
  ChatServiceResponse,
} from '../types';

// Constants
const DEFAULT_MODEL = 'claude-sonnet-4-5-20250929';
const DEFAULT_MAX_TOKENS = 1024;
const DEFAULT_TEMPERATURE = 1.0;
const MAX_RETRY_ATTEMPTS = 3;
const RETRY_DELAY_MS = 1000;

/**
 * ChatService class for managing AI chat interactions
 */
export class ChatService {
  private client: Anthropic;
  private config: Required<ChatServiceConfig>;

  constructor(config: ChatServiceConfig) {
    this.config = {
      apiKey: config.apiKey,
      model: config.model || DEFAULT_MODEL,
      maxTokens: config.maxTokens || DEFAULT_MAX_TOKENS,
      temperature: config.temperature || DEFAULT_TEMPERATURE,
    };

    this.client = new Anthropic({
      apiKey: this.config.apiKey,
      dangerouslyAllowBrowser: true, // Required for client-side usage
    });
  }

  /**
   * Send a message and receive a streaming response
   */
  async sendMessage(
    messages: ChatMessage[],
    options: SendMessageOptions = {}
  ): Promise<ChatServiceResponse> {
    const { onStream, onComplete, onError } = options;

    try {
      // Convert ChatMessage[] to Anthropic message format
      const anthropicMessages = messages.map((msg) => ({
        role: msg.role,
        content: msg.content,
      }));

      // Create unique ID for the response message
      const messageId = this.generateMessageId();
      let accumulatedText = '';

      // Start streaming
      const stream = this.client.messages.stream({
        model: this.config.model,
        max_tokens: this.config.maxTokens,
        temperature: this.config.temperature,
        messages: anthropicMessages,
      });

      // Handle text streaming
      stream.on('text', (textDelta: string) => {
        accumulatedText += textDelta;
        if (onStream) {
          onStream(textDelta);
        }
      });

      // Handle errors during streaming
      stream.on('error', (error: Error) => {
        if (onError) {
          onError(error);
        }
      });

      // Wait for the stream to complete
      const finalMessage = await stream.finalMessage();

      // Extract the final text content
      const finalText =
        finalMessage.content[0]?.type === 'text' ? finalMessage.content[0].text : accumulatedText;

      const chatMessage: ChatMessage = {
        id: messageId,
        role: 'assistant',
        content: finalText,
        timestamp: new Date(),
        isStreaming: false,
      };

      if (onComplete) {
        onComplete(chatMessage);
      }

      return {
        message: chatMessage,
      };
    } catch (error) {
      const errorMessage = error instanceof Error ? error : new Error('Unknown error occurred');

      if (onError) {
        onError(errorMessage);
      }

      throw errorMessage;
    }
  }

  /**
   * Send a message with retry logic
   */
  async sendMessageWithRetry(
    messages: ChatMessage[],
    options: SendMessageOptions = {},
    attempt = 1
  ): Promise<ChatServiceResponse> {
    try {
      return await this.sendMessage(messages, options);
    } catch (error) {
      if (attempt >= MAX_RETRY_ATTEMPTS) {
        throw error;
      }

      // Exponential backoff
      const delay = RETRY_DELAY_MS * Math.pow(2, attempt - 1);
      await this.sleep(delay);

      return this.sendMessageWithRetry(messages, options, attempt + 1);
    }
  }

  /**
   * Send a non-streaming message (for simpler use cases)
   */
  async sendMessageNonStreaming(messages: ChatMessage[]): Promise<ChatServiceResponse> {
    try {
      const anthropicMessages = messages.map((msg) => ({
        role: msg.role,
        content: msg.content,
      }));

      const response = await this.client.messages.create({
        model: this.config.model,
        max_tokens: this.config.maxTokens,
        temperature: this.config.temperature,
        messages: anthropicMessages,
      });

      const messageId = this.generateMessageId();
      const content = response.content[0]?.type === 'text' ? response.content[0].text : '';

      const chatMessage: ChatMessage = {
        id: messageId,
        role: 'assistant',
        content,
        timestamp: new Date(),
        isStreaming: false,
      };

      return {
        message: chatMessage,
      };
    } catch (error) {
      const errorMessage = error instanceof Error ? error : new Error('Unknown error occurred');
      throw errorMessage;
    }
  }

  /**
   * Generate a unique message ID
   */
  private generateMessageId(): string {
    return `msg_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
  }

  /**
   * Sleep utility for retry logic
   */
  private sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  /**
   * Validate API key
   */
  static isValidApiKey(apiKey: string): boolean {
    return apiKey.startsWith('sk-ant-') && apiKey.length > 20;
  }

  /**
   * Update configuration
   */
  updateConfig(config: Partial<ChatServiceConfig>): void {
    this.config = {
      ...this.config,
      ...config,
    };

    if (config.apiKey) {
      this.client = new Anthropic({
        apiKey: config.apiKey,
        dangerouslyAllowBrowser: true,
      });
    }
  }
}

/**
 * Create a singleton instance of ChatService
 */
let chatServiceInstance: ChatService | null = null;

export const getChatService = (config?: ChatServiceConfig): ChatService => {
  if (!chatServiceInstance && config) {
    chatServiceInstance = new ChatService(config);
  }

  if (!chatServiceInstance) {
    throw new Error('ChatService not initialized. Please provide a config on first call.');
  }

  return chatServiceInstance;
};

/**
 * Initialize ChatService with environment variables
 */
export const initializeChatService = (): ChatService => {
  const apiKey = import.meta.env.VITE_ANTHROPIC_API_KEY;

  if (!apiKey || !ChatService.isValidApiKey(apiKey)) {
    throw new Error('Invalid or missing VITE_ANTHROPIC_API_KEY. Please set it in your .env file.');
  }

  return getChatService({
    apiKey,
    model: DEFAULT_MODEL,
    maxTokens: DEFAULT_MAX_TOKENS,
    temperature: DEFAULT_TEMPERATURE,
  });
};

export default ChatService;
