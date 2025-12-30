# The Neo-Brutalist (Bold & Raw)

This aesthetic theme rejects the "politeness" of modern SaaS design. It is bold, high-contrast, and uses raw structural elements to create a UI that is impossible to ignore. Where other interfaces whisper, this one shouts. Where others smooth edges, this one sharpens them.

## Core Concept

"Honest UI." The interface refuses to hide its construction. Borders are thick because borders exist. Shadows are hard because light creates shadows. Colors clash because the world is not a curated palette. This is design that announces itself, that demands attention, that treats users as capable of handling visual intensity.

The philosophy draws from architectural brutalism: raw materials, exposed structure, functional honesty. A button looks like a button. A card looks like a card. Nothing pretends to be something it is not. The result is an interface that feels physical, almost confrontational, but ultimately more honest than the soft gradients and subtle shadows of conventional design.

## Design Principles

**Structural Honesty:** Every element declares its nature. Containers have visible borders. Interactive elements have obvious affordances. The skeleton of the interface is always visible.

**Aggressive Hierarchy:** Visual weight establishes importance through force, not subtlety. Primary actions are unmissable. Secondary elements recede through stark contrast, not gentle fading.

**Chromatic Confidence:** Colors are saturated and unapologetic. The palette does not ask permission. Combinations that "clash" by conventional standards create energy and memorability.

**Physical Metaphor:** Elements behave like physical objects. They cast shadows, have thickness, respond to interaction with tactile feedback. The screen becomes a surface with depth.

**Anti-Minimalism:** More is more. Where minimalism removes until only essentials remain, brutalism adds until the structure is undeniable. Decoration is acceptable when it reinforces physicality.

## Color Palette

The palette is built on maximum contrast: pure black as the structural framework, with high-saturation accent colors that compete for attention. This is not a harmonious palette; it is a loud one.

### Structural Colors

| Token               | Value     | Usage                                    |
| ------------------- | --------- | ---------------------------------------- |
| `--surface-base`    | `#FFFFFF` | Primary background, canvas               |
| `--surface-alt`     | `#F0F0F0` | Alternate background, subtle distinction |
| `--surface-card`    | `#FFFFFF` | Card backgrounds                         |
| `--structure-black` | `#000000` | Borders, shadows, text                   |
| `--structure-dark`  | `#1A1A1A` | Secondary structural elements            |

### Primary Accent: Cyber Yellow

The default accent, evoking caution tape and highlighters.

| Token                    | Value     | Usage                           |
| ------------------------ | --------- | ------------------------------- |
| `--accent-primary`       | `#FFEE00` | Primary buttons, key highlights |
| `--accent-primary-hover` | `#FFD600` | Hover state                     |
| `--accent-primary-text`  | `#000000` | Text on primary accent          |

### Secondary Accent: Electric Blue

High-energy contrast to the yellow.

| Token                      | Value     | Usage                    |
| -------------------------- | --------- | ------------------------ |
| `--accent-secondary`       | `#0066FF` | Secondary actions, links |
| `--accent-secondary-hover` | `#0052CC` | Hover state              |
| `--accent-secondary-text`  | `#FFFFFF` | Text on secondary accent |

### Tertiary Accent: Safety Orange

Warning and emphasis.

| Token                     | Value     | Usage                      |
| ------------------------- | --------- | -------------------------- |
| `--accent-tertiary`       | `#FF6600` | Tertiary actions, warnings |
| `--accent-tertiary-hover` | `#E65C00` | Hover state                |
| `--accent-tertiary-text`  | `#000000` | Text on tertiary accent    |

### Semantic Status Colors

Status colors maintain high saturation while remaining distinguishable.

| Token                 | Value     | Usage                       |
| --------------------- | --------- | --------------------------- |
| `--status-success`    | `#00CC66` | Success states, completions |
| `--status-success-bg` | `#CCFFDD` | Success background          |
| `--status-warning`    | `#FFAA00` | Warning states              |
| `--status-warning-bg` | `#FFF0CC` | Warning background          |
| `--status-error`      | `#FF3333` | Error states, destructive   |
| `--status-error-bg`   | `#FFCCCC` | Error background            |
| `--status-info`       | `#0099FF` | Informational               |
| `--status-info-bg`    | `#CCE6FF` | Info background             |

### Text Colors

