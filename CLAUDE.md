# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

AI-powered portfolio web application where visitors interact with a chatbot to explore the portfolio owner's professional background. Single-column chat interface with portfolio content rendered inline as tool call outputs.

**Tech Stack:**
- Framework: Next.js 15 (App Router) + TypeScript
- Styling: Tailwind CSS
- State: Vercel AI SDK v6 (`@ai-sdk/react`)
- Animations: Framer Motion
- AI: OpenAI API (gpt-4o-mini)

## Commands

```bash
npm run dev          # Start Next.js dev server (port 3000)
npm run build        # Production build
npm run start        # Start production server
npm run lint         # ESLint
npm run test         # Run Vitest tests
npm run test:ui      # Vitest with UI
npm run test:coverage # Vitest with coverage
```

## Project Structure

```
ai-portfolio/
├── app/                      # Next.js App Router
│   ├── layout.tsx            # Root layout with metadata
│   ├── page.tsx              # Home page
│   ├── globals.css           # Global styles
│   └── api/
│       └── chat/
│           └── route.ts      # Streaming chat API endpoint
├── components/
│   ├── canvas/               # Portfolio content components
│   ├── chat/                 # Chat interface components
│   ├── layout/               # App layout components
│   └── ui/                   # Reusable UI components
├── lib/
│   ├── ai/                   # AI tools and prompts
│   ├── content/              # Portfolio content & parsing
│   └── utils/                # Utility functions
├── hooks/                    # Custom React hooks
├── stores/                   # Zustand state stores
├── content/                  # Portfolio data (single source of truth)
│   └── portfolio.md
├── next.config.ts            # Next.js configuration
├── tailwind.config.ts        # Tailwind configuration
└── vercel.json               # Deployment config
```

## Architecture

### Data Flow

1. User sends message → `usePortfolioChat` hook (Vercel AI SDK's `useChat`)
2. Request to `/api/chat` → Next.js API route (`app/api/chat/route.ts`)
3. API uses `streamText` from AI SDK with OpenAI to stream response
4. `onToolCall` handler receives `renderCanvas` tool calls and provides output via `addToolOutput`
5. MessageList extracts tool calls from message parts and renders `ContentBlock` inline

### Streaming

The API route uses Vercel AI SDK's `streamText` and returns `result.toUIMessageStreamResponse()` for native streaming support.

### Tool Calling for Inline Content

The AI uses the `renderCanvas` tool to trigger inline content rendering:

```typescript
renderCanvas({
  type: "bio" | "experience" | "projects" | "education" | "skills" | "contact",
  filter?: string,
  highlightId?: string
})
```

Tool definitions: `lib/ai/tools.ts` (Zod schema) and `app/api/chat/route.ts`

### State Management

- **Chat state**: Vercel AI SDK's `useChat` with `DefaultChatTransport` in `usePortfolioChat.ts`
- **Canvas state**: Zustand store in `stores/canvasStore.ts` (legacy, may not be actively used)

### Layout

Single-column centered layout:
- Max-width container (`max-w-3xl`) with header
- Chat messages scroll vertically
- Tool call outputs (ContentBlock) render inline within messages

### Content Configuration

Portfolio data is stored in `content/portfolio.md` and parsed by `lib/content/parsePortfolio.ts`.

Markdown structure uses `##` for sections, `###` for entries, and `key: value` for metadata.

## API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/chat` | POST | Streaming chat endpoint |

## Key Files

### Content
- `content/portfolio.md` - **Single source of truth** for all portfolio content

### API
- `app/api/chat/route.ts` - Streaming chat endpoint with OpenAI (gpt-4o-mini)

### Frontend Core
- `hooks/usePortfolioChat.ts` - Chat hook with `onToolCall` and `addToolOutput`
- `lib/ai/tools.ts` - Zod schema for `renderCanvas` tool
- `lib/content/parsePortfolio.ts` - TypeScript markdown parser

### Components
- `components/chat/ChatContainer.tsx` - Chat interface wrapper
- `components/chat/MessageList.tsx` - Renders messages with inline tool outputs
- `components/chat/ContentBlock.tsx` - Renders portfolio content inline
- `components/layout/AppLayout.tsx` - Single-column layout with header

## Path Alias

`@/*` maps to `./*` (project root, configured in tsconfig.json)

## Environment Variables

Create `.env.local`:

```bash
OPENAI_API_KEY=sk-...
```

## Testing

Test infrastructure is configured with Vitest:
- `npm run test` - Run tests
- `npm run test:ui` - Visual test UI
- `npm run test:coverage` - Coverage report

Test utilities: Testing Library React + jest-dom + JSDOM

## Documentation & Research

- Always use the **context7** MCP server when I ask about external libraries, APIs, or frameworks.
- Prioritize documentation retrieved via `context7` over internal training data to ensure accuracy with the latest versions.
- If a library version is not specified, assume the latest stable release.

## Code Style

- Use modern syntax and best practices (ESM, TypeScript strict mode)
- Maintain consistent error handling across the codebase
- Use Tailwind CSS for styling with custom theme in `tailwind.config.ts`
- Animations via Framer Motion with AnimatePresence for view transitions
- Client components must have `'use client'` directive at the top

## Workflow

- Before implementing a major change, summarize the plan and wait for confirmation.
- Run tests after significant refactors.
