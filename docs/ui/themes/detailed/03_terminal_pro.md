# The Terminal Pro (Developer-Centric)

This aesthetic theme is an homage to the classic command-line interface, reimagined for the modern AI era. It is designed for engineers who value transparency, data density, and the "raw" feeling of the machine. The interface should feel like peering directly into the system's internals, where every process is visible and every byte is accounted for.

## Core Concept

The "Glass Box" engine. It exposes the underlying processes of the AI assistant through streaming logs and monospaced data structures, treating the UI as a high-powered terminal emulator with AI capabilities bolted on. Users see not just the output, but the thinking: tokens streaming, context being assembled, tools being invoked.

This theme embraces the terminal's fundamental promise: direct, unmediated communication with the machine. There are no abstractions hiding complexity, no friendly metaphors softening the technical reality. The interface speaks the language of systems, and users who speak that language will feel immediately at home.

## Design Principles

**Transparency Over Abstraction:** Show the work. Users should see context windows filling, token counts incrementing, and tool calls executing. The AI is not a black box; it is a glass box.

**Density as Respect:** Engineers can handle information-rich interfaces. Whitespace is minimized in favor of data. Every visible element serves an informational purpose.

**Monospace as Worldview:** Fixed-width typography is not just an aesthetic choice; it represents a commitment to precision, alignment, and the primacy of code.

**Terminal Genealogy:** The design inherits from decades of terminal emulator evolution: from VT100 to xterm to modern GPU-accelerated terminals. Users should feel the lineage.

**Observability Built In:** The interface functions as its own monitoring dashboard. Performance metrics, token usage, and system state are always visible or one keystroke away.

## Color Palette

The palette offers three accent modes, allowing users to select their preferred "phosphor" color reminiscent of classic CRT monitors. Each mode maintains accessibility while evoking different terminal traditions.

### Primary Backgrounds

| Token                 | Value     | Usage                                   |
| --------------------- | --------- | --------------------------------------- |
| `--surface-base`      | `#0D0D0D` | Root background, deepest terminal layer |
| `--surface-elevated`  | `#141414` | Canvas background, active panes         |
| `--surface-panel`     | `#1A1A1A` | Secondary panels, inactive regions      |
| `--surface-highlight` | `#262626` | Selection backgrounds, hover states     |
| `--surface-active`    | `#333333` | Active line, current focus              |

### Accent Mode: Phosphor Green (Default)

Inspired by classic IBM 3278 terminals and the Matrix aesthetic.

| Token               | Value                    | Usage                         |
| ------------------- | ------------------------ | ----------------------------- |
| `--accent-primary`  | `#00FF41`                | Primary text, active elements |
| `--accent-dim`      | `#00CC33`                | Secondary emphasis            |
| `--accent-muted`    | `#00802B`                | Tertiary elements, borders    |
| `--accent-glow`     | `rgba(0, 255, 65, 0.15)` | Focus glow, cursor bloom      |
| `--accent-scanline` | `rgba(0, 255, 65, 0.03)` | Scanline overlay tint         |

### Accent Mode: Amber

Inspired by amber phosphor monitors common in early IBM PCs and industrial terminals.

| Token               | Value                     | Usage                         |
| ------------------- | ------------------------- | ----------------------------- |
| `--accent-primary`  | `#FFB000`                 | Primary text, active elements |
| `--accent-dim`      | `#CC8C00`                 | Secondary emphasis            |
| `--accent-muted`    | `#806200`                 | Tertiary elements, borders    |
| `--accent-glow`     | `rgba(255, 176, 0, 0.15)` | Focus glow, cursor bloom      |
| `--accent-scanline` | `rgba(255, 176, 0, 0.03)` | Scanline overlay tint         |

### Accent Mode: Cyber Purple

A modern interpretation, evoking synthwave aesthetics and contemporary terminal themes.

| Token               | Value                       | Usage                         |
| ------------------- | --------------------------- | ----------------------------- |
| `--accent-primary`  | `#BD93F9`                   | Primary text, active elements |
| `--accent-dim`      | `#9D7CD8`                   | Secondary emphasis            |
| `--accent-muted`    | `#6C5B9E`                   | Tertiary elements, borders    |
| `--accent-glow`     | `rgba(189, 147, 249, 0.15)` | Focus glow, cursor bloom      |
| `--accent-scanline` | `rgba(189, 147, 249, 0.03)` | Scanline overlay tint         |

