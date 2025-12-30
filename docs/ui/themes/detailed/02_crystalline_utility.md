# The Crystalline Utility (Sharp Glassmorphism)

This aesthetic theme is inspired by high-performance productivity tools like **Raycast** and **Linear**. It prioritizes speed, precision, and technical depth, creating a professional environment that feels like a futuristic command center. The interface communicates competence and control, designed for users who value efficiency above all else.

## Core Concept

A high-definition "Crystalline HUD" that uses layers of depth and transparency to organize complex information without adding visual bulk. The metaphor is precision glass: materials that are engineered rather than decorative, where every surface serves a structural purpose.

Unlike flat design, this theme embraces depth as an organizational tool. Layers of translucent panels create a natural hierarchy, with the most important content appearing closest to the user. The effect is similar to looking through a series of glass panes, each holding different information at different focal distances.

## Design Principles

**Engineered Precision:** Every element is placed with mathematical intent. Alignment is exact, spacing is consistent, and nothing appears arbitrary.

**Depth as Information:** Transparency and blur are not decorative effects. They communicate hierarchy, showing users what is primary and what is contextual.

**Technical Confidence:** The interface should feel like professional-grade equipment. Dense information is acceptable when organized well. Users should feel capable, not coddled.

**Speed as Feature:** Visual design supports rapid interaction. High contrast ensures instant recognition, sharp transitions eliminate waiting, and the layout prioritizes keyboard-driven workflows.

**Ambient Awareness:** Background layers remain subtly visible, keeping users oriented to their broader context even while focused on a specific task.

## Color Palette

### Primary Backgrounds

The base palette is built on deep, cool neutrals that provide a stable foundation for translucent overlays.

| Token                | Value                    | Usage                                |
| -------------------- | ------------------------ | ------------------------------------ |
| `--surface-base`     | `#09090B`                | Root background, deepest layer       |
| `--surface-elevated` | `#18181B`                | Canvas background, primary workspace |
| `--surface-overlay`  | `rgba(24, 24, 27, 0.80)` | Command shell, modal backgrounds     |
| `--surface-glass`    | `rgba(39, 39, 42, 0.60)` | Floating panels, tooltips            |
| `--surface-hover`    | `rgba(63, 63, 70, 0.50)` | Interactive element hover states     |

### Glass Properties

The glassmorphism effect requires careful calibration to remain functional rather than decorative.

| Token                | Value                       | Usage                             |
| -------------------- | --------------------------- | --------------------------------- |
| `--glass-blur`       | `20px`                      | Standard backdrop blur            |
| `--glass-blur-heavy` | `40px`                      | Deep overlays, modal backgrounds  |
| `--glass-saturation` | `180%`                      | Backdrop saturation boost         |
| `--glass-border`     | `rgba(255, 255, 255, 0.08)` | Edge definition on glass surfaces |
| `--glass-highlight`  | `rgba(255, 255, 255, 0.04)` | Top edge highlight gradient       |

### Text Hierarchy

High contrast text ensures legibility against variable transparent backgrounds.

| Token              | Value     | Usage                            |
| ------------------ | --------- | -------------------------------- |
| `--text-primary`   | `#FAFAFA` | Body text, primary content       |
| `--text-secondary` | `#A1A1AA` | Labels, metadata, timestamps     |
| `--text-tertiary`  | `#71717A` | Placeholders, disabled states    |
| `--text-inverse`   | `#09090B` | Text on light accent backgrounds |

### Functional Accents

Accent colors are reserved strictly for interactive elements and status communication. They appear against the dark palette with high contrast, commanding immediate attention.

| Token                    | Value                      | Usage                             |
| ------------------------ | -------------------------- | --------------------------------- |
| `--accent-primary`       | `#3B82F6` (Electric Blue)  | Primary actions, AI active state  |
| `--accent-primary-hover` | `#60A5FA`                  | Primary action hover              |
| `--accent-secondary`     | `#FFFFFF`                  | Secondary actions, key bindings   |
| `--accent-success`       | `#22C55E`                  | Completion, successful operations |
| `--accent-warning`       | `#EAB308`                  | Pending actions, caution states   |
| `--accent-error`         | `#EF4444`                  | Failures, destructive actions     |
| `--accent-glow`          | `rgba(59, 130, 246, 0.25)` | Focus rings, active state glow    |

