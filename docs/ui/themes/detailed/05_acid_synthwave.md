# The Acid Synthwave (The Funky Vibe)

This aesthetic theme is the "Funky Vibe" option, utilizing a retro-futuristic lens to make the AI interaction feel like a creative performance. It is high-energy, colorful, and experimental. Where other interfaces prioritize efficiency, this one prioritizes experience. The goal is not just to complete tasks, but to make completing them feel like an event.

## Core Concept

"Digital Alchemy." The interface treats the AI assistant as a living entity, a creative collaborator with its own visual presence. Fluid gradients and glowing effects visualize the "spark" of machine intelligence, transforming computation into something that feels almost magical.

This theme draws from synthwave aesthetics, vaporwave gradients, and the neon-soaked visual language of 1980s science fiction. It imagines a future that never quite arrived: one of chrome, neon, and endless possibility. The result is an interface that feels less like software and more like stepping into a Tron-inspired creative studio.

## Design Principles

**Computation as Performance:** Processing is not hidden; it is celebrated. When the AI thinks, the interface responds with visual flourishes that make the work feel alive.

**Ambient Energy:** The interface hums with subtle motion even at rest. Gradients shift slowly, glows pulse gently, particles drift. The screen is never truly static.

**Emotional Resonance:** Colors and effects are chosen for their emotional impact, not just their functional clarity. The palette evokes wonder, creativity, and a sense of limitless possibility.

**Sensory Richness:** The experience engages multiple senses through color, motion, and implied texture. Film grain adds tactility; glows add warmth; gradients add depth.

**Playful Experimentation:** The interface invites exploration. Hover states reveal hidden effects. Interactions trigger unexpected delights. Users are rewarded for curiosity.

## Color Palette

The palette is built on a deep midnight base with neon accents that glow against the darkness. Colors are never flat; they exist in gradients that shift and breathe.

### Base Colors

| Token                | Value     | Usage                           |
| -------------------- | --------- | ------------------------------- |
| `--surface-void`     | `#0A0A0F` | Deepest background, canvas base |
| `--surface-midnight` | `#12121A` | Primary background              |
| `--surface-dusk`     | `#1A1A2E` | Elevated surfaces, panels       |
| `--surface-twilight` | `#242438` | Cards, secondary panels         |
| `--surface-mist`     | `#2E2E44` | Hover states, subtle elevation  |

### Neon Accent: Magenta

The primary accent, representing AI activity and primary actions.

| Token                   | Value                    | Usage                        |
| ----------------------- | ------------------------ | ---------------------------- |
| `--neon-magenta`        | `#FF00FF`                | Primary accent, AI indicator |
| `--neon-magenta-bright` | `#FF66FF`                | Highlights, hover states     |
| `--neon-magenta-dim`    | `#CC00CC`                | Pressed states               |
| `--neon-magenta-glow`   | `rgba(255, 0, 255, 0.4)` | Glow effect                  |
| `--neon-magenta-subtle` | `rgba(255, 0, 255, 0.1)` | Background tints             |

### Neon Accent: Teal

Secondary accent for interactive elements and success states.

| Token                | Value                    | Usage                   |
| -------------------- | ------------------------ | ----------------------- |
| `--neon-teal`        | `#00FFFF`                | Secondary accent, links |
| `--neon-teal-bright` | `#66FFFF`                | Highlights              |
| `--neon-teal-dim`    | `#00CCCC`                | Pressed states          |
| `--neon-teal-glow`   | `rgba(0, 255, 255, 0.4)` | Glow effect             |
| `--neon-teal-subtle` | `rgba(0, 255, 255, 0.1)` | Background tints        |

### Neon Accent: Acid Green

Tertiary accent for success, completion, and emphasis.

| Token                 | Value                    | Usage                      |
| --------------------- | ------------------------ | -------------------------- |
| `--neon-green`        | `#39FF14`                | Success states, completion |
| `--neon-green-bright` | `#7FFF5C`                | Highlights                 |
| `--neon-green-dim`    | `#2ECC10`                | Pressed states             |
| `--neon-green-glow`   | `rgba(57, 255, 20, 0.4)` | Glow effect                |
| `--neon-green-subtle` | `rgba(57, 255, 20, 0.1)` | Background tints           |

