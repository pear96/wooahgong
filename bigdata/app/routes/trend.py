from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from starlette.requests import Request
from app.database.schema import Place
from app.database.conn import db
from app.common.config import Config
from app.common.image import get_image
from app.common.user import find_user
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

MAX_ELAPSED_DAYS = 90
MIN_FEEDS_NUM = 3
MIN_WISHES_NUM = 3

@router.post("/trend")
async def trend(request: Request, trend_request: TrendReq, session: Session = Depends(db.session)):
    user = find_user(request, session)
    df_users = pd.read_sql_table('user', CONN)
    print("사용자 전체 조회")
    df_user_moods = pd.read_sql_table('user_mood', CONN)
    print("사용자 + 분위기 전체 조회")
    df_feeds = pd.read_sql_table('feed', CONN)
    print("피드 전체 조회")
    df_feed_moods = pd.read_sql_table('feed_mood', CONN)
    print("피드 + 분위기 전체 조회")
    df_moods = pd.read_sql_table('mood', CONN)
    print("분위기 조회")
    df_wishes = pd.read_sql_table('place_wish', CONN)
    print("장소 + 좋아요 전체 조회")
    df_places = pd.read_sql_table('place', CONN)
    print("장소 전체 조회")

    data = {
        "trendyPlaces": find_trendy_places(user, trend_request, df_feeds, df_places),
        "recByAgeGender": find_by_age_gender(user, trend_request, df_users, df_wishes, df_places),
        "recByMBTI": find_by_MBTI(user, trend_request, df_users, df_wishes, df_places),
        "recByMoods": find_by_moods(user, trend_request, df_feeds, df_moods, df_places, df_feed_moods, df_user_moods),
    }

    print("끝")
    return data

# 현재 인기있는 장소들
def find_trendy_places(user, trend_request, df_feeds, df_places):
    user_seq = user.user_seq
    
    #################### 현재 인기있는 장소들 ####################
    result_places = []
    # 내가 방문한 장소 제외, 해당 장소에 대해 3개월 이내 피드가 3개 이상
    # 최근 3개월의 평균 평점이 높은 순
    # 검색 반경 내에 있는 장소

    user_position = (trend_request.lat, trend_request.lng)
    search_radius = trend_request.searchRadius

    # 내가 방문한 피드 제외
    df_feeds = df_feeds.drop(df_feeds[df_feeds.user_seq == user_seq].index)

    # 게시일이 90일이 지난 피드 제외
    now = datetime.datetime.now(timezone('Asia/Seoul'))
    current_time = now.strptime(now.strftime('%Y-%m-%d %H:%M:%S'), '%Y-%m-%d %H:%M:%S')
    
    df_feeds['elapsed'] = current_time - df_feeds['created_date']
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
        place = df_places.loc[df_places['place_seq'] == place_seq]
        place_position = (place.latitude, place.longitude)

        distance = haversine(user_position, place_position, unit='m')
        # 거리 내에 있는 경우에만 추가
        if distance <= search_radius:
            result_places.append({
                'placeSeq': place.place_seq,
                'placeImageUrl': get_image(df_feeds.loc[df_feeds['place_seq'] == place_seq].iloc[0]['thumbnail'])
            })
            if len(result_places) >= 20:
                break
    return result_places

# 연령대, 성별
def find_by_age_gender(user, trend_request, df_users, df_wishes, df_places):
    user_seq = user.user_seq
    user_birth_year = user.birth.year

    user_position = (trend_request.lat, trend_request.lng)
    search_radius = trend_request.searchRadius
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
        place = df_places.loc[df_places['place_seq'] == place_seq]
        place_position = (place.latitude, place.longitude)

        distance = haversine(user_position, place_position, unit='m')
        # 거리 내에 있는 경우에만 추가
        if distance <= search_radius:
            result_places.append({
                'placeSeq': place.place_seq,
                'placeImageUrl': get_image(df_feeds.loc[df_feeds['place_seq'] == place_seq].iloc[0]['thumbnail'])
            })
            if len(result_places) >= 20:
                break
    return {
        "ageGroup": int(age_group),
        "gender": gender,
        "places": result_places
    }

# MBTI
def find_by_MBTI(user, trend_request, df_users, df_wishes, df_places):
    user_seq = user.user_seq
    user_mbti = user.mbti

    user_position = (trend_request.lat, trend_request.lng)
    search_radius = trend_request.searchRadius
    #################### ${ISTP}가 좋아하는 장소 ####################
    # 로그인한 유저와 MBTI가 같은 유저들이
    # 최근 3개월간 찜 순으로 장소들을 추천(3개 이상)
    result_places = []

    # MBTI가 같은 유저의 user_seq 찾기    
    # 자신 제외, 같은 MBTI를 제외하고 drop
    df_users = df_users[(df_users.user_seq != user_seq) & (df_users.mbti == user_mbti)]
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
        place = df_places.loc[df_places['place_seq'] == place_seq]
        place_position = (place.latitude, place.longitude)

        distance = haversine(user_position, place_position, unit='m')
        # 거리 내에 있는 경우에만 추가
        if distance <= search_radius:
            result_places.append({
                'placeSeq': place.place_seq,
                'placeImageUrl': get_image(df_feeds.loc[df_feeds['place_seq'] == place_seq].iloc[0]['thumbnail'])
            })
            if len(result_places) >= 20:
                break
    return {
        "MBTI": user_mbti,
        "places": result_places
    }