### Structural Elements

| Token               | Value                                                                             | Usage                               |
| ------------------- | --------------------------------------------------------------------------------- | ----------------------------------- |
| `--border-subtle`   | `rgba(255, 255, 255, 0.06)`                                                       | Internal divisions, separators      |
| `--border-default`  | `rgba(255, 255, 255, 0.10)`                                                       | Panel edges, input boundaries       |
| `--border-strong`   | `rgba(255, 255, 255, 0.16)`                                                       | Emphasized boundaries, focus states |
| `--border-gradient` | `linear-gradient(180deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.04) 100%)` | Light-catching edge effect          |

## Typography

### Font Selection

The primary typeface is **Inter** for its exceptional clarity at small sizes and extensive weight range. **SF Pro** serves as the system fallback on Apple platforms, maintaining the technical aesthetic.

```css
--font-sans: "Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, sans-serif;
--font-mono: "JetBrains Mono", "SF Mono", "Fira Code", monospace;
```

### Type Scale

The scale uses a 1.2 ratio (Minor Third) to create a tighter hierarchy appropriate for information-dense interfaces.

| Token         | Size | Weight | Line Height | Letter Spacing | Usage                      |
| ------------- | ---- | ------ | ----------- | -------------- | -------------------------- |
| `--text-2xs`  | 10px | 500    | 1.4         | 0.02em         | Keyboard shortcuts, badges |
| `--text-xs`   | 11px | 500    | 1.4         | 0.01em         | Timestamps, fine metadata  |
| `--text-sm`   | 13px | 400    | 1.5         | 0              | Secondary labels, captions |
| `--text-base` | 15px | 400    | 1.6         | 0              | Body text, chat messages   |
| `--text-lg`   | 18px | 500    | 1.4         | -0.01em        | Section headers            |
| `--text-xl`   | 22px | 600    | 1.3         | -0.02em        | Canvas document titles     |
| `--text-2xl`  | 26px | 600    | 1.2         | -0.02em        | Major headings (rare)      |

### Typography Principles

**Negative Tracking at Scale:** Larger text uses subtle negative letter-spacing to maintain visual density and prevent a "loose" appearance.

**Medium Weight for UI:** Interface labels use 500 weight rather than 400, improving legibility against transparent backgrounds where contrast can vary.

**Tight Leading for Density:** Headers and labels use compressed line heights (1.3-1.4) to maximize vertical space efficiency.

**Monospace Integration:** Technical content, keyboard shortcuts, and code seamlessly blend with the UI by using a monospace font that shares similar metrics to the primary sans-serif.

## Spacing System

A 4px base unit maintains precision alignment across all elements.

| Token         | Value | Usage                           |
| ------------- | ----- | ------------------------------- |
| `--space-0.5` | 2px   | Micro adjustments, icon padding |
| `--space-1`   | 4px   | Tight internal gaps             |
| `--space-1.5` | 6px   | Badge padding, compact lists    |
| `--space-2`   | 8px   | Icon margins, inline spacing    |
| `--space-3`   | 12px  | Button padding, list items      |
| `--space-4`   | 16px  | Section margins, card padding   |
| `--space-5`   | 20px  | Panel internal padding          |
| `--space-6`   | 24px  | Major divisions                 |
| `--space-8`   | 32px  | Canvas margins                  |
| `--space-10`  | 40px  | Section separations             |
| `--space-12`  | 48px  | Major layout gaps               |

## Visual Elements

### Precision Edges

Corner radii are deliberately small, conveying structural integrity rather than softness. The interface should feel machined, not molded.

