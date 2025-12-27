import json
from typing import cast

from fastapi import FastAPI
from fastapi.responses import StreamingResponse
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from openai import OpenAI
from openai.types.responses import ResponseInputParam, FunctionToolParam
from dotenv import load_dotenv

load_dotenv(".env.local")  # Load environment variables from .env file

app = FastAPI()

# CORS middleware for frontend access
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Portfolio content
portfolio_content = {
    "bio": {
        "name": "Alex Johnson",
        "title": "Senior Full-Stack Engineer",
        "location": "San Francisco, CA",
        "summary": "Passionate software engineer with 8+ years of experience building scalable web applications and AI-powered systems. I specialize in React, TypeScript, and distributed systems, with a focus on creating intuitive user experiences that delight users and drive business results.",
        "highlights": [
            "Led development of AI systems processing 1M+ requests daily",
            "Open source contributor with 5k+ GitHub stars across projects",
            "Speaker at ReactConf 2024 and AI Summit 2023",
            "Expertise in system design and microservices architecture",
        ],
    },
    "experience": [
        {
            "role": "Senior Software Engineer",
            "company": "TechCorp AI",
            "duration": "2022-01 - Present",
            "description": "Leading development of AI-powered features for enterprise customers. Reduced inference latency by 40%, architected microservices serving 10M DAU.",
            "technologies": ["Python", "TypeScript", "React", "Kubernetes", "TensorFlow"],
        },
        {
            "role": "Full-Stack Engineer",
            "company": "StartupXYZ",
            "duration": "2019-06 - 2021-12",
            "description": "Built core B2B SaaS platform features. Reduced page load by 60%, established CI/CD reducing deployment from hours to minutes.",
            "technologies": ["React", "Node.js", "PostgreSQL", "Redis", "AWS"],
        },
        {
            "role": "Frontend Developer",
            "company": "WebAgency Co",
            "duration": "2016-08 - 2019-05",
            "description": "Developed 20+ client projects across e-commerce, healthcare, finance. Led accessibility initiatives achieving WCAG AA compliance.",
            "technologies": ["JavaScript", "React", "Vue.js", "SCSS"],
        },
    ],
    "projects": [
        {
            "name": "AI Assistant Platform",
            "category": "ai",
            "description": "Enterprise conversational AI platform with custom training, processing 500k+ conversations monthly.",
            "technologies": ["React", "Python", "FastAPI", "LangChain", "PostgreSQL"],
            "featured": True,
        },
        {
            "name": "Real-time Collaboration SDK",
            "category": "open-source",
            "description": "Open-source CRDT library for building collaborative apps. Used by 500+ projects.",
            "technologies": ["TypeScript", "WebSockets", "Yjs", "Redis"],
            "featured": True,
        },
        {
            "name": "DevOps Dashboard",
            "category": "devops",
            "description": "Unified monitoring dashboard integrating Kubernetes, Prometheus, CI/CD. Reduced MTTR by 40%.",
            "technologies": ["React", "Go", "Kubernetes", "Prometheus"],
            "featured": False,
        },
    ],
    "education": [
        {
            "degree": "M.S. Computer Science (AI Specialization)",
            "institution": "Stanford University",
            "years": "2014-2016",
        },
        {
            "degree": "B.S. EECS",
            "institution": "UC Berkeley",
            "years": "2010-2014",
            "honors": "Magna Cum Laude",
        },
    ],
    "skills": {
        "languages": ["TypeScript", "Python", "JavaScript", "Go", "SQL"],
        "frontend": ["React", "Next.js", "Tailwind CSS", "Framer Motion"],
        "backend": ["Node.js", "PostgreSQL", "Redis", "Kubernetes", "AWS", "Docker"],
        "ai": ["LLM Integration", "Prompt Engineering", "LangChain", "TensorFlow"],
    },
    "contact": {
        "email": "alex@example.com",
        "calendly": "https://calendly.com/alexjohnson/30min",
        "social": ["GitHub", "LinkedIn", "Twitter"],
    },
}


