# AI-Powered Portfolio Web App - Product Requirements Document (PRD)

## 1. Executive Summary

This document outlines the requirements for an AI-powered portfolio web application that reimagines the traditional portfolio experience through conversational interaction. Instead of static pages, visitors engage with an intelligent chatbot/agent to explore the portfolio owner's professional background, projects, and capabilities. As users interact with the agent, relevant content dynamically renders in a dedicated "canvas" area, creating an immersive and personalized browsing experience.

The application combines modern frontend technologies (React, TypeScript, Vite) with cutting-edge AI infrastructure (Vercel AI SDK and AI Gateway) to deliver a responsive, engaging, and technically sophisticated portfolio solution.

---

## 2. Problem Statement

Traditional portfolio websites suffer from several limitations:

1. **Passive Experience:** Visitors must navigate through predetermined page structures, often missing relevant content or becoming overwhelmed by information density.

2. **One-Size-Fits-All:** Static portfolios cannot adapt their presentation based on visitor interests or needs (e.g., a recruiter vs. a potential collaborator).

3. **Limited Engagement:** Conventional portfolios offer no mechanism for visitors to ask specific questions or explore topics conversationally.

4. **Memorability:** Most portfolios blend together, failing to differentiate the owner in a competitive landscape.

This application addresses these challenges by transforming portfolio exploration into an interactive dialogue, allowing visitors to discover information organically while experiencing the owner's technical capabilities firsthand.

---

## 3. Goals and Objectives

### Primary Goals

| Goal | Description | Success Indicator |
|------|-------------|-------------------|
| **Conversational Discovery** | Enable visitors to explore portfolio content through natural language interaction | >70% of sessions include 3+ conversational exchanges |
| **Dynamic Content Rendering** | Display contextually relevant content in the canvas based on conversation context | Canvas updates correlate with 85%+ of relevant queries |
| **Technical Showcase** | Demonstrate the portfolio owner's AI/ML and frontend engineering capabilities | Positive feedback on technical implementation |
| **Visitor Engagement** | Increase time-on-site and interaction depth compared to traditional portfolios | Average session duration >3 minutes |

### Secondary Goals

- Provide a mobile-first responsive experience
- Achieve sub-second response times for AI interactions
- Enable easy content updates without code changes
- Support multiple AI model backends through gateway abstraction

---

## 4. Target Users

### Primary Personas

**Persona 1: Technical Recruiter (Sarah)**
- Needs to quickly assess candidate qualifications
- Values efficiency and direct answers
- Wants to see specific project examples and tech stack experience
- Typical queries: "What experience do you have with distributed systems?" or "Show me your most complex project"

**Persona 2: Engineering Manager (Marcus)**
- Evaluating potential team members or collaborators
- Interested in problem-solving approach and communication style
- Wants depth on technical decisions and architecture
- Typical queries: "Walk me through your architecture decisions on [project]" or "How do you approach system design?"

**Persona 3: Fellow Developer (Alex)**
- Curious about specific implementations or technologies
- May want to discuss technical approaches
- Interested in open source contributions or side projects
- Typical queries: "How did you implement [feature]?" or "What's your take on [technology]?"

**Persona 4: Potential Client (Jordan)**
- Evaluating capabilities for a project
- Needs to understand scope of services and past work
- Values professionalism and communication clarity
- Typical queries: "Can you help with [type of project]?" or "What's your process?"

---

## 5. Functional Requirements

### 5.1 Chat Interface

| ID | Requirement | Priority |
|----|-------------|----------|
| FR-1.1 | System shall provide a text input field for user messages | P0 |
| FR-1.2 | System shall display conversation history in a scrollable container | P0 |
| FR-1.3 | System shall differentiate between user and agent messages visually | P0 |
| FR-1.4 | System shall show typing/loading indicator during AI response generation | P0 |
| FR-1.5 | System shall support streaming responses (token-by-token display) | P0 |
| FR-1.6 | System shall display suggested prompts/quick actions | P1 |
| FR-1.7 | System shall support keyboard shortcuts (Enter to send, Shift+Enter for newline) | P1 |
| FR-1.8 | System shall gracefully handle and display error states | P0 |
| FR-1.9 | System shall auto-scroll to latest message | P1 |
| FR-1.10 | System shall support message timestamps | P2 |

### 5.2 AI Agent Capabilities

