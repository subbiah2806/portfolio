/**
 * useChatState Hook
 * Custom hook for managing chat state and interactions
 */

import { useState, useCallback, useRef, useEffect } from 'react';
import type { ChatMessage, ChatState } from '../types';
import { initializeChatService } from '../services/chatService';

const INITIAL_STATE: ChatState = {
  messages: [],
  isLoading: false,
  error: null,
};

/**
 * Custom hook for managing chat state
 */
export function useChatState() {
  const [state, setState] = useState<ChatState>(INITIAL_STATE);
  const chatServiceRef = useRef(initializeChatService());
  const streamingMessageIdRef = useRef<string | null>(null);

  /**
   * Generate unique message ID
   */
  const generateMessageId = useCallback((): string => {
    return `msg_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
  }, []);

  /**
   * Add a new message to the chat
   */
  const addMessage = useCallback((message: ChatMessage): void => {
    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, message],
    }));
  }, []);

  /**
   * Update an existing message
   */
  const updateMessage = useCallback((messageId: string, updates: Partial<ChatMessage>): void => {
    setState((prev) => ({
      ...prev,
      messages: prev.messages.map((msg) => (msg.id === messageId ? { ...msg, ...updates } : msg)),
    }));
  }, []);

  /**
   * Set loading state
   */
  const setLoading = useCallback((isLoading: boolean): void => {
    setState((prev) => ({ ...prev, isLoading }));
  }, []);

  /**
   * Set error state
   */
  const setError = useCallback((error: string | null): void => {
    setState((prev) => ({ ...prev, error, isLoading: false }));
  }, []);

  /**
   * Clear error state
   */
  const clearError = useCallback((): void => {
    setState((prev) => ({ ...prev, error: null }));
  }, []);

  /**
   * Send a message and handle streaming response
   */
  const sendMessage = useCallback(
    async (content: string): Promise<void> => {
      if (!content.trim()) {
        return;
      }

      // Clear any previous errors
      clearError();

      // Create user message
      const userMessage: ChatMessage = {
        id: generateMessageId(),
        role: 'user',
        content: content.trim(),
        timestamp: new Date(),
        isStreaming: false,
      };

      // Optimistic UI update - add user message immediately
      addMessage(userMessage);
      setLoading(true);

      try {
        // Create placeholder for assistant message
        const assistantMessageId = generateMessageId();
        const assistantMessage: ChatMessage = {
          id: assistantMessageId,
          role: 'assistant',
          content: '',
          timestamp: new Date(),
          isStreaming: true,
        };

        // Add streaming message placeholder
        addMessage(assistantMessage);
        streamingMessageIdRef.current = assistantMessageId;

        // Get all messages for context
        const messagesForApi = [...state.messages, userMessage];

        // Send message with streaming
        await chatServiceRef.current.sendMessageWithRetry(messagesForApi, {
          onStream: (textDelta: string) => {
            // Update message content as it streams
            updateMessage(assistantMessageId, {
              content: textDelta,
            });
          },
          onComplete: (finalMessage: ChatMessage) => {
            // Mark streaming as complete
            updateMessage(assistantMessageId, {
              content: finalMessage.content,
              isStreaming: false,
              timestamp: new Date(),
            });
            streamingMessageIdRef.current = null;
            setLoading(false);
          },
          onError: (error: Error) => {
            // Remove placeholder message on error
            setState((prev) => ({
              ...prev,
              messages: prev.messages.filter((msg) => msg.id !== assistantMessageId),
            }));
            streamingMessageIdRef.current = null;
            setError(error.message || 'Failed to send message. Please try again.');
          },
        });
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : 'An unexpected error occurred';
        setError(errorMessage);
      }
    },
    [state.messages, generateMessageId, addMessage, updateMessage, setLoading, setError, clearError]
  );

  /**
   * Clear all messages and reset chat
   */
  const clearMessages = useCallback((): void => {
    setState(INITIAL_STATE);
    streamingMessageIdRef.current = null;
  }, []);

  /**
   * Cleanup on unmount
   */
  useEffect(() => {
    return () => {
      // Cleanup any ongoing streaming
      streamingMessageIdRef.current = null;
    };
  }, []);

  return {
    messages: state.messages,
    isLoading: state.isLoading,
    error: state.error,
    sendMessage,
    clearMessages,
    clearError,
  };
}

export default useChatState;