| Token              | Value     | Usage                    |
| ------------------ | --------- | ------------------------ |
| `--text-primary`   | `#000000` | Body text, headings      |
| `--text-secondary` | `#333333` | Secondary text, labels   |
| `--text-tertiary`  | `#666666` | Metadata, timestamps     |
| `--text-inverse`   | `#FFFFFF` | Text on dark backgrounds |

### Pattern Colors

| Token            | Value                 | Usage               |
| ---------------- | --------------------- | ------------------- |
| `--pattern-dots` | `rgba(0, 0, 0, 0.08)` | Ben-Day dot pattern |
| `--pattern-grid` | `rgba(0, 0, 0, 0.05)` | Background grid     |

## Typography

### Font Selection

Typography is bold and assertive. **Lexend Exa** or **Archivo Black** serve as display fonts, with **Space Grotesk** providing a slightly softer option for body text while maintaining geometric strength.

```css
--font-display: "Lexend Exa", "Archivo Black", "Impact", sans-serif;
--font-body: "Space Grotesk", "DM Sans", "Arial Black", sans-serif;
--font-mono: "Space Mono", "Roboto Mono", monospace;
```

### Type Scale

The scale is aggressive, with large jumps between sizes to create poster-like hierarchy.

| Token         | Size | Weight | Line Height | Transform | Usage                  |
| ------------- | ---- | ------ | ----------- | --------- | ---------------------- |
| `--text-xs`   | 12px | 500    | 1.4         | none      | Fine print, timestamps |
| `--text-sm`   | 14px | 500    | 1.4         | none      | Captions, metadata     |
| `--text-base` | 16px | 500    | 1.5         | none      | Body text              |
| `--text-lg`   | 20px | 600    | 1.4         | none      | Emphasized body        |
| `--text-xl`   | 28px | 700    | 1.2         | uppercase | Section headers        |
| `--text-2xl`  | 40px | 800    | 1.1         | uppercase | Panel titles           |
| `--text-3xl`  | 56px | 900    | 1.0         | uppercase | Hero text              |
| `--text-4xl`  | 72px | 900    | 1.0         | uppercase | Display (rare)         |

### Typography Principles

**Weight Over Size:** Use heavy weights liberally. Even body text sits at 500 weight. Headers reach 800-900.

**Uppercase Authority:** Headers and labels use uppercase to maximize visual impact and reinforce the "poster" aesthetic.

**Tight Leading:** Large text uses compressed line heights (1.0-1.2) to create dense, impactful blocks.

**Letter Spacing:** Uppercase text receives slight positive tracking (+0.02em) for legibility; display sizes may use tighter tracking (-0.02em) for density.

**No Italics:** The brutalist aesthetic avoids italics. Emphasis is achieved through weight, color, or size changes.

## Spacing System

Spacing is chunky and deliberate, with larger increments than conventional systems.

| Token        | Value | Usage                      |
| ------------ | ----- | -------------------------- |
| `--space-1`  | 4px   | Micro adjustments          |
| `--space-2`  | 8px   | Tight internal padding     |
| `--space-3`  | 12px  | Icon gaps                  |
| `--space-4`  | 16px  | Button padding, list items |
| `--space-6`  | 24px  | Card internal padding      |
| `--space-8`  | 32px  | Section margins            |
| `--space-10` | 40px  | Panel padding              |
| `--space-12` | 48px  | Major divisions            |
| `--space-16` | 64px  | Layout gaps                |
| `--space-20` | 80px  | Hero spacing               |

### Shadow Offset System

Hard shadows use consistent offsets for the "sticker" effect.

| Token         | Offset  | Usage                    |
| ------------- | ------- | ------------------------ |
| `--shadow-sm` | 2px 2px | Small elements, badges   |
| `--shadow-md` | 4px 4px | Buttons, inputs          |
| `--shadow-lg` | 6px 6px | Cards, panels            |
| `--shadow-xl` | 8px 8px | Modals, emphasized cards |

## Visual Elements

### Hard Shadows

Shadows are sharp-edged, non-blurred, and always black. They create a "sticker" or "cut-out" effect that gives elements physical presence.

```css
.card {
  box-shadow: var(--shadow-lg) 0 var(--structure-black);
}

.button {
  box-shadow: var(--shadow-md) 0 var(--structure-black);
}

/* Active/pressed state reduces shadow to simulate pressing */
.button:active {
  box-shadow: var(--shadow-sm) 0 var(--structure-black);
  transform: translate(2px, 2px);
}
```

