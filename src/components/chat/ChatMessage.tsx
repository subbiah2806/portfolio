/**
 * ChatMessage Component
 * Displays individual chat messages with user/assistant variants
 */

import { memo, useCallback, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import Markdown from 'react-markdown';
import { User, Bot, Copy, Check } from 'lucide-react';
import type { ChatMessage as ChatMessageType } from '../../types';
import { Button } from '@subbiah/reusable/components/ui/button';
import { useReducedMotion } from '../../hooks/useReducedMotion';

interface ChatMessageProps {
  message: ChatMessageType;
  isLastMessage?: boolean;
}

const USER_MESSAGE_BG = 'bg-primary/10';
const ASSISTANT_MESSAGE_BG = 'bg-muted/50';
const COPY_TIMEOUT_MS = 2000;

/**
 * ChatMessage component renders individual messages with markdown support
 * Optimized with React.memo, useCallback, and useMemo for performance
 */
export const ChatMessage = memo(({ message, isLastMessage = false }: ChatMessageProps) => {
  const [isCopied, setIsCopied] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  const isUser = message.role === 'user';
  const isStreaming = message.isStreaming && isLastMessage;

  /**
   * Copy message content to clipboard
   */
  const handleCopyMessage = useCallback(async (): Promise<void> => {
    try {
      await navigator.clipboard.writeText(message.content);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), COPY_TIMEOUT_MS);
    } catch (error) {
      console.error('Failed to copy message:', error);
    }
  }, [message.content]);

  /**
   * Format timestamp for display - memoized to avoid recalculation
   */
  const formattedTimestamp = useMemo(() => {
    return new Intl.DateTimeFormat('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    }).format(message.timestamp);
  }, [message.timestamp]);

  // Respect reduced motion preference
  const motionProps = prefersReducedMotion
    ? {}
    : {
        initial: { opacity: 0, y: 10 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.3 },
      };

  return (
    <motion.div
      {...motionProps}
      className={`flex gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'} items-start`}
    >
      {/* Avatar */}
      <div
        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
          isUser ? 'bg-primary text-primary-foreground' : 'bg-muted'
        }`}
        aria-label={isUser ? 'User avatar' : 'Assistant avatar'}
      >
        {isUser ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
      </div>

      {/* Message Content */}
      <div className={`flex flex-col gap-1 ${isUser ? 'items-end' : 'items-start'} flex-1`}>
        <div
          className={`group relative max-w-[85%] rounded-lg px-4 py-2 ${
            isUser ? USER_MESSAGE_BG : ASSISTANT_MESSAGE_BG
          }`}
        >
          {/* Message Text */}
          {isUser ? (
            <p className="text-sm leading-relaxed text-foreground">{message.content}</p>
          ) : (
            <div className="prose prose-sm max-w-none dark:prose-invert">
              <Markdown
                components={{
                  // Customize paragraph spacing
                  p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
                  // Customize code blocks
                  code: ({ className, children, ...props }) => {
                    const isInline = !className;
                    return isInline ? (
                      <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm" {...props}>
                        {children}
                      </code>
                    ) : (
                      <code className={className} {...props}>
                        {children}
                      </code>
                    );
                  },
                  // Customize links
                  a: ({ children, href }) => (
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary underline-offset-2 hover:underline"
                    >
                      {children}
                    </a>
                  ),
                }}
              >
                {message.content}
              </Markdown>
            </div>
          )}

          {/* Streaming Indicator */}
          {isStreaming && (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={
                prefersReducedMotion
                  ? { duration: 0.3 }
                  : { duration: 0.3, repeat: Infinity, repeatType: 'reverse' }
              }
              className="ml-1 inline-block h-2 w-2 rounded-full bg-primary"
              aria-label="Streaming message"
              aria-live="polite"
            />
          )}

          {/* Copy Button */}
          {!isStreaming && (
            <Button
              variant="ghost"
              size="icon"
              onClick={handleCopyMessage}
              className="absolute -right-2 -top-2 z-10 h-6 w-6 opacity-0 transition-opacity group-hover:opacity-100"
              aria-label={isCopied ? 'Copied!' : 'Copy message'}
            >
              {isCopied ? (
                <Check className="h-3 w-3 text-green-500" />
              ) : (
                <Copy className="h-3 w-3" />
              )}
            </Button>
          )}
        </div>

        {/* Timestamp */}
        <span className="px-1 text-xs text-muted-foreground">{formattedTimestamp}</span>
      </div>
    </motion.div>
  );
});

ChatMessage.displayName = 'ChatMessage';

export default ChatMessage;
