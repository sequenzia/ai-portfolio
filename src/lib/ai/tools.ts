import { z } from 'zod';

/**
 * Schema for the renderCanvas tool parameters
 */
export const renderCanvasSchema = z.object({
  type: z
    .enum(['bio', 'experience', 'projects', 'education', 'skills', 'contact'])
    .describe('The type of portfolio content to display in the canvas'),
  filter: z
    .string()
    .optional()
    .describe(
      'Optional filter for content (e.g., "ai" for AI projects, company name for experience)'
    ),
  highlightId: z
    .string()
    .optional()
    .describe('ID of a specific item to highlight or focus on'),
});

export type RenderCanvasParams = z.infer<typeof renderCanvasSchema>;

/**
 * Tool definitions for the AI agent
 */
export const tools = {
  renderCanvas: {
    description: `Display content in the canvas area of the portfolio. Use this tool when:
- The user asks about a specific content area (bio, experience, projects, education, skills, contact)
- The user wants to "see" or "show" something
- Displaying visual content would enhance understanding of your response

Do NOT use this tool for:
- Simple factual answers that don't need visual support
- Clarifying questions
- Greetings or casual conversation`,
    parameters: renderCanvasSchema,
  },
};