### Supporting Neons

| Token           | Value     | Usage                            |
| --------------- | --------- | -------------------------------- |
| `--neon-yellow` | `#FFFF00` | Warnings, highlights             |
| `--neon-orange` | `#FF6600` | Errors, destructive actions      |
| `--neon-purple` | `#9D00FF` | Special states, premium features |
| `--neon-pink`   | `#FF1493` | Accent variety, decorative       |

### Gradient Definitions

Gradients are central to this theme. They should shift subtly over time using CSS animations or JavaScript.

**Primary Gradient (Magenta to Teal)**

```css
--gradient-primary: linear-gradient(
  135deg,
  var(--neon-magenta) 0%,
  var(--neon-purple) 50%,
  var(--neon-teal) 100%
);
```

**Vaporwave Gradient (Sunset)**

```css
--gradient-vaporwave: linear-gradient(
  180deg,
  #ff6b6b 0%,
  var(--neon-magenta) 25%,
  var(--neon-purple) 50%,
  #4a00e0 75%,
  var(--neon-teal) 100%
);
```

**Aurora Gradient (Animated)**

```css
--gradient-aurora: linear-gradient(
  45deg,
  var(--neon-teal),
  var(--neon-green),
  var(--neon-teal),
  var(--neon-magenta),
  var(--neon-purple),
  var(--neon-teal)
);
background-size: 400% 400%;
animation: aurora-shift 15s ease infinite;
```

**Mesh Gradient (For Backgrounds)**

```css
--gradient-mesh: radial-gradient(
    at 0% 0%,
    var(--neon-magenta-subtle) 0%,
    transparent 50%
  ), radial-gradient(at 100% 0%, var(--neon-teal-subtle) 0%, transparent 50%),
  radial-gradient(at 100% 100%, var(--neon-purple) 0%, transparent 50%),
  radial-gradient(at 0% 100%, var(--neon-green-subtle) 0%, transparent 50%);
```

### Text Colors

| Token              | Value              | Usage                      |
| ------------------ | ------------------ | -------------------------- |
| `--text-primary`   | `#FFFFFF`          | Body text, primary content |
| `--text-secondary` | `#B8B8D0`          | Labels, metadata           |
| `--text-tertiary`  | `#6E6E8A`          | Timestamps, hints          |
| `--text-glow`      | `var(--neon-teal)` | Emphasized text with glow  |

## Typography

### Font Selection

The dual-font system pairs a clean geometric sans-serif for functional text with a stylized display font for moments of celebration and AI presence.

**Functional Font:** Inter or DM Sans for their clarity and extensive weight range.

**Display Font:** Orbitron, Rajdhani, or similar futuristic geometric fonts for the AI's "voice" and success messages.

```css
--font-body: "Inter", "DM Sans", -apple-system, sans-serif;
--font-display: "Orbitron", "Rajdhani", "Audiowide", sans-serif;
--font-mono: "JetBrains Mono", "Fira Code", monospace;
```

### Type Scale

| Token         | Size | Weight | Font    | Line Height | Usage                  |
| ------------- | ---- | ------ | ------- | ----------- | ---------------------- |
| `--text-xs`   | 11px | 400    | body    | 1.4         | Metadata, timestamps   |
| `--text-sm`   | 13px | 400    | body    | 1.5         | Captions, labels       |
| `--text-base` | 15px | 400    | body    | 1.6         | Body text, chat        |
| `--text-lg`   | 18px | 500    | body    | 1.5         | Emphasized content     |
| `--text-xl`   | 24px | 600    | display | 1.3         | Section headers        |
| `--text-2xl`  | 32px | 700    | display | 1.2         | Panel titles           |
| `--text-3xl`  | 48px | 700    | display | 1.1         | Hero text              |
| `--text-4xl`  | 64px | 800    | display | 1.0         | Display (celebrations) |

### Typography Principles

**Glow for Emphasis:** Important text receives a subtle text-shadow glow in the appropriate accent color.

```css
.text-glow {
  text-shadow: 0 0 10px var(--neon-teal-glow), 0 0 20px var(--neon-teal-glow),
    0 0 40px var(--neon-teal-glow);
}
```

**Display Font for AI Voice:** When the AI announces completions, errors, or asks for input, it uses the display font to create a distinct "voice."

