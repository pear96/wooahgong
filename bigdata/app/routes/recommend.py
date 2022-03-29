from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from starlette.responses import Response
from app.database.schema import User, Mood, UserMood, Place, PlaceWish, Feed, FeedLike, FeedMood

from app.database.conn import db

router = APIRouter(prefix="/main")

@router.get("/forme")
async def forme( session: Session = Depends(db.session)):
    user = session.query(User).all()
    print(user)
    return user


@router.get("/trend")
async def trend():
    return Response({"message": "트렌드"})