| ID | Requirement | Priority |
|----|-------------|----------|
| FR-2.1 | Agent shall respond to queries about all six content areas (Bio, Experience, Projects, Education, Skills, Contact) | P0 |
| FR-2.2 | Agent shall maintain conversation context within a session | P0 |
| FR-2.3 | Agent shall emit structured canvas commands when appropriate | P0 |
| FR-2.4 | Agent shall handle off-topic queries gracefully, redirecting to portfolio content | P1 |
| FR-2.5 | Agent shall provide accurate, consistent information based on configured portfolio data | P0 |
| FR-2.6 | Agent shall adapt tone/detail level based on apparent user intent | P2 |
| FR-2.7 | Agent shall suggest relevant follow-up topics or questions | P1 |
| FR-2.8 | Agent shall handle ambiguous queries with clarifying questions | P1 |

### 5.3 Canvas Rendering

| ID | Requirement | Priority |
|----|-------------|----------|
| FR-3.1 | Canvas shall render Bio component with photo, summary, and key highlights | P0 |
| FR-3.2 | Canvas shall render Experience timeline with expandable role details | P0 |
| FR-3.3 | Canvas shall render Project cards with images, descriptions, tech stack, and links | P0 |
| FR-3.4 | Canvas shall render Education section with institutions and credentials | P0 |
| FR-3.5 | Canvas shall render Skills visualization (categories, proficiency levels) | P0 |
| FR-3.6 | Canvas shall render Contact section with form and/or social links | P0 |
| FR-3.7 | Canvas shall support animated transitions between content states | P1 |
| FR-3.8 | Canvas shall display welcome/default state when no content is triggered | P0 |
| FR-3.9 | Canvas shall support rendering multiple items (e.g., filtered project list) | P1 |
| FR-3.10 | Canvas shall support deep-linking to specific content states | P2 |

### 5.4 Layout and Responsiveness

| ID | Requirement | Priority |
|----|-------------|----------|
| FR-4.1 | Desktop layout (≥1024px): Chat panel (40%) and Canvas panel (60%) side-by-side | P0 |
| FR-4.2 | Tablet layout (768-1023px): Configurable split or stacked layout | P1 |
| FR-4.3 | Mobile layout (<768px): Stacked layout with chat primary, canvas below | P0 |
| FR-4.4 | Layout shall include persistent header with portfolio owner name/branding | P1 |
| FR-4.5 | Mobile layout shall support toggling between chat and canvas views | P1 |

---

## 6. Non-Functional Requirements

### 6.1 Performance

| ID | Requirement | Target |
|----|-------------|--------|
| NFR-1.1 | Initial page load (LCP) | < 2.5 seconds |
| NFR-1.2 | Time to Interactive (TTI) | < 3.5 seconds |
| NFR-1.3 | AI response initiation (first token) | < 500ms |
| NFR-1.4 | Canvas transition animations | 60 fps |
| NFR-1.5 | Bundle size (gzipped) | < 200KB initial |
| NFR-1.6 | Cumulative Layout Shift (CLS) | < 0.1 |

### 6.2 Reliability

| ID | Requirement | Target |
|----|-------------|--------|
| NFR-2.1 | Application uptime | 99.5% |
| NFR-2.2 | AI service availability | Graceful degradation with fallback messaging |
| NFR-2.3 | Error rate for AI requests | < 1% |

### 6.3 Security

| ID | Requirement | Description |
|----|-------------|-------------|
| NFR-3.1 | Input sanitization | All user inputs sanitized before processing |
| NFR-3.2 | API key protection | AI API keys never exposed to client |
| NFR-3.3 | Rate limiting | Implement request rate limiting to prevent abuse |
| NFR-3.4 | Content Security Policy | Strict CSP headers configured |
| NFR-3.5 | HTTPS only | All traffic encrypted via TLS |

### 6.4 Accessibility

| ID | Requirement | Standard |
|----|-------------|----------|
| NFR-4.1 | WCAG compliance | Level AA |
| NFR-4.2 | Keyboard navigation | Full keyboard accessibility |
| NFR-4.3 | Screen reader support | ARIA labels and semantic HTML |
| NFR-4.4 | Color contrast | Minimum 4.5:1 ratio |
| NFR-4.5 | Reduced motion support | Respect prefers-reduced-motion |

### 6.5 Scalability

