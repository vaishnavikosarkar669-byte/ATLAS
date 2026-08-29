from typing import List
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from uuid import UUID

from app.core.database import get_db
from app.models.user import User
from app.models.trip import Trip
from app.models.itinerary import ItineraryDay
from app.schemas.trip import TripCreate, TripUpdate, TripResponse
from app.schemas.itinerary import ItineraryDayCreate, ItineraryDayUpdate, ItineraryDayResponse
from app.api.deps import get_current_user

router = APIRouter(prefix="/trips", tags=["trips"])

@router.get("", response_model=List[TripResponse])
def get_trips(db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    return current_user.trips

@router.post("", response_model=TripResponse, status_code=status.HTTP_201_CREATED)
def create_trip(trip_in: TripCreate, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    trip = Trip(**trip_in.model_dump(), user_id=current_user.id)
    db.add(trip)
    db.commit()
    db.refresh(trip)
    return trip

@router.get("/{trip_id}", response_model=TripResponse)
def get_trip(trip_id: UUID, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    trip = db.query(Trip).filter(Trip.id == trip_id, Trip.user_id == current_user.id).first()
    if not trip:
        raise HTTPException(status_code=404, detail="Trip not found")
    return trip

@router.patch("/{trip_id}", response_model=TripResponse)
def update_trip(trip_id: UUID, trip_in: TripUpdate, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    trip = db.query(Trip).filter(Trip.id == trip_id, Trip.user_id == current_user.id).first()
    if not trip:
        raise HTTPException(status_code=404, detail="Trip not found")
    
    update_data = trip_in.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(trip, field, value)
        
    db.add(trip)
    db.commit()
    db.refresh(trip)
    return trip

@router.delete("/{trip_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_trip(trip_id: UUID, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    trip = db.query(Trip).filter(Trip.id == trip_id, Trip.user_id == current_user.id).first()
    if not trip:
        raise HTTPException(status_code=404, detail="Trip not found")
    
    db.delete(trip)
    db.commit()
    return None

# --- Itinerary Routes ---

@router.post("/{trip_id}/itinerary", response_model=ItineraryDayResponse, status_code=status.HTTP_201_CREATED)
def create_itinerary_day(trip_id: UUID, day_in: ItineraryDayCreate, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    trip = db.query(Trip).filter(Trip.id == trip_id, Trip.user_id == current_user.id).first()
    if not trip:
        raise HTTPException(status_code=404, detail="Trip not found")
        
    day = ItineraryDay(**day_in.model_dump(), trip_id=trip.id)
    db.add(day)
    db.commit()
    db.refresh(day)
    return day

@router.patch("/{trip_id}/itinerary/{day_id}", response_model=ItineraryDayResponse)
def update_itinerary_day(trip_id: UUID, day_id: UUID, day_in: ItineraryDayUpdate, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    trip = db.query(Trip).filter(Trip.id == trip_id, Trip.user_id == current_user.id).first()
    if not trip:
        raise HTTPException(status_code=404, detail="Trip not found")
        
    day = db.query(ItineraryDay).filter(ItineraryDay.id == day_id, ItineraryDay.trip_id == trip.id).first()
    if not day:
        raise HTTPException(status_code=404, detail="Itinerary day not found")
        
    update_data = day_in.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(day, field, value)
        
    db.add(day)
    db.commit()
    db.refresh(day)
    return day

@router.delete("/{trip_id}/itinerary/{day_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_itinerary_day(trip_id: UUID, day_id: UUID, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    trip = db.query(Trip).filter(Trip.id == trip_id, Trip.user_id == current_user.id).first()
    if not trip:
        raise HTTPException(status_code=404, detail="Trip not found")
        
    day = db.query(ItineraryDay).filter(ItineraryDay.id == day_id, ItineraryDay.trip_id == trip.id).first()
    if not day:
        raise HTTPException(status_code=404, detail="Itinerary day not found")
        
    db.delete(day)
    db.commit()
    return None
