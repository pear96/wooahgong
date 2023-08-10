/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/alt-text */
import { Swiper, SwiperSlide } from 'swiper/react';
import { Spin } from 'antd';
import { useAppSelector } from 'app/store';
import MainApi from 'common/api/MainApi';
import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

import './styles.css';

import { FreeMode } from 'swiper';

import styled from 'styled-components';

const ImgWrapper = styled.img`
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

function Trends() {
  const { getTrendplace } = MainApi;
  const navigate = useNavigate();
  const { Changeradius } = useAppSelector((state) => state.main);
  const [popular, setPopular] = useState([]);
  const [age, setAge] = useState([]);
  const [mbti, setMbti] = useState([]);
  const [mood, setMood] = useState([]);
  // const [mood1, setMood1] = useState([]);
  // const [mood2, setMood2] = useState([]);
  const [mbtiName, setMbtiname] = useState('');
  const [ageName, setAgename] = useState('');
  const [genderName, setGendername] = useState('');
  const [moodname, setMoodName] = useState<string>("");
  const [isOk, setIsOk] = useState<boolean>(false);

  const [lat, setLat] = useState<number>();
  const [lng, setLng] = useState<number>();

  const onClickGotoPlace = useCallback(
    (placeSeq) => () => {
      
      navigate(`/place/${placeSeq}`);
    },
    [],
  );

  const getLocation = async () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setLat(position.coords.latitude);
        setLng(position.coords.longitude);
      });
    }
  };

  async function getAndTrendplace() {
    // await getLocation();
    const body = { searchRadius: Changeradius, lat, lng };
    if (lat !== undefined && lng !== undefined) {
      const result = await getTrendplace(body);
      
      setPopular(result.data.trendyPlaces);
      setAge(result.data.recByAgeGender.places);
      setMbti(result.data.recByMBTI.places);
      // setMood1(result.data.recByMoods.mood1Places);
      // setMood2(result.data.recByMoods.mood2Places);
      setMbtiname(result.data.recByMBTI.MBTI);
      // setMood1name(result.data.recByMoods.mood1);
      // setMood2name(result.data.recByMoods.mood2);
      setMood(result.data.recByMoods);
      setAgename(result.data.recByAgeGender.ageGroup);
      console.log(window.localStorage.getItem('gender'));
      if (window.localStorage.getItem('gender') === 'true') {
        setGendername('남자');
      } else {
        setGendername('여자');
      }
    }
  }

  // 
  // 
  // 
  // 
  // 
  // 
  const handleMoodPlace = (moodPlace : any, name : string) => {
    if(moodPlace.length > 0){
        return (
          <Swiper
            slidesPerView={2}
            spaceBetween={10}
            freeMode
            pagination={{
              clickable: true,
            }}
            modules = {[FreeMode]}
            style = {{
              width : "85%",
              height : "140px"
            }}
          >
            {moodPlace?.map((props: any, i : number) => {
              const idx = i;
              return (
                <SwiperSlide key={idx}>
                  <ImgWrapper style={{
                    width : 140,
                    height : 140
                  }} onClick={onClickGotoPlace(props.placeSeq)} src={props.placeImageUrl} />
                </SwiperSlide>
              );
            })}
          </Swiper>
        )
    }
    return (
      <div
      style={{
        fontFamily: 'NotoSansKR',
        fontSize: '20px',
        fontWeight: 'bold',
        width: '85%',
        height: '150px',
        // textAlign: 'center',
        display: 'flex',
        justifyContent : "center",
        alignItems : "center",
        border : "2px dashed black",
        borderRadius : 10,
        margin : "0px auto"
      }}
      >
        추천 장소가 없습니다😥
      </div>
    )
  //   
  }
  useEffect(() => {
    getAndTrendplace();
  }, [lat, lng, Changeradius]);

  useEffect(() => {
    getLocation();
  }, []);

  return (
    <>
      <h2 style={{ fontFamily: 'NotoSansKR', fontWeight: 'bold', margin : "10px 10px" }}>현재 인기 있는 장소들🔥</h2>
      {popular.length > 0 ? (
        <Swiper
          slidesPerView={2}
          spaceBetween={10}
          freeMode
          pagination={{
            clickable: true,
          }}
          modules = {[FreeMode]}
          style = {{
            width : "85%",
            height : "140px"
          }}
        >
          {popular?.map((props: any) => {
            return (
              <SwiperSlide key={props.placeSeq}>
                <ImgWrapper style={{
                  width : 140,
                  height : 140
                }} onClick={onClickGotoPlace(props.placeSeq)} src={props.placeImageUrl} />
              </SwiperSlide>
            );
          })}
        </Swiper>
      ) : (
        <div
        style={{
          fontFamily: 'NotoSansKR',
          fontSize: '20px',
          fontWeight: 'bold',
          width: '85%',
          height: '150px',
          display: 'flex',
          justifyContent : "center",
          alignItems : "center",
          border : "2px dashed black",
          borderRadius : 10,
          margin : "0px auto"
        }}
        >
          추천 장소가 없습니다😥
        </div>
      )}
      <h2 style={{ fontFamily: 'NotoSansKR', fontWeight: 'bold', margin : "10px 10px"  }}>
        {ageName}대 {genderName}가 좋아하는 장소👍
      </h2>
      {age.length > 0 ? (
        <Swiper
          slidesPerView={2}
          spaceBetween={10}
          freeMode
          pagination={{
            clickable: true,
          }}
          modules = {[FreeMode]}
          style = {{
            width : "85%",
            height : "140px"
          }}
        >
          {age?.map((props: any) => {
            return (
              <SwiperSlide key={props.placeSeq}>
                <ImgWrapper style={{
                  width : 140,
                  height : 140
                }} onClick={onClickGotoPlace(props.placeSeq)} src={props.placeImageUrl} />
              </SwiperSlide>
            );
          })}
        </Swiper>
      ) : (
        <div
        style={{
          fontFamily: 'NotoSansKR',
          fontSize: '20px',
          fontWeight: 'bold',
          width: '85%',
          height: '150px',
          // textAlign: 'center',
          display: 'flex',
          justifyContent : "center",
          alignItems : "center",
          border : "2px dashed black",
          borderRadius : 10,
          margin : "0px auto"
        }}
        >
          추천 장소가 없습니다😥
        </div>
      )}
      <h2 style={{ fontFamily: 'NotoSansKR', fontWeight: 'bold', margin : "10px 10px"  }}>{mbtiName}가 좋아하는 장소💜</h2>
      {mbti.length > 0 ? (
        <Swiper
          slidesPerView={2}
          spaceBetween={10}
          freeMode
          pagination={{
            clickable: true,
          }}
          modules = {[FreeMode]}
          style = {{
            width : "85%",
            height : "140px"
          }}
        >
          {mbti?.map((props: any) => {
            return (
              <SwiperSlide key={props.placeSeq}>
                <ImgWrapper style={{
                  width : 140,
                  height : 140
                }} onClick={onClickGotoPlace(props.placeSeq)} src={props.placeImageUrl} />
              </SwiperSlide>
            );
          })}
        </Swiper>
      ) : (
        <div
          style={{
            fontFamily: 'NotoSansKR',
            fontSize: '20px',
            fontWeight: 'bold',
            width: '85%',
            height: '150px',
            display: 'flex',
            justifyContent : "center",
            alignItems : "center",
            border : "2px dashed black",
            borderRadius : 10,
            margin : "0px auto"
          }}
        >
          추천 장소가 없습니다😥
        </div>
      )}
      {mood.map((v : {mood : string, moodPlaces : any}, i : number)=>{
        const idx = i;
        return(
          <>
          <h2 key={idx} style={{ fontFamily: 'NotoSansKR', fontWeight: 'bold', margin : "10px 10px"  }}>{v.mood} 인기 장소🎈</h2>
            {handleMoodPlace(v.moodPlaces, v.mood)}
          </>
        )
      })}
      
    </>
  );
}

export default Trends;