# 선호 분위기
def find_by_moods(user, trend_request, df_feeds, df_moods, df_places, df_feed_moods, df_user_moods):
    user_seq = user.user_seq
    user_position = (trend_request.lat, trend_request.lng)
    search_radius = trend_request.searchRadius

    #################### 좋아하는 분위기가 담긴 장소 ####################
    # 로그인한 유저가 선호하는 분위기로 작성된 피드들 중
    # 최근 3개월간 피드 평점 순으로 장소들을 추천(3개 이상)

    # feed_mood 데이터프레임에 feed_seq의 해당 place_seq와 user_seq를 병합
    df_feed_moods = pd.merge(df_feed_moods, df_feeds[['feed_seq', 'place_seq', 'user_seq', 'ratings']], on='feed_seq', how='left')
    
    # 로그인한 유저의 선호 분위기 찾기
    df_user_moods = df_user_moods[df_user_moods.user_seq == user_seq]
    user_moods_idx = list(df_user_moods['mood_seq']) # [3, 5]
    user_moods_str = []
    result_places = [[] for _ in range(len(user_moods_idx))]
    # user_mood1_str = df_moods[df_moods.mood_seq == user_moods_idx[0]]['mood'].values[0] # '복고풍의'
    # user_mood2_str = df_moods[df_moods.mood_seq == user_moods_idx[1]]['mood'].values[0] # '낭만적인'
    for i in range(len(user_moods_idx)):
        user_moods_str.append(df_moods[df_moods.mood_seq == user_moods_idx[i]]['mood'].values[0])

    # 내가 방문한 피드무드 제외
    df_feed_moods = df_feed_moods.drop(df_feed_moods[df_feed_moods.user_seq == user_seq].index)

    # 게시일이 90일이 지난 피드 제외
    now = datetime.datetime.now(timezone('Asia/Seoul'))
    current_time = now.strptime(now.strftime('%Y-%m-%d %H:%M:%S'), '%Y-%m-%d %H:%M:%S')
    
    df_feed_moods['elapsed'] = current_time - df_feed_moods['created_date']
    df_feed_moods = df_feed_moods[df_feed_moods.elapsed <= datetime.timedelta(days=MAX_ELAPSED_DAYS)]
    ## 여기서부터 분기
    # # df[~df['col_name'].isin(values_list)]
    df_feed_moods_seq = []
    for i in range(len(user_moods_idx)):
        df_feed_moods_seq.append(df_feed_moods[df_feed_moods.mood_seq == user_moods_idx[i]]) 
    # df_feed_moods1 = df_feed_moods[df_feed_moods.mood_seq == user_moods_idx[0]]
    # df_feed_moods2 = df_feed_moods[df_feed_moods.mood_seq == user_moods_idx[1]]
    sorted_places_idx = []
    for i in range(len(user_moods_idx)):
        df_feed_moods_seq[i] = df_feed_moods_seq[i].groupby('place_seq').filter(lambda x : len(x) >= MIN_FEEDS_NUM)
        df_feed_moods_seq[i]['avg_rating'] = df_feed_moods_seq[i].groupby(['place_seq'])['ratings'].transform('mean')
        df_feed_moods_seq[i] = df_feed_moods_seq[i].sort_values(by=['avg_rating'], axis=0, ascending=False)
        df_feed_moods_seq[i] = df_feed_moods_seq[i].drop_duplicates(['place_seq'], keep='first')
        sorted_places_idx.append(list(df_feed_moods_seq[i]['place_seq']))
        
    # 해당하는 장소의 피드가 3개 미만이면 제외
    # df_feed_moods1 = df_feed_moods1.groupby('place_seq').filter(lambda x : len(x) >= MIN_FEEDS_NUM)
    # df_feed_moods2 = df_feed_moods2.groupby('place_seq').filter(lambda x : len(x) >= MIN_FEEDS_NUM)


    # 최근 3개월의 평균 평점을 내림차순으로 정렬
    # df_feed_moods1['avg_rating'] = df_feed_moods1.groupby(['place_seq'])['ratings'].transform('mean')
    # df_feed_moods2['avg_rating'] = df_feed_moods2.groupby(['place_seq'])['ratings'].transform('mean')
    
    # df_feed_moods1 = df_feed_moods1.sort_values(by=['avg_rating'], axis=0, ascending=False)
    # df_feed_moods2 = df_feed_moods2.sort_values(by=['avg_rating'], axis=0, ascending=False)
    
    # 중복되는 place_seq 삭제
    # df_feed_moods1 = df_feed_moods1.drop_duplicates(['place_seq'], keep='first')
    # df_feed_moods2 = df_feed_moods2.drop_duplicates(['place_seq'], keep='first')
   
    # sorted_places_idx1 = list(df_feed_moods1['place_seq'])
    # sorted_places_idx2 = list(df_feed_moods2['place_seq'])
    for i in range(len(user_moods_idx)):
        if user_moods_idx[i] != 9:
            for place_seq in sorted_places_idx[i]:
                # 어차피 seq니까 한개임(one)
                place = df_places.loc[df_places['place_seq'] == place_seq]
                place_position = (place.latitude, place.longitude)

                distance = haversine(user_position, place_position, unit='m')
                # 거리 내에 있는 경우에만 추가
                if distance <= search_radius:
                    result_places[i].append({
                        'placeSeq': place.place_seq,
                        'placeImageUrl': get_image(df_feeds.loc[df_feeds['place_seq'] == place_seq].iloc[0]['thumbnail'])
                    })
                    if len(result_places[i]) >= 20:
                        break

    moods = []
    
    for i in range(len(user_moods_idx)):
        dict = {}
        dict.setdefault("mood",user_moods_str[i])
        dict.setdefault("moodPlaces", result_places[i])
        moods.append(dict)

    return moods