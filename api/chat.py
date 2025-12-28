import json
from typing import cast

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from pydantic import BaseModel
from openai import OpenAI
from openai.types.responses import ResponseInputParam, FunctionToolParam
from dotenv import load_dotenv

from .utils import load_portfolio_content


load_dotenv(".env.local")

# Create FastAPI app for Vercel serverless function
app = FastAPI()

# CORS middleware for frontend access
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Load portfolio content from the single-source-of-truth markdown file
portfolio_content = load_portfolio_content()


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
        "strict": False,
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


class MessagePart(BaseModel):
    type: str
    text: str | None = None
    # Tool result fields (for tool-* type parts)
    toolCallId: str | None = None
    toolName: str | None = None
    state: str | None = None
    input: dict | None = None
    output: str | None = None


class Message(BaseModel):
    role: str
    parts: list[MessagePart]
    id: str | None = None

    @property
    def content(self) -> str:
        """Extract text content from parts, ignoring tool result parts."""
        text_parts = []
        for part in self.parts:
            if part.type == "text" and part.text:
                text_parts.append(part.text)
        return "".join(text_parts)


class ChatRequest(BaseModel):
    messages: list[Message]


client = OpenAI()


def generate_message_id():
    """Generate a unique message ID."""
    import uuid
    return f"msg_{uuid.uuid4().hex[:24]}"


async def stream_response(messages: list[dict]):
    """Stream the OpenAI response using Responses API with Vercel AI SDK v5/v6 format."""
    try:
        # Convert messages to Responses API input format
        input_messages: ResponseInputParam = [
            # type: ignore[misc]
            {"role": cast(str, msg["role"]), "content": msg["content"]}
            for msg in messages
        ]

        system_prompt = generate_system_prompt()
        message_id = generate_message_id()
        text_id = f"text_{message_id}"

        # Use Responses API with streaming
        with client.responses.create(
            model="gpt-4o-mini",
            instructions=system_prompt,
            input=input_messages,
            tools=tools,
            stream=True,
        ) as response:
            # Track if we've started text output
            text_started = False

            for event in response:
                # Handle text delta events
                if event.type == "response.output_text.delta":
                    if not text_started:
                        # Send text start event
                        yield f"data: {json.dumps({'type': 'text-start', 'id': text_id})}\n\n"
                        text_started = True
                    # Send text delta
                    yield f"data: {json.dumps({'type': 'text-delta', 'id': text_id, 'textDelta': event.delta})}\n\n"

                # Handle new output items (including function calls)
                elif event.type == "response.output_item.added":
                    if event.item.type == "function_call":
                        call_id = event.item.id
                        # Send tool input start
                        yield f"data: {json.dumps({'type': 'tool-input-start', 'toolCallId': call_id, 'toolName': event.item.name})}\n\n"

                # Handle function call arguments delta
                elif event.type == "response.function_call_arguments.delta":
                    call_id = event.item_id
                    # Send tool input delta
                    yield f"data: {json.dumps({'type': 'tool-input-delta', 'toolCallId': call_id, 'inputTextDelta': event.delta})}\n\n"

                # Handle completed output items
                elif event.type == "response.output_item.done":
                    if event.item.type == "function_call":
                        call_id = event.item.id
                        # Parse arguments from JSON string to object
                        args = json.loads(
                            event.item.arguments) if event.item.arguments else {}
                        # Send tool input available (this triggers onToolCall)
                        yield f"data: {json.dumps({'type': 'tool-input-available', 'toolCallId': call_id, 'toolName': event.item.name, 'input': args})}\n\n"

                # Handle response completion
                elif event.type == "response.completed":
                    # Send text end if we started text
                    if text_started:
                        yield f"data: {json.dumps({'type': 'text-end', 'id': text_id})}\n\n"
                    # Send done signal
                    yield "data: [DONE]\n\n"

    except Exception as e:
        error_data = {"type": "error", "error": str(e)}
        yield f"data: {json.dumps(error_data)}\n\n"
        yield "data: [DONE]\n\n"


async def root(request: ChatRequest):
    """Handle chat requests with streaming responses."""
    messages = [{"role": msg.role, "content": msg.content}
                for msg in request.messages]

    return StreamingResponse(
        stream_response(messages),
        media_type="text/event-stream",
        headers={
            "Cache-Control": "no-cache",
            "Connection": "keep-alive",
            "X-Accel-Buffering": "no",
            "x-vercel-ai-ui-message-stream": "v1",
        },
    )


# Register route for Vercel serverless function
# When deployed, /api/chat routes to this app's root
@app.post("/")
async def handler(request: ChatRequest):
    """Vercel serverless function handler."""
    return await root(request)