### Thick Strokes

All interactive elements and containers have visible black borders.

| Element      | Border Width | Style       |
| ------------ | ------------ | ----------- |
| Buttons      | 3px          | Solid black |
| Input fields | 2px          | Solid black |
| Cards        | 3px          | Solid black |
| Panels       | 4px          | Solid black |
| Badges       | 2px          | Solid black |

```css
.button {
  border: 3px solid var(--structure-black);
}

.input {
  border: 2px solid var(--structure-black);
}

.card {
  border: 3px solid var(--structure-black);
}
```

### Corner Radii

Corners are minimal or absent, reinforcing the raw, constructed feel.

| Element | Radius                       |
| ------- | ---------------------------- |
| Buttons | 0px (sharp) or 4px (minimal) |
| Cards   | 0px                          |
| Inputs  | 0px                          |
| Badges  | 2px                          |
| Avatars | 0px (square)                 |

### Patterned Backgrounds

The canvas uses subtle Ben-Day dot patterns inspired by pop art and vintage printing.

**Ben-Day Dot Pattern**

```css
.canvas-background {
  background-color: var(--surface-base);
  background-image: radial-gradient(var(--pattern-dots) 1px, transparent 1px);
  background-size: 16px 16px;
}
```

**Grid Pattern (Alternative)**

```css
.canvas-grid {
  background-color: var(--surface-base);
  background-image: linear-gradient(var(--pattern-grid) 1px, transparent 1px),
    linear-gradient(90deg, var(--pattern-grid) 1px, transparent 1px);
  background-size: 24px 24px;
}
```

**Diagonal Stripe Pattern (For Emphasis)**

```css
.stripe-pattern {
  background: repeating-linear-gradient(
    45deg,
    var(--accent-primary) 0px,
    var(--accent-primary) 10px,
    var(--structure-black) 10px,
    var(--structure-black) 20px
  );
}
```

### Physical Cards

Content appears on cards that feel like stacked physical objects.

```
┌─────────────────────────────────────────────────────────┐
│                                                         │▓
│  CARD TITLE                                             │▓
│  ─────────────────────────────────────────────────────  │▓
│                                                         │▓
│  Content sits here with generous padding.               │▓
│  The card casts a hard shadow to the right and down.   │▓
│                                                         │▓
│                              [ PRIMARY ACTION ]         │▓
│                                                         │▓
└─────────────────────────────────────────────────────────┘▓
  ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓
```

### Color Blocking

Large areas of solid color create visual rhythm and section breaks.

```
┌─────────────────────────────────────────────────────────┐
│██████████████████████████████████████████████████████████│
│██  SECTION HEADER  █████████████████████████████████████│
│██████████████████████████████████████████████████████████│
├─────────────────────────────────────────────────────────┤
│                                                         │
│  Section content on white background...                 │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

## Component Specifications

### The Command Shell (Desktop)

The command shell is a bold, impossible-to-miss element anchored at the bottom of the screen.

**Idle State (Collapsed Bar)**

- Height: 56px
- Width: 480px (centered)
- Background: `--accent-primary`
- Border: 3px solid `--structure-black`
- Shadow: `--shadow-md`
- Border radius: 0px
- Position: Fixed, 24px from bottom
- Content: "ASK ANYTHING" in uppercase, bold

**Visual (Idle)**

```
┌──────────────────────────────────────────┐
│  🔍  ASK ANYTHING                    ⌘K  │▓▓
└──────────────────────────────────────────┘▓▓
  ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓
```

**Expanded State (Active)**

- Height: Auto (min 180px, max 70vh)
- Width: 600px (centered)
- Background: `--surface-card`
- Border: 4px solid `--structure-black`
- Shadow: `--shadow-xl`
- Transform origin: Bottom center
- Animation: Scale pop with overshoot

**Expanded Layout**

```
┌══════════════════════════════════════════════════════════════┐
║                                                              ║▓▓
║  ┌────────────────────────────────────────────────────────┐  ║▓▓
║  │  Type your question here...                         │  ║▓▓
║  └────────────────────────────────────────────────────────┘  ║▓▓
║                                                              ║▓▓
║  ████████████████████████████████                            ║▓▓
║  ██ CONTEXT: document.md ██████████████████████              ║▓▓
║  ████████████████████████████████                            ║▓▓
║                                                              ║▓▓
║  [ CANCEL ]                              [ SEND → ]          ║▓▓
║                                                              ║▓▓
└══════════════════════════════════════════════════════════════┘▓▓
  ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓
