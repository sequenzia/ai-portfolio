import { useEffect, useRef } from 'react';
import { AnimatePresence } from 'framer-motion';
import type { UIMessage } from 'ai';
import { UserMessage, AssistantMessage } from './Message';
import { TypingIndicator } from './TypingIndicator';
import { cn } from '@/lib/utils/cn';

interface MessageListProps {
  messages: UIMessage[];
  isLoading?: boolean;
  className?: string;
}

/**
 * Extract text content from a UIMessage's parts array
 */
function getMessageText(message: UIMessage): string {
  return message.parts
    .filter((part): part is { type: 'text'; text: string } => part.type === 'text')
    .map((part) => part.text)
    .join('');
}

export function MessageList({ messages, isLoading, className }: MessageListProps) {
  const bottomRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isLoading]);

  return (
    <div
      ref={containerRef}
      className={cn(
        'flex-1 overflow-y-auto px-4 py-4 space-y-4 scrollbar-thin',
        className
      )}
    >
      <AnimatePresence mode="popLayout">
        {messages.map((message) => {
          // Skip system messages
          if (message.role === 'system') {
            return null;
          }

          // Extract text content from parts
          const content = getMessageText(message);

          // Filter out empty messages
          if (!content || content.trim() === '') {
            return null;
          }

          return message.role === 'user' ? (
            <UserMessage key={message.id} content={content} />
          ) : (
            <AssistantMessage key={message.id} content={content} />
          );
        })}

        {/* Show typing indicator when loading */}
        {isLoading && <TypingIndicator key="typing" />}
      </AnimatePresence>

      {/* Scroll anchor */}
      <div ref={bottomRef} />
    </div>
  );
}