| Element         | Radius |
| --------------- | ------ |
| Buttons, inputs | 6px    |
| Cards, panels   | 8px    |
| Command shell   | 12px   |
| Tooltips        | 4px    |
| Badges, chips   | 4px    |

### Defined Borders

Borders use a gradient technique that simulates light catching on a glass edge. The top edge is slightly brighter than the bottom, creating subtle dimensionality without shadows.

```css
.glass-panel {
  border: 1px solid transparent;
  background: linear-gradient(var(--surface-glass), var(--surface-glass)) padding-box,
    var(--border-gradient) border-box;
}
```

For simpler cases, a solid 1px border in `--border-default` provides clean definition.

### Tight Backdrop Blur

The blur effect creates separation between layers while maintaining ambient awareness of background content. The blur radius is intentionally restrained to prevent the "frosted" look from becoming muddy.

```css
.glass-surface {
  backdrop-filter: blur(var(--glass-blur)) saturate(var(--glass-saturation));
  -webkit-backdrop-filter: blur(var(--glass-blur)) saturate(
      var(--glass-saturation)
    );
}
```

The saturation boost compensates for the desaturation that blur naturally causes, keeping accent colors vibrant even when viewed through glass layers.

### Canvas Grid

The canvas displays an optional precision grid that provides spatial reference without competing for attention.

| Property           | Value                       |
| ------------------ | --------------------------- |
| Grid color         | `rgba(255, 255, 255, 0.03)` |
| Major grid spacing | 64px                        |
| Minor grid spacing | 16px                        |
| Minor grid opacity | 50% of major                |

The grid fades to invisible when the user is actively typing or when content fills the canvas, reappearing when the canvas is empty or when alignment is relevant.

### Light Refraction Effects

When the AI modifies canvas content, a brief "refraction" effect draws attention to the change. This is implemented as a sharp highlight that sweeps across the modified region.

```css
@keyframes refraction {
  0% {
    background-position: -100% 0;
  }
  100% {
    background-position: 200% 0;
  }
}

.content-modified {
  background: linear-gradient(
    90deg,
    transparent 0%,
    rgba(59, 130, 246, 0.15) 50%,
    transparent 100%
  );
  background-size: 50% 100%;
  animation: refraction 600ms ease-out;
}
```

## Component Specifications

### The Command Shell (Desktop)

The command shell is the primary interaction surface, designed for rapid keyboard-driven workflows. It evokes the command palette pattern established by tools like Raycast, VS Code, and Linear.

**Idle State (Collapsed Pill)**

- Height: 40px
- Width: 400px (centered horizontally)
- Border radius: 8px
- Background: `--surface-overlay` with `--glass-blur`
- Border: 1px with `--border-gradient`
- Position: Fixed, 20px from bottom
- Content: Placeholder "Ask or search..." with `⌘K` badge right-aligned

**Expanded State (Active Shell)**

- Height: Auto (min 140px, max 70vh)
- Width: 640px (centered)
- Border radius: 12px
- Background: `--surface-overlay` with `--glass-blur-heavy`
- Border: 1px `--border-strong`
- Box shadow: `0 0 0 1px rgba(0,0,0,0.5), 0 24px 48px rgba(0,0,0,0.4)`
- Transform origin: Bottom center
- Animation: Scale from 95% to 100%, opacity 0 to 1, over 150ms

**Internal Layout**

```
┌────────────────────────────────────────────────────────────┐
│  🔍  Input text here...                           ⌘K  ↵   │
├────────────────────────────────────────────────────────────┤
│                                                            │
│  Recent                                                    │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  📄 project_spec.md                        ⌘1        │  │
│  │  💻 React Component                        ⌘2        │  │
│  │  📊 Data Analysis                          ⌘3        │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                            │
│  Context: Editing project_spec.md              [Clear]     │
└────────────────────────────────────────────────────────────┘
```

**Keyboard Shortcuts Display**
Shortcuts appear as small badges with monospace text, background `--surface-hover`, and 4px border radius. They are right-aligned within list items.