```

**Button Styling**

- Primary button: `--accent-primary` background, 3px black border, `--shadow-md`
- Secondary button: `--surface-card` background, 3px black border, `--shadow-sm`
- On press: Shadow reduces, element translates toward shadow direction

### The Action Bar (Mobile)

The mobile action bar is chunky and thumb-friendly, designed for outdoor visibility.

**Docked State**

- Height: 64px
- Full width with 16px horizontal padding
- Background: `--accent-primary`
- Border top: 4px solid `--structure-black`
- Safe area padding for home indicator

**Visual (Docked)**

```
┌══════════════════════════════════════════════════════════════┐
║  🔍  TAP TO ASK                                          ▲   ║
└══════════════════════════════════════════════════════════════┘
```

**Expanded State**

- Slides up to occupy bottom 60% of screen
- Background: `--surface-card`
- Top border: 4px solid `--structure-black`
- Contains: Large input field, context chips, action buttons
- Pull indicator: 8px × 48px black bar

**Touch Targets**
All interactive elements are minimum 48px × 48px, with most buttons reaching 56px height for reliable thumb targeting.

### Card Components

Cards are the primary content containers, designed to feel like physical objects.

**Standard Card**

```css
.card {
  background: var(--surface-card);
  border: 3px solid var(--structure-black);
  box-shadow: var(--shadow-lg) 0 var(--structure-black);
  padding: var(--space-6);
}
```

**Card Header**

```
┌─────────────────────────────────────────────────────────┐
│████████████████████████████████████████████████████████│
│██  DOCUMENT TITLE  ████████████████████████████████████│
│████████████████████████████████████████████████████████│
├─────────────────────────────────────────────────────────┤
│                                                         │
│  Card content below the header block...                 │
│                                                         │
```

**Result Card (AI Output)**
When the AI generates content, it appears as a card that "pops" onto the canvas.

- Initial state: Scale 0%, opacity 0%
- Animation: Pop in with overshoot (scale to 105%, then settle to 100%)
- Duration: 300ms
- Sound: Optional tactile click (if system sounds enabled)

### UI State Indicators

State changes are bold and unambiguous.

**Idle**

- Yellow background bar with "ASK ANYTHING" text
- Subtle pulse animation on border (optional)

**Thinking**

- Background shifts to `--accent-secondary` (blue)
- Text changes to "THINKING..."
- Animated stripe pattern scrolls across background:

```css
@keyframes stripe-scroll {
  0% {
    background-position: 0 0;
  }
  100% {
    background-position: 40px 0;
  }
}

.thinking {
  background: repeating-linear-gradient(
    45deg,
    var(--accent-secondary) 0px,
    var(--accent-secondary) 10px,
    var(--accent-secondary-hover) 10px,
    var(--accent-secondary-hover) 20px
  );
  animation: stripe-scroll 0.5s linear infinite;
}
```

**Streaming**

- Background: `--accent-secondary`
- Progress bar: Thick (8px) black bar filling with `--accent-primary`
- Token count displayed in bold

**Action Required**

- Background: `--accent-tertiary` (orange)
- Text: "ACTION REQUIRED" in black
- Pulsing border animation
- Clear YES/NO buttons with contrasting colors

**Error**

- Background: `--status-error`
- Text: "ERROR" in white, uppercase
- Error message below in white
- Retry button in `--accent-primary`

### Button Variants

**Primary Button**

```css
.btn-primary {
  background: var(--accent-primary);
  color: var(--structure-black);
  border: 3px solid var(--structure-black);
  box-shadow: var(--shadow-md) 0 var(--structure-black);
  font-weight: 700;
  text-transform: uppercase;
  padding: var(--space-4) var(--space-6);
}

.btn-primary:hover {
  background: var(--accent-primary-hover);
}