**Gradient Text for Celebrations:**

```css
.gradient-text {
  background: var(--gradient-primary);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
```

**Letter Spacing:** Display fonts use slight positive tracking (+0.05em) for a spacious, futuristic feel.

## Spacing System

Spacing is generous to allow visual effects room to breathe.

| Token        | Value | Usage                 |
| ------------ | ----- | --------------------- |
| `--space-1`  | 4px   | Micro adjustments     |
| `--space-2`  | 8px   | Tight internal gaps   |
| `--space-3`  | 12px  | Icon margins          |
| `--space-4`  | 16px  | Button padding        |
| `--space-5`  | 20px  | Card internal padding |
| `--space-6`  | 24px  | Section padding       |
| `--space-8`  | 32px  | Panel margins         |
| `--space-10` | 40px  | Major divisions       |
| `--space-12` | 48px  | Canvas padding        |
| `--space-16` | 64px  | Hero spacing          |
| `--space-24` | 96px  | Dramatic separations  |

### Glow Spread Values

| Token        | Value | Usage                    |
| ------------ | ----- | ------------------------ |
| `--glow-sm`  | 4px   | Subtle element glow      |
| `--glow-md`  | 8px   | Standard button glow     |
| `--glow-lg`  | 16px  | Emphasized glow          |
| `--glow-xl`  | 32px  | Dramatic glow, AI active |
| `--glow-2xl` | 64px  | Celebration effects      |

## Visual Elements

### Glow & Bloom

Glowing effects are the signature of this theme. They spill beyond element boundaries, creating a sense of light emanating from the interface.

**Button Glow**

```css
.button-primary {
  background: var(--neon-magenta);
  box-shadow: 0 0 var(--glow-md) var(--neon-magenta-glow), 0 0 var(--glow-lg) var(
        --neon-magenta-glow
      ), inset 0 1px 0 rgba(255, 255, 255, 0.2);
  transition: box-shadow 200ms ease;
}

.button-primary:hover {
  box-shadow: 0 0 var(--glow-lg) var(--neon-magenta-glow), 0 0 var(--glow-xl) var(
        --neon-magenta-glow
      ), 0 0 var(--glow-2xl) var(--neon-magenta-subtle), inset 0 1px 0 rgba(255, 255, 255, 0.3);
}
```

**AI Activity Indicator**

```css
.ai-active {
  animation: pulse-glow 2s ease-in-out infinite;
}

@keyframes pulse-glow {
  0%,
  100% {
    box-shadow: 0 0 var(--glow-lg) var(--neon-magenta-glow);
  }
  50% {
    box-shadow: 0 0 var(--glow-xl) var(--neon-magenta-glow), 0 0 var(
          --glow-2xl
        ) var(--neon-magenta-subtle);
  }
}
```

### Chromatic Aberration

A subtle color-bleeding effect that separates RGB channels, creating a glitchy, digital feel during intense processing or on hover.

```css
.chromatic-aberration {
  position: relative;
}

.chromatic-aberration::before,
.chromatic-aberration::after {
  content: attr(data-text);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0.8;
}

.chromatic-aberration::before {
  color: var(--neon-teal);
  transform: translate(-2px, 0);
  mix-blend-mode: screen;
}

.chromatic-aberration::after {
  color: var(--neon-magenta);
  transform: translate(2px, 0);
  mix-blend-mode: screen;
}
```

**Animated Chromatic Aberration (Thinking State)**

```css
@keyframes chromatic-shift {
  0%,
  100% {
    transform: translate(0, 0);
    opacity: 0;
  }
  25% {
    transform: translate(-3px, 1px);
    opacity: 0.6;
  }
  50% {
    transform: translate(2px, -1px);
    opacity: 0.4;
  }
  75% {
    transform: translate(-1px, 2px);
    opacity: 0.6;
  }
}

.thinking .chromatic-aberration::before {
  animation: chromatic-shift 0.5s ease infinite;
}
```

### Film Grain Overlay

A subtle noise texture adds organic warmth to the digital gradients.