| ID | Requirement | Description |
|----|-------------|-------------|
| NFR-5.1 | Concurrent users | Support 100+ simultaneous sessions |
| NFR-5.2 | Content extensibility | New content types addable without core changes |
| NFR-5.3 | Model flexibility | Swap AI models via gateway without code changes |

---

## 7. Technical Architecture

### 7.1 System Overview

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                              Client (Browser)                                │
│  ┌─────────────────────────────────────────────────────────────────────────┐│
│  │                        React Application (Vite)                         ││
│  │  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────────────┐ ││
│  │  │   Chat Panel    │  │  Canvas Panel   │  │    State Management     │ ││
│  │  │                 │  │                 │  │    (React Context /     │ ││
│  │  │ - Message List  │  │ - Bio Component │  │     Zustand)            │ ││
│  │  │ - Input Field   │  │ - Experience    │  │                         │ ││
│  │  │ - Suggestions   │  │ - Projects      │  │  - Conversation State   │ ││
│  │  │                 │  │ - Education     │  │  - Canvas State         │ ││
│  │  │                 │  │ - Skills        │  │  - UI State             │ ││
│  │  │                 │  │ - Contact       │  │                         │ ││
│  │  └─────────────────┘  └─────────────────┘  └─────────────────────────┘ ││
│  │                                                                         ││
│  │  ┌─────────────────────────────────────────────────────────────────┐   ││
│  │  │                    Vercel AI SDK (useChat)                      │   ││
│  │  │         Streaming responses, message handling, hooks            │   ││
│  │  └─────────────────────────────────────────────────────────────────┘   ││
│  └─────────────────────────────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────────────────────────┘
                                      │
                                      │ HTTPS / Streaming
                                      ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                           Edge/Serverless API                                │
│  ┌─────────────────────────────────────────────────────────────────────────┐│
│  │                         API Route Handler                               ││
│  │                                                                         ││
│  │  - Request validation                                                   ││
│  │  - Rate limiting                                                        ││
│  │  - Conversation context assembly                                        ││
│  │  - Tool/function definitions                                            ││
│  │  - Response streaming                                                   ││
│  └─────────────────────────────────────────────────────────────────────────┘│
│                                      │                                       │
│                                      ▼                                       │
│  ┌─────────────────────────────────────────────────────────────────────────┐│
│  │                        Vercel AI Gateway                                ││
│  │                                                                         ││
│  │  - Model routing                                                        ││
│  │  - Fallback configuration                                               ││
│  │  - Usage tracking                                                       ││
│  │  - Provider abstraction (OpenAI, Anthropic, etc.)                       ││
│  └─────────────────────────────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────────────────────────┘
                                      │
                                      ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                           LLM Provider (via Gateway)                         │
│                     (OpenAI, Anthropic, Google, etc.)                        │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 7.2 Technology Stack

| Layer | Technology | Justification |
|-------|------------|---------------|
| **Build Tool** | Vite | Fast HMR, optimized builds, native ESM support |
| **Framework** | React 18+ | Component model, hooks, ecosystem |
| **Language** | TypeScript | Type safety, developer experience, maintainability |
| **Styling** | Tailwind CSS | Utility-first, design system consistency, small bundle |
| **Animation** | Framer Motion | Declarative animations, gesture support, layout animations |
| **AI SDK** | Vercel AI SDK | Streaming support, React hooks, tool calling, type safety |
| **AI Gateway** | Vercel AI Gateway | Model abstraction, fallbacks, observability |
| **State** | React Context + Zustand | Lightweight, sufficient for app complexity |
| **Deployment** | Vercel | Edge functions, automatic optimization, easy CI/CD |

### 7.3 Key Architectural Decisions

**Decision 1: Tool Calling for Canvas Commands**

The AI agent uses tool/function calling to emit structured canvas commands rather than parsing natural language responses.

