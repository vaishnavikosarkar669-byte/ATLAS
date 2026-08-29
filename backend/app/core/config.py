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
    DATABASE_URL: str = os.getenv("DATABASE_URL", "postgresql+psycopg://atlas_user:atlas_password@localhost:5432/atlas")
    JWT_SECRET_KEY: str = os.getenv("JWT_SECRET_KEY", "super_secret_fallback")
    JWT_ALGORITHM: str = os.getenv("JWT_ALGORITHM", "HS256")
    ACCESS_TOKEN_EXPIRE_MINUTES: int = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", "43200"))
    
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