### The Action Bar (Mobile)

The mobile experience maintains the "Pro" utility aesthetic while adapting to touch interaction.

**Docked State**

- Height: 52px
- Full width with 12px horizontal padding
- Background: `--surface-overlay` with `--glass-blur`
- Top border: 1px `--border-subtle`
- Safe area padding for home indicator

**Expanded State**

- Slides upward to occupy bottom 60% of viewport
- Top corners: 12px border radius
- Background: `--surface-elevated` (solid, for text input clarity)
- Contains: Full input area, recent items list, context controls
- Pull indicator: 4px × 32px bar in `--border-default`, centered at top

**Density Optimization**
The mobile layout uses slightly reduced spacing (`--space-2` instead of `--space-3` for list items) to maximize visible content while maintaining touch target requirements.

### UI State Indicators

State changes use sharp, immediate visual transitions. The "crystalline" aesthetic favors instant feedback over gradual animations.

**Idle**

- Default appearance as described above
- Search icon in `--text-secondary`

**Thinking**

- Border color transitions to `--accent-primary`
- A thin progress line (2px) appears below the input, animating left-to-right indeterminately
- Interior displays: "Processing..." in `--text-secondary`
- Subtle glow: `box-shadow: 0 0 20px var(--accent-glow)`

**Streaming**

- Shell height expands to accommodate streaming content
- Text appears with character-by-character rendering
- A blinking cursor (`--accent-primary`) indicates active generation
- Progress percentage appears right-aligned when available

**Action Required**

- Border shifts to `--accent-warning`
- A pulsing dot (8px) appears in the top-right corner
- Interior displays the pending decision with clearly labeled action buttons
- Keyboard shortcuts displayed for each action (e.g., `Y` to accept, `N` to reject)

**Error**

- Border transitions to `--accent-error`
- Background tint shifts slightly toward red: `rgba(239, 68, 68, 0.05)`
- Error message displays with `--accent-error` icon
- "Retry" button is primary styled, "Dismiss" is secondary

### Result Cards

When the AI generates content for the canvas, it appears as a result card within the command shell before being committed.

**Preview Card**

- Background: `--surface-glass`
- Border: 1px `--border-default`
- Border radius: 8px
- Internal padding: `--space-4`
- Max height: 300px (scrollable)
- Header: Document type icon + title + "Preview" badge
- Footer: "Accept" (primary button) + "Edit" + "Reject"

**Committed State**
The card dissolves and the content streams onto the canvas with the refraction effect.

## Motion and Animation

### Guiding Principles

**Instantaneous Feedback:** Transitions are fast enough to feel immediate. The interface should respond at the speed of thought.

**Sharp Timing:** Favor ease-out curves that start fast and settle quickly. Avoid bouncy or elastic effects that feel playful rather than professional.

**Purposeful Glow:** Light effects (glows, refractions) are the primary animated elements, suggesting energy and activity without moving layout elements.

### Timing Specifications

| Action                  | Duration | Easing                           |
| ----------------------- | -------- | -------------------------------- |
| Shell expand            | 150ms    | `cubic-bezier(0.16, 1, 0.3, 1)`  |
| Shell collapse          | 100ms    | `cubic-bezier(0.4, 0, 1, 1)`     |
| State color transitions | 100ms    | `linear`                         |
| Hover states            | 80ms     | `ease-out`                       |
| Result card appear      | 200ms    | `cubic-bezier(0.16, 1, 0.3, 1)`  |
| Refraction sweep        | 600ms    | `ease-out`                       |
| Mobile sheet slide      | 250ms    | `cubic-bezier(0.32, 0.72, 0, 1)` |
| Focus glow pulse        | 2000ms   | `ease-in-out` (looping)          |

### Reduced Motion

When `prefers-reduced-motion` is enabled:

- Disable the refraction animation entirely
- Replace expand/collapse with instant state changes
- Remove the focus glow pulse
- Keep color transitions (these remain accessible)

