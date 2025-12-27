# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

AI-powered portfolio web application where visitors interact with a chatbot to explore the portfolio owner's professional background. Two main panels: Chat (40%) for conversation, Canvas (60%) for dynamically rendered portfolio content triggered by AI tool calls.

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

# Run API server
uv run uvicorn api.chat:app --reload --port 3001

# Or without uv
pip install -e .
uvicorn api.chat:app --reload --port 3001
```

### Full Stack Development
Run both frontend and backend simultaneously:
- Frontend: `npm run dev` (port 5173)
- Backend: `uv run uvicorn api.chat:app --reload --port 3001`

## Architecture

### Data Flow
1. User sends message → `usePortfolioChat` hook (Vercel AI SDK's `useChat`)
2. Request to `/api/chat` → FastAPI backend (`api/chat.py`)
3. Backend streams OpenAI response with tool calls
4. `onToolCall` handler in `usePortfolioChat` receives `renderCanvas` tool calls
5. Canvas state updated via Zustand store → Canvas re-renders appropriate component

### Tool Calling for Canvas
The AI uses the `renderCanvas` tool to trigger canvas updates:
```typescript
renderCanvas({ type: "bio" | "experience" | "projects" | "education" | "skills" | "contact", filter?: string, highlightId?: string })
```
Tool definitions: `src/lib/ai/tools.ts` (frontend schema) and `api/chat.py` (backend OpenAI function)

### State Management
- **Chat state**: Managed by Vercel AI SDK's `useChat` hook in `usePortfolioChat.ts`
- **Canvas state**: Zustand store in `src/stores/canvasStore.ts` - tracks current view, filter, and navigation history

### Content Configuration
Portfolio data is typed TypeScript config in `src/content/portfolio.ts`. System prompt in `api/chat.py` also contains portfolio content for the LLM.

## Key Files

- `src/hooks/usePortfolioChat.ts` - Wraps `useChat`, handles `renderCanvas` tool calls
- `src/stores/canvasStore.ts` - Zustand store for canvas view state
- `src/lib/ai/tools.ts` - Zod schema for `renderCanvas` tool
- `src/lib/ai/prompts.ts` - System prompt generation (frontend reference)
- `api/chat.py` - FastAPI streaming endpoint with OpenAI tool calling
- `src/content/portfolio.ts` - Portfolio data (bio, experience, projects, etc.)

## Path Alias

`@/*` maps to `./src/*` (configured in tsconfig.json and vite.config.ts)

## Environment Variables

Create `.env.local`:
```bash
OPENAI_API_KEY=sk-...
```

## More Information
See [requirements.md](requirements.md) for detailed PRD including content types, API design, and UI specifications.