```css
.grain-overlay {
  position: fixed;
  inset: 0;
  pointer-events: none;
  opacity: 0.03;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%' height='100%' filter='url(%23noise)'/%3E%3C/svg%3E");
  mix-blend-mode: overlay;
}

/* Animated grain for extra texture */
@keyframes grain-shift {
  0%,
  100% {
    transform: translate(0, 0);
  }
  10% {
    transform: translate(-1%, -1%);
  }
  20% {
    transform: translate(1%, 1%);
  }
  30% {
    transform: translate(-1%, 1%);
  }
  40% {
    transform: translate(1%, -1%);
  }
  50% {
    transform: translate(-1%, 0);
  }
  60% {
    transform: translate(1%, 0);
  }
  70% {
    transform: translate(0, 1%);
  }
  80% {
    transform: translate(0, -1%);
  }
  90% {
    transform: translate(1%, 1%);
  }
}

.grain-animated {
  animation: grain-shift 0.5s steps(10) infinite;
}
```

### Canvas Effects

The canvas is a living playground where elements leave trails and interactions create ripples.

**Object Trails (When Dragging)**

```css
.dragging {
  filter: blur(0);
}

.dragging::after {
  content: "";
  position: absolute;
  inset: 0;
  background: inherit;
  opacity: 0.3;
  filter: blur(4px);
  transform: translate(-8px, -8px);
  animation: trail-fade 200ms ease-out forwards;
}

@keyframes trail-fade {
  to {
    opacity: 0;
    transform: translate(-16px, -16px) scale(0.95);
  }
}
```

**Ripple Effect (On AI Update)**

```css
@keyframes ripple {
  0% {
    transform: scale(0);
    opacity: 0.6;
  }
  100% {
    transform: scale(4);
    opacity: 0;
  }
}

.ripple {
  position: absolute;
  border-radius: 50%;
  background: var(--gradient-primary);
  animation: ripple 1s ease-out forwards;
}
```

**Canvas Grid (Animated)**

```css
.canvas-grid {
  background-image: linear-gradient(
      var(--neon-magenta-subtle) 1px,
      transparent 1px
    ), linear-gradient(90deg, var(--neon-magenta-subtle) 1px, transparent 1px);
  background-size: 40px 40px;
  animation: grid-pulse 4s ease-in-out infinite;
}

@keyframes grid-pulse {
  0%,
  100% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.5;
  }
}
```

### Neon Borders

Borders glow with neon light rather than appearing as solid lines.

```css
.neon-border {
  border: 1px solid var(--neon-teal);
  box-shadow: 0 0 var(--glow-sm) var(--neon-teal-glow), inset 0 0 var(
        --glow-sm
      ) var(--neon-teal-subtle);
}
```

**Animated Border Gradient**

```css
.animated-border {
  position: relative;
  background: var(--surface-twilight);
  border-radius: 12px;
}

.animated-border::before {
  content: "";
  position: absolute;
  inset: -2px;
  border-radius: 14px;
  background: var(--gradient-primary);
  background-size: 300% 300%;
  animation: border-flow 3s linear infinite;
  z-index: -1;
}

@keyframes border-flow {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}
```

## Component Specifications

### The Command Shell (Desktop)

The command shell glows and pulses, feeling like a portal to the AI's consciousness.

**Idle State (Collapsed Pill)**

- Height: 48px
- Width: 400px (centered)
- Background: `--surface-twilight` with gradient border
- Border: 2px animated gradient
- Glow: Subtle `--neon-magenta-glow`
- Border radius: 24px (pill shape)
- Position: Fixed, 24px from bottom
- Content: "✧ SUMMON THE AI ✧" in display font

**Visual Effect (Idle)**
The shell has a slow-breathing glow animation and the border gradient flows continuously.

**Expanded State (Active)**

- Height: Auto (min 160px, max 70vh)
- Width: 560px (centered)
- Background: `--surface-dusk` with mesh gradient overlay
- Border: 2px animated gradient (faster when active)
- Glow: Intensified, spreading to `--glow-xl`
- Border radius: 16px
- Film grain overlay at 5% opacity

**Expanded Layout**