def generate_system_prompt() -> str:
    bio = portfolio_content["bio"]
    experience = portfolio_content["experience"]
    projects = portfolio_content["projects"]
    education = portfolio_content["education"]
    skills = portfolio_content["skills"]
    contact = portfolio_content["contact"]

    highlights = "\n".join(f"- {h}" for h in bio["highlights"])
    exp_list = "\n".join(
        f"- {e['role']} at {e['company']} ({e['duration']}): {e['description']}"
        for e in experience
    )
    proj_list = "\n".join(
        f"- {p['name']} [{p['category']}]: {p['description']}" for p in projects
    )
    edu_list = "\n".join(
        f"- {e['degree']} from {e['institution']} ({e['years']})" for e in education
    )

    return f"""You are an AI assistant representing {bio['name']}'s professional portfolio.
Your role is to help visitors learn about {bio['name']}'s background, experience, projects, skills, and how to get in touch.

## Personality
- Professional yet approachable and friendly
- Enthusiastic about {bio['name']}'s work
- Concise by default, thorough when details requested
- Speak naturally, as if having a conversation

## Portfolio Summary
Name: {bio['name']}
Title: {bio['title']}
Location: {bio['location']}

About: {bio['summary']}

Highlights:
{highlights}

## Experience
{exp_list}

## Projects
{proj_list}

## Education
{edu_list}

## Skills
- Languages: {', '.join(skills['languages'])}
- Frontend: {', '.join(skills['frontend'])}
- Backend: {', '.join(skills['backend'])}
- AI/ML: {', '.join(skills['ai'])}

## Contact
Email: {contact['email']}
Calendar: {contact['calendly']}

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
- Clarifying questions"""


# Tool definitions for OpenAI Responses API
tools: list[FunctionToolParam] = [
    {
        "type": "function",
        "name": "renderCanvas",
        "strict": True,
        "description": "Display content in the canvas area of the portfolio. Use when the user asks about specific content areas or wants to see visual content.",
        "parameters": {
            "type": "object",
            "properties": {
                "type": {
                    "type": "string",
                    "enum": ["bio", "experience", "projects", "education", "skills", "contact"],
                    "description": "The type of portfolio content to display",
                },
                "filter": {
                    "type": "string",
                    "description": "Optional filter (e.g., 'ai' for AI projects, company name for experience)",
                },
                "highlightId": {
                    "type": "string",
                    "description": "ID of a specific item to highlight",
                },
            },
            "required": ["type"],
        },
    }
]


class Message(BaseModel):
    role: str
    content: str


class ChatRequest(BaseModel):
    messages: list[Message]


client = OpenAI()


async def stream_response(messages: list[dict]):
    """Stream the OpenAI response using Responses API with Vercel AI SDK format."""
    try:
        # Convert messages to Responses API input format
        input_messages: ResponseInputParam = [
            {"role": cast(str, msg["role"]), "content": msg["content"]}  # type: ignore[misc]
            for msg in messages
        ]

        # Use Responses API with streaming
        with client.responses.create(
            model="gpt-4o-mini",
            instructions=generate_system_prompt(),
            input=input_messages,
            tools=tools,
            stream=True,
        ) as response:
            # Track tool calls being built up
            current_tool_calls = {}

            for event in response:
                # Handle text delta events
                if event.type == "response.output_text.delta":
                    yield f"0:{json.dumps(event.delta)}\n"

                # Handle function call arguments delta
                elif event.type == "response.function_call_arguments.delta":
                    call_id = event.item_id
                    if call_id not in current_tool_calls:
                        current_tool_calls[call_id] = {"args": ""}
                    current_tool_calls[call_id]["args"] += event.delta

                # Handle new output items (including function calls)
                elif event.type == "response.output_item.added":
                    if event.item.type == "function_call":
                        call_id = event.item.id
                        current_tool_calls[call_id] = {
                            "name": event.item.name,
                            "args": "",
                        }

                # Handle completed output items
                elif event.type == "response.output_item.done":
                    if event.item.type == "function_call":
                        call_id = event.item.id
                        # Parse arguments from JSON string to object
                        args = json.loads(event.item.arguments) if event.item.arguments else {}
                        tool_data = {
                            "toolCallId": call_id,
                            "toolName": event.item.name,
                            "args": args,
                        }
                        yield f"9:{json.dumps(tool_data)}\n"

                # Handle response completion
                elif event.type == "response.completed":
                    finish_reason = "stop"
                    # Check if there were tool calls
                    if any(
                        item.type == "function_call"
                        for item in event.response.output
                    ):
                        finish_reason = "tool-calls"
                    yield f"d:{json.dumps({'finishReason': finish_reason})}\n"

    except Exception as e:
        error_data = {"error": str(e)}
        yield f"3:{json.dumps(error_data)}\n"


@app.post("/api/chat")
async def chat(request: ChatRequest):
    """Handle chat requests with streaming responses."""
    messages = [{"role": msg.role, "content": msg.content} for msg in request.messages]

    return StreamingResponse(
        stream_response(messages),
        media_type="text/event-stream",
        headers={
            "Cache-Control": "no-cache",
            "Connection": "keep-alive",
            "X-Accel-Buffering": "no",
        },
    )


@app.get("/health")
async def health():
    """Health check endpoint."""
    return {"status": "ok"}


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=3001)
