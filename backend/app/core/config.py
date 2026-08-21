"""
ATLAS Backend — Core Configuration
Reads environment variables and exposes typed settings.
"""
import os
from dotenv import load_dotenv

# Load .env from the backend directory (one level up from this file's package)
load_dotenv()


class Settings:
    GEMINI_API_KEY: str = os.getenv("GEMINI_API_KEY", "")
    # Allowed frontend origins for CORS
    ALLOWED_ORIGINS: list[str] = [
        "http://localhost:5173",   # Vite default
        "http://localhost:5174",   # Vite fallback if 5173 is in use
        "http://localhost:5175",   # Vite fallback
        "http://localhost:5176",   # Vite fallback
        "http://localhost:5177",   # Vite fallback
        "http://localhost:3000",   # CRA / Next.js default
        "http://127.0.0.1:5173",
        "http://127.0.0.1:5174",
        "http://127.0.0.1:5175",
        "http://127.0.0.1:5176",
        "http://127.0.0.1:5177",
    ]
    APP_TITLE: str = "ATLAS API"
    APP_VERSION: str = "0.1.0"


settings = Settings()
