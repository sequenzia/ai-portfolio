# AI-Powered Portfolio App: UI Design Overview

Modern AI assistant apps are evolving beyond simple chat windows into sophisticated hybrid platforms. This architecture divides the experience into two distinct zones: a conversational side for dialogue and a dynamic workspace for structural output. This approach keeps the chat focused and provides a dedicated area for complex items like code blocks, long-form documents, or visual diagrams.

The intelligence of this system lies in its ability to route content based on the context of the user's request. When the AI identifies a task requiring detailed structural work, it renders that specific result onto the workspace instead of standard text. Users can then edit the workspace directly or ask the AI to modify specific sections in real time. This workflow transforms the AI into a collaborative partner that shares a live document with the user.

This design effectively solves the biggest pain point of traditional chatbots, which is the constant copy-paste loop. Instead of manually moving text between a chat window and an external editor, the app becomes a unified environment. By integrating the tools into a single pane, the system establishes a shared source of truth where the user and the AI can iterate on ideas without losing momentum.

## Core Interface Design

The platform architecture is divided into two primary functional areas:

The Chat Thread: This serves as the primary entry point for interaction. It is used for providing initial instructions, asking clarifying questions, and receiving concise, text-based answers.

The Interactive Canvas: This is a dedicated, high-fidelity workspace where complex outputs are generated. This area supports rich text formatting, code rendering, and real-time visualization, allowing users to focus on the "source of truth" without the clutter of a long chat history.

## Intelligent Content Routing

The system uses context-aware logic to determine where information should be displayed:

Direct Responses: Brief answers and general conversation stay within the chat thread to maintain a natural dialogue flow.

Workspace Rendering: Requests for structured content (such as long-form essays, React components, or data reports) are automatically routed to the canvas. This prevents the "copy-paste" loop often found in traditional chatbots by providing a stable area for editing.

## UI Layout: The Layered Intelligence Model

This layout treats the AI Assistant as a functional layer that sits on top of the workspace. The **Canvas** serves as the base layer for work, while the **AI Assistant** acts as the interactive control layer.

### Desktop & Mobile Experience

#### Desktop Experience: The Command Palette

The workspace is a borderless edge-to-edge Canvas. The AI Assistant is accessible via a centered, horizontal pill at the bottom of the screen to minimize interference with the user's primary view.

- **Interaction:** Pressing `Cmd+K` or clicking the pill expands it vertically into a functional Command Shell.
- **Result Handling:** When the Assistant generates a result, the code or document streams into a preview area on the Canvas behind the shell.
- **Commitment Model:** Once the user accepts the output, the shell collapses back into a pill and the new artifact is finalized on the Canvas.

#### Mobile Experience: The Persistent Bottom Sheet

On mobile devices, the interface uses a tactile Action Bar docked at the bottom of the screen.

- **Ergonomics:** The bar is placed within the natural thumb zone for ease of access.
- **Transition:** Tapping the bar triggers an upward slide, expanding the input field to fill the bottom 50 percent of the screen.
- **Contextual Awareness:** The bar displays a live summary of the active Canvas state so the user knows the current context before prompting.

---

### UI States and Transitions

The shell communicates its internal logic through functional state changes rather than decorative elements.

| State               | Functional Behavior                            | Purpose                                                             |
| ------------------- | ---------------------------------------------- | ------------------------------------------------------------------- |
| **Idle**            | A collapsed pill with a search icon.           | Minimal intrusion on the workspace while ready for input.           |
| **Thinking**        | An active processing animation on the border.  | Provides feedback that the system is working on a request.          |
| **Streaming**       | The pill expands to show text status updates.  | Displays progress logs or specific thought snippets from the model. |
| **Action Required** | A notification indicator appears on the shell. | Alerts the user that a decision or manual approval is necessary.    |
| **Error**           | A status change indicating a failed execution. | Signals a connection issue or a tool execution error.               |