```
╭──────────────────────────────────────────────────────────────╮
│  ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░  │
│  ░                                                        ░  │
│  ░  ┌──────────────────────────────────────────────────┐  ░  │
│  ░  │  What would you like to create?                  │  ░  │
│  ░  └──────────────────────────────────────────────────┘  ░  │
│  ░                                                        ░  │
│  ░  ╭─────────────╮  Current: document.md                 ░  │
│  ░  │   ◈ SEND    │                                       ░  │
│  ░  ╰─────────────╯                                       ░  │
│  ░                                                        ░  │
│  ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░  │
╰──────────────────────────────────────────────────────────────╯
       ~~~~ glow spilling outward ~~~~
```

**Input Field**

- Background: `--surface-void` with 50% opacity
- Border: 1px `--neon-teal` with glow
- Border radius: 8px
- On focus: Border intensifies, glow expands

**Send Button**

- Background: Gradient from magenta to purple
- Glow: Pulsing `--neon-magenta-glow`
- Display font, uppercase
- On hover: Glow intensifies dramatically

### The Action Bar (Mobile)

The mobile experience maintains the immersive, playful feel with touch-friendly interactions.

**Docked State**

- Height: 60px
- Full width
- Background: Gradient mesh overlay on `--surface-dusk`
- Border top: 2px gradient (magenta to teal)
- Glow: Subtle upward-facing glow

**Content:** "✧ TAP TO CREATE ✧" with pulsing animation

**Expanded State**

- Full-screen takeover with dramatic reveal animation
- Background: Mesh gradient on `--surface-midnight`
- Film grain overlay
- Particles floating in background (optional)

**Expansion Animation**
The sheet expands with a burst of light from the tap point, rippling outward before the content fades in.

### Card Components

Cards feel like glowing artifacts floating in the void.

**Standard Card**

```css
.card {
  background: var(--surface-twilight);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  box-shadow: 0 0 var(--glow-md) var(--neon-magenta-subtle), 0 8px 32px rgba(0, 0, 0, 0.4);
  overflow: hidden;
}

.card::before {
  content: "";
  position: absolute;
  inset: 0;
  background: var(--gradient-mesh);
  opacity: 0.3;
  pointer-events: none;
}
```

**Card Hover State**
On hover, the card lifts and its glow intensifies:

```css
.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 0 var(--glow-lg) var(--neon-magenta-glow), 0 0 var(--glow-xl) var(
        --neon-magenta-subtle
      ), 0 16px 48px rgba(0, 0, 0, 0.5);
}
```

**AI Result Card**
When the AI generates content, the card materializes with a dramatic entrance:

1. A point of light appears at the card's center
2. The light expands outward with a ripple effect
3. The card fades in as the light passes
4. Edges glow briefly before settling

### UI State Indicators

State changes are visually dramatic, treating each transition as a small performance.

**Idle**

- Gentle breathing glow (2s cycle)
- Border gradient flows slowly
- Display text: "✧ SUMMON THE AI ✧"

**Thinking**

- Background shifts to include more purple
- Chromatic aberration activates on the shell
- Particles stream upward inside the shell
- Display text: "◈ PROCESSING ◈" with each letter revealing sequentially
- Glow color shifts through the spectrum

**Thinking Particle Effect**

```css
@keyframes float-up {
  0% {
    transform: translateY(100%) scale(0);
    opacity: 0;
  }
  10% {
    opacity: 1;
  }
  90% {
    opacity: 1;
  }
  100% {
    transform: translateY(-100%) scale(0);
    opacity: 0;
  }
}

.thinking-particle {
  position: absolute;
  width: 4px;
  height: 4px;
  background: var(--neon-magenta);
  border-radius: 50%;
  box-shadow: 0 0 var(--glow-sm) var(--neon-magenta-glow);
  animation: float-up 2s ease-in-out infinite;
}
```

**Streaming**

- Text appears with a typewriter effect, each character glowing briefly as it appears
- Progress visualized as a gradient bar that fills with animated flow
- Current token count displayed with glow

**Action Required**

- Shell border shifts to `--neon-yellow` gradient
- Pulsing glow in yellow/orange
- Action buttons glow in their respective colors (green for confirm, orange for reject)
- Display text: "⚠ YOUR INPUT NEEDED ⚠"

**Error**

- Shell border shifts to `--neon-orange`
- Brief screen shake (subtle, 2-3px)
- Glitch effect on error text
- Display text: "✕ SOMETHING WENT WRONG ✕"

**Success/Completion**

