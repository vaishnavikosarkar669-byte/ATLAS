"""
Pydantic schemas for the /api/chat endpoint.
"""
from pydantic import BaseModel, Field


class ChatRequest(BaseModel):
    message: str = Field(..., min_length=1, max_length=4000, description="User message to the ATLAS assistant.")


class ChatResponse(BaseModel):
    response: str = Field(..., description="AI-generated response from ATLAS assistant.")
