/**
 * ChatInput Component
 * Input component for sending chat messages
 */

import React, { useRef, useEffect, useCallback, useState } from 'react';
import { Send } from 'lucide-react';
import { Textarea } from '@subbiah/reusable/components/ui/textarea';
import { Button } from '@subbiah/reusable/components/ui/button';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isLoading: boolean;
  disabled?: boolean;
  placeholder?: string;
}

const MAX_ROWS = 6;
const MIN_ROWS = 1;
const DEFAULT_PLACEHOLDER = 'Type your message... (Enter to send, Shift+Enter for new line)';
const MAX_CHARACTER_LIMIT = 4000;

/**
 * ChatInput component for user message input
 */
export const ChatInput: React.FC<ChatInputProps> = ({
  onSendMessage,
  isLoading,
  disabled = false,
  placeholder = DEFAULT_PLACEHOLDER,
}) => {
  const [value, setValue] = useState('');
  const [rows, setRows] = useState(MIN_ROWS);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  /**
   * Auto-resize textarea based on content
   */
  const adjustTextareaHeight = useCallback((): void => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    // Reset height to get accurate scrollHeight
    textarea.style.height = 'auto';

    // Calculate number of rows
    const lineHeight = parseInt(getComputedStyle(textarea).lineHeight);
    const newRows = Math.min(
      MAX_ROWS,
      Math.max(MIN_ROWS, Math.floor(textarea.scrollHeight / lineHeight))
    );

    setRows(newRows);
  }, []);

  /**
   * Handle input change
   */
  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>): void => {
    const newValue = event.target.value;

    // Enforce character limit
    if (newValue.length <= MAX_CHARACTER_LIMIT) {
      setValue(newValue);
    }
  };

  /**
   * Handle message send
   */
  const handleSend = useCallback((): void => {
    const trimmedValue = value.trim();

    if (!trimmedValue || isLoading || disabled) {
      return;
    }

    onSendMessage(trimmedValue);
    setValue('');
    setRows(MIN_ROWS);
  }, [value, isLoading, disabled, onSendMessage]);

  /**
   * Handle keyboard shortcuts
   */
  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>): void => {
    // Enter to send (Shift+Enter for new line)
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSend();
    }
  };

  /**
   * Auto-resize on value change
   */
  useEffect(() => {
    adjustTextareaHeight();
  }, [value, adjustTextareaHeight]);

  /**
   * Focus textarea on mount
   */
  useEffect(() => {
    textareaRef.current?.focus();
  }, []);

  const isDisabled = disabled || isLoading;
  const canSend = value.trim().length > 0 && !isDisabled;
  const characterCount = value.length;
  const showCharacterCount = characterCount > MAX_CHARACTER_LIMIT * 0.8;

  return (
    <div className="flex flex-col gap-2">
      {/* Character Count Indicator */}
      {showCharacterCount && (
        <div className="flex justify-end px-1">
          <span
            className={`text-xs ${
              characterCount >= MAX_CHARACTER_LIMIT ? 'text-destructive' : 'text-muted-foreground'
            }`}
          >
            {characterCount} / {MAX_CHARACTER_LIMIT}
          </span>
        </div>
      )}

      {/* Input Area */}
      <div className="flex gap-2">
        <Textarea
          ref={textareaRef}
          value={value}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          disabled={isDisabled}
          rows={rows}
          className="min-h-[60px] resize-none"
          aria-label="Chat message input"
        />

        {/* Send Button */}
        <Button
          onClick={handleSend}
          disabled={!canSend}
          className="min-h-[60px] min-w-[60px] self-end"
          aria-label="Send message"
        >
          <Send className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
};

export default ChatInput;
