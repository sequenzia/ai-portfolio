'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  X,
  Loader2,
  AlertCircle,
  Square,
  Send,
  ChevronUp,
  MessageSquare,
} from 'lucide-react';
import { useChat } from '@ai-sdk/react';
import { DefaultChatTransport } from 'ai';
import { cn } from '@/lib/utils';
import { useBreakpoints } from '@/hooks/useMediaQuery';
import {
  useCommandPaletteStore,
  type CommandPaletteState,
} from '@/stores/commandPaletteStore';
import { useCanvasStore } from '@/stores/canvasStore';
import type { RenderCanvasParams } from '@/lib/ai/tools';

const SUGGESTED_PROMPTS = [
  { label: 'About Me', prompt: 'Tell me about yourself' },
  { label: 'Experience', prompt: 'What is your work experience?' },
  { label: 'Projects', prompt: 'Show me your projects' },
  { label: 'Skills', prompt: 'What are your technical skills?' },
];

const viewLabels: Record<string, string> = {
  welcome: 'Home',
  bio: 'About Me',
  experience: 'Experience',
  projects: 'Projects',
  education: 'Education',
  skills: 'Skills',
  contact: 'Contact',
};

interface CommandPaletteProps {
  className?: string;
}

export function CommandPalette({ className }: CommandPaletteProps) {
  const [input, setInput] = useState('');
  const inputRef = useRef<HTMLTextAreaElement>(null!);
  const { isMobile } = useBreakpoints();

  const { isExpanded, uiState, expand, collapse, setUIState } =
    useCommandPaletteStore();
  const { setView, currentView } = useCanvasStore();

  const { messages, sendMessage, addToolOutput, status, stop } = useChat({
    transport: new DefaultChatTransport({
      api: '/api/chat',
    }),

    onToolCall: async ({ toolCall }) => {
      if (toolCall.dynamic) return;

      if (toolCall.toolName === 'renderCanvas') {
        const params = toolCall.input as RenderCanvasParams;

        // Update canvas view
        setView(params.type, {
          filter: params.filter,
          highlightId: params.highlightId,
        });

        const result = `Displayed ${params.type} content${params.filter ? ` (filtered by: ${params.filter})` : ''}${params.highlightId ? ` (highlighting: ${params.highlightId})` : ''}`;

        addToolOutput({
          tool: 'renderCanvas',
          toolCallId: toolCall.toolCallId,
          output: result,
        });
      }
    },

    onError: (err) => {
      console.error('Chat error:', err);
      setUIState('error');
    },
  });

  // Sync chat status with UI state
  useEffect(() => {
    if (status === 'submitted') {
      setUIState('thinking');
    } else if (status === 'streaming') {
      setUIState('streaming');
    } else if (status === 'ready') {
      setUIState('idle');
    }
  }, [status, setUIState]);

  // Focus input when expanded
  useEffect(() => {
    if (isExpanded && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isExpanded]);

  // Keyboard shortcut handler
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Cmd+K or Ctrl+K to toggle
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isExpanded) {
          collapse();
        } else {
          expand();
        }
      }

      // Escape to close
      if (e.key === 'Escape' && isExpanded) {
        e.preventDefault();
        collapse();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isExpanded, expand, collapse]);

  const handleSubmit = useCallback(
    (e?: React.FormEvent) => {
      e?.preventDefault();
      if (!input.trim()) return;

      sendMessage({ text: input });
      setInput('');
    },
    [input, sendMessage]
  );

  const handleSuggestionClick = useCallback(
    (prompt: string) => {
      sendMessage({ text: prompt });
      expand();
    },
    [sendMessage, expand]
  );

  // Get latest assistant message
  const latestAssistantMessage = messages
    .filter((m) => m.role === 'assistant')
    .slice(-1)[0];

  const latestTextContent = latestAssistantMessage?.parts
    .filter((part): part is { type: 'text'; text: string } => part.type === 'text')
    .map((part) => part.text)
    .join('');

  // Mobile: Bottom sheet pattern
  if (isMobile) {
    return (
      <div className={cn('fixed inset-x-0 bottom-0 z-50', className)}>
        <AnimatePresence mode="wait">
          {!isExpanded ? (
            <MobileActionBar
              key="action-bar"
              uiState={uiState}
              currentView={currentView}
              onClick={expand}
            />
          ) : (
            <MobileBottomSheet
              key="bottom-sheet"
              input={input}
              setInput={setInput}
              inputRef={inputRef}
              onSubmit={handleSubmit}
              onClose={collapse}
              onStop={stop}
              onSuggestionClick={handleSuggestionClick}
              uiState={uiState}
              latestResponse={latestTextContent}
            />
          )}
        </AnimatePresence>
      </div>
    );
  }

  // Desktop: Centered command palette
  return (
    <div
      className={cn(
        'fixed bottom-6 left-1/2 z-50 -translate-x-1/2',
        className
      )}
    >
      <AnimatePresence mode="wait">
        {!isExpanded ? (
          <CommandPill
            key="pill"
            uiState={uiState}
            onClick={expand}
            onSuggestionClick={handleSuggestionClick}
          />
        ) : (
          <CommandShell
            key="shell"
            input={input}
            setInput={setInput}
            inputRef={inputRef}
            onSubmit={handleSubmit}
            onClose={collapse}
            onStop={stop}
            uiState={uiState}
            latestResponse={latestTextContent}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

// --- Sub-components ---

interface CommandPillProps {
  uiState: CommandPaletteState;
  onClick: () => void;
  onSuggestionClick: (prompt: string) => void;
}

function CommandPill({ uiState, onClick, onSuggestionClick }: CommandPillProps) {
  const getBorderClass = () => {
    switch (uiState) {
      case 'thinking':
        return 'border-primary-500 animate-pulse';
      case 'streaming':
        return 'border-primary-400';
      case 'error':
        return 'border-red-500';
      case 'actionRequired':
        return 'border-amber-500';
      default:
        return 'border-border';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.2 }}
      className="flex flex-col items-center gap-3"
    >
      {/* Suggestions */}
      <div className="flex flex-wrap justify-center gap-2">
        {SUGGESTED_PROMPTS.map(({ label, prompt }) => (
          <button
            key={label}
            onClick={() => onSuggestionClick(prompt)}
            className="rounded-full bg-background/80 px-3 py-1.5 text-sm text-muted-foreground shadow-sm border border-border/50 hover:bg-background hover:border-border transition-colors backdrop-blur-sm"
          >
            {label}
          </button>
        ))}
      </div>

      {/* Pill button */}
      <button
        onClick={onClick}
        className={cn(
          'flex items-center gap-3 rounded-full bg-card px-5 py-3 shadow-elevated border-2 transition-all hover:shadow-lg',
          getBorderClass()
        )}
      >
        {uiState === 'thinking' ? (
          <Loader2 className="h-5 w-5 animate-spin text-primary-500" />
        ) : uiState === 'error' ? (
          <AlertCircle className="h-5 w-5 text-red-500" />
        ) : (
          <Search className="h-5 w-5 text-muted-foreground" />
        )}
        <span className="text-sm text-muted-foreground">
          Ask me anything...
        </span>
        <kbd className="hidden rounded bg-muted px-2 py-0.5 text-xs text-muted-foreground sm:inline-block">
          {'\u2318'}K
        </kbd>
      </button>
    </motion.div>
  );
}

interface CommandShellProps {
  input: string;
  setInput: (value: string) => void;
  inputRef: React.RefObject<HTMLTextAreaElement>;
  onSubmit: (e?: React.FormEvent) => void;
  onClose: () => void;
  onStop: () => void;
  uiState: CommandPaletteState;
  latestResponse?: string;
}

function CommandShell({
  input,
  setInput,
  inputRef,
  onSubmit,
  onClose,
  onStop,
  uiState,
  latestResponse,
}: CommandShellProps) {
  const isProcessing = uiState === 'thinking' || uiState === 'streaming';

  const getBorderClass = () => {
    switch (uiState) {
      case 'thinking':
        return 'ring-2 ring-primary-500/50 animate-pulse';
      case 'streaming':
        return 'ring-2 ring-primary-400/30';
      case 'error':
        return 'ring-2 ring-red-500/50';
      case 'actionRequired':
        return 'ring-2 ring-amber-500/50';
      default:
        return '';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 10, scale: 0.95 }}
      transition={{ duration: 0.2 }}
      className={cn(
        'w-[90vw] max-w-2xl rounded-2xl bg-card shadow-elevated border border-border overflow-hidden',
        getBorderClass()
      )}
    >
      {/* Response preview area */}
      {(latestResponse || isProcessing) && (
        <div className="max-h-48 overflow-y-auto border-b border-border bg-muted/30 p-4">
          {isProcessing && !latestResponse ? (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>Thinking...</span>
            </div>
          ) : (
            <p className="text-sm text-foreground whitespace-pre-wrap line-clamp-6">
              {latestResponse}
            </p>
          )}
        </div>
      )}

      {/* Input area */}
      <form onSubmit={onSubmit} className="flex items-end gap-2 p-3">
        <textarea
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              onSubmit();
            }
          }}
          placeholder="Ask me anything about my experience..."
          className="flex-1 resize-none bg-transparent text-sm outline-none placeholder:text-muted-foreground min-h-[40px] max-h-[120px] py-2 px-1"
          rows={1}
          style={{ fieldSizing: 'content' } as React.CSSProperties}
        />

        <div className="flex items-center gap-2">
          {isProcessing ? (
            <button
              type="button"
              onClick={onStop}
              className="rounded-lg bg-muted p-2 text-muted-foreground hover:bg-muted/80 transition-colors"
              title="Stop generating"
            >
              <Square className="h-4 w-4" />
            </button>
          ) : (
            <button
              type="submit"
              disabled={!input.trim()}
              className="rounded-lg bg-primary p-2 text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              title="Send message"
            >
              <Send className="h-4 w-4" />
            </button>
          )}

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-muted-foreground hover:bg-muted transition-colors"
            title="Close (Esc)"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </form>

      {/* Keyboard hint */}
      <div className="flex items-center justify-center border-t border-border bg-muted/30 px-3 py-2">
        <span className="text-xs text-muted-foreground">
          Press <kbd className="rounded bg-muted px-1.5 py-0.5 mx-1">Enter</kbd> to send,{' '}
          <kbd className="rounded bg-muted px-1.5 py-0.5 mx-1">Esc</kbd> to close
        </span>
      </div>
    </motion.div>
  );
}

