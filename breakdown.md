# Project Breakdown: AI-Powered Agentic Portfolio

This project is a sophisticated **Chat-First Portfolio Architecture** that combines a modern React frontend with a high-performance Python (FastAPI) backend. The core innovation is the **Agentic Interface**, where an AI chatbot serves as the primary navigation and interaction layer, capable of controlling the UI in real-time.

---

## 🏗️ Technical Architecture

| Layer | Technology | Role |
| :--- | :--- | :--- |
| **Frontend** | React + Vite | UI/UX, state management, and streaming chat interface. |
| **Backend** | FastAPI (Python) | AI orchestration, portfolio data parsing, and streaming execution. |
| **AI Layer** | Vercel AI SDK + OpenAI | Handles natural language processing and agentic tool-calling. |
| **Data Source** | Markdown (`portfolio.md`) | The "Single Source of Truth" for all career data. |
| **Styling** | Tailwind CSS + Framer Motion | Premium aesthetics and smooth UI transitions. |

---

## 🔄 Full Data Flow Breakdown

The application operates through a bidirectional loop where data moves from a static file to a dynamic AI response, eventually triggering UI state changes.

### 1. Data Initialization (Static to Structured)

* **Source**: All data (Bio, Experience, Projects) lives in `/content/portfolio.md`.
* **Parser**: Upon server startup (or request), `api/parse_portfolio.py` reads this Markdown file and converts it into a structured Python dictionary.
* **Benefit**: You only ever need to update one text file to change the content across the entire site (Both AI knowledge and UI cards).

### 2. The Interaction Loop (User → AI)

* **Input**: A user sends a message via the **Chatbot** (Left Panel).
* **API Call**: The `usePortfolioChat` hook (Vercel AI SDK) POSTs the conversation history to `/api/chat`.
* **System Prompt Generation**: The backend dynamically builds a massive "System Prompt" that injects your entire career history (parsed in step 1) as context for the LLM.

### 3. Agentic Execution (Tool Calling)

* **Decision**: If the AI determines a visual update is needed (e.g., the user says "Show me your AI projects"), it triggers a tool call named `renderCanvas`.
* **Payload**: The tool call contains parameters like `type: "projects"` and `filter: "ai"`.
* **Streaming**: The backend streams this tool call back to the frontend using a custom protocol (formatted for Vercel AI SDK's data stream).

### 4. UI State Synchronization (AI → UI)

* **Interception**: The frontend's `onToolCall` handler in `usePortfolioChat.ts` catches the `renderCanvas` event.
* **State Update**: It updates the **Zustand Store** (`canvasStore.ts`), setting the `currentView` and any relevant filters.
* **Rendering**: The `CanvasContainer.tsx` (Right Panel) reacts to the store change, using `AnimatePresence` and `framer-motion` to smoothly transition between views (e.g., from a "Welcome" screen to a "Project Grid").

---

## 📁 Key Directory Map

* `api/`: The Python "Brain".
  * `chat.py`: Handles streaming logic and OpenAI tool-calling.
  * `parse_portfolio.py`: The logic that understands your Markdown content.
* `src/`: The React "Body".
  * `hooks/usePortfolioChat.ts`: The bridge between the AI stream and the UI store.
  * `stores/canvasStore.ts`: Global state for the visible content area.
  * `components/canvas/`: Visual components for each data type (Timelines, Grids, etc.).
* `content/`: The "Soul".
  * `portfolio.md`: Where you define who you are and what you've built.

---

## 🚀 Why this is "Premium"

Unlike standard portfolios that are just static lists, this architecture is **context-aware**. The AI doesn't just talk about your experience; it actively guides the user through it by physically moving the website to the relevant sections as the conversation unfolds.
