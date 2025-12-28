# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

AI-powered portfolio web application where visitors interact with a chatbot to explore the portfolio owner's professional background. Two main panels: Chat (40%) for conversation, Canvas (60%) for dynamically rendered portfolio content triggered by AI tool calls.

**Tech Stack:**
- Frontend: React 18 + TypeScript + Vite + Tailwind CSS
- Backend: Python 3.12+ FastAPI + OpenAI API
- State: Zustand (canvas), Vercel AI SDK (chat)
- Animations: Framer Motion

## Commands

### Frontend (Vite + React)

```bash
npm run dev          # Start dev server on port 5173
npm run build        # TypeScript check + Vite production build
npm run lint         # ESLint
npm run preview      # Preview production build
npm run test         # Run Vitest tests
npm run test:ui      # Vitest with UI
npm run test:coverage # Vitest with coverage
```

### Backend (Python FastAPI)

```bash
# Setup (using uv package manager)
uv sync              # Install dependencies from pyproject.toml

# Development (with hot reload)
uv run uvicorn api:app --factory --port 3001 --reload --reload-dir api

# Production
uv run uvicorn api.chat:app --host 0.0.0.0 --port 3001

# Or without uv
pip install -e .
uvicorn api.chat:app --reload --port 3001
```

Startup scripts available in `scripts/`:
- `scripts/start-api.sh` - Production server
- `scripts/start-api-dev.sh` - Development with reload

### Full Stack Development

Run both frontend and backend simultaneously:

- Frontend: `npm run dev` (port 5173)
- Backend: `uv run uvicorn api:app --factory --port 3001 --reload --reload-dir api`

The frontend dev server proxies `/api` requests to the backend.

## Project Structure

```
ai-portfolio/
├── api/                      # FastAPI backend (Python)
│   ├── chat.py               # Streaming chat endpoint
│   ├── main.py               # App factory and config
│   └── utils.py              # Portfolio markdown parser
├── src/                      # React frontend
│   ├── components/
│   │   ├── canvas/           # Canvas view components (9 files)
│   │   ├── chat/             # Chat interface components (8 files)
│   │   ├── layout/           # App layout components (4 files)
│   │   └── ui/               # Reusable UI components (4 files)
│   ├── content/              # Portfolio content & parsing
│   ├── hooks/                # Custom React hooks
│   ├── lib/ai/               # AI tools and prompts
│   └── stores/               # Zustand state stores
├── content/                  # Portfolio data (single source of truth)
│   └── portfolio.md
├── scripts/                  # Shell scripts for running API
└── vercel.json               # Deployment config
```

## Architecture

### Data Flow

1. User sends message → `usePortfolioChat` hook (Vercel AI SDK's `useChat`)
2. Request to `/api/chat` → FastAPI backend (`chat.py`)
3. Backend streams OpenAI response with tool calls
4. `onToolCall` handler in `usePortfolioChat` receives `renderCanvas` tool calls
5. Canvas state updated via Zustand store → Canvas re-renders appropriate component

### Streaming Protocol

Backend uses custom Vercel AI SDK data stream format:
- `0:` - Text chunk
- `9:` - Tool call (`{ toolCallId, toolName, args }`)
- `d:` - Done signal
- `3:` - Error

### Tool Calling for Canvas

The AI uses the `renderCanvas` tool to trigger canvas updates:

```typescript
renderCanvas({
  type: "bio" | "experience" | "projects" | "education" | "skills" | "contact",
  filter?: string,
  highlightId?: string
})
```

Tool definitions: `src/lib/ai/tools.ts` (Zod schema) and `api/chat.py` (OpenAI function)

### State Management

- **Chat state**: Vercel AI SDK's `useChat` with `DefaultChatTransport` in `usePortfolioChat.ts`
- **Canvas state**: Zustand store in `src/stores/canvasStore.ts`
  - Current view type and parameters
  - Navigation history stack
  - Filter and highlightId for targeted display
  - Transition state for animations

### Responsive Layout

- **Desktop** (≥1024px): Side-by-side layout, 40% chat / 60% canvas
- **Tablet** (768-1023px): Stacked layout
- **Mobile** (<768px): Toggle between chat and canvas views

Breakpoint hook: `src/hooks/useMediaQuery.ts`

### Content Configuration

Portfolio data is stored in `content/portfolio.md`. Dual parsers ensure consistency:

- Frontend: `src/content/parsePortfolio.ts` (TypeScript)
- Backend: `api/utils.py` (Python)

Markdown structure uses `##` for sections, `###` for entries, and `key: value` for metadata.

## API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/` | GET | API info and version |
| `/health` | GET | Health check with timestamp |
| `/api/chat` | POST | Streaming chat endpoint |
| `/docs` | GET | OpenAPI documentation |

## Key Files

### Content
- `content/portfolio.md` - **Single source of truth** for all portfolio content

### Frontend Core
- `src/hooks/usePortfolioChat.ts` - Chat hook with `onToolCall` handler
- `src/stores/canvasStore.ts` - Canvas view state and navigation
- `src/lib/ai/tools.ts` - Zod schema for `renderCanvas` tool
- `src/lib/ai/prompts.ts` - System prompt and welcome message
- `src/content/parsePortfolio.ts` - TypeScript markdown parser

### Components
- `src/components/canvas/CanvasContainer.tsx` - Main canvas with AnimatePresence
- `src/components/chat/ChatContainer.tsx` - Chat interface wrapper
- `src/components/layout/AppLayout.tsx` - Responsive two-panel layout

### Backend
- `api/chat.py` - Streaming endpoint with OpenAI Responses API (gpt-4o-mini)
- `api/main.py` - FastAPI app factory
- `api/utils.py` - Python markdown parser

## Path Alias

`@/*` maps to `./src/*` (configured in tsconfig.json and vite.config.ts)

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

## Workflow

- Before implementing a major change, summarize the plan and wait for confirmation.
- Run tests after significant refactors.
- Both parsers (TS and Python) must stay in sync when modifying content structure.
