import { useEffect, useRef } from 'react';
import { AnimatePresence } from 'framer-motion';
import type { Message as MessageType } from 'ai';
import { UserMessage, AssistantMessage } from './Message';
import { TypingIndicator } from './TypingIndicator';
import { cn } from '@/lib/utils/cn';

interface MessageListProps {
  messages: MessageType[];
  isLoading?: boolean;
  className?: string;
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
          // Skip system messages and data messages
          if (message.role === 'system' || message.role === 'data') {
            return null;
          }

          // Filter out empty messages
          if (!message.content || message.content.trim() === '') {
            return null;
          }

          return message.role === 'user' ? (
            <UserMessage key={message.id} content={message.content} />
          ) : (
            <AssistantMessage key={message.id} content={message.content} />
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