### Text Hierarchy

Text uses the accent color system rather than neutral grays, maintaining the monochromatic terminal aesthetic.

| Token              | Value                   | Usage                                      |
| ------------------ | ----------------------- | ------------------------------------------ |
| `--text-primary`   | `var(--accent-primary)` | Body text, primary content                 |
| `--text-secondary` | `var(--accent-dim)`     | Labels, metadata                           |
| `--text-tertiary`  | `var(--accent-muted)`   | Timestamps, disabled states                |
| `--text-comment`   | `#6272A4`               | Comments, annotations (fixed across modes) |

### Semantic Status Colors

Status colors remain consistent across accent modes for clear communication.

| Token              | Value     | Usage                              |
| ------------------ | --------- | ---------------------------------- |
| `--status-success` | `#50FA7B` | Successful operations, completions |
| `--status-warning` | `#FFB86C` | Warnings, pending actions          |
| `--status-error`   | `#FF5555` | Errors, failures                   |
| `--status-info`    | `#8BE9FD` | Informational messages             |
| `--status-debug`   | `#6272A4` | Debug output, verbose logs         |

### Structural Elements

| Token              | Value                       | Usage                       |
| ------------------ | --------------------------- | --------------------------- |
| `--border-bracket` | `var(--accent-muted)`       | Bracketed container borders |
| `--border-subtle`  | `rgba(255, 255, 255, 0.06)` | Internal divisions          |
| `--border-active`  | `var(--accent-primary)`     | Focused element borders     |

## Typography

### Font Selection

The entire interface uses monospaced typography. This is non-negotiable; proportional fonts would violate the terminal contract.

**JetBrains Mono** serves as the primary font for its excellent legibility, programming ligatures, and distinctive character differentiation (notably `0` vs `O`, `1` vs `l` vs `I`).

```css
--font-mono: "JetBrains Mono", "Fira Code", "SF Mono", "Consolas", monospace;
--font-features: "liga" 1, "calt" 1; /* Enable ligatures */
```

### Ligature Support

Programming ligatures transform common character sequences into unified glyphs:

| Sequence | Ligature            | Context                  |
| -------- | ------------------- | ------------------------ |
| `->`     | →                   | Arrow functions, returns |
| `=>`     | ⇒                   | Fat arrow functions      |
| `<=`     | ≤                   | Comparison operators     |
| `>=`     | ≥                   | Comparison operators     |
| `!=`     | ≠                   | Inequality               |
| `===`    | ≡                   | Strict equality          |
| `/*`     | Block comment open  |
| `*/`     | Block comment close |

Users can disable ligatures via a preference toggle for strict character accuracy.

### Type Scale

The scale is tighter than conventional interfaces, optimized for dense information display.

| Token         | Size | Line Height | Usage                       |
| ------------- | ---- | ----------- | --------------------------- |
| `--text-3xs`  | 9px  | 1.4         | Micro-status, token counts  |
| `--text-2xs`  | 10px | 1.4         | Timestamps, metadata        |
| `--text-xs`   | 11px | 1.4         | Log entries, secondary info |
| `--text-sm`   | 12px | 1.5         | Labels, compact content     |
| `--text-base` | 14px | 1.6         | Primary content, chat       |
| `--text-lg`   | 16px | 1.5         | Section headers             |
| `--text-xl`   | 18px | 1.4         | Panel titles                |
| `--text-2xl`  | 20px | 1.3         | Major headings (rare)       |

### Typography Principles

**Uniform Character Width:** All text aligns to a character grid. This enables ASCII art, aligned columns, and predictable text positioning.

**High Line Density:** Tighter line heights maximize visible content. Engineers are accustomed to reading dense terminal output.

**No Bold for Emphasis:** Emphasis is achieved through color variation or capitalization, not weight changes. This maintains the uniform density of terminal output.

**ALLCAPS for System Messages:** System-level messages, errors, and status indicators use uppercase to distinguish them from user content.

## Spacing System

Spacing is based on character units to maintain grid alignment with monospace typography.

| Token          | Value | Character Equivalent | Usage                    |
| -------------- | ----- | -------------------- | ------------------------ |
| `--space-char` | 8.4px | 1 character          | Base unit (at 14px font) |
| `--space-1`    | 4px   | ~0.5 char            | Micro padding            |
| `--space-2`    | 8px   | ~1 char              | Inline gaps              |
| `--space-3`    | 12px  | ~1.5 char            | List item spacing        |
| `--space-4`    | 16px  | ~2 char              | Section padding          |
| `--space-6`    | 24px  | ~3 char              | Panel margins            |
| `--space-8`    | 32px  | ~4 char              | Major divisions          |
| `--space-12`   | 48px  | ~6 char              | Layout gaps              |

