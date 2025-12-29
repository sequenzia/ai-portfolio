'use client';

import { useState, Fragment } from 'react';
import { useChat } from '@ai-sdk/react';
import { DefaultChatTransport, type UIMessage } from 'ai';
import { MessageSquare } from 'lucide-react';

import {
  Conversation,
  ConversationContent,
  ConversationEmptyState,
  ConversationScrollButton,
} from '@/components/ai-elements/conversation';
import {
  Message,
  MessageContent,
  MessageResponse,
} from '@/components/ai-elements/message';
import {
  PromptInput,
  PromptInputTextarea,
  PromptInputSubmit,
  PromptInputFooter,
  PromptInputTools,
  type PromptInputMessage,
} from '@/components/ai-elements/prompt-input';
import { Suggestions, Suggestion } from '@/components/ai-elements/suggestion';
import { ContentBlock } from './ContentBlock';
import { portfolioContent } from '@/lib/content/portfolio';
import type { RenderCanvasParams } from '@/lib/ai/tools';
import type { CanvasViewType } from '@/lib/content/types';

const SUGGESTED_PROMPTS = [
  { label: 'About Me', prompt: 'Tell me about yourself' },
  { label: 'Experience', prompt: 'What is your work experience?' },
  { label: 'Projects', prompt: 'Show me your projects' },
  { label: 'Skills', prompt: 'What are your technical skills?' },
  { label: 'Education', prompt: 'Tell me about your education' },
  { label: 'Contact', prompt: 'How can I get in touch?' },
];

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

export function ChatContainer() {
  const [input, setInput] = useState('');
  const { bio } = portfolioContent;

  const { messages, sendMessage, addToolOutput, status } = useChat({
    transport: new DefaultChatTransport({
      api: '/api/chat',
    }),

    // Handle tool calls from the AI - provide output so the AI knows the action completed
    onToolCall: async ({ toolCall }) => {
      if (toolCall.dynamic) {
        return;
      }
      if (toolCall.toolName === 'renderCanvas') {
        const params = toolCall.input as RenderCanvasParams;

        // Provide tool result using addToolOutput
        const result = `Displayed ${params.type} content${params.filter ? ` (filtered by: ${params.filter})` : ''}${params.highlightId ? ` (highlighting: ${params.highlightId})` : ''}`;

        addToolOutput({
          tool: 'renderCanvas',
          toolCallId: toolCall.toolCallId,
          output: result,
        });
      }
    },

    // Handle errors
    onError: (err) => {
      console.error('Chat error:', err);
    },
  });

  const isLoading = status === 'streaming' || status === 'submitted';

  const handleSubmit = (message: PromptInputMessage) => {
    const hasText = Boolean(message.text);
    if (!hasText) return;

    sendMessage({ text: message.text });
    setInput('');
  };

  const handleSuggestionClick = (prompt: string) => {
    sendMessage({ text: prompt });
  };

  return (
    <div className="flex h-full flex-col overflow-hidden border-x border-border bg-background">
      {/* Conversation area */}
      <Conversation className="flex-1">
        <ConversationContent className="gap-4 px-4 py-4">
          {messages.length === 0 ? (
            <ConversationEmptyState
              icon={<MessageSquare className="size-12 text-primary" />}
              title={`Hi! I'm an AI assistant for ${bio.name}'s portfolio`}
              description="Ask me about experience, projects, skills - or use the suggestions below"
            />
          ) : (
            messages.map((message) => {
              // Skip system messages
              if (message.role === 'system') return null;

              // Extract text content from parts
              const textContent = message.parts
                .filter((part): part is { type: 'text'; text: string } => part.type === 'text')
                .map((part) => part.text)
                .join('');

              const toolCalls = message.role === 'assistant' ? getToolCalls(message) : [];

              // Skip empty messages
              if (!textContent && toolCalls.length === 0) return null;

              return (
                <Fragment key={message.id}>
                  <Message from={message.role}>
                    <MessageContent>
                      {textContent && (
                        <MessageResponse>{textContent}</MessageResponse>
                      )}
                    </MessageContent>
                  </Message>

                  {/* Render tool call content blocks inline */}
                  {toolCalls.map((toolCall) => (
                    <ContentBlock
                      key={toolCall.toolCallId}
                      type={toolCall.type}
                      filter={toolCall.filter}
                      highlightId={toolCall.highlightId}
                    />
                  ))}
                </Fragment>
              );
            })
          )}
        </ConversationContent>
        <ConversationScrollButton />
      </Conversation>

      {/* Suggested prompts */}
      <div className="border-t border-border px-4 py-3">
        <Suggestions>
          {SUGGESTED_PROMPTS.map(({ label, prompt }) => (
            <Suggestion
              key={label}
              suggestion={prompt}
              onClick={handleSuggestionClick}
            >
              {label}
            </Suggestion>
          ))}
        </Suggestions>
      </div>

      {/* Input area */}
      <div className="border-t border-border p-4">
        <PromptInput
          onSubmit={handleSubmit}
          className="mx-auto max-w-2xl"
        >
          <PromptInputTextarea
            value={input}
            onChange={(e) => setInput(e.currentTarget.value)}
            placeholder="Ask me anything about my experience..."
            className="min-h-12"
          />
          <PromptInputFooter>
            <PromptInputTools />
            <PromptInputSubmit
              status={status === 'streaming' ? 'streaming' : status === 'submitted' ? 'submitted' : 'ready'}
              disabled={!input.trim() && !isLoading}
            />
          </PromptInputFooter>
        </PromptInput>
      </div>
    </div>
  );
}
