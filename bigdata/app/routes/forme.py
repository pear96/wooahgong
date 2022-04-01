from fastapi import APIRouter, Depends, HTTPException, status
from jose import jwt, JWTError
from sklearn import neighbors
from sqlalchemy.orm import Session
from starlette.requests import Request
from starlette.responses import Response
from app.database.schema import User, Mood, UserMood, Place, PlaceWish, Feed, FeedLike, FeedMood
from app.database.conn import db
from app.common.config import Config
from haversine import haversine
from pydantic import BaseModel
import time

import pandas as pd
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity

# 요청 body
class ForMeReq(BaseModel):
    searchRadius : int
    lat : float
    lng : float


router = APIRouter(prefix="/data/main")

SECRET_KEY = Config.JWT_SECRET
ALGORITHM = Config.JWT_ALGORITHM
PREFIX = "Bearer "
CONN = Config.DB_URL

# Header로 Authorization 받음
@router.post("/forme")
async def forme(request: Request, for_me_request : ForMeReq, session: Session = Depends(db.session)):
    df_feeds = pd.read_sql_table('feed', CONN)

    user = find_user(request, session)
    user_seq = user.user_seq

    # 해당 장소에 작성한 피드의 '평균' 평점으로 구성
    rating_matrix = df_feeds.pivot_table(index='user_seq', columns='place_seq', values='ratings', aggfunc=np.mean)

    # Nan값에 0을 넣으면 나중에 사용자의 평가 경향을 구할 때 적용되어버린다.
    rating_matrix_no_null = rating_matrix.copy().fillna(0)
    
    # 코사인 유사도
    user_similarity = cosine_similarity(rating_matrix_no_null, rating_matrix_no_null)
    user_similarity = pd.DataFrame(user_similarity, index=rating_matrix.index, columns=rating_matrix.index)


    # 사용자의 평가 경향 고려
    rating_mean = rating_matrix.mean(axis=1)
    rating_bias = (rating_matrix.T - rating_mean).T

    # 공통으로 평가한 아이템 개수에 따른 가중치 부여
    rating_binary1 = np.array(rating_matrix > 0).astype(float)
    rating_binary2 = rating_binary1.T

    count = np.dot(rating_binary1, rating_binary2)
    count = pd.DataFrame(count, index=rating_matrix.index, columns=rating_matrix.index).fillna(0)

    # 설정값
    neighbors_size = 3
    MIN_COMMON = 0
    MIN_RATINGS = 1

    # 사용자가 이미 방문한 장소는 추천에서 제외
    # 사용자가 신규 가입해서 평점이 없을 경우 Key Error 발생
    if user_seq in rating_matrix.index:
        user_places = rating_matrix.loc[user_seq].copy()

        # 장소를 하나씩 보면서 예상 평점을 계산해야해
        for place_seq in rating_bias.columns:
            if pd.notnull(user_places.loc[place_seq]):
                user_places.loc[place_seq] = 0
            else:
                # 유사도 평가, 장소 평점
                similar_scores = user_similarity[user_seq].copy()
                place_ratings = rating_bias[place_seq].copy()
                # 공통으로 평가한 개수 [2. 3. 3. 2.]
                common_counts = count[user_seq]
                
                # 원하는 개수보다 적은 사람들은 false
                low_significance = common_counts <= MIN_COMMON
                print("지금 보는 장소 넘버 ", place_seq)
                print("####################place ratings")
                print(place_ratings)
                # null 값들 제거하기, 평가를 안했거나 개수가 적은 사람들의 index 제거
                none_rating_idx = place_ratings[place_ratings.isnull() | low_significance].index

                # 원하지 않는 index drop
                place_ratings = place_ratings.drop(none_rating_idx)
                similar_scores = similar_scores.drop(none_rating_idx)

                if len(similar_scores) >= MIN_RATINGS:
                    neighbors_size = min(neighbors_size, len(similar_scores))

                    # numpy로 계산하려고 준비함
                    similar_scores = np.array(similar_scores)
                    place_ratings = np.array(place_ratings)

                    user_index = np.argsort(similar_scores)

                    similar_scores = similar_scores[user_index][-neighbors_size:]
                    place_ratings = similar_scores[user_index][-neighbors_size:]
                    # 사용자의 평점 평균에 추가적인 예상 점수를 더해줘야한다.
                    prediction = np.dot(similar_scores, place_ratings) / similar_scores.sum() + rating_mean[user_seq]
                else:
                    prediction = rating_mean[user_seq]

                user_places.loc[place_seq] = prediction
        # 예측 평점이 높은 순으로 place seq 정렬
        sorted_places = user_places.sort_values(ascending=False).index
        sorted_places_idx = list(sorted_places)
    else:
        # 신규 유저라서 CF 적용 불가! 사용자의 취향과 상관없이 제일 평점이 높은 것 반환(근데 이거 트렌드랑 똑같아지는딩~~~~ 함수를 따로 파야하는건가~~~)
        # 단순히 평점이 높으면 안된다. 1개라서 5점인거랑 10개라서 4점인건 다른거니까
        # 이거 어떻게 계산하지???
        sorted_places_idx = [0, 1]
        return 1

    recommend_places = []

    # 예측 평점 몇 점 이하 제거하기
    # 거리 범위 적용하기
    user_position = (for_me_request.lat, for_me_request.lng)
    search_radius = for_me_request.searchRadius
    
    for place_seq in sorted_places_idx:
        # 어차피 seq니까 한개임(one)
        place = session.query(Place).filter(Place.place_seq == place_seq).one()
        place_position = (place.latitude, place.longitude)
        # 0점인건 추천 목록에 넣지 않는다. -> 추후 최소 예상 평점 값을 정해서 필터링 가능
        if user_places[place_seq]:
            distance = haversine(user_position, place_position, unit='m')
            # 거리 내에 있는 경우에만 추가
            if distance <= search_radius:
                place_dto = {
                    "placeSeq" : place.place_seq,
                    "placeImageUrl" : place.feeds[0].thumbnail
                }
                recommend_places.append(place_dto)
        data = {"places" : recommend_places}
        # print("걸린 시간 : ", time.process_time())
    return data


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
    user = session.query(User).filter(User.email == user_email).one()
    return user