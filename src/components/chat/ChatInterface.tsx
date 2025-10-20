/**
 * ChatInterface Component
 * Main container for the AI chatbot interface
 */

import React, { useRef, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, AlertCircle, Trash2 } from 'lucide-react';
import { ChatMessage } from './ChatMessage';
import { ChatInput } from './ChatInput';
import { useChatState } from '../../hooks/useChatState';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { Card, CardContent, CardHeader, CardTitle } from '@subbiah/reusable/components/ui/card';
import { Button } from '@subbiah/reusable/components/ui/button';

interface ChatInterfaceProps {
  className?: string;
  welcomeMessage?: string;
  title?: string;
}

const DEFAULT_TITLE = 'AI Chat Assistant';
const DEFAULT_WELCOME_MESSAGE =
  "Hi! I'm your AI assistant. Ask me anything about web development, technology, or this portfolio.";
const SCROLL_BEHAVIOR: ScrollBehavior = 'smooth';

/**
 * ChatInterface - Main chat container component
 */
export const ChatInterface: React.FC<ChatInterfaceProps> = ({
  className = '',
  welcomeMessage = DEFAULT_WELCOME_MESSAGE,
  title = DEFAULT_TITLE,
}) => {
  const { messages, isLoading, error, sendMessage, clearMessages, clearError } = useChatState();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  /**
   * Auto-scroll to bottom when new messages arrive
   * Memoized to prevent recreation on every render
   */
  const scrollToBottom = useCallback((): void => {
    messagesEndRef.current?.scrollIntoView({ behavior: SCROLL_BEHAVIOR });
  }, []);

  /**
   * Scroll to bottom on new messages
   */
  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  /**
   * Handle message send - memoized to maintain stable reference
   */
  const handleSendMessage = useCallback(
    async (message: string): Promise<void> => {
      await sendMessage(message);
    },
    [sendMessage]
  );

  /**
   * Handle clear chat - memoized to maintain stable reference
   */
  const handleClearChat = useCallback((): void => {
    if (window.confirm('Are you sure you want to clear all messages?')) {
      clearMessages();
    }
  }, [clearMessages]);

  /**
   * Handle suggested prompt click - memoized to maintain stable reference
   */
  const handleSuggestedPrompt = useCallback(
    (prompt: string) => {
      void handleSendMessage(prompt);
    },
    [handleSendMessage]
  );

  const hasMessages = messages.length > 0;

  return (
    <Card className={`flex h-full flex-col ${className}`} role="region" aria-label="Chat interface">
      {/* Header */}
      <CardHeader className="flex flex-row items-center justify-between space-y-0 border-b pb-4">
        <CardTitle className="flex items-center gap-2 text-xl font-semibold">
          <MessageSquare className="h-5 w-5 text-primary" aria-hidden="true" />
          {title}
        </CardTitle>

        {/* Clear Chat Button */}
        {hasMessages && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClearChat}
            className="text-muted-foreground hover:text-destructive"
            aria-label="Clear all chat messages"
          >
            <Trash2 className="h-4 w-4" aria-hidden="true" />
            <span className="ml-2 hidden sm:inline">Clear</span>
          </Button>
        )}
      </CardHeader>

      <CardContent className="flex flex-1 flex-col gap-4 overflow-hidden p-4">
        {/* Messages Container */}
        <div
          ref={messagesContainerRef}
          className="scrollbar-thin scrollbar-track-transparent scrollbar-thumb-muted flex-1 space-y-4 overflow-y-auto pr-4"
          role="log"
          aria-live="polite"
          aria-atomic="false"
          aria-relevant="additions"
        >
          {/* Empty State / Welcome Message */}
          {!hasMessages && (
            <motion.div
              initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={prefersReducedMotion ? {} : { duration: 0.5 }}
              className="flex h-full flex-col items-center justify-center gap-4 text-center"
            >
              <div
                className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10"
                aria-hidden="true"
              >
                <MessageSquare className="h-8 w-8 text-primary" />
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-foreground">Start a Conversation</h3>
                <p className="max-w-md text-sm text-muted-foreground">{welcomeMessage}</p>
              </div>

              {/* Suggested Prompts */}
              <div
                className="mt-4 flex flex-wrap justify-center gap-2"
                role="group"
                aria-label="Suggested prompts"
              >
                {[
                  'Tell me about your experience',
                  'What technologies do you use?',
                  'Show me your projects',
                ].map((prompt, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    onClick={() => handleSuggestedPrompt(prompt)}
                    className="text-xs"
                    aria-label={`Send prompt: ${prompt}`}
                  >
                    {prompt}
                  </Button>
                ))}
              </div>
            </motion.div>
          )}

          {/* Messages List */}
          {hasMessages &&
            messages.map((message, index) => (
              <ChatMessage
                key={message.id}
                message={message}
                isLastMessage={index === messages.length - 1}
              />
            ))}

          {/* Error Display */}
          {error && (
            <motion.div
              initial={prefersReducedMotion ? {} : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-start gap-2 rounded-lg border border-destructive bg-destructive/10 p-3"
              role="alert"
              aria-live="assertive"
            >
              <AlertCircle
                className="mt-0.5 h-4 w-4 shrink-0 text-destructive"
                aria-hidden="true"
              />
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium text-destructive">Error</p>
                <p className="text-xs text-destructive/90">{error}</p>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearError}
                  className="h-auto p-0 text-xs text-destructive hover:text-destructive/90"
                  aria-label="Dismiss error message"
                >
                  Dismiss
                </Button>
              </div>
            </motion.div>
          )}

          {/* Scroll Anchor */}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="border-t pt-4">
          <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
        </div>
      </CardContent>
    </Card>
  );
};

export default ChatInterface;
