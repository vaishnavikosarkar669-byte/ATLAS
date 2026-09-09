from pydantic import BaseModel
from uuid import UUID
from datetime import datetime
from typing import Optional

class SavedPlaceBase(BaseModel):
    place_id: str
    name: str
    type: str
    description: Optional[str] = None
    category: Optional[str] = None
    location: Optional[str] = None
    image_url: Optional[str] = None
    rating: Optional[float] = None

class SavedPlaceCreate(SavedPlaceBase):
    pass

class SavedPlaceResponse(SavedPlaceBase):
    id: UUID
    user_id: UUID
    created_at: datetime

    class Config:
        from_attributes = True
