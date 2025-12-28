import { useState } from 'react';
import { useChat } from '@ai-sdk/react';
import { DefaultChatTransport } from 'ai';
import { useCanvasStore } from '@/stores/canvasStore';
import type { RenderCanvasParams } from '@/lib/ai/tools';
import type { CanvasViewType } from '@/content/types';

/**
 * Custom hook that wraps Vercel AI SDK's useChat with portfolio-specific functionality.
 * Handles tool calls to update the canvas state.
 */
export function usePortfolioChat() {
  const setView = useCanvasStore((state) => state.setView);
  const [input, setInput] = useState('');

  const { messages, sendMessage, addToolOutput, status, error, stop } = useChat({
    transport: new DefaultChatTransport({
      api: '/api/chat',
    }),

    // Handle tool calls from the AI
    onToolCall: async ({ toolCall }) => {
      console.log('onToolCall received:', JSON.stringify(toolCall, null, 2));
      if (toolCall.dynamic) {
        console.log('Skipping dynamic tool call');
        return;
      }
      if (toolCall.toolName === 'renderCanvas') {
        const params = toolCall.input as RenderCanvasParams;

        // Update canvas state
        console.log('Setting canvas view:', params.type, params);
        setView(params.type as CanvasViewType, {
          filter: params.filter,
          highlightId: params.highlightId,
        });

        // Provide tool result using addToolOutput (don't await to avoid deadlocks)
        const result = `Canvas updated to show ${params.type}${params.filter ? ` (filtered by: ${params.filter})` : ''}${params.highlightId ? ` (highlighting: ${params.highlightId})` : ''}`;

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

  // Handle form submission
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (input.trim()) {
      sendMessage({ text: input });
      setInput('');
    }
  };

  // Handle input change for textarea
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
  };

  // Helper to send a suggested prompt
  const sendPrompt = (prompt: string) => {
    sendMessage({ text: prompt });
  };

  // Append a message (used for suggested prompts)
  const append = (message: { role: 'user' | 'assistant'; content: string }) => {
    if (message.role === 'user') {
      sendMessage({ text: message.content });
    }
  };

  return {
    // Message state
    messages,

    // Input state and handlers
    input,
    setInput,
    handleInputChange,
    handleSubmit,

    // Loading and error states (status can be 'ready', 'streaming', 'submitted')
    isLoading: status === 'streaming' || status === 'submitted',
    status,
    error,

    // Actions
    stop,
    append,

    // Custom helper
    sendPrompt,
  };
}