.btn-primary:active {
  box-shadow: var(--shadow-sm) 0 var(--structure-black);
  transform: translate(2px, 2px);
}
```

**Secondary Button**

```css
.btn-secondary {
  background: var(--surface-card);
  color: var(--structure-black);
  border: 3px solid var(--structure-black);
  box-shadow: var(--shadow-sm) 0 var(--structure-black);
  font-weight: 600;
  text-transform: uppercase;
}
```

**Destructive Button**

```css
.btn-destructive {
  background: var(--status-error);
  color: var(--text-inverse);
  border: 3px solid var(--structure-black);
  box-shadow: var(--shadow-md) 0 var(--structure-black);
}
```

## Motion and Animation

### Guiding Principles

**Impactful Entrances:** Elements arrive with energy. Subtle fades are replaced by bold pops and slides.

**Physical Response:** Interactive elements respond like physical objects. Pressing a button compresses its shadow; releasing it bounces back.

**Overshoot for Emphasis:** Animations use slight overshoot (105% scale settling to 100%) to create a sense of physical weight.

**Snappy Timing:** Animations are quick but not instant. The user should see the motion happen.

### Timing Specifications

| Action             | Duration | Easing                              | Notes                  |
| ------------------ | -------- | ----------------------------------- | ---------------------- |
| Shell expand       | 300ms    | `cubic-bezier(0.34, 1.56, 0.64, 1)` | Overshoot easing       |
| Shell collapse     | 200ms    | `cubic-bezier(0.4, 0, 0.2, 1)`      | Standard ease-out      |
| Card pop-in        | 300ms    | `cubic-bezier(0.34, 1.56, 0.64, 1)` | Scale with overshoot   |
| Button press       | 100ms    | `linear`                            | Shadow/position shift  |
| Button release     | 150ms    | `cubic-bezier(0.34, 1.56, 0.64, 1)` | Bounce back            |
| State color change | 150ms    | `linear`                            | Background transitions |
| Stripe scroll      | 500ms    | `linear`                            | Infinite loop          |
| Mobile sheet slide | 350ms    | `cubic-bezier(0.32, 0.72, 0, 1)`    | Spring-like            |

### Pop-In Animation

```css
@keyframes pop-in {
  0% {
    opacity: 0;
    transform: scale(0.8);
  }
  70% {
    opacity: 1;
    transform: scale(1.05);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}

.card-enter {
  animation: pop-in 300ms cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
}
```

### Button Press Effect

```css
.button {
  transition: transform 100ms linear, box-shadow 100ms linear;
}

.button:active {
  transform: translate(2px, 2px);
  box-shadow: 2px 2px 0 var(--structure-black);
}
```

### Reduced Motion

When `prefers-reduced-motion` is enabled:

- Replace pop animations with simple fades
- Disable stripe scrolling (static background)
- Remove button translation on press (color change only)
- Reduce all durations by 50%

## Code Rendering

Code blocks receive the brutalist treatment while maintaining readability.

**Container Styling**

```css
.code-block {
  background: var(--surface-base);
  border: 3px solid var(--structure-black);
  box-shadow: var(--shadow-md) 0 var(--structure-black);
  padding: var(--space-4);
  font-family: var(--font-mono);
}
```

**Code Block Header**

```
┌═══════════════════════════════════════════════════════════════┐
│██ PYTHON ███████████████████████████████████████████████████ │▓▓
├───────────────────────────────────────────────────────────────┤▓▓
│  1 │ def hello_world():                                       │▓▓
│  2 │     """A simple function."""                             │▓▓
│  3 │     print("Hello, World!")                               │▓▓
│  4 │                                                          │▓▓
│  5 │ if __name__ == "__main__":                               │▓▓
│  6 │     hello_world()                                        │▓▓
└───────────────────────────────────────────────────────────────┘▓▓
  ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓
```

**Syntax Highlighting (High Contrast)**

The syntax theme uses saturated colors that pop against the white background.

| Element   | Color               | Token               |
| --------- | ------------------- | ------------------- |
| Keywords  | `#0066FF` (Blue)    | `--syntax-keyword`  |
| Strings   | `#00AA44` (Green)   | `--syntax-string`   |
| Comments  | `#666666` (Gray)    | `--syntax-comment`  |
| Functions | `#CC00CC` (Magenta) | `--syntax-function` |
| Variables | `#000000` (Black)   | `--syntax-variable` |
| Numbers   | `#FF6600` (Orange)  | `--syntax-number`   |
| Types     | `#0099CC` (Cyan)    | `--syntax-type`     |
| Operators | `#CC0000` (Red)     | `--syntax-operator` |

**Line Numbers**

- Background: `--surface-alt`
- Border right: 2px solid `--structure-black`
- Font weight: 700
- Color: `--text-secondary`

## Responsive Behavior

### Breakpoints

| Name    | Width          | Primary Changes                        |
| ------- | -------------- | -------------------------------------- |
| Mobile  | < 640px        | Full-width cards, larger touch targets |
| Tablet  | 640px - 1024px | Two-column card grid possible          |
| Desktop | > 1024px       | Full layout, floating command shell    |

### Mobile Adaptations

**Increased Touch Targets:** All buttons minimum 48px, primary actions 56px
**Full-Width Cards:** Cards span the full viewport width minus gutters
**Larger Typography:** Body text increases to 18px base
**Thicker Borders:** Border widths increase by 1px across the board
**Reduced Shadows:** Shadow offsets reduced to prevent cards from feeling "floating away"

### Card Grid

**Desktop**

```
┌──────────────┐  ┌──────────────┐  ┌──────────────┐
│              │▓ │              │▓ │              │▓
│   CARD 1     │▓ │   CARD 2     │▓ │   CARD 3     │▓
│              │▓ │              │▓ │              │▓
└──────────────┘▓ └──────────────┘▓ └──────────────┘▓
 ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓  ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓  ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓
```

**Mobile**

```
┌────────────────────────────────────┐
│                                    │▓
│            CARD 1                  │▓
│                                    │▓
└────────────────────────────────────┘▓
 ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓

┌────────────────────────────────────┐
│                                    │▓
│            CARD 2                  │▓
│                                    │▓
└────────────────────────────────────┘▓
 ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓
```

### High-Glare Mode

For outdoor use, an optional high-contrast mode increases:

- Border widths by 1px
- Shadow offsets by 2px
- Text weight by one step
- Background pattern opacity by 50%

## Accessibility Considerations

### Color Contrast

All text meets WCAG 2.1 AAA standards (7:1 contrast ratio). The high-saturation palette actually aids accessibility through extreme contrast.

| Combination     | Contrast Ratio          |
| --------------- | ----------------------- |
| Black on White  | 21:1                    |
| Black on Yellow | 19.6:1                  |
| White on Blue   | 8.6:1                   |
| Black on Orange | 4.8:1 (large text only) |

### Focus Indicators

Focus states use a thick, high-contrast outline that cannot be missed:

```css
:focus-visible {
  outline: 4px solid var(--structure-black);
  outline-offset: 2px;
}
```

For elements on dark backgrounds:

```css
.dark-bg :focus-visible {
  outline: 4px solid var(--accent-primary);
  outline-offset: 2px;
}
```

### Touch Target Sizing

All interactive elements exceed minimum touch target requirements:

- Buttons: 48px × 48px minimum
- Primary actions: 56px height
- List items: 56px height
- Icon buttons: 48px × 48px with visible boundary

### Screen Reader Support

- All decorative patterns use `aria-hidden="true"`
- Color-coded status includes text labels
- Card shadows are decorative and hidden from accessibility tree
- Focus order follows visual layout

### Motion Sensitivity

- All animations respect `prefers-reduced-motion`
- Stripe animations are purely decorative and can be disabled
- No essential information is conveyed through animation alone

## Implementation Notes

**Font Loading:** Preload display fonts to prevent dramatic layout shift:

```html
<link
  rel="preload"
  href="/fonts/LexendExa.woff2"
  as="font"
  type="font/woff2"
  crossorigin
/>
```

**Shadow Performance:** Hard shadows are computationally cheaper than blurred shadows. The brutalist aesthetic is actually performance-friendly.

**Pattern Optimization:** Ben-Day dot patterns use CSS rather than images for scalability and performance. On low-power devices, patterns can be disabled.

**Light Mode Primary:** This theme is designed primarily for light mode. A dark mode variant is possible but would require significant palette restructuring to maintain the brutalist character.

**Print Stylesheet:** The high-contrast nature translates well to print. Consider a print stylesheet that maintains borders but removes shadows.

**Icon Style:** Icons should use bold stroke weights (2px minimum) to match the chunky aesthetic. Thin line icons will feel out of place.

**Sound Design (Optional):** The tactile nature of this theme pairs well with subtle interaction sounds. A soft "pop" on card appearance and a muted "click" on button press reinforce the physical metaphor.

**Color Customization:** Allow users to swap the accent color set while maintaining the structural black framework. This enables brand customization without losing the brutalist character.