```typescript
// Example tool definition
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

Rationale: Reliable structured output, clear separation of concerns, type-safe canvas updates.

**Decision 2: Streaming with Parallel Canvas Updates**

Responses stream to the chat while canvas commands execute immediately upon tool invocation.

Rationale: Better perceived performance, engaging user experience, natural conversation flow.

**Decision 3: Content as Configuration**

Portfolio content stored as typed JSON/TypeScript configuration, not in a database.

```typescript
// Example content structure
interface PortfolioContent {
  bio: BioContent;
  experience: ExperienceItem[];
  projects: ProjectItem[];
  education: EducationItem[];
  skills: SkillCategory[];
  contact: ContactInfo;
}
```

Rationale: Simplicity for single-user portfolio, version controlled, type-safe, no database costs.

**Decision 4: AI Gateway for Model Flexibility**

All LLM requests route through Vercel AI Gateway rather than direct provider calls.

Rationale: Easy model switching, built-in fallbacks, cost optimization, unified observability.

### 7.4 Component Architecture

```
src/
├── components/
│   ├── chat/
│   │   ├── ChatContainer.tsx       # Main chat wrapper
│   │   ├── MessageList.tsx         # Scrollable message history
│   │   ├── Message.tsx             # Individual message bubble
│   │   ├── ChatInput.tsx           # Text input with send button
│   │   ├── TypingIndicator.tsx     # Loading state
│   │   └── SuggestedPrompts.tsx    # Clickable prompt chips
│   │
│   ├── canvas/
│   │   ├── CanvasContainer.tsx     # Canvas wrapper with transitions
│   │   ├── WelcomeState.tsx        # Default/empty state
│   │   ├── BioCard.tsx             # Bio content renderer
│   │   ├── ExperienceTimeline.tsx  # Timeline component
│   │   ├── ProjectGrid.tsx         # Project cards grid
│   │   ├── ProjectCard.tsx         # Individual project
│   │   ├── EducationList.tsx       # Education credentials
│   │   ├── SkillsMatrix.tsx        # Skills visualization
│   │   └── ContactSection.tsx      # Contact info/form
│   │
│   ├── layout/
│   │   ├── AppLayout.tsx           # Main responsive layout
│   │   ├── Header.tsx              # Top navigation/branding
│   │   └── MobileToggle.tsx        # Chat/canvas toggle (mobile)
│   │
│   └── ui/                         # Shared UI primitives
│       ├── Button.tsx
│       ├── Card.tsx
│       ├── Badge.tsx
│       └── ...
│
├── hooks/
│   ├── usePortfolioChat.ts         # Wrapper around useChat with tools
│   ├── useCanvasState.ts           # Canvas state management
│   └── useMediaQuery.ts            # Responsive breakpoints
│
├── lib/
│   ├── ai/
│   │   ├── tools.ts                # Tool definitions
│   │   └── prompts.ts              # System prompts
│   │
│   └── utils/
│       └── cn.ts                   # Class name utility
│
├── content/
│   ├── portfolio.ts                # Portfolio data
│   └── types.ts                    # Content type definitions
│
├── api/
│   └── chat/
│       └── route.ts                # API route handler
│
├── stores/
│   └── canvasStore.ts              # Zustand store for canvas
│
├── App.tsx
├── main.tsx
└── index.css                       # Tailwind imports
```

### 7.5 API Design

**Endpoint:** `POST /api/chat`

**Request:**
```typescript
interface ChatRequest {
  messages: Message[];
  // Additional context if needed
}
```

**Response:** Server-Sent Events (SSE) stream

The API handler:
1. Validates incoming request
2. Assembles system prompt with portfolio context
3. Configures tool definitions
4. Streams response via AI Gateway
5. Handles tool calls for canvas commands

---

## 8. Data Models

### 8.1 Portfolio Content Types

```typescript
// Bio
interface BioContent {
  name: string;
  title: string;
  location: string;
  photoUrl: string;
  summary: string;
  highlights: string[];
  socialLinks: SocialLink[];
}

// Experience
interface ExperienceItem {
  id: string;
  company: string;
  role: string;
  location: string;
  startDate: string;
  endDate: string | "Present";
  description: string;
  achievements: string[];
  technologies: string[];
  logoUrl?: string;
}

// Projects
interface ProjectItem {
  id: string;
  name: string;
  description: string;
  longDescription: string;
  imageUrl: string;
  technologies: string[];
  category: string;
  links: {
    live?: string;
    github?: string;
    caseStudy?: string;
  };
  featured: boolean;
  date: string;
}

// Education
interface EducationItem {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  gpa?: string;
  honors?: string[];
  logoUrl?: string;
}

// Skills
interface SkillCategory {
  name: string;
  skills: Skill[];
}

interface Skill {
  name: string;
  level: "beginner" | "intermediate" | "advanced" | "expert";
  yearsOfExperience?: number;
  icon?: string;
}

// Contact
interface ContactInfo {
  email: string;
  phone?: string;
  calendlyUrl?: string;
  formEnabled: boolean;
  socialLinks: SocialLink[];
}

