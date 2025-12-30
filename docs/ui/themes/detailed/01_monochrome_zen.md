# The Monochrome Zen (Ultra-Minimalist)

This aesthetic theme is built on the philosophy of "Invisibility by Design." It removes every possible distraction to create a digital sanctuary where the user's focus remains entirely on the logic and the output. The interface should feel less like software and more like a well-crafted tool that disappears in the hand of its user.

## Core Concept

A digital blank slate. The interface functions as an extension of a high-end physical notebook, emphasizing clarity through negative space and extreme restraint. Every element earns its place on screen through utility alone. Decoration is viewed as debt, and simplicity is treated as a feature.

The goal is cognitive invisibility: users should never think about the interface itself. Their attention flows naturally between their thoughts, the conversation, and the work materializing on the canvas. The UI exists only to facilitate this flow, never to interrupt it.

## Design Principles

**Subtraction Over Addition:** When in doubt, remove. Each visual element should be questioned and justified before inclusion.

**Silence as Communication:** Empty space is not wasted space. It provides rhythm, directs attention, and gives the mind room to think.

**Functional Minimalism:** This is not minimalism for aesthetic appeal. Every reduction serves a purpose: faster comprehension, reduced cognitive load, and heightened focus on the work itself.

**Respect for Content:** The user's work and the AI's output are the protagonists. The interface is the stage, and a good stage never upstages the performance.

## Color Palette

### Primary Backgrounds

| Token                 | Light Mode | Dark Mode | Usage                             |
| --------------------- | ---------- | --------- | --------------------------------- |
| `--surface-primary`   | `#FAFAFA`  | `#0A0A0A` | Canvas and workspace background   |
| `--surface-secondary` | `#FFFFFF`  | `#111111` | Command shell, elevated panels    |
| `--surface-tertiary`  | `#F5F5F5`  | `#1A1A1A` | Hover states, subtle distinctions |

### Text Hierarchy

| Token              | Light Mode | Dark Mode | Usage                         |
| ------------------ | ---------- | --------- | ----------------------------- |
| `--text-primary`   | `#0A0A0A`  | `#FAFAFA` | Body text, primary content    |
| `--text-secondary` | `#525252`  | `#A3A3A3` | Metadata, timestamps, hints   |
| `--text-tertiary`  | `#A3A3A3`  | `#525252` | Placeholders, disabled states |

### Functional Accents

Color appears only when it carries meaning. The system uses a single accent color to indicate AI activity, ensuring that when color does appear, it commands attention.

| Token              | Value                   | Usage                                     |
| ------------------ | ----------------------- | ----------------------------------------- |
| `--accent-active`  | `#2563EB` (Signal Blue) | AI thinking indicator, active focus rings |
| `--accent-success` | `#10B981` (Emerald)     | Completion states, successful operations  |
| `--accent-warning` | `#F59E0B` (Amber)       | Action required, pending decisions        |
| `--accent-error`   | `#EF4444` (Red)         | Failed operations, connection issues      |

### Structural Elements

| Token              | Light Mode         | Dark Mode                | Usage                  |
| ------------------ | ------------------ | ------------------------ | ---------------------- |
| `--border-subtle`  | `rgba(0,0,0,0.06)` | `rgba(255,255,255,0.06)` | Hairline separators    |
| `--border-visible` | `rgba(0,0,0,0.12)` | `rgba(255,255,255,0.12)` | Input field boundaries |

## Typography

### Font Selection

The primary typeface is **Geist** for its optical sizing capabilities and clean geometry. As a fallback, **Inter** provides similar characteristics with broader system availability.

```css
--font-sans: "Geist", "Inter", -apple-system, BlinkMacSystemFont, sans-serif;
--font-mono: "Geist Mono", "JetBrains Mono", "SF Mono", monospace;
```

### Type Scale

The scale follows a 1.25 ratio (Major Third) to create clear hierarchy without dramatic size jumps.

| Token         | Size | Weight | Line Height | Usage                      |
| ------------- | ---- | ------ | ----------- | -------------------------- |
| `--text-xs`   | 11px | 400    | 1.5         | Timestamps, fine metadata  |
| `--text-sm`   | 13px | 400    | 1.5         | Secondary labels, captions |
| `--text-base` | 16px | 400    | 1.6         | Body text, chat messages   |
| `--text-lg`   | 20px | 500    | 1.4         | Section headers            |
| `--text-xl`   | 25px | 600    | 1.3         | Canvas document titles     |
| `--text-2xl`  | 31px | 600    | 1.2         | Hero elements (rare)       |

