from __future__ import annotations

import json
import logging
import datetime
import uuid

from typing import cast
from dotenv import load_dotenv
from pydantic import BaseModel
from fastapi import FastAPI, APIRouter
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
from openai import OpenAI
from openai.types.responses import ResponseInputParam, FunctionToolParam
from fastapi_ai_sdk import create_ai_stream_response, AIStream
from fastapi_ai_sdk.models import (
    StartEvent, TextStartEvent, TextDeltaEvent,
    TextEndEvent, FinishEvent, ToolInputStartEvent,
    ToolInputDeltaEvent, ToolInputAvailableEvent
)

from ._version import __version__
from .utils import load_portfolio_content


logger = logging.getLogger("uvicorn")

API_NAME = "AI Portfolio"
API_VERSION = __version__

load_dotenv(".env.local")


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

    return f"""You are an AI assistant representing {bio["name"]}'s professional portfolio.
Your role is to help visitors learn about {bio["name"]}'s background, experience, projects, skills, and how to get in touch.

## Personality
- Professional yet approachable and friendly
- Enthusiastic about {bio["name"]}'s work
- Concise by default, thorough when details requested
- Speak naturally, as if having a conversation

## Portfolio Summary
Name: {bio["name"]}
Title: {bio["title"]}
Location: {bio["location"]}

About: {bio["summary"]}

Highlights:
{highlights}

## Experience
{exp_list}

## Projects
{proj_list}

## Education
{edu_list}

## Skills
- Languages: {", ".join(skills["languages"])}
- Frontend: {", ".join(skills["frontend"])}
- Backend: {", ".join(skills["backend"])}
- AI/ML: {", ".join(skills["ai"])}

## Contact
Email: {contact["email"]}
Calendar: {contact["calendly"]}

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
                    "enum": [
                        "bio",
                        "experience",
                        "projects",
                        "education",
                        "skills",
                        "contact",
                    ],
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
    return f"msg_{uuid.uuid4().hex[:24]}"


async def stream_openai_response(messages: list[dict]):
    """Stream the OpenAI response using fastapi-ai-sdk format."""
    # Convert messages to Responses API input format
    input_messages: ResponseInputParam = [
        {"role": cast(str, msg["role"]), "content": msg["content"]}
        for msg in messages
    ]

    system_prompt = generate_system_prompt()
    message_id = generate_message_id()
    text_id = f"text_{message_id}"

    async def event_generator():
        try:
            # Start the message stream
            yield StartEvent(message_id=message_id)

            # Use Responses API with streaming
            with client.responses.create(
                model="gpt-4o-mini",
                instructions=system_prompt,
                input=input_messages,
                tools=tools,
                stream=True,
            ) as response:
                text_started = False
                current_tool_call_id = None
                tool_call_args = ""

                for event in response:
                    # Handle text delta events
                    if event.type == "response.output_text.delta":
                        if not text_started:
                            yield TextStartEvent(id=text_id)
                            text_started = True
                        yield TextDeltaEvent(id=text_id, delta=event.delta)

                    # Handle new output items (including function calls)
                    elif event.type == "response.output_item.added":
                        if event.item.type == "function_call":
                            current_tool_call_id = event.item.id
                            tool_call_args = ""
                            yield ToolInputStartEvent(
                                tool_call_id=current_tool_call_id,
                                tool_name=event.item.name
                            )

                    # Handle function call arguments delta
                    elif event.type == "response.function_call_arguments.delta":
                        tool_call_args += event.delta
                        yield ToolInputDeltaEvent(
                            tool_call_id=event.item_id,
                            input_text_delta=event.delta
                        )

                    # Handle completed output items
                    elif event.type == "response.output_item.done":
                        if event.item.type == "function_call":
                            # Parse arguments from JSON string to object
                            args = (
                                json.loads(event.item.arguments)
                                if event.item.arguments
                                else {}
                            )
                            yield ToolInputAvailableEvent(
                                tool_call_id=event.item.id,
                                tool_name=event.item.name,
                                input=args
                            )

                    # Handle response completion
                    elif event.type == "response.completed":
                        if text_started:
                            yield TextEndEvent(id=text_id)

            # Finish the stream
            yield FinishEvent()

        except Exception as e:
            logger.error(f"Stream error: {e}")
            # Send error and finish
            yield FinishEvent()

    stream = AIStream(event_generator())
    return create_ai_stream_response(stream)


async def chat(request: ChatRequest):
    """Handle chat requests with streaming responses."""
    messages = [{"role": msg.role, "content": msg.content}
                for msg in request.messages]

    return await stream_openai_response(messages)


@asynccontextmanager
async def lifespan(app: FastAPI):
    logger.info(f"Starting {API_NAME} v{API_VERSION}")
    yield
    logger.info(f"Shutting down {API_NAME} v{API_VERSION}")


def create_app():

    app = FastAPI(
        title=API_NAME,
        version=API_VERSION,
        lifespan=lifespan,
        openapi_url="/openapi.json",
        docs_url="/docs",
    )

    @app.get("/", response_model=dict, tags=["root"])
    async def root():
        return {"name": API_NAME, "version": API_VERSION, "docs": "/docs"}

    @app.get("/health", response_model=dict, tags=["health"])
    async def health():
        return {
            "status": "ok",
            "version": API_VERSION,
            "name": API_NAME,
            "timestamp": datetime.datetime.now().isoformat(),
        }

    router = APIRouter()

    router.add_api_route(
        "/api/chat", chat, methods=["POST"]
    )

    app.include_router(router)

    # CORS middleware for frontend access
    app.add_middleware(
        CORSMiddleware,
        allow_origins=["*"],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    return app


app = create_app()


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=3001)
