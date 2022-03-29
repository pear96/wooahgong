from sqlalchemy import (
    Column,
    Integer,
    Date,
    DateTime,
    VARCHAR,
    Boolean,
    ForeignKey,
    func
)
from sqlalchemy.dialects.mysql.types import DOUBLE
from sqlalchemy.orm import relationship
from app.database.conn import Base


# 기본 Entity (생성, 수정 시간)
class BaseTime:
    created_date = Column(DateTime, default=func.utc_timestamp())
    modified_date = Column(DateTime, default=func.utc_timestamp(), onupdate=func.utc_timestamp())
    

# 사용자 Entity
class User(Base, BaseTime):
    __tablename__ = "user"
    user_seq = Column(Integer, primary_key=True, nullable=False, index=True)
    birth = Column(Date, nullable=False)
    email = Column(VARCHAR(255), nullable=False)
    gender = Column(Boolean, nullable=False)
    image_url = Column(VARCHAR(255), nullable=False)
    mbti = Column(VARCHAR(255), nullable=False)
    nickname = Column(VARCHAR(255), nullable=False, index=True)
    password = Column(VARCHAR(255), nullable=False)
    provider = Column(Boolean, nullable=False)
    auth_code = Column(VARCHAR(255), nullable=False)

    moods = relationship("UserMood")
    wish_places = relationship("PlaceWish")
    like_feeds = relationship("FeedLike")

# 분위기 Entity
class Mood(Base, BaseTime):
    __tablename__ = "mood"
    mood_seq = Column(Integer, primary_key=True, nullable=False, index=True)
    mood = Column(VARCHAR(30), nullable=False)

# 사용자 - 분위기 Entity
class UserMood(Base, BaseTime):
    __tablename__ = "user_mood"
    user_mood_seq = Column(Integer, primary_key=True, nullable=False, index=True)
    user_seq = Column(Integer, ForeignKey("user.user_seq"))
    mood_seq = Column(Integer, ForeignKey("mood.mood_seq"))

# 장소 Entity
class Place(Base, BaseTime):
    __tablename__ = "place"
    place_seq = Column(Integer, primary_key=True, nullable=False, index=True)
    address = Column(VARCHAR(255), nullable=False)
    name = Column(VARCHAR(255), nullable=False)
    latitue = Column(DOUBLE, nullable=False)
    longitude = Column(DOUBLE, nullable=False)

    user_seq = Column(Integer, ForeignKey("user.user_seq"))


# 장소 찜 Entity
class PlaceWish(Base, BaseTime):
    __tablename__ = "place_wish"
    place_wish_seq = Column(Integer, primary_key=True, nullable=False, index=True)
    user_seq = Column(Integer, ForeignKey("user.user_seq"))
    place_seq = Column(Integer, ForeignKey("place.place_seq"))

# 피드
class Feed(Base, BaseTime):
    __tablename__ = "feed"
    feed_seq = Column(Integer, primary_key=True, nullable=False, index=True)
    content = Column(VARCHAR(255), nullable=False)
    ratigns = Column(Integer, nullable=False)
    thumbnail = Column(VARCHAR(255), nullable=False)
    user_seq = Column(Integer, ForeignKey("user.user_seq"))
    place_seq = Column(Integer, ForeignKey("place.place_seq"))

    moods = relationship("FeedMood")

# 피드 좋아요
class FeedLike(Base, BaseTime):
    __tablename__ = "feed_like"
    feed_like_seq = Column(Integer, primary_key=True, nullable=False, index=True)
    user_seq = Column(Integer, ForeignKey("user.user_seq"))
    feed_seq = Column(Integer, ForeignKey("feed.feed_seq"))

# 피드 분위기
class FeedMood(Base, BaseTime):
    __tablename__ = "feed_mood"
    feed_mood_seq = Column(Integer, primary_key=True, nullable=False, index=True)
    feed_seq = Column(Integer, ForeignKey("feed.feed_seq"))
    mood_seq = Column(Integer, ForeignKey("mood.mood_seq"))