## Code Rendering

Code is a first-class citizen in this technical aesthetic. Rendering prioritizes readability and professional appearance.

**Container**

- Background: `--surface-base` (slightly darker than surroundings)
- Border: 1px `--border-subtle`
- Border radius: 6px
- Padding: `--space-4`
- Language badge: Top-right, `--text-2xs` in `--surface-glass`

**Line Numbers**

- Color: `--text-tertiary`
- Right-aligned in a dedicated gutter
- Width: 40px fixed
- Separator: 1px `--border-subtle` between gutter and code

**Syntax Highlighting (Crystalline Dark)**

A high-contrast palette that pops against the dark background while maintaining visual coherence.

| Element   | Color              | Token               |
| --------- | ------------------ | ------------------- |
| Keywords  | `#C084FC` (Purple) | `--syntax-keyword`  |
| Strings   | `#4ADE80` (Green)  | `--syntax-string`   |
| Comments  | `#71717A` (Gray)   | `--syntax-comment`  |
| Functions | `#60A5FA` (Blue)   | `--syntax-function` |
| Variables | `#FAFAFA` (White)  | `--syntax-variable` |
| Numbers   | `#FBBF24` (Amber)  | `--syntax-number`   |
| Types     | `#2DD4BF` (Teal)   | `--syntax-type`     |
| Operators | `#F472B6` (Pink)   | `--syntax-operator` |

**Active Line Highlight**
When editing, the current line receives a subtle background: `rgba(59, 130, 246, 0.08)`.

## Responsive Behavior

### Breakpoints

| Name    | Width          | Primary Changes                                |
| ------- | -------------- | ---------------------------------------------- |
| Mobile  | < 640px        | Action bar, full-width panels, reduced padding |
| Tablet  | 640px - 1024px | Floating shell, sidebar available              |
| Desktop | > 1024px       | Full command palette, multi-panel support      |

### Canvas Adaptation

**Mobile**
The canvas is full-width with `--space-4` horizontal padding. The grid is disabled by default on mobile to reduce visual noise on smaller screens.

**Tablet**
A collapsible sidebar can display document structure or recent items. The canvas occupies the remaining width.

**Desktop**
Split-view is available for side-by-side document comparison. The canvas can also display a minimap for long documents.

### Glass Effect Fallbacks

On devices with limited GPU capability or when `backdrop-filter` is unsupported:

- Replace glass backgrounds with solid `--surface-elevated`
- Increase background opacity to 95%
- Maintain border treatments for visual definition

## Accessibility Considerations

**Contrast Ratios:** All text exceeds WCAG 2.1 AA standards. `--text-primary` against `--surface-elevated` achieves 15.8:1 contrast.

**Focus Indicators:** Keyboard focus uses a 2px ring in `--accent-primary` with a subtle glow effect. The combination of ring and glow ensures visibility against both light and dark content.

**Reduced Transparency:** A user preference toggle can reduce glass transparency to 95% and disable blur effects for users who find them disorienting.

**Touch Targets:** All interactive elements maintain a minimum of 44x44px touch area.

**Motion Sensitivity:** Respect `prefers-reduced-motion` for all animated effects.

**High Contrast Mode:** When system high contrast is enabled, borders become solid 2px `--text-primary` and glass effects are disabled entirely.

## Implementation Notes

**GPU Acceleration:** The backdrop-filter property requires GPU compositing. Limit the number of simultaneously visible glass surfaces to prevent performance issues on lower-end devices.

**Layer Management:** Use CSS `isolation: isolate` on glass containers to prevent blur from affecting unintended elements.

**Dark Mode Only:** This theme is designed exclusively for dark mode. A light variant would require significant palette restructuring and is not recommended.

**Keyboard-First Design:** Ensure all command shell functionality is accessible via keyboard. Implement visible keyboard shortcut hints throughout the interface.

**Performance Monitoring:** Track frame rates during glass surface animations. If performance drops below 60fps, progressively reduce blur radius or disable effects.