- Burst of particles from the shell
- Screen-wide ripple effect in `--neon-green`
- Display text: "✓ CREATION COMPLETE ✓" in gradient text
- Celebratory glow that fades over 2 seconds

## Motion and Animation

### Guiding Principles

**Always in Motion:** The interface never feels completely static. Even at rest, subtle animations suggest life and energy.

**Dramatic Transitions:** State changes are events, not just updates. Entrances and exits are choreographed moments.

**Responsive Energy:** Animation intensity scales with interaction intensity. A tap creates a small ripple; a major completion creates a celebration.

**Chromatic Flow:** Colors shift and blend during animations, creating a sense of liquid movement.

### Timing Specifications

| Action           | Duration       | Easing                              | Notes               |
| ---------------- | -------------- | ----------------------------------- | ------------------- |
| Shell expand     | 400ms          | `cubic-bezier(0.34, 1.56, 0.64, 1)` | Overshoot for drama |
| Shell collapse   | 300ms          | `cubic-bezier(0.4, 0, 0.2, 1)`      | Quick retreat       |
| Card appear      | 600ms          | Custom sequence                     | Light burst + fade  |
| Glow pulse       | 2000ms         | `ease-in-out`                       | Continuous loop     |
| Border flow      | 3000ms         | `linear`                            | Continuous loop     |
| Ripple expand    | 1000ms         | `ease-out`                          | Single play         |
| Chromatic shift  | 500ms          | `steps(4)`                          | Glitchy timing      |
| Particle float   | 2000ms         | `ease-in-out`                       | Continuous loop     |
| Success burst    | 800ms          | `ease-out`                          | Single play         |
| Text glow appear | 100ms per char | `ease-out`                          | Staggered           |

### Aurora Background Animation

```css
@keyframes aurora-shift {
  0% {
    background-position: 0% 50%;
  }
  25% {
    background-position: 50% 100%;
  }
  50% {
    background-position: 100% 50%;
  }
  75% {
    background-position: 50% 0%;
  }
  100% {
    background-position: 0% 50%;
  }
}

.aurora-background {
  background: var(--gradient-aurora);
  background-size: 400% 400%;
  animation: aurora-shift 15s ease infinite;
}
```

### Success Celebration

```css
@keyframes celebrate {
  0% {
    transform: scale(1);
    filter: brightness(1);
  }
  10% {
    transform: scale(1.02);
    filter: brightness(1.2);
  }
  20% {
    transform: scale(1);
    filter: brightness(1);
  }
}

.success-flash {
  animation: celebrate 800ms ease-out;
}
```

### Reduced Motion

When `prefers-reduced-motion` is enabled:

- Disable all continuous animations (aurora, particle float, glow pulse)
- Replace card appearances with simple fade-in
- Disable chromatic aberration entirely
- Keep color transitions but remove transform animations
- Disable film grain animation
- Reduce ripple to opacity change only

## Code Rendering

Code blocks receive the synthwave treatment while maintaining readability.

**Container**

```css
.code-block {
  background: var(--surface-void);
  border: 1px solid var(--neon-teal);
  border-radius: 8px;
  box-shadow: 0 0 var(--glow-sm) var(--neon-teal-subtle), inset 0 0 30px rgba(0, 255, 255, 0.03);
  overflow: hidden;
}
```

**Header Bar**

- Background: Gradient from magenta to purple
- Language label in display font
- Filename with glow effect

**Syntax Highlighting (Neon Theme)**

A high-saturation palette that glows against the dark background.

| Element   | Color              | Glow   |
| --------- | ------------------ | ------ |
| Keywords  | `#FF79C6` (Pink)   | Yes    |
| Strings   | `#F1FA8C` (Yellow) | Subtle |
| Comments  | `#6272A4` (Muted)  | No     |
| Functions | `#50FA7B` (Green)  | Yes    |
| Variables | `#F8F8F2` (White)  | No     |
| Numbers   | `#BD93F9` (Purple) | Subtle |
| Types     | `#8BE9FD` (Cyan)   | Yes    |
| Operators | `#FF79C6` (Pink)   | No     |
| Constants | `#FFB86C` (Orange) | Subtle |

**Active Line Highlight**