interface SocialLink {
  platform: string;
  url: string;
  icon: string;
}
```

### 8.2 Canvas State

```typescript
interface CanvasState {
  currentView: CanvasViewType;
  data: CanvasData | null;
  isTransitioning: boolean;
  history: CanvasViewType[];
}

type CanvasViewType = 
  | "welcome"
  | "bio"
  | "experience"
  | "projects"
  | "education"
  | "skills"
  | "contact";

interface CanvasData {
  type: CanvasViewType;
  filter?: string;
  highlightId?: string;
  items?: string[]; // IDs of items to show
}
```

### 8.3 Conversation State

```typescript
// Managed by Vercel AI SDK useChat hook
interface Message {
  id: string;
  role: "user" | "assistant" | "system" | "tool";
  content: string;
  toolInvocations?: ToolInvocation[];
  createdAt?: Date;
}
```

---

## 9. UI/UX Specifications

### 9.1 Layout Specifications

**Desktop (≥1024px)**
```
┌──────────────────────────────────────────────────────────────────┐
│  Header: Name / Logo                           [Theme Toggle]    │
├────────────────────────────┬─────────────────────────────────────┤
│                            │                                     │
│      Chat Panel            │          Canvas Panel               │
│         40%                │             60%                     │
│                            │                                     │
│  ┌──────────────────────┐  │  ┌─────────────────────────────────┐│
│  │                      │  │  │                                 ││
│  │   Message History    │  │  │      Dynamic Content Area       ││
│  │                      │  │  │                                 ││
│  │                      │  │  │   [Bio | Experience | Projects  ││
│  │                      │  │  │    Education | Skills | Contact]││
│  │                      │  │  │                                 ││
│  └──────────────────────┘  │  └─────────────────────────────────┘│
│                            │                                     │
│  ┌──────────────────────┐  │                                     │
│  │ Suggested Prompts    │  │                                     │
│  └──────────────────────┘  │                                     │
│  ┌──────────────────────┐  │                                     │
│  │ [Input Field    ][⏎] │  │                                     │
│  └──────────────────────┘  │                                     │
└────────────────────────────┴─────────────────────────────────────┘
```

**Mobile (<768px)**
```
┌────────────────────────────┐
│  Header              [☰]   │
├────────────────────────────┤
│                            │
│   [Chat] [Canvas] Toggle   │
│                            │
├────────────────────────────┤
│                            │
│                            │
│    Active View Content     │
│    (Chat or Canvas)        │
│                            │
│                            │
│                            │
├────────────────────────────┤
│  [Input Field         ][⏎] │
└────────────────────────────┘
```

### 9.2 Visual Design Tokens

```typescript
// Tailwind config extension
const designTokens = {
  colors: {
    primary: {
      50: "#f0f9ff",
      // ... full scale
      900: "#0c4a6e",
    },
    surface: {
      chat: "#ffffff",
      canvas: "#f8fafc",
      message: {
        user: "#3b82f6",
        assistant: "#f1f5f9",
      },
    },
  },
  spacing: {
    chatPadding: "1rem",
    messagePadding: "0.75rem 1rem",
    canvasPadding: "2rem",
  },
  borderRadius: {
    message: "1rem",
    card: "0.75rem",
  },
  shadows: {
    card: "0 1px 3px rgba(0,0,0,0.1)",
    elevated: "0 4px 6px rgba(0,0,0,0.1)",
  },
};
```

### 9.3 Animation Specifications

| Element | Animation | Duration | Easing |
|---------|-----------|----------|--------|
| Message appear | Fade in + slide up | 200ms | ease-out |
| Canvas transition | Cross-fade | 300ms | ease-in-out |
| Card hover | Scale + shadow | 150ms | ease-out |
| Typing indicator | Pulse | 1000ms | linear (loop) |
| Skill bar fill | Width expansion | 500ms | ease-out |
| Timeline item | Stagger fade in | 100ms each | ease-out |

### 9.4 Welcome State

The canvas displays a welcome state on initial load:

- Greeting message introducing the AI assistant
- Brief explanation of how to interact
- Quick-start prompt buttons for each content area
- Subtle animation to draw attention

---

## 10. AI Agent Specifications

### 10.1 System Prompt Structure

```typescript
const systemPrompt = `
You are an AI assistant representing {owner_name}'s professional portfolio. 
Your role is to help visitors learn about {owner_name}'s background, experience, 
projects, skills, and how to get in touch.

## Personality
- Professional yet approachable
- Enthusiastic about {owner_name}'s work
- Helpful and conversational
- Concise but thorough when details are requested

## Portfolio Content
{serialized_portfolio_content}

## Behavior Guidelines
1. Answer questions about the portfolio content accurately
2. When discussing specific content areas, use the renderCanvas tool to display 
   relevant visual content
3. If asked about topics outside the portfolio, politely redirect to portfolio topics
4. Suggest relevant follow-up questions to encourage exploration
5. For contact requests, offer to display the contact section

## Tool Usage
Use the renderCanvas tool when:
- User asks about a specific content area
- Displaying visual content would enhance understanding
- User requests to "see" or "show" something

Do not use renderCanvas for:
- Simple factual answers that don't need visuals
- Clarifying questions
- Greetings or small talk
`;
```

### 10.2 Tool Definitions

```typescript
const tools = {
  renderCanvas: {
    description: "Display content in the canvas area of the portfolio",
    parameters: z.object({
      contentType: z.enum([
        "bio",
        "experience", 
        "projects",
        "education",
        "skills",
        "contact",
        "welcome"
      ]).describe("The type of content to display"),
      
      filter: z.string().optional()
        .describe("Optional filter for projects (e.g., 'ai', 'web') or experience (e.g., company name)"),
      
      highlightId: z.string().optional()
        .describe("ID of a specific item to highlight/focus"),
    }),
  },
};
```

### 10.3 Conversation Patterns

**Pattern: Content Exploration**
```
User: "Tell me about your projects"
Agent: "I'd be happy to show you the projects! [renderCanvas: projects] 
        There are several projects spanning AI/ML, web development, and 
        open source contributions. Is there a particular area you'd like 
        to explore in more detail?"
