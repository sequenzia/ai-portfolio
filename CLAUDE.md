# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is an AI-powered portfolio web application where visitors interact with an intelligent chatbot to explore the portfolio owner's professional background. Instead of static pages, users converse with an AI agent that dynamically renders relevant content in a "canvas" area.

## Technology Stack

- **Build Tool:** Vite
- **Framework:** React 18+
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Animation:** Framer Motion
- **AI SDK:** Vercel AI SDK (useChat hook, tool calling, streaming)
- **AI Gateway:** Vercel AI Gateway
- **State Management:** React Context + Zustand
- **Deployment:** Vercel

## Architecture

The application has two main panels:
1. **Chat Panel (40%):** Conversational interface using Vercel AI SDK's `useChat` hook with streaming responses
2. **Canvas Panel (60%):** Dynamic content area that renders portfolio content (Bio, Experience, Projects, Education, Skills, Contact) based on AI agent tool calls

Key architectural decisions:
- AI agent uses **tool calling** (not natural language parsing) to emit structured canvas commands via `renderCanvas` tool
- Portfolio content stored as **typed TypeScript configuration** in `src/content/portfolio.ts` (not a database)
- All LLM requests route through **Vercel AI Gateway** for model abstraction and fallbacks
- Responses stream while canvas commands execute immediately on tool invocation

## Expected Project Structure

```
src/
├── components/
│   ├── chat/          # ChatContainer, MessageList, Message, ChatInput, TypingIndicator
│   ├── canvas/        # CanvasContainer, BioCard, ExperienceTimeline, ProjectGrid, etc.
│   ├── layout/        # AppLayout, Header, MobileToggle
│   └── ui/            # Shared UI primitives (Button, Card, Badge)
├── hooks/             # usePortfolioChat, useCanvasState, useMediaQuery
├── lib/
│   ├── ai/            # tools.ts (tool definitions), prompts.ts (system prompts)
│   └── utils/         # cn.ts (class name utility)
├── content/           # portfolio.ts (data), types.ts (content type definitions)
├── api/chat/          # route.ts (API handler)
├── stores/            # canvasStore.ts (Zustand)
├── App.tsx
├── main.tsx
└── index.css
```

## Key Implementation Patterns

### Tool Calling for Canvas
```typescript
const tools = {
  renderCanvas: {
    description: "Render content in the canvas area",
    parameters: z.object({
      type: z.enum(["bio", "experience", "projects", "education", "skills", "contact"]),
      filter: z.string().optional(),
      highlightId: z.string().optional(),
    }),
  },
};
```

### Content Types
Portfolio data uses strongly typed interfaces: `BioContent`, `ExperienceItem`, `ProjectItem`, `EducationItem`, `SkillCategory`, `ContactInfo`. See PRD section 8.1 for full type definitions.

### Canvas State
```typescript
type CanvasViewType = "welcome" | "bio" | "experience" | "projects" | "education" | "skills" | "contact";
```

## Responsive Layout

- **Desktop (≥1024px):** Side-by-side split (Chat 40%, Canvas 60%)
- **Tablet (768-1023px):** Configurable split or stacked
- **Mobile (<768px):** Stacked with toggle between chat and canvas views

## Performance Targets

- LCP: < 2.5s
- TTI: < 3.5s
- First AI token: < 500ms
- Bundle size (gzipped): < 200KB
- CLS: < 0.1

## Testing

- **Unit:** Vitest (80% coverage for utilities, hooks)
- **Component:** React Testing Library
- **Integration/E2E:** Playwright

## **More Information**
Review [requirements.md](requirements.md) for more information.