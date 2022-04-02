from fastapi import APIRouter, Depends, HTTPException, status
from jose import jwt, JWTError
from sqlalchemy.orm import Session
from starlette.requests import Request
from starlette.responses import Response
from app.database.schema import User, Mood, UserMood, Place, PlaceWish, Feed, FeedLike, FeedMood
from app.database.conn import db
from app.common.config import Config
from pydantic import BaseModel
from haversine import haversine
import pandas as pd
import numpy as np

import datetime
from pytz import timezone

router = APIRouter(prefix="/data/main")

# 요청 body
class TrendReq(BaseModel):
    searchRadius : int
    lat : float
    lng : float

SECRET_KEY = Config.JWT_SECRET
ALGORITHM = Config.JWT_ALGORITHM
PREFIX = "Bearer "
CONN = Config.DB_URL


@router.post("/trend")
async def trend(request: Request, trend_request: TrendReq, session: Session = Depends(db.session)):
    data = {
        "trendyPlaces": find_trendy_places(request, trend_request, session),
        "recByAgeGender": find_by_age_gender(request, trend_request, session)
    }

    return data

# 현재 인기있는 장소들
def find_trendy_places(request, trend_request, session):
    user = find_user(request, session)
    user_seq = user.user_seq
    
    #################### 현재 인기있는 장소들 ####################
    result_places = []
    # 내가 방문한 장소 제외, 해당 장소에 대해 3개월 이내 피드가 3개 이상
    # 최근 3개월의 평균 평점이 높은 순
    # 검색 반경 내에 있는 장소

    # 설정값
    MAX_ELAPSED_DAYS = 90
    MIN_FEEDS_NUM = 3

    user_position = (trend_request.lat, trend_request.lng)
    search_radius = trend_request.searchRadius

    df_feeds = pd.read_sql_table('feed', CONN)

    # 내가 방문한 피드 제외
    df_feeds = df_feeds.drop(df_feeds[df_feeds.user_seq == user_seq].index)

    # 게시일이 90일이 지난 피드 제외
    now = datetime.datetime.now(timezone('Asia/Seoul'))
    current_time = now.strptime(now.strftime('%Y-%m-%d %H:%M:%S'), '%Y-%m-%d %H:%M:%S')
    
    df_feeds['elapsed'] = current_time - df_feeds['created_date'];
   
    df_feeds = df_feeds[df_feeds.elapsed <= datetime.timedelta(days=MAX_ELAPSED_DAYS)]
    
    # 해당하는 장소의 피드가 3개 미만이면 제외
    df_feeds = df_feeds.groupby('place_seq').filter(lambda x : len(x) >= MIN_FEEDS_NUM)

    # 최근 3개월의 평균 평점을 내림차순으로 정렬
    df_feeds['avg_rating'] = df_feeds.groupby(['place_seq'])['ratings'].transform('mean')
    df_feeds = df_feeds.sort_values(by=['avg_rating'], axis=0, ascending=False)
    
    # 중복되는 place_seq 삭제
    df_feeds = df_feeds.drop_duplicates(['place_seq'], keep='first')
   
    sorted_places_idx = list(df_feeds['place_seq'])
    
    for place_seq in sorted_places_idx:
        # 어차피 seq니까 한개임(one)
        place = session.query(Place).filter(Place.place_seq == place_seq).one()
        place_position = (place.latitude, place.longitude)

        distance = haversine(user_position, place_position, unit='m')
        # 거리 내에 있는 경우에만 추가
        if distance <= search_radius:
            result_places.append({
                'placeSeq': place.place_seq,
                'placeImageUrl': place.feeds[0].thumbnail
            })

    return result_places

# 연령대, 성별
def find_by_age_gender(request, trend_request, session):
    user = find_user(request, session)
    user_seq = user.user_seq
    user_birth_year = user.birth.year

    df_users = pd.read_sql_table('user', CONN)
    df_wishes = pd.read_sql_table('place_wish', CONN)

    MAX_ELAPSED_DAYS = 90
    MIN_WISHES_NUM = 3
    #################### ${20}대 ${남자}가 좋아하는 장소 ####################
    # 로그인한 유저와 연령대와 성별이 같은 유저들이
    # 최근 3개월간 찜 순으로 장소들을 추천(3개 이상)
    age_group = np.floor((datetime.date.today().year - user_birth_year) / 10) * 10
    gender = user.gender
    result_places = []

    # 연령대와 성별 같은 유저의 user_seq 찾기
    df_users['birth_year'] = df_users['birth'].dt.year
    df_users['age_group'] = np.floor((datetime.date.today().year - df_users['birth_year']) / 10) * 10
    
    # 자신 제외, 같은 연령대, 같은 성별을 제외하고 drop
    df_users = df_users[(df_users.user_seq != user_seq) & (df_users.age_group == age_group) & (df_users.gender == gender)]
    similar_users_idx = list(df_users['user_seq'])

    # df[~df['col_name'].isin(values_list)]
    df_wishes = df_wishes[df_wishes.user_seq.isin(similar_users_idx)]
    
    # 찜한지 90일이 지난 장소 제외
    now = datetime.datetime.now(timezone('Asia/Seoul'))
    current_time = now.strptime(now.strftime('%Y-%m-%d %H:%M:%S'), '%Y-%m-%d %H:%M:%S')
    
    df_wishes['elapsed'] = current_time - df_wishes['created_date'];
    df_wishes = df_wishes[df_wishes.elapsed <= datetime.timedelta(days=MAX_ELAPSED_DAYS)]
    
    # 해당하는 장소의 찜 수가 3개 미만이면 제외
    df_wishes = df_wishes.groupby('place_seq').filter(lambda x : len(x) >= MIN_WISHES_NUM)
    
    # 최근 3개월의 찜 수 기준으로 내림차순으로 정렬
    df_wishes['count'] = df_wishes.groupby(['place_seq'])['place_wish_seq'].transform('count')
    df_wishes = df_wishes.sort_values(by=['count'], axis=0, ascending=False)
    
    # 중복되는 place_seq 삭제
    df_wishes = df_wishes.drop_duplicates(['place_seq'], keep='first')
    
    sorted_places_idx = list(df_wishes['place_seq'])
    
    for place_seq in sorted_places_idx:
        # 어차피 seq니까 한개임(one)
        place = session.query(Place).filter(Place.place_seq == place_seq).one()
        place_position = (place.latitude, place.longitude)

        distance = haversine(user_position, place_position, unit='m')
        # 거리 내에 있는 경우에만 추가
        if distance <= search_radius:
            result_places.append({
                'placeSeq': place.place_seq,
                'placeImageUrl': place.feeds[0].thumbnail
            })

    return {
        "ageGroup": int(age_group),
        "gender": gender,
        "places": result_places
    }

# 사용자 찾기
def find_user(request, session):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    token = request.headers.get('Authorization')
    # Authorization으로 받은 내용을 JWT로 해석하여서 email을 추출해냄
    try:
        token = token.replace(PREFIX, "")
        user_email = jwt.decode(token, SECRET_KEY, [ALGORITHM])["sub"] # {'sub': 'amlwq@naver.com', 'iss': 'ssafy.com', 'exp': 1649907298, 'iat': 1648611298} 
    except JWTError:
        raise credentials_exception
    # 해당 email로 user를 찾음
    print("----------------찾은 유저 출력---------------")
    user = session.query(User).filter(User.email == user_email).one()
    print("사용자 : ", user.nickname)
    return user