### Grid Alignment

Content aligns to an 8px baseline grid (approximately one character height at the base font size). Vertical spacing should always snap to this grid.

## Visual Elements

### Scanline Textures

A subtle horizontal pattern overlays the entire interface, evoking high-end CRT monitors. The effect is barely perceptible but adds analog warmth to the digital environment.

```css
.scanline-overlay {
  pointer-events: none;
  position: fixed;
  inset: 0;
  background: repeating-linear-gradient(
    0deg,
    transparent 0px,
    transparent 2px,
    var(--accent-scanline) 2px,
    var(--accent-scanline) 4px
  );
  mix-blend-mode: overlay;
  opacity: 0.5;
}
```

The scanline effect can be disabled via user preference for those who find it distracting.

### Bracketed Layouts

UI containers use ASCII-inspired brackets instead of conventional rounded rectangles. This reinforces the terminal aesthetic while providing clear visual boundaries.

**Standard Container**

```
┌─[ PANEL TITLE ]────────────────────────────────────┐
│                                                    │
│  Content goes here with consistent padding         │
│                                                    │
└────────────────────────────────────────────────────┘
```

**Active/Focused Container**

```
╔═[ ACTIVE PANEL ]═══════════════════════════════════╗
║                                                    ║
║  Focused content with highlighted border           ║
║                                                    ║
╚════════════════════════════════════════════════════╝
```

**Minimal Container (for inline elements)**

```
[ status: OK ] < input field > { context: 2048 tokens }
```

### Box-Drawing Characters

| Character   | Usage                            |
| ----------- | -------------------------------- |
| `┌ ┐ └ ┘`   | Standard container corners       |
| `─ │`       | Standard edges                   |
| `╔ ╗ ╚ ╝`   | Active/focused container corners |
| `═ ║`       | Active edges                     |
| `├ ┤ ┬ ┴ ┼` | Table intersections              |
| `[ ]`       | Inline grouping, status badges   |
| `< >`       | Input indicators                 |
| `{ }`       | Data/context indicators          |

### Streaming Logs

The interface includes a dedicated log stream that displays real-time system activity. This is the "glass box" in action.

**Log Entry Format**

```
[HH:MM:SS.mmm] [LEVEL] [SOURCE] message
```

**Example Log Stream**

```
[14:23:01.234] [INFO] [CONTEXT] Loading conversation history...
[14:23:01.456] [INFO] [CONTEXT] Loaded 12 messages (2,847 tokens)
[14:23:01.502] [INFO] [MODEL] Requesting completion from claude-3...
[14:23:01.891] [DEBUG] [STREAM] First token received (389ms TTFT)
[14:23:04.223] [INFO] [STREAM] Generation complete (847 tokens, 2.3s)
[14:23:04.301] [INFO] [TOOL] Invoking: code_execution
[14:23:05.892] [SUCCESS] [TOOL] Execution completed (exit: 0)
```

Log entries are color-coded by level:

- `INFO`: `--text-secondary`
- `DEBUG`: `--status-debug`
- `SUCCESS`: `--status-success`
- `WARNING`: `--status-warning`
- `ERROR`: `--status-error`

### Canvas Schematic View

The canvas renders content as if it were an architectural schematic or technical drawing.

**Document Frame**

```
╭──────────────────────────────────────────────────────────────╮
│ FILE: project_spec.md                    MODIFIED: 14:23:01  │
│ TYPE: markdown           SIZE: 2.4KB          TOKENS: ~1,200 │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│  001 │ # Project Specification                               │
│  002 │                                                       │
│  003 │ ## Overview                                           │
│  004 │                                                       │
│  005 │ This document outlines the technical                  │
│  ...                                                         │
│                                                              │
╰──────────────────────────────────────────────────────────────╯
```

**Wireframe Visualizations**
Data visualizations render as ASCII/Unicode wireframes rather than filled graphics:

```
TOKEN USAGE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Context:  ████████████████░░░░░░░░  67%
Output:   ██████░░░░░░░░░░░░░░░░░░  25%
System:   ██░░░░░░░░░░░░░░░░░░░░░░   8%
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Total: 67,891 / 100,000 tokens
```

