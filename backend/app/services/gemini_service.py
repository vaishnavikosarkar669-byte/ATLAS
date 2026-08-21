"""
Gemini service layer for ATLAS.
All Gemini API logic is isolated here so it can be replaced or extended
(e.g., with a multi-agent pipeline) in a later phase without touching routes.
"""
from typing import Any

from app.core.config import settings
from app.core.prompts import ATLAS_SYSTEM_INSTRUCTION


def _get_model() -> Any:
    """Configure Gemini and return the model. Called lazily so startup is fast."""
    try:
        import google.generativeai as genai
    except ImportError as exc:
        raise RuntimeError(
            "The Gemini SDK is not installed. Install backend requirements before using chat."
        ) from exc
    if not settings.GEMINI_API_KEY:
        raise RuntimeError(
            "GEMINI_API_KEY is not set. "
            "Add it to backend/.env before starting the server."
        )
    genai.configure(api_key=settings.GEMINI_API_KEY)
    return genai.GenerativeModel(
        model_name="gemini-3.6-flash",
        system_instruction=ATLAS_SYSTEM_INSTRUCTION,
    )


async def chat(user_message: str) -> str:
    """
    Send a user message to Gemini and return the text response.

    Phase 2A: This is a simple single-turn call.
    Future phases will maintain conversation history and route through
    specialised agents (Travel, Hotel, Food, Activity, Weather, Maps).

    Raises:
        RuntimeError: if GEMINI_API_KEY is missing.
        Exception: propagated from the Gemini SDK for caller to handle.
    """
    model = _get_model()
    response = model.generate_content(user_message)
    return response.text
