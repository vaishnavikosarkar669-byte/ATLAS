"""
ATLAS FastAPI application factory.
"""
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.core.config import settings
from app.api.routes.chat import router as chat_router
from app.api.routes.auth import router as auth_router
from app.api.routes.trips import router as trips_router
from app.api.routes.saved_places import router as saved_places_router


def create_app() -> FastAPI:
    app = FastAPI(
        title=settings.APP_TITLE,
        version=settings.APP_VERSION,
        description="ATLAS AI-Powered Travel Planning Backend — Phase 2B",
        docs_url="/docs",
        redoc_url="/redoc",
    )

    # ── CORS ──────────────────────────────────────────────────────────────────
    # Only allow the local frontend origins. Extend this list in production
    # once the frontend is deployed.
    app.add_middleware(
        CORSMiddleware,
        allow_origins=settings.ALLOWED_ORIGINS,
        allow_credentials=True,
        allow_methods=["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
        allow_headers=["*"],
    )

    # ── Health ────────────────────────────────────────────────────────────────
    @app.get("/health", tags=["Health"], summary="Health check")
    async def health():
        return {"status": "ok"}

    # ── API routes ────────────────────────────────────────────────────────────
    app.include_router(auth_router, prefix="/api")
    app.include_router(trips_router, prefix="/api")
    app.include_router(saved_places_router, prefix="/api")
    app.include_router(chat_router, prefix="/api", tags=["Chat"])

    return app


app = create_app()