### Cursor Styles

The cursor is a core element of the terminal experience.

| State        | Style                 | Animation                 |
| ------------ | --------------------- | ------------------------- |
| Text input   | Block cursor `█`      | Blink 530ms on, 530ms off |
| Command mode | Underscore `_`        | Solid, no blink           |
| Waiting      | Spinning pipe `\|/-\` | 100ms per frame           |
| Processing   | Dots `...`            | Sequential reveal         |

## Component Specifications

### The Command Shell (Desktop)

The command shell mimics a terminal prompt, complete with shell-style indicators and command history.

**Idle State**

- Height: 36px
- Width: 100% (full canvas width, with 16px margins)
- Background: `--surface-elevated`
- Border: 1px `--border-bracket` with bracket corners
- Position: Fixed, 16px from bottom
- Content: `user@ai-portfolio:~$ ` prompt with blinking cursor

**Prompt Format**

```
┌─[ PROMPT ]───────────────────────────────────────────────────┐
│ user@ai-portfolio:~/canvas$ █                                │
└──────────────────────────────────────────────────────────────┘
```

**Expanded State (Active)**

- Height: Auto (min 200px, max 80vh)
- Width: 100% (with 16px margins)
- Background: `--surface-base`
- Border: Double-line active brackets
- Contains: Input area, log stream, context panel

**Expanded Layout**

```
╔═[ COMMAND INTERFACE ]══════════════════════════════════════════════════════╗
║                                                                            ║
║  ┌─[ LOG STREAM ]────────────────────────────────────────────────────────┐ ║
║  │ [14:23:01.234] [INFO] [CONTEXT] Loaded 12 messages                    │ ║
║  │ [14:23:01.891] [DEBUG] [STREAM] First token received                  │ ║
║  │ [14:23:04.223] [INFO] [STREAM] Generation complete                    │ ║
║  └───────────────────────────────────────────────────────────────────────┘ ║
║                                                                            ║
║  ┌─[ INPUT ]─────────────────────────────────────────────────────────────┐ ║
║  │ user@ai-portfolio:~/canvas$ describe the authentication flow█         │ ║
║  └───────────────────────────────────────────────────────────────────────┘ ║
║                                                                            ║
║  [ CONTEXT: 2,847 tkn ]  [ MODEL: claude-3 ]  [ MODE: chat ]  [ ↵ SEND ] ║
║                                                                            ║
╚════════════════════════════════════════════════════════════════════════════╝
```

**Command History**

- Up/Down arrows navigate through previous commands
- `Ctrl+R` initiates reverse search through history
- History persists across sessions

### Status Bar

A persistent status bar displays system metrics at all times.

**Position:** Fixed to bottom of viewport, below command shell
**Height:** 24px
**Background:** `--surface-base`

**Layout**

```
[ MODEL: claude-3-opus ] | [ TOKENS: 2,847/100K ] | [ TTFT: 389ms ] | [ STATUS: IDLE ] | [ 14:23:05 ]
```

**Metrics Displayed**

- Current model
- Token usage (context / limit)
- Time to first token (during generation)
- Current status (IDLE, THINKING, STREAMING, ERROR)
- Timestamp

### The Action Bar (Mobile)

Mobile retains the terminal aesthetic with touch-friendly adaptations.

**Docked State**

- Height: 48px
- Full width
- Background: `--surface-base`
- Border top: 1px `--border-bracket`
- Content: Abbreviated prompt `$ █` with status indicators

**Expanded State**

- Full-screen takeover (not partial sheet)
- Mimics a mobile terminal emulator
- Virtual keyboard optimized for command entry
- Swipe down to minimize

**Mobile Layout (Expanded)**

```
╔═[ TERMINAL ]═══════════════════════════════╗
║                                            ║
║  > describe auth flow                      ║
║                                            ║
║  Processing...                             ║
║  [████████████░░░░░░░░] 60%                ║
║                                            ║
║  ─────────────────────────────────────     ║
║                                            ║
║  $ █                                       ║
║                                            ║
╠════════════════════════════════════════════╣
║  [TAB] [CTRL] [↑] [↓] [PIPE] [>] [ENTER]  ║
╚════════════════════════════════════════════╝
```

**Terminal Shortcuts Bar**
Above the keyboard, a shortcuts bar provides quick access to common terminal characters and commands.

### UI State Indicators

State changes are communicated through prompt modifications and log entries, maintaining the terminal paradigm.

**Idle**

```
user@ai-portfolio:~/canvas$ █
```

**Thinking**

```
user@ai-portfolio:~/canvas$ thinking... ⠋
```

The spinner cycles through: `⠋ ⠙ ⠹ ⠸ ⠼ ⠴ ⠦ ⠧ ⠇ ⠏`

**Streaming**

```
user@ai-portfolio:~/canvas$ streaming [847 tokens] ████████░░ 2.3s
```

A progress bar fills as tokens arrive.

**Action Required**

```
[!] ACTION REQUIRED: Confirm code execution? [Y/n] █
```

The prompt changes entirely to request input.

**Error**

```
[ERROR] Connection failed: timeout after 30s
user@ai-portfolio:~/canvas$ █
```

Error displayed inline, then prompt returns.

## Motion and Animation

### Guiding Principles

**Text-Based Animation:** Motion is achieved through character animation (spinners, progress bars) rather than transforms or opacity changes.

**Instantaneous State Changes:** Panel transitions are immediate. The terminal does not slide or fade; it updates.

**Character-Rate Streaming:** Text appears at a consistent character rate (approximately 50-100 characters per second) to mimic terminal output.

### Timing Specifications

| Action              | Duration           | Method                 |
| ------------------- | ------------------ | ---------------------- |
| Shell expand        | 0ms                | Instant state change   |
| Shell collapse      | 0ms                | Instant state change   |
| Cursor blink        | 530ms on/off       | CSS animation          |
| Spinner rotation    | 100ms per frame    | Character substitution |
| Text streaming      | 20ms per character | Sequential reveal      |
| Log entry appear    | 0ms                | Instant append         |
| Progress bar update | 50ms               | Width transition       |

### Cursor Animation

```css
@keyframes cursor-blink {
  0%,
  49% {
    opacity: 1;
  }
  50%,
  100% {
    opacity: 0;
  }
}

