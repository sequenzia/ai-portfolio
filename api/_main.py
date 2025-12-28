from __future__ import annotations

import logging
import datetime

from fastapi import FastAPI, APIRouter
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from contextlib import asynccontextmanager
from .chat import chat

from ._version import __version__

logger = logging.getLogger("uvicorn")

API_NAME = "AI Portfolio"
API_VERSION = __version__


@asynccontextmanager
async def lifespan(app: FastAPI):
    logger.info(f"Starting {API_NAME} v{API_VERSION}")
    yield
    logger.info(f"Shutting down {API_NAME} v{API_VERSION}")


def create_app():
    """Factory function for creating the FastAPI app (used by uvicorn --factory)."""

    application = FastAPI(
        title=API_NAME,
        version=API_VERSION,
        lifespan=lifespan,
        openapi_url="/openapi.json",
        docs_url="/docs",
    )

    @application.get("/", response_model=dict, tags=["root"])
    async def root():
        return {"name": API_NAME, "version": API_VERSION, "docs": "/docs"}

    @application.get("/health", response_model=dict, tags=["health"])
    async def health():
        return {
            "status": "ok",
            "version": API_VERSION,
            "name": API_NAME,
            "timestamp": datetime.datetime.now().isoformat(),
        }

    router = APIRouter()

    router.add_api_route(
        "/api/chat", chat, methods=["POST"], response_class=StreamingResponse
    )

    application.include_router(router)

    # CORS middleware for frontend access
    application.add_middleware(
        CORSMiddleware,
        allow_origins=["*"],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    return application


# Alias for backwards compatibility with uvicorn --factory
app = create_app
