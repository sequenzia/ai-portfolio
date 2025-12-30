# AI-Powered Portfolio App Overview

## What Is This App?

This is an AI-powered portfolio web application that reimagines how visitors explore a professional portfolio. Instead of traditional static pages with navigation menus, visitors interact with an intelligent chatbot that presents portfolio content conversationally. The AI decides when and how to display visual content inline within the chat, creating an engaging, personalized experience.

## The Problem It Solves

Traditional portfolios force visitors to hunt through pages for relevant information. This app flips the script—visitors simply ask what they want to know, and the AI surfaces the right content in context. Want to see AI-related projects? Just ask. Curious about backend experience? The AI shows the relevant timeline entries.

---

## How It Works

### High-Level Flow

```markdown
User asks a question
→ AI processes the request
→ AI decides whether to show visual content
→ Response streams back with text and/or rendered portfolio sections
→ User sees conversational answer with inline visual content
```

### The Core Concept: Tool Calling for Content

The app uses the AI's **tool calling** capability to render portfolio content. When the AI determines that showing visual content would be helpful, it calls the `renderCanvas` tool with parameters specifying:

- **type**: Which content section (bio, experience, projects, education, skills, contact)
- **filter**: Optional filtering (e.g., "ai" to show only AI projects)
- **highlightId**: Optional ID to emphasize a specific item

The frontend intercepts these tool calls and renders the appropriate visual component inline within the chat message.

---

## Architecture

### Single Source of Truth

All portfolio data lives in one place: `content/portfolio.md`. This markdown file contains:

- Bio information (name, title, location, summary, highlights)
- Work experience (roles, companies, achievements, technologies)
- Projects (descriptions, tech stacks, links)
- Education (degrees, institutions, honors)
- Skills (categorized with proficiency levels)
- Contact information (email, social links, calendar)

A parser (`lib/content/parsePortfolio.ts`) transforms this markdown into typed TypeScript objects that both the AI system prompt and UI components consume.

### Data Flow Diagram

```markdown
┌─────────────────────┐
│ portfolio.md │ ← Single source of truth
└─────────┬───────────┘
│
▼
┌─────────────────────┐
│ parsePortfolio.ts │ ← Markdown → TypeScript
└─────────┬───────────┘
│
▼
┌─────────────────────┐
│ PortfolioContent │ ← Typed data object
└─────────┬───────────┘
│
┌─────┴─────┐
▼ ▼
┌────────┐ ┌────────────┐
│ AI │ │ Canvas │
│ Prompt │ │ Components │
└────────┘ └────────────┘
```

### Frontend Architecture

```markdown
AppLayout
└── ChatContainer
├── Message List (scrollable)
│ ├── UserMessage
│ └── AssistantMessage
│ ├── Text Response
│ └── ContentBlock (from tool calls)
│ └── Canvas Component (Bio, Experience, etc.)
├── Suggested Prompts
└── Input Area
```

### Backend Architecture

```markdown
POST /api/chat
→ Receive messages
→ Build system prompt with portfolio context
→ Call OpenAI (gpt-4o-mini) via Vercel AI SDK
→ Stream response with text and tool calls
→ Return streaming response
```

---

## Key Components

### Chat System

| Component          | Location                            | Purpose                                                               |
| ------------------ | ----------------------------------- | --------------------------------------------------------------------- |
| `usePortfolioChat` | `hooks/usePortfolioChat.ts`         | React hook wrapping Vercel AI SDK's `useChat` with tool call handling |
| `ChatContainer`    | `components/chat/ChatContainer.tsx` | Main chat UI with messages, input, and suggested prompts              |
| `ContentBlock`     | `components/chat/ContentBlock.tsx`  | Routes tool calls to appropriate canvas components                    |

### Canvas Components (Visual Content)

| Component            | Renders                                                           |
| -------------------- | ----------------------------------------------------------------- |
| `BioCard`            | Profile card with photo, title, summary, highlights, social links |
| `ExperienceTimeline` | Work history as a visual timeline with achievements and tech tags |
| `ProjectGrid`        | Project cards with descriptions, technologies, and links          |
| `EducationList`      | Academic background with degrees and honors                       |
| `SkillsMatrix`       | Skills organized by category with proficiency levels              |
| `ContactSection`     | Email, calendar booking, and social media links                   |

### AI Integration

| File                    | Purpose                                         |
| ----------------------- | ----------------------------------------------- |
| `app/api/chat/route.ts` | Streaming chat endpoint with OpenAI integration |
| `lib/ai/tools.ts`       | Zod schema defining the `renderCanvas` tool     |