### Typography Principles

**Optical Sizing:** Enable variable font optical sizing so that small text remains crisp and readable while large text feels refined rather than clunky.

**Generous Leading:** Body text uses 1.6 line height to create breathing room. Dense information benefits from vertical space.

**Weight Restraint:** The scale uses only three weights: 400 (regular), 500 (medium), and 600 (semibold). Bold is reserved for exceptional emphasis.

## Spacing System

A consistent 4px base unit creates rhythm across all elements.

| Token        | Value | Usage                          |
| ------------ | ----- | ------------------------------ |
| `--space-1`  | 4px   | Tight internal padding         |
| `--space-2`  | 8px   | Icon margins, inline gaps      |
| `--space-3`  | 12px  | Button padding, list item gaps |
| `--space-4`  | 16px  | Section margins                |
| `--space-6`  | 24px  | Card padding, major divisions  |
| `--space-8`  | 32px  | Canvas margins                 |
| `--space-12` | 48px  | Section separations            |
| `--space-16` | 64px  | Major layout divisions         |

## Visual Elements

### Invisible Containers

Panels and sections are defined by whitespace rather than lines or shadows. Content grouping emerges from proximity and alignment alone.

```
┌─────────────────────────────────────────┐
│                                         │
│   Header Text                           │
│                                         │  ← No visible border
│   Body content sits here with           │
│   generous padding creating the         │
│   sense of containment.                 │
│                                         │
└─────────────────────────────────────────┘
```

### Hairline Details

When borders become necessary for input fields or critical separations, they are rendered at 0.5px (or 1px on non-retina displays) using the `--border-subtle` token. These lines should feel like whispers rather than statements.

### Zero Depth Philosophy

The interface is intentionally flat. No drop shadows, no gradients, no elevation system. This creates a paper-like quality where all elements exist on the same plane. The only exception is the Command Shell during its expanded state, which may use a subtle backdrop blur to separate it from canvas content.

### Canvas Materialization

Objects on the canvas appear to emerge directly from the background. There is no visible "container" wrapping the workspace. Documents, code blocks, and visualizations feel integrated into the environment rather than placed upon it.

**Appearance Animation:** New canvas items fade in from 0% to 100% opacity over 200ms with a subtle scale transform from 98% to 100%. This creates the impression of content crystallizing into existence.

## Component Specifications

### The Command Shell (Desktop)

The command shell is the primary interaction surface, accessible via `Cmd+K` or by clicking the pill.

**Idle State (Collapsed Pill)**

- Height: 44px
- Width: 320px (centered horizontally)
- Border radius: 22px (fully rounded)
- Background: `--surface-secondary`
- Border: 1px solid `--border-visible`
- Position: Fixed, 24px from bottom
- Content: Centered placeholder text "Ask anything..." with subtle search icon

**Expanded State (Active Shell)**

- Height: Auto (min 120px, max 60vh)
- Width: 600px (centered)
- Border radius: 16px
- Background: `--surface-secondary`
- Backdrop filter: `blur(20px)` with 95% opacity
- Transform origin: Bottom center
- Animation: Vertical expansion over 250ms with ease-out curve

**Internal Layout**

```
┌────────────────────────────────────────────────────────┐
│  ┌──────────────────────────────────────────────────┐  │
│  │  Input textarea (auto-growing)                   │  │
│  │                                                  │  │
│  └──────────────────────────────────────────────────┘  │
│                                                        │
│  [Context chips]              [Submit] [Cancel]        │
└────────────────────────────────────────────────────────┘
```

### The Action Bar (Mobile)

The mobile action bar prioritizes thumb reachability and single-handed operation.

**Docked State**

- Height: 56px
- Full width with 16px horizontal padding
- Background: `--surface-secondary`
- Top border: 0.5px `--border-subtle`
- Safe area padding for home indicator

**Expanded State**

- Slides upward to occupy bottom 50% of viewport
- Top edge has 8px border radius
- Contains: Expanded input field, context summary, action buttons
- Swipe-down gesture to collapse

**Context Summary**
A single line above the input field displays the current canvas state:

- "Editing: project_spec.md"
- "Viewing: React component"
- "Canvas is empty"

This ensures users understand the context before prompting.

### UI State Indicators

State changes communicate through subtle, functional signals rather than decorative flourishes.

**Idle**

- Default appearance as described above
- Search icon in `--text-tertiary`

**Thinking**

