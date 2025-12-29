import { streamText, tool, convertToModelMessages, type UIMessage } from 'ai';
import { openai } from '@ai-sdk/openai';
import { z } from 'zod';
import fs from 'fs';
import path from 'path';
import type { PortfolioContent } from '@/lib/content/types';
import { parsePortfolioMarkdown } from '@/lib/content/parsePortfolio';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

// Load portfolio content at module level (runs once on server start)
function loadPortfolioContent(): PortfolioContent {
  const portfolioPath = path.join(process.cwd(), 'content', 'portfolio.md');
  const portfolioMarkdown = fs.readFileSync(portfolioPath, 'utf-8');
  return parsePortfolioMarkdown(portfolioMarkdown);
}

const portfolioContent = loadPortfolioContent();

function generateSystemPrompt(): string {
  const { bio, experience, projects, education, skills, contact } = portfolioContent;

  const highlights = bio.highlights.map((h) => `- ${h}`).join('\n');
  const expList = experience
    .map(
      (e) =>
        `- ${e.role} at ${e.company} (${e.startDate} - ${e.endDate}): ${e.description}`
    )
    .join('\n');
  const projList = projects
    .map((p) => `- ${p.name} [${p.category}]: ${p.description}`)
    .join('\n');
  const eduList = education
    .map(
      (e) =>
        `- ${e.degree} in ${e.field} from ${e.institution} (${e.startDate} - ${e.endDate})`
    )
    .join('\n');

  // Collect all skill names by category
  const skillsByCategory = skills
    .map((cat) => `- ${cat.name}: ${cat.skills.map((s) => s.name).join(', ')}`)
    .join('\n');

  return `You are an AI assistant representing ${bio.name}'s professional portfolio.
Your role is to help visitors learn about ${bio.name}'s background, experience, projects, skills, and how to get in touch.

## Personality
- Professional yet approachable and friendly
- Enthusiastic about ${bio.name}'s work
- Concise by default, thorough when details requested
- Speak naturally, as if having a conversation

## Portfolio Summary
Name: ${bio.name}
Title: ${bio.title}
Location: ${bio.location}

About: ${bio.summary}

Highlights:
${highlights}

## Experience
${expList}

## Projects
${projList}

## Education
${eduList}

## Skills
${skillsByCategory}

## Contact
Email: ${contact.email}
${contact.calendlyUrl ? `Calendar: ${contact.calendlyUrl}` : ''}

## Instructions
1. Answer questions accurately using the information above
2. Use the renderCanvas tool to display visual content when discussing specific areas
3. Redirect off-topic questions back to the portfolio
4. Suggest related topics after answering

## Tool Usage
Use renderCanvas when:
- User asks about bio, experience, projects, education, skills, or contact
- User wants to "see" or "show" something
- Visual content enhances your response

Don't use renderCanvas for:
- Simple factual answers
- Greetings or casual chat
- Clarifying questions`;
}

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json();

  const result = streamText({
    model: openai('gpt-4o-mini'),
    system: generateSystemPrompt(),
    messages: await convertToModelMessages(messages),
    tools: {
      renderCanvas: tool({
        description: `Display content in the canvas area of the portfolio. Use this tool when:
- The user asks about a specific content area (bio, experience, projects, education, skills, contact)
- The user wants to "see" or "show" something
- Displaying visual content would enhance understanding of your response

Do NOT use this tool for:
- Simple factual answers that don't need visual support
- Clarifying questions
- Greetings or casual conversation`,
        inputSchema: z.object({
          type: z
            .enum(['bio', 'experience', 'projects', 'education', 'skills', 'contact'])
            .describe('The type of portfolio content to display'),
          filter: z
            .string()
            .optional()
            .describe(
              'Optional filter (e.g., "ai" for AI projects, company name for experience)'
            ),
          highlightId: z
            .string()
            .optional()
            .describe('ID of a specific item to highlight'),
        }),
      }),
    },
  });

  return result.toUIMessageStreamResponse();
}
