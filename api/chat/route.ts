import { streamText } from 'ai';
import { openai } from '@ai-sdk/openai';
import { z } from 'zod';

// Portfolio content for the system prompt
// In production, this would be imported from a shared location
const portfolioContent = {
  bio: {
    name: 'Alex Johnson',
    title: 'Senior Full-Stack Engineer',
    location: 'San Francisco, CA',
    summary:
      'Passionate software engineer with 8+ years of experience building scalable web applications and AI-powered systems. I specialize in React, TypeScript, and distributed systems, with a focus on creating intuitive user experiences that delight users and drive business results.',
    highlights: [
      'Led development of AI systems processing 1M+ requests daily',
      'Open source contributor with 5k+ GitHub stars across projects',
      'Speaker at ReactConf 2024 and AI Summit 2023',
      'Expertise in system design and microservices architecture',
    ],
  },
  experience: [
    {
      role: 'Senior Software Engineer',
      company: 'TechCorp AI',
      duration: '2022-01 - Present',
      description:
        'Leading development of AI-powered features for enterprise customers. Reduced inference latency by 40%, architected microservices serving 10M DAU.',
      technologies: ['Python', 'TypeScript', 'React', 'Kubernetes', 'TensorFlow'],
    },
    {
      role: 'Full-Stack Engineer',
      company: 'StartupXYZ',
      duration: '2019-06 - 2021-12',
      description:
        'Built core B2B SaaS platform features. Reduced page load by 60%, established CI/CD reducing deployment from hours to minutes.',
      technologies: ['React', 'Node.js', 'PostgreSQL', 'Redis', 'AWS'],
    },
    {
      role: 'Frontend Developer',
      company: 'WebAgency Co',
      duration: '2016-08 - 2019-05',
      description:
        'Developed 20+ client projects across e-commerce, healthcare, finance. Led accessibility initiatives achieving WCAG AA compliance.',
      technologies: ['JavaScript', 'React', 'Vue.js', 'SCSS'],
    },
  ],
  projects: [
    {
      name: 'AI Assistant Platform',
      category: 'ai',
      description: 'Enterprise conversational AI platform with custom training, processing 500k+ conversations monthly.',
      technologies: ['React', 'Python', 'FastAPI', 'LangChain', 'PostgreSQL'],
      featured: true,
    },
    {
      name: 'Real-time Collaboration SDK',
      category: 'open-source',
      description: 'Open-source CRDT library for building collaborative apps. Used by 500+ projects.',
      technologies: ['TypeScript', 'WebSockets', 'Yjs', 'Redis'],
      featured: true,
    },
    {
      name: 'DevOps Dashboard',
      category: 'devops',
      description: 'Unified monitoring dashboard integrating Kubernetes, Prometheus, CI/CD. Reduced MTTR by 40%.',
      technologies: ['React', 'Go', 'Kubernetes', 'Prometheus'],
      featured: false,
    },
  ],
  education: [
    {
      degree: 'M.S. Computer Science (AI Specialization)',
      institution: 'Stanford University',
      years: '2014-2016',
    },
    {
      degree: 'B.S. EECS',
      institution: 'UC Berkeley',
      years: '2010-2014',
      honors: 'Magna Cum Laude',
    },
  ],
  skills: {
    languages: ['TypeScript', 'Python', 'JavaScript', 'Go', 'SQL'],
    frontend: ['React', 'Next.js', 'Tailwind CSS', 'Framer Motion'],
    backend: ['Node.js', 'PostgreSQL', 'Redis', 'Kubernetes', 'AWS', 'Docker'],
    ai: ['LLM Integration', 'Prompt Engineering', 'LangChain', 'TensorFlow'],
  },
  contact: {
    email: 'alex@example.com',
    calendly: 'https://calendly.com/alexjohnson/30min',
    social: ['GitHub', 'LinkedIn', 'Twitter'],
  },
};

// Generate system prompt from portfolio content
function generateSystemPrompt(): string {
  const { bio, experience, projects, education, skills, contact } = portfolioContent;

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
${bio.highlights.map((h) => `- ${h}`).join('\n')}

## Experience
${experience.map((e) => `- ${e.role} at ${e.company} (${e.duration}): ${e.description}`).join('\n')}

## Projects
${projects.map((p) => `- ${p.name} [${p.category}]: ${p.description}`).join('\n')}

## Education
${education.map((e) => `- ${e.degree} from ${e.institution} (${e.years})`).join('\n')}

## Skills
- Languages: ${skills.languages.join(', ')}
- Frontend: ${skills.frontend.join(', ')}
- Backend: ${skills.backend.join(', ')}
- AI/ML: ${skills.ai.join(', ')}

## Contact
Email: ${contact.email}
Calendar: ${contact.calendly}

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

// Vercel Edge Runtime
export const runtime = 'edge';

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    const result = await streamText({
      model: openai('gpt-4-turbo'),
      system: generateSystemPrompt(),
      messages,
      tools: {
        renderCanvas: {
          description:
            'Display content in the canvas area of the portfolio. Use when the user asks about specific content areas or wants to see visual content.',
          parameters: z.object({
            type: z
              .enum(['bio', 'experience', 'projects', 'education', 'skills', 'contact'])
              .describe('The type of portfolio content to display'),
            filter: z
              .string()
              .optional()
              .describe('Optional filter (e.g., "ai" for AI projects, company name for experience)'),
            highlightId: z
              .string()
              .optional()
              .describe('ID of a specific item to highlight'),
          }),
        },
      },
      maxSteps: 3,
    });

    return result.toDataStreamResponse();
  } catch (error) {
    console.error('Chat API error:', error);

    // Return appropriate error response
    const errorMessage =
      error instanceof Error ? error.message : 'An unexpected error occurred';

    return new Response(
      JSON.stringify({
        error: 'Failed to process chat request',
        message: errorMessage,
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}
