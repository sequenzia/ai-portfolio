'use client';

import { useEffect, useRef } from 'react';
import { AnimatePresence } from 'framer-motion';
import type { UIMessage } from 'ai';
import { UserMessage, AssistantMessage } from './Message';
import { TypingIndicator } from './TypingIndicator';
import { ContentBlock } from './ContentBlock';
import { cn } from '@/lib/utils/cn';
import type { CanvasViewType } from '@/lib/content/types';

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

/**
 * Represents a renderCanvas tool call extracted from message parts
 */
interface RenderCanvasToolCall {
  toolCallId: string;
  type: CanvasViewType;
  filter?: string;
  highlightId?: string;
}

/**
 * Extract renderCanvas tool calls from a UIMessage
 */
function getToolCalls(message: UIMessage): RenderCanvasToolCall[] {
  const results: RenderCanvasToolCall[] = [];

  for (const part of message.parts) {
    const toolPart = part as Record<string, unknown>;

    // Check if this is a renderCanvas tool part
    // The type format is "tool-{toolName}" (e.g., "tool-renderCanvas")
    if (part.type === 'tool-renderCanvas' && toolPart.toolCallId) {
      const input = toolPart.input as Record<string, unknown> | undefined;

      // Only render when input is available (not still streaming)
      if (input && typeof input.type === 'string' && input.type) {
        results.push({
          toolCallId: String(toolPart.toolCallId),
          type: input.type as CanvasViewType,
          filter: input.filter as string | undefined,
          highlightId: input.highlightId as string | undefined,
        });
      }
    }
  }

  return results;
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
        'px-4 py-4 space-y-4',
        className
      )}
    >
      <AnimatePresence mode="sync">
        {messages.map((message) => {
          // Skip system messages
          if (message.role === 'system') {
            return null;
          }

          // Extract text content from parts
          const content = getMessageText(message);
          const toolCalls = message.role === 'assistant' ? getToolCalls(message) : [];

          // For user messages, just render the message
          if (message.role === 'user') {
            if (!content || content.trim() === '') {
              return null;
            }
            return <UserMessage key={message.id} content={content} />;
          }

          // For assistant messages, render text + any tool call content blocks
          // Show message if there's text OR tool calls
          if (!content && toolCalls.length === 0) {
            return null;
          }

          return (
            <div key={message.id}>
              {content && content.trim() !== '' && (
                <AssistantMessage content={content} />
              )}
              {toolCalls.map((toolCall) => (
                <ContentBlock
                  key={toolCall.toolCallId}
                  type={toolCall.type}
                  filter={toolCall.filter}
                  highlightId={toolCall.highlightId}
                />
              ))}
            </div>
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