```

**Pattern: Specific Inquiry**
```
User: "What experience do you have with Kubernetes?"
Agent: "There's significant experience with Kubernetes across multiple roles. 
        [renderCanvas: experience, filter: kubernetes]
        At [Company], the work involved designing and managing production 
        Kubernetes clusters handling [X] requests per day. Would you like 
        more details on any specific role?"
```

**Pattern: Contact Request**
```
User: "How can I get in touch?"
Agent: "Great question! [renderCanvas: contact]
        The best way to reach out is via email at [email], or you can 
        schedule a call directly using the calendar link. Is there a 
        specific opportunity you'd like to discuss?"
```

---

## 11. Content Configuration

### 11.1 Content File Structure

```typescript
// src/content/portfolio.ts

import { PortfolioContent } from "./types";

export const portfolioContent: PortfolioContent = {
  bio: {
    name: "Your Name",
    title: "Senior Software Engineer",
    location: "San Francisco, CA",
    photoUrl: "/images/profile.jpg",
    summary: "Passionate software engineer with 8+ years of experience...",
    highlights: [
      "Led development of AI systems processing 1M+ requests daily",
      "Open source contributor with 5k+ GitHub stars",
      "Speaker at ReactConf 2024",
    ],
    socialLinks: [
      { platform: "GitHub", url: "https://github.com/...", icon: "github" },
      { platform: "LinkedIn", url: "https://linkedin.com/in/...", icon: "linkedin" },
      { platform: "Twitter", url: "https://twitter.com/...", icon: "twitter" },
    ],
  },
  
  experience: [
    {
      id: "exp-1",
      company: "Tech Company",
      role: "Senior Software Engineer",
      location: "San Francisco, CA",
      startDate: "2022-01",
      endDate: "Present",
      description: "Leading development of AI-powered features...",
      achievements: [
        "Reduced inference latency by 40%",
        "Architected microservices migration",
      ],
      technologies: ["Python", "Kubernetes", "TensorFlow"],
    },
    // ... more experience items
  ],
  
  projects: [
    {
      id: "proj-1",
      name: "AI Assistant Platform",
      description: "Enterprise conversational AI platform",
      longDescription: "Full details about the project...",
      imageUrl: "/images/projects/ai-platform.png",
      technologies: ["React", "Python", "LLMs"],
      category: "ai",
      links: {
        live: "https://example.com",
        github: "https://github.com/...",
      },
      featured: true,
      date: "2024",
    },
    // ... more projects
  ],
  
  education: [
    {
      id: "edu-1",
      institution: "University Name",
      degree: "Bachelor of Science",
      field: "Computer Science",
      startDate: "2012",
      endDate: "2016",
      honors: ["Magna Cum Laude"],
    },
  ],
  
  skills: [
    {
      name: "Languages",
      skills: [
        { name: "TypeScript", level: "expert", yearsOfExperience: 6 },
        { name: "Python", level: "expert", yearsOfExperience: 8 },
        // ... more skills
      ],
    },
    {
      name: "Frameworks",
      skills: [
        { name: "React", level: "expert", yearsOfExperience: 5 },
        // ... more
      ],
    },
    // ... more categories
  ],
  
  contact: {
    email: "your.email@example.com",
    calendlyUrl: "https://calendly.com/...",
    formEnabled: true,
    socialLinks: [
      // ... same as bio or different
    ],
  },
};
```

### 11.2 Content Update Process

1. Edit `src/content/portfolio.ts`
2. TypeScript validates content structure
3. Commit and push changes
4. Vercel automatically rebuilds and deploys

---

## 12. Error Handling

### 12.1 Error Categories and Responses

| Error Type | User-Facing Message | Technical Handling |
|------------|--------------------|--------------------|
| AI API timeout | "I'm taking longer than usual to respond. Please try again." | Retry with exponential backoff (max 3) |
| AI API error | "I'm having trouble connecting. Let me try again..." | Automatic retry, fallback to static content |
| Rate limit | "You're asking great questions! Let's slow down a bit." | Display cooldown timer, queue requests |
| Network error | "Connection lost. Retrying..." | Automatic reconnect with status indicator |
| Invalid response | "Let me rephrase that..." | Log error, regenerate response |

### 12.2 Fallback Behavior

When AI service is unavailable:
1. Display cached/static version of portfolio content
2. Show notification that AI chat is temporarily unavailable  
3. Provide navigation buttons to directly access content sections
4. Queue messages for retry when service recovers

---

## 13. Analytics and Observability

### 13.1 Key Metrics

| Metric | Description | Target |
|--------|-------------|--------|
| Session duration | Average time spent on site | >3 min |
| Messages per session | Average conversation length | >4 |
| Canvas interactions | Content areas viewed per session | >2 |
| Bounce rate | Sessions with ≤1 message | <30% |
| Error rate | Failed AI requests / total | <1% |
| Response latency P50 | Median first-token time | <400ms |
| Response latency P99 | 99th percentile first-token | <2s |

### 13.2 Event Tracking

```typescript
// Events to track
type AnalyticsEvent =
  | { type: "session_start" }
  | { type: "message_sent"; messageLength: number }
  | { type: "canvas_view"; contentType: CanvasViewType }
  | { type: "link_click"; destination: string }
  | { type: "contact_form_submit" }
  | { type: "error"; errorType: string; errorMessage: string }
  | { type: "session_end"; duration: number; messageCount: number };
