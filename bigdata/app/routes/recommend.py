from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from starlette.responses import Response
from app.database.schema import User, Mood, UserMood, Place, PlaceWish, Feed, FeedLike, FeedMood

from app.database.conn import db

router = APIRouter(prefix="/data/main")

@router.get("/forme")
async def forme(searchRadius: int, lat: float, lng: float, session: Session = Depends(db.session)):
    user = session.query(User).all()
    print(user)
    data = {"user": user, "searchRadius": searchRadius, "lat": lat, "lng": lng}
    return data


@router.get("/trend")
async def trend(searchRadius: int, lat: float, lng: float, session: Session = Depends(db.session)):
    return Response({"message": "트렌드"})