.cursor {
  animation: cursor-blink 1.06s step-end infinite;
}
```

### Reduced Motion

When `prefers-reduced-motion` is enabled:

- Cursor blink is disabled (solid cursor)
- Spinner is replaced with static `...`
- Text streams instantly rather than character-by-character
- Scanline effect is disabled

## Code Rendering

Code is rendered with full IDE-level features, treating the canvas as a powerful code editor.

**Editor Frame**

```
┌─[ editor: main.py ]──────────────────────────────────────────┐
│ python │ utf-8 │ LF │ 127 lines │ modified                   │
├────┬─────────────────────────────────────────────────────────┤
│  1 │ #!/usr/bin/env python3                                  │
│  2 │ """Main application entry point."""                     │
│  3 │                                                         │
│  4 │ import asyncio                                          │
│  5 │ from typing import Optional                             │
│  6 │                                                         │
│  7 │ async def main() -> None:                               │
│  8 │     """Initialize and run the application."""           │
│  9 │     config = await load_config()                        │
│ 10 │     app = Application(config)                           │
│ 11 │     await app.run()                                     │
├────┴─────────────────────────────────────────────────────────┤
│ Ln 7, Col 1 │ Spaces: 4 │ Python 3.11                        │
└──────────────────────────────────────────────────────────────┘
```

**Line Numbers**

- Right-aligned in a fixed-width gutter
- Color: `--text-tertiary`
- Current line number highlighted in `--text-primary`
- Relative line numbers available as option

**Syntax Highlighting (Dracula-Inspired)**

The syntax theme follows established developer tool conventions for immediate familiarity.

| Element       | Color              | Token               |
| ------------- | ------------------ | ------------------- |
| Keywords      | `#FF79C6` (Pink)   | `--syntax-keyword`  |
| Strings       | `#F1FA8C` (Yellow) | `--syntax-string`   |
| Comments      | `#6272A4` (Gray)   | `--syntax-comment`  |
| Functions     | `#50FA7B` (Green)  | `--syntax-function` |
| Variables     | `#F8F8F2` (White)  | `--syntax-variable` |
| Numbers       | `#BD93F9` (Purple) | `--syntax-number`   |
| Types/Classes | `#8BE9FD` (Cyan)   | `--syntax-type`     |
| Operators     | `#FF79C6` (Pink)   | `--syntax-operator` |
| Constants     | `#FFB86C` (Orange) | `--syntax-constant` |

