import uuid
from sqlalchemy import Column, String, ForeignKey, Date, Float, Integer
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship

from app.models.base import Base

class ItineraryDay(Base):
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    trip_id = Column(UUID(as_uuid=True), ForeignKey("trip.id", ondelete="CASCADE"), nullable=False)
    day_number = Column(Integer, nullable=False)
    date = Column(Date, nullable=False)
    title = Column(String, nullable=True)
    description = Column(String, nullable=True)
    estimated_cost = Column(Float, nullable=True)

    trip = relationship("Trip", back_populates="itinerary_days")