```

### 13.3 Observability Stack

- **Vercel Analytics:** Core web vitals, traffic
- **AI Gateway Dashboard:** Model usage, latency, costs
- **Error Tracking:** Sentry or similar for runtime errors
- **Logging:** Structured logs for API routes

---

## 14. Testing Strategy

### 14.1 Testing Pyramid

| Level | Tools | Coverage Target |
|-------|-------|-----------------|
| Unit | Vitest | 80% of utilities, hooks |
| Component | React Testing Library | Key components |
| Integration | Playwright | Critical user flows |
| E2E | Playwright | Happy path scenarios |

### 14.2 Critical Test Scenarios

1. **Conversation Flow**
   - Send message, receive streamed response
   - Canvas updates on tool call
   - Error handling and retry

2. **Responsive Layout**
   - Desktop split view renders correctly
   - Mobile stacked view works
   - Toggle between chat/canvas on mobile

3. **Canvas Components**
   - Each content type renders correctly
   - Transitions animate smoothly
   - Data displays accurately

4. **Accessibility**
   - Keyboard navigation works
   - Screen reader announces messages
   - Focus management is correct

---

## 15. Deployment and Infrastructure

### 15.1 Deployment Pipeline

```
┌─────────────┐    ┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│   Commit    │───▶│   Build     │───▶│   Test      │───▶│   Deploy    │
│             │    │   (Vite)    │    │   (Vitest)  │    │   (Vercel)  │
└─────────────┘    └─────────────┘    └─────────────┘    └─────────────┘
       │                                                         │
       │                                                         ▼
       │                                                  ┌─────────────┐
       │                                                  │  Preview    │
       └─────────────────────────────────────────────────▶│  (Branch)   │
                                                          └─────────────┘
