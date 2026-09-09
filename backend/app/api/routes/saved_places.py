from typing import List
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from uuid import UUID

from app.core.database import get_db
from app.models.user import User
from app.models.saved_place import SavedPlace
from app.schemas.saved_place import SavedPlaceCreate, SavedPlaceResponse
from app.api.deps import get_current_user

router = APIRouter(prefix="/saved-places", tags=["saved-places"])

@router.get("", response_model=List[SavedPlaceResponse])
def get_saved_places(db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    return current_user.saved_places

@router.post("", response_model=SavedPlaceResponse, status_code=status.HTTP_201_CREATED)
def create_saved_place(place_in: SavedPlaceCreate, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    # Check if already saved
    existing = db.query(SavedPlace).filter(
        SavedPlace.place_id == place_in.place_id,
        SavedPlace.user_id == current_user.id
    ).first()
    
    if existing:
        return existing

    place = SavedPlace(**place_in.model_dump(), user_id=current_user.id)
    db.add(place)
    db.commit()
    db.refresh(place)
    return place

@router.delete("/{place_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_saved_place(place_id: str, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    place = db.query(SavedPlace).filter(
        SavedPlace.place_id == place_id,
        SavedPlace.user_id == current_user.id
    ).first()
    
    if not place:
        raise HTTPException(status_code=404, detail="Saved place not found")
        
    db.delete(place)
    db.commit()
    return None