// --- Mobile Components ---

interface MobileActionBarProps {
  uiState: CommandPaletteState;
  currentView: string;
  onClick: () => void;
}

function MobileActionBar({ uiState, currentView, onClick }: MobileActionBarProps) {
  const getStatusIndicator = () => {
    switch (uiState) {
      case 'thinking':
        return <Loader2 className="h-4 w-4 animate-spin text-primary-500" />;
      case 'streaming':
        return <Loader2 className="h-4 w-4 animate-spin text-primary-400" />;
      case 'error':
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      default:
        return <MessageSquare className="h-4 w-4 text-muted-foreground" />;
    }
  };

  return (
    <motion.button
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.2 }}
      onClick={onClick}
      className="w-full flex items-center justify-between px-4 py-3 bg-card border-t border-border shadow-lg"
    >
      <div className="flex items-center gap-3">
        {getStatusIndicator()}
        <span className="text-sm text-muted-foreground">
          {viewLabels[currentView] || 'Home'} &middot; Ask me anything...
        </span>
      </div>
      <ChevronUp className="h-5 w-5 text-muted-foreground" />
    </motion.button>
  );
}

interface MobileBottomSheetProps {
  input: string;
  setInput: (value: string) => void;
  inputRef: React.RefObject<HTMLTextAreaElement>;
  onSubmit: (e?: React.FormEvent) => void;
  onClose: () => void;
  onStop: () => void;
  onSuggestionClick: (prompt: string) => void;
  uiState: CommandPaletteState;
  latestResponse?: string;
}