```css
.active-line {
  background: linear-gradient(
    90deg,
    var(--neon-magenta-subtle) 0%,
    transparent 100%
  );
  border-left: 2px solid var(--neon-magenta);
  box-shadow: inset 4px 0 8px var(--neon-magenta-subtle);
}
```

**Line Numbers**

- Color: `--text-tertiary`
- Current line: `--neon-teal` with glow

## Responsive Behavior

### Breakpoints

| Name    | Width          | Primary Changes                           |
| ------- | -------------- | ----------------------------------------- |
| Mobile  | < 640px        | Full-screen immersion, simplified effects |
| Tablet  | 640px - 1024px | Reduced particle count, standard shell    |
| Desktop | > 1024px       | Full effects, multi-card canvas           |

### Mobile Adaptations

**Performance Optimizations:**

- Reduce particle count by 50%
- Simplify gradients (fewer color stops)
- Disable film grain animation (static grain only)
- Reduce glow spread values by half

**Touch Interactions:**

- Tap creates localized ripple
- Long press intensifies glow under finger
- Swipe gestures leave brief color trails

### Effect Scaling

| Effect               | Mobile | Tablet | Desktop |
| -------------------- | ------ | ------ | ------- |
| Particles            | 10     | 20     | 40      |
| Glow intensity       | 50%    | 75%    | 100%    |
| Grain animation      | Off    | On     | On      |
| Chromatic aberration | Off    | Subtle | Full    |
| Aurora speed         | 20s    | 15s    | 15s     |

## Accessibility Considerations

### Color and Contrast

Despite the vibrant palette, text maintains accessibility:

| Combination          | Contrast Ratio | WCAG Level      |
| -------------------- | -------------- | --------------- |
| White on Midnight    | 15.8:1         | AAA             |
| White on Twilight    | 12.4:1         | AAA             |
| Neon Teal on Void    | 8.2:1          | AAA             |
| Neon Magenta on Void | 4.6:1          | AA (large text) |

**High Contrast Mode:**
When enabled, reduce glow effects and increase text contrast by using pure white text with subtle dark outlines.

### Focus Indicators

Focus states use visible glow rings that are impossible to miss:

```css
:focus-visible {
  outline: none;
  box-shadow: 0 0 0 2px var(--surface-void), 0 0 0 4px var(--neon-teal),
    0 0 var(--glow-lg) var(--neon-teal-glow);
}
```

### Motion Sensitivity

The theme includes extensive animation. Respect user preferences:

- Honor `prefers-reduced-motion` for all animations
- Provide a "Reduce Effects" toggle in settings
- Ensure all information is conveyed without relying on animation

### Screen Reader Support

- All decorative effects use `aria-hidden="true"`
- State changes announce via ARIA live regions
- Gradient text includes accessible text alternative
- Particle effects are purely decorative

### Photosensitivity

- No animations faster than 3 flashes per second
- Glow pulses are smooth, not strobing
- Screen flashes during celebrations are subtle (max 20% brightness change)
- Provide option to disable all flashing effects

## Implementation Notes

**GPU Acceleration:** This theme is GPU-intensive. Use `will-change` sparingly and only on actively animating elements. Remove `will-change` after animations complete.

**Gradient Performance:** Complex mesh gradients can impact performance. Consider using CSS `@supports` to fall back to simpler gradients on less capable devices.

**Particle System:** Implement particles using a lightweight canvas-based system rather than DOM elements for better performance. Limit total particle count based on device capability.

**Film Grain:** The SVG-based grain is more performant than image-based alternatives but still impacts rendering. Consider disabling on low-power mode.

**Dark Mode Only:** This theme is exclusively dark mode. The neon aesthetic requires a dark background to create the glow effect.

**Audio Integration (Optional):** This theme pairs well with subtle sound design:

- Soft "whoosh" on shell expand
- Crystalline "ding" on completion
- Low hum during thinking state
- All sounds should be optional and off by default

**Battery Consideration:** Provide a "Power Saver" mode that disables continuous animations while maintaining the color palette and static visual style.

**Color Customization:** Allow users to swap the primary neon accent (magenta/teal/green) to personalize the experience while maintaining the overall aesthetic.

**Canvas Library:** For complex effects like trails and ripples, consider using a library like PixiJS or Three.js for canvas-based rendering, falling back to CSS-only effects on less capable devices.
