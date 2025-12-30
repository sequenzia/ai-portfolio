# AI-Powered Portfolio App Mockups

These mockups are based on the AI-Powered Portfolio App architecture and demonstrate the conversational portfolio experience with intelligent content routing between the chat thread and an interactive canvas. The desktop uses a command palette pattern (pill at bottom, expands on interaction), while mobile uses a persistent bottom sheet in the thumb zone.

## Desktop Mockups

### 1. Desktop - Idle State (Landing/Welcome)

```markdown
UI mockup of a portfolio web app on desktop. Clean, minimal interface with an edge-to-edge canvas workspace. At the bottom center of the screen is a small horizontal pill-shaped input bar with a search icon and placeholder text "Ask me anything about my experience...". Above the pill are 3-4 suggested prompt chips like "Show me your projects", "What's your background?", "Tell me about your AI experience". The canvas area is mostly empty with a subtle welcome message centered. Modern, professional aesthetic.
```

### 2. Desktop - Expanded Command Shell with Chat

```markdown
UI mockup of a portfolio chat interface on desktop. The bottom pill has expanded vertically into a command shell taking up about 40% of the screen height. Inside the shell is a conversation thread showing a user message "What AI projects have you worked on?" and an assistant response with text. Behind the shell on the canvas, a grid of 3 project cards is visible, each card showing a project title, brief description, technology tags, and a link icon. The shell has a text input field at the bottom with a send button.
```

### 3. Desktop - Bio Card Rendered on Canvas

```markdown
UI mockup of a portfolio app showing a bio card on the canvas workspace. The card displays a profile photo placeholder, name, job title "Senior Software Engineer", location, a 2-3 sentence professional summary, a row of highlight badges like "10+ years experience" and "AI/ML specialist", and social media icon links (GitHub, LinkedIn, Twitter). At the bottom of the screen is a collapsed command pill. A small chat bubble shows the recent query "Tell me about yourself".
```

### 4. Desktop - Experience Timeline View

```markdown
UI mockup of a portfolio app showing a vertical timeline of work experience on the canvas. The timeline shows 3-4 job entries, each with company name, job title, date range, bullet points of achievements, and small technology tag pills. One entry is visually highlighted with a subtle border or background to indicate focus. The collapsed command pill is visible at the bottom with a chat snippet showing "Show me your work history".
```

### 5. Desktop - Skills Matrix Display

```markdown
UI mockup of a portfolio app displaying a skills matrix on the canvas. Skills are organized into category sections like "Languages", "Frameworks", "Cloud & Infrastructure", "AI/ML". Each skill shows the name and a proficiency indicator (could be dots, bars, or percentage). The layout is a clean grid or grouped list format. The command shell at bottom is collapsed into a pill. A small chat context shows "What technologies do you work with?".
```

### 6. Desktop - Streaming State

```markdown
UI mockup of a portfolio app in a loading/streaming state. The command shell at bottom is partially expanded showing an animated processing indicator on its border. Inside the shell, text is appearing word by word with a typing cursor. On the canvas behind, a project card is partially rendered with a subtle shimmer or skeleton loading effect on the unloaded portions. The overall impression is of content actively being generated.
```

---

## Mobile Mockups

### 7. Mobile - Idle State with Action Bar

```markdown
Mobile UI mockup of a portfolio chat app in portrait orientation. A persistent action bar is docked at the bottom of the screen within thumb reach. The bar shows a text field placeholder "Ask about my portfolio..." and a microphone icon. Above the bar is a small status line showing "Viewing: Portfolio Home". The main screen area shows a welcome message and 3 suggested prompt buttons stacked vertically. Clean, minimal mobile interface.
```

### 8. Mobile - Expanded Bottom Sheet with Conversation

```markdown
Mobile UI mockup of a portfolio chat app with an expanded bottom sheet. The sheet slides up from the bottom covering approximately 50% of the screen. Inside the sheet is a chat conversation with user and assistant messages. The visible canvas area above shows the top portion of a project card being discussed. The input field is at the bottom of the sheet with send and attachment buttons. Standard mobile chat app layout.
```

### 9. Mobile - Full Canvas View with Project Grid

```markdown
Mobile UI mockup of a portfolio app showing a scrollable project grid. Projects are displayed as stacked cards (one column) with project name, description snippet, 3-4 technology tags, and link buttons. The collapsed action bar is visible at bottom with text "3 AI projects shown". The interface is optimized for vertical scrolling on mobile. Each card has clear tap targets for interaction.
```

### 10. Mobile - Contact Section View

```markdown
Mobile UI mockup of a portfolio contact section. The canvas shows contact options: an email address with copy button, a "Book a call" button linking to calendar, and social media links displayed as labeled buttons (GitHub, LinkedIn, Twitter). The layout is vertical and touch-friendly with large tap targets. The action bar at bottom shows the context "Contact information". Simple, functional mobile layout.
```

---

## State-Specific Mockups

### 11. Action Required State

```markdown
UI mockup of a portfolio app command shell showing an action required state. The shell has a notification indicator (small dot or badge). Inside the shell, the assistant message asks "I found 12 projects. Would you like to see all of them or filter by category?" Below are two action buttons: "Show all" and "Filter by category". The canvas behind is dimmed slightly to draw attention to the decision needed. Desktop layout with centered command shell.
```

### 12. Error State

```markdown
UI mockup of a portfolio app showing an error state in the command shell. The shell border or background has changed to indicate an error (could be red tint or warning icon). Inside is a message "Unable to load project details. Please try again." with a "Retry" button. The canvas shows the last successfully loaded content (a partial project card). Desktop layout, professional error handling UI.
```