function MobileBottomSheet({
  input,
  setInput,
  inputRef,
  onSubmit,
  onClose,
  onStop,
  onSuggestionClick,
  uiState,
  latestResponse,
}: MobileBottomSheetProps) {
  const isProcessing = uiState === 'thinking' || uiState === 'streaming';

  return (
    <motion.div
      initial={{ y: '100%' }}
      animate={{ y: 0 }}
      exit={{ y: '100%' }}
      transition={{ type: 'spring', damping: 25, stiffness: 300 }}
      className="bg-card rounded-t-2xl shadow-lg border-t border-border"
      style={{ height: '50vh', maxHeight: '50vh' }}
    >
      {/* Handle */}
      <div className="flex justify-center py-2">
        <div className="w-10 h-1 bg-muted rounded-full" />
      </div>

      {/* Header */}
      <div className="flex items-center justify-between px-4 pb-3 border-b border-border">
        <h3 className="font-medium text-foreground">Ask AI</h3>
        <button
          onClick={onClose}
          className="p-2 -m-2 text-muted-foreground hover:text-foreground transition-colors"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* Content area */}
      <div className="flex-1 overflow-y-auto px-4 py-3" style={{ height: 'calc(50vh - 140px)' }}>
        {/* Response preview */}
        {(latestResponse || isProcessing) && (
          <div className="mb-4 p-3 rounded-lg bg-muted/50">
            {isProcessing && !latestResponse ? (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Thinking...</span>
              </div>
            ) : (
              <p className="text-sm text-foreground whitespace-pre-wrap line-clamp-4">
                {latestResponse}
              </p>
            )}
          </div>
        )}

        {/* Suggestions */}
        <div className="flex flex-wrap gap-2">
          {SUGGESTED_PROMPTS.map(({ label, prompt }) => (
            <button
              key={label}
              onClick={() => onSuggestionClick(prompt)}
              className="rounded-full bg-muted px-3 py-1.5 text-sm text-muted-foreground hover:bg-muted/80 transition-colors"
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Input area */}
      <div className="border-t border-border p-4 pb-safe">
        <form onSubmit={onSubmit} className="flex items-end gap-2">
          <textarea
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                onSubmit();
              }
            }}
            placeholder="Ask me anything..."
            className="flex-1 resize-none bg-muted rounded-xl text-sm outline-none placeholder:text-muted-foreground min-h-[44px] max-h-[100px] py-3 px-4"
            rows={1}
            style={{ fieldSizing: 'content' } as React.CSSProperties}
          />

          {isProcessing ? (
            <button
              type="button"
              onClick={onStop}
              className="shrink-0 rounded-xl bg-muted p-3 text-muted-foreground"
            >
              <Square className="h-5 w-5" />
            </button>
          ) : (
            <button
              type="submit"
              disabled={!input.trim()}
              className="shrink-0 rounded-xl bg-primary p-3 text-primary-foreground disabled:opacity-50"
            >
              <Send className="h-5 w-5" />
            </button>
          )}
        </form>
      </div>
    </motion.div>
  );
}
