from fastapi import APIRouter, Depends, HTTPException, status
from jose import jwt, JWTError
from sqlalchemy.orm import Session
from starlette.requests import Request
from starlette.responses import Response
from app.database.schema import User, Mood, UserMood, Place, PlaceWish, Feed, FeedLike, FeedMood
from app.database.conn import db
from app.common.config import Config

router = APIRouter(prefix="/data/main")

SECRET_KEY = Config.JWT_SECRET
ALGORITHM = Config.JWT_ALGORITHM
PREFIX = "Bearer "

@router.get("/trend")
async def trend(searchRadius: int, lat: float, lng: float, session: Session = Depends(db.session)):
    return "트렌드"