from pydantic import BaseModel
from uuid import UUID
from datetime import date
from typing import Optional

class ItineraryDayBase(BaseModel):
    day_number: int
    date: date
    title: Optional[str] = None
    description: Optional[str] = None
    estimated_cost: Optional[float] = None

class ItineraryDayCreate(ItineraryDayBase):
    pass

class ItineraryDayUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    estimated_cost: Optional[float] = None

class ItineraryDayResponse(ItineraryDayBase):
    id: UUID
    trip_id: UUID

    class Config:
        from_attributes = True