- Border animates with a slow pulse: opacity cycles between 100% and 60% over 2 seconds
- Border color shifts to `--accent-active`
- Interior displays: "Thinking..." in `--text-secondary`

**Streaming**

- Shell expands slightly to accommodate status text
- Progress appears as a minimal horizontal line that grows from left to right
- Text updates stream in with a subtle typewriter effect (optional, can be disabled for performance)

**Action Required**

- A small notification dot (6px diameter) appears on the shell in `--accent-warning`
- Interior displays the pending action with clear accept/reject buttons
- The dot pulses gently to draw attention without being aggressive

**Error**

- Border color changes to `--accent-error`
- Interior displays error message in `--text-primary`
- A "Retry" button appears alongside a "Dismiss" option
- No alarming animations; the color alone communicates the state

## Motion and Animation

### Guiding Principles

**Purposeful Motion:** Animation exists to provide feedback and orient the user, never for decoration.

**Swift Execution:** Transitions complete in under 300ms. Users should never feel like they are waiting for an animation.

**Physics-Based Easing:** Prefer ease-out curves for expanding elements (things settle into place) and ease-in for collapsing elements (things accelerate away).

### Timing Specifications

| Action             | Duration | Easing                           |
| ------------------ | -------- | -------------------------------- |
| Shell expand       | 250ms    | `cubic-bezier(0.16, 1, 0.3, 1)`  |
| Shell collapse     | 200ms    | `cubic-bezier(0.4, 0, 1, 1)`     |
| Canvas item appear | 200ms    | `ease-out`                       |
| State color change | 150ms    | `linear`                         |
| Hover states       | 100ms    | `ease-out`                       |
| Mobile sheet slide | 300ms    | `cubic-bezier(0.32, 0.72, 0, 1)` |

### Reduced Motion

Respect the `prefers-reduced-motion` media query. When enabled:

- Replace all transforms with simple opacity fades
- Reduce animation durations by 50%
- Disable the thinking pulse animation

## Code Rendering

Code blocks on the canvas receive special treatment to maintain readability within the minimal aesthetic.

**Container**

- No visible border or background differentiation
- Identified only by the switch to monospace typography
- Language label appears as small text in `--text-tertiary` above the block

**Syntax Highlighting**
A muted palette that avoids the circus of colors found in traditional themes:

| Element   | Light Mode        | Dark Mode         |
| --------- | ----------------- | ----------------- |
| Keywords  | `#6366F1`         | `#818CF8`         |
| Strings   | `#059669`         | `#34D399`         |
| Comments  | `--text-tertiary` | `--text-tertiary` |
| Functions | `--text-primary`  | `--text-primary`  |
| Variables | `--text-primary`  | `--text-primary`  |
| Numbers   | `#D97706`         | `#FBBF24`         |

The goal is differentiation without distraction. Most code remains in the primary text color, with highlighting reserved for elements that genuinely benefit from distinction.

## Responsive Behavior

### Breakpoints

| Name    | Width          | Primary Changes                  |
| ------- | -------------- | -------------------------------- |
| Mobile  | < 640px        | Action bar, full-width canvas    |
| Tablet  | 640px - 1024px | Floating shell, adjusted margins |
| Desktop | > 1024px       | Full command palette experience  |

### Canvas Adaptation

On mobile, the canvas occupies the full viewport minus the action bar. There are no side panels or split views. Users focus on one thing at a time, with navigation handled through the AI conversation.

On tablet and desktop, the canvas can support side-by-side document comparison when explicitly invoked, though the default remains a single, focused document view.

## Accessibility Considerations

**Contrast Ratios:** All text meets WCAG 2.1 AA standards. Primary text achieves 7:1 contrast in both light and dark modes.

**Focus Indicators:** Keyboard focus uses a 2px ring in `--accent-active` with 2px offset. The ring is clearly visible against all backgrounds.

**Touch Targets:** All interactive elements maintain a minimum of 44x44px touch area, even if the visual element is smaller.

**Screen Reader Support:** State changes are announced via ARIA live regions. The command shell uses appropriate dialog semantics when expanded.

## Implementation Notes

**Performance Priority:** The stripped-down aesthetic should translate to minimal CSS and fast paint times. Avoid complex selectors and excessive layering.

**Dark Mode Default:** Consider defaulting to dark mode for new users, as it better embodies the "digital ink on paper" concept and reduces eye strain during extended use.

**Theme Persistence:** Store the user's light/dark preference and respect system settings via `prefers-color-scheme`.

**Progressive Enhancement:** The core experience should function without JavaScript-dependent animations. Motion is enhancement, not requirement.