**Diff Highlighting**
When displaying code changes:

- Added lines: Left border `--status-success`, background `rgba(80, 250, 123, 0.1)`
- Removed lines: Left border `--status-error`, background `rgba(255, 85, 85, 0.1)`
- Modified indicator: `+` or `-` prefix in gutter

## Responsive Behavior

### Breakpoints

| Name    | Width          | Primary Changes                       |
| ------- | -------------- | ------------------------------------- |
| Mobile  | < 640px        | Full-screen terminal, reduced metrics |
| Tablet  | 640px - 1024px | Split pane available                  |
| Desktop | > 1024px       | Multi-pane layout, full metrics       |

### Pane Management

The interface supports tmux-style pane splitting:

**Desktop Multi-Pane**

```
┌─────────────────────────────────┬─────────────────────────────────┐
│                                 │                                 │
│  [ CANVAS: document.md ]        │  [ CANVAS: preview ]            │
│                                 │                                 │
│                                 │                                 │
│                                 │                                 │
├─────────────────────────────────┴─────────────────────────────────┤
│  [ COMMAND SHELL ]                                                │
├───────────────────────────────────────────────────────────────────┤
│  [ STATUS BAR ]                                                   │
└───────────────────────────────────────────────────────────────────┘
```

**Keyboard Shortcuts for Panes**

- `Ctrl+B %` - Split vertically
- `Ctrl+B "` - Split horizontally
- `Ctrl+B Arrow` - Navigate panes
- `Ctrl+B z` - Toggle pane zoom

### Mobile Adaptation

On mobile, the interface becomes a single-pane terminal:

- Status bar metrics are abbreviated
- Log stream is hidden by default (toggle with `Ctrl+L`)
- Canvas occupies full screen when active
- Command shell is full-screen when invoked

## Accessibility Considerations

### Color Vision Considerations

The palette is designed with tritanopia (blue-yellow color blindness) in mind, as this is the type most commonly acquired and affects an older demographic of developers.

**Accessibility by Accent Mode:**

- Phosphor Green: Strong contrast against dark backgrounds, distinct from error red
- Amber: High visibility, distinct from all status colors
- Cyber Purple: Good contrast, but enable status icons for users with protanopia

**Status Differentiation**
All status colors are supplemented with text labels and/or icons:

- Success: `[✓]` prefix
- Warning: `[!]` prefix
- Error: `[✗]` prefix
- Info: `[i]` prefix

### Screen Reader Support

The terminal output is structured for screen reader compatibility:

- Log entries use ARIA live regions with `polite` priority
- Status changes announce via `assertive` live region
- Code blocks are labeled with language and line count
- Bracket decorations are hidden from screen readers via `aria-hidden`

### Keyboard Navigation

The entire interface is operable via keyboard, following terminal conventions:

- `Tab` moves between major regions
- Arrow keys navigate within regions
- `Escape` returns to command prompt
- All actions have keyboard shortcuts displayed inline

### Font Size Scaling

The interface respects browser font size settings. All measurements use `rem` units based on the `--text-base` size, ensuring proportional scaling.

**Minimum Sizes**

- Body text: 14px minimum
- Log entries: 11px minimum
- Metadata: 10px minimum

## Implementation Notes

**Font Loading:** Preload JetBrains Mono to prevent layout shift. Fall back to system monospace immediately if loading fails.

```html
<link
  rel="preload"
  href="/fonts/JetBrainsMono.woff2"
  as="font"
  type="font/woff2"
  crossorigin
/>
```

**Performance Considerations:**

- Limit visible log entries to 100 (virtualized scrolling for history)
- Scanline overlay uses `will-change: transform` for GPU acceleration
- Character streaming uses `requestAnimationFrame` for smooth rendering

**Dark Mode Only:** This theme is exclusively dark mode. The terminal aesthetic does not translate to light backgrounds.

**Ligature Toggle:** Provide a user preference to disable ligatures for users who prefer character-accurate rendering or experience performance issues.

**Scanline Intensity:** Allow users to adjust scanline opacity from 0% (disabled) to 100% (pronounced), with 50% as default.

**Session Persistence:**

- Command history persists in localStorage
- Accent mode preference persists
- Pane layouts can be saved and restored

**Terminal Escape Sequences:** While not a true terminal emulator, the system recognizes basic ANSI color codes in AI output for specialized formatting when explicitly enabled.
