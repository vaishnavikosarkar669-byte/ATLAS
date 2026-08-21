"""
Entry point for the ATLAS backend.
Run with:  uvicorn main:app --reload --port 8000
(from the backend/ directory)
"""
from app.main import app  # noqa: F401 — re-exported so uvicorn can find `app`