```

### 15.2 Environment Configuration

| Environment | Purpose | AI Model | Domain |
|-------------|---------|----------|--------|
| Development | Local dev | Faster/cheaper model | localhost:5173 |
| Preview | Branch previews | Production model | *.vercel.app |
| Production | Live site | Production model | yourdomain.com |

### 15.3 Environment Variables

```bash
# AI Configuration
AI_GATEWAY_URL=           # Vercel AI Gateway endpoint
AI_DEFAULT_MODEL=         # Default model identifier

# Feature Flags
ENABLE_ANALYTICS=         # true/false
ENABLE_CONTACT_FORM=      # true/false

# External Services (if applicable)
SENTRY_DSN=               # Error tracking
```

---

## 16. Security Considerations

### 16.1 Threat Model

| Threat | Mitigation |
|--------|------------|
| Prompt injection | Input validation, system prompt hardening |
| API key exposure | Server-side only, environment variables |
| DDoS | Rate limiting, Vercel's built-in protection |
| XSS | React's built-in escaping, CSP headers |
| Data exfiltration | No sensitive data stored client-side |

### 16.2 Rate Limiting Strategy

```typescript
// Per-IP limits
const rateLimits = {
  messages: {
    window: "1m",    // 1 minute window
    limit: 20,       // 20 messages per minute
  },
  sessions: {
    window: "1h",    // 1 hour window  
    limit: 100,      // 100 messages per hour
  },
};
```

### 16.3 Content Security Policy

```typescript
const cspDirectives = {
  "default-src": ["'self'"],
  "script-src": ["'self'"],
  "style-src": ["'self'", "'unsafe-inline'"], // Required for Tailwind
  "img-src": ["'self'", "data:", "https:"],
  "connect-src": ["'self'", "https://api.anthropic.com", /* gateway URLs */],
  "font-src": ["'self'"],
};
```

---

## 17. Future Considerations

### 17.1 Phase 2 Enhancements

| Feature | Description | Effort |
|---------|-------------|--------|
| Voice input | Speech-to-text for queries | Medium |
| Conversation persistence | Save/resume conversations | Medium |
| Multi-language | i18n support for international visitors | Large |
| Custom themes | User-selectable color schemes | Small |
| Export conversation | Download chat as PDF | Small |

### 17.2 Phase 3 Possibilities

- Integration with calendar for direct scheduling
- Live demo environments embedded in project cards
- Analytics dashboard for portfolio owner
- A/B testing for conversation strategies
- Integration with CRM for lead tracking

---

## 18. Success Metrics and KPIs

### 18.1 Launch Criteria

| Criterion | Requirement |
|-----------|-------------|
| Core features complete | All P0 requirements implemented |
| Performance | Meets NFR-1.x targets |
| Accessibility | WCAG AA compliance verified |
| Cross-browser | Tested on Chrome, Firefox, Safari, Edge |
| Mobile responsive | Verified on iOS and Android |
| Error handling | All error states gracefully handled |

### 18.2 Post-Launch KPIs

| Timeframe | KPI | Target |
|-----------|-----|--------|
| Week 1 | Uptime | 99.5% |
| Week 1 | Error rate | <1% |
| Month 1 | Avg session duration | >3 min |
| Month 1 | Return visitor rate | >15% |
| Month 3 | Contact conversions | Baseline established |

---

## 19. Appendix

### A. Glossary

| Term | Definition |
|------|------------|
| Canvas | The dynamic content display area that renders portfolio content |
| Tool calling | LLM capability to invoke structured functions during generation |
| Streaming | Token-by-token response delivery for perceived responsiveness |
| SSE | Server-Sent Events, the protocol for streaming responses |
| AI Gateway | Proxy layer abstracting LLM provider details |

### B. Reference Links

- [Vercel AI SDK Documentation](https://sdk.vercel.ai/docs)
- [Vercel AI Gateway](https://vercel.com/docs/ai-gateway)
- [Framer Motion](https://www.framer.com/motion/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Vite](https://vitejs.dev/guide/)

### C. Document History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | December 2024 | - | Initial draft |

---

*End of Document*