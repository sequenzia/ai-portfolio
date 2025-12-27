import { useChat } from 'ai/react';
import { useCanvasStore } from '@/stores/canvasStore';
import type { RenderCanvasParams } from '@/lib/ai/tools';
import type { CanvasViewType } from '@/content/types';

/**
 * Custom hook that wraps Vercel AI SDK's useChat with portfolio-specific functionality.
 * Handles tool calls to update the canvas state.
 */
export function usePortfolioChat() {
  const setView = useCanvasStore((state) => state.setView);

  const chat = useChat({
    api: '/api/chat',

    // Handle tool calls from the AI
    onToolCall: async ({ toolCall }) => {
      if (toolCall.toolName === 'renderCanvas') {
        const params = toolCall.args as RenderCanvasParams;

        // Update canvas state
        setView(params.type as CanvasViewType, {
          filter: params.filter,
          highlightId: params.highlightId,
        });

        // Return confirmation for the AI to acknowledge
        return `Canvas updated to show ${params.type}${params.filter ? ` (filtered by: ${params.filter})` : ''}${params.highlightId ? ` (highlighting: ${params.highlightId})` : ''}`;
      }
    },

    // Handle errors
    onError: (error) => {
      console.error('Chat error:', error);
    },
  });

  // Helper to send a suggested prompt
  const sendPrompt = (prompt: string) => {
    chat.setInput(prompt);
    // Use setTimeout to ensure the input is set before submitting
    setTimeout(() => {
      const form = document.querySelector('form[data-chat-form]') as HTMLFormElement;
      if (form) {
        form.requestSubmit();
      }
    }, 0);
  };

  return {
    // Message state
    messages: chat.messages,

    // Input state and handlers
    input: chat.input,
    setInput: chat.setInput,
    handleInputChange: chat.handleInputChange,
    handleSubmit: chat.handleSubmit,

    // Loading and error states
    isLoading: chat.isLoading,
    error: chat.error,

    // Actions
    reload: chat.reload,
    stop: chat.stop,
    append: chat.append,

    // Custom helper
    sendPrompt,
  };
}