---

## The Tool Calling System

### Tool Calling - How It Works

1. **User sends message** → Frontend calls `/api/chat`
2. **API builds context** → System prompt includes full portfolio data
3. **AI generates response** → May include `renderCanvas` tool calls
4. **Frontend receives stream** → Text renders immediately, tool calls queued
5. **Tool call completes** → `onToolCall` handler fires
6. **ContentBlock renders** → Appropriate canvas component displays
7. **Tool output sent** → AI receives confirmation for conversation continuity

### When the AI Uses Tools

The system prompt instructs the AI:

**Use the tool when:**

- User asks about specific portfolio sections
- Showing visual content adds value to the response
- User wants to see projects, experience, skills, etc.

**Don't use the tool when:**

- Answering simple factual questions
- Greeting or general conversation
- Information can be conveyed in text alone

### Filtering and Highlighting

The tool supports smart filtering:

```typescript
renderCanvas({
  type: "projects",
  filter: "ai", // Shows only AI-related projects
});

renderCanvas({
  type: "experience",
  highlightId: "exp-1", // Highlights specific job entry
});
```

---

## Tech Stack

| Layer      | Technology                              |
| ---------- | --------------------------------------- |
| Framework  | Next.js 15 (App Router)                 |
| Language   | TypeScript                              |
| AI         | Vercel AI SDK v6 + OpenAI (gpt-4o-mini) |
| Styling    | Tailwind CSS                            |
| Animations | Framer Motion                           |
| Validation | Zod                                     |
| Testing    | Vitest + Testing Library                |

---

## Key Design Decisions

### Why Markdown for Content?

- **Simple to edit**: No database, just edit a text file
- **Version controlled**: Changes tracked in git
- **Portable**: Easy to migrate or backup
- **Flexible**: Supports custom structure with headers and key-value pairs

### Why Tool Calling vs. Hardcoded Responses?

- **Dynamic**: AI decides when visual content helps
- **Contextual**: Responses adapt to conversation flow
- **Filterable**: AI can show subsets of content based on user interest
- **Extensible**: New content types can be added without changing the AI

### Why Inline Content vs. Separate Panel?

- **Conversational**: Content appears where it's discussed
- **Contextual**: User sees content when it's relevant
- **Mobile-friendly**: Single column works on all devices
- **Natural flow**: Matches how conversations work

### Why Streaming?

- **Perceived speed**: Users see response immediately
- **Better UX**: No waiting for complete response
- **Tool timing**: Visual content renders at right moment

---

## File Structure Reference

```markdown
ai-portfolio/
├── app/
│ ├── api/chat/route.ts # Chat API endpoint
│ ├── layout.tsx # Root layout
│ ├── page.tsx # Home page
│ └── globals.css # Global styles
├── components/
│ ├── canvas/ # Portfolio content renderers
│ │ ├── BioCard.tsx
│ │ ├── ExperienceTimeline.tsx
│ │ ├── ProjectGrid.tsx
│ │ ├── EducationList.tsx
│ │ ├── SkillsMatrix.tsx
│ │ └── ContactSection.tsx
│ ├── chat/ # Chat interface
│ │ ├── ChatContainer.tsx
│ │ ├── ContentBlock.tsx
│ │ ├── Message.tsx
│ │ └── MessageList.tsx
│ ├── layout/ # App structure
│ │ └── AppLayout.tsx
│ └── ui/ # Reusable components
├── content/
│ └── portfolio.md # Portfolio data (source of truth)
├── hooks/
│ └── usePortfolioChat.ts # Chat hook
├── lib/
│ ├── ai/
│ │ └── tools.ts # Tool definitions
│ └── content/
│ ├── parsePortfolio.ts # Markdown parser
│ ├── portfolio.ts # Exported data singleton
│ └── types.ts # TypeScript interfaces
└── stores/
└── canvasStore.ts # Zustand store (legacy)
```

---

## Summary

This AI-powered portfolio transforms the traditional portfolio experience by:

1. **Replacing navigation with conversation** — Ask questions instead of clicking menus
2. **Using AI to surface relevant content** — The chatbot shows what matters based on context
3. **Rendering visual content inline** — Portfolio sections appear within the conversation flow
4. **Maintaining a single source of truth** — One markdown file powers both AI knowledge and UI
5. **Supporting smart filtering** — Users can ask for specific subsets of content

The result is a portfolio that feels less like a website and more like talking to someone who knows everything about the portfolio owner's professional background.
