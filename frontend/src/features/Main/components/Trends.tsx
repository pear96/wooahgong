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
  const [mood1, setMood1] = useState([]);
  const [mood2, setMood2] = useState([]);
  const [mbtiName, setMbtiname] = useState('');
  const [ageName, setAgename] = useState('');
  const [genderName, setGendername] = useState('');
  const [mood1Name, setMood1name] = useState('');
  const [mood2Name, setMood2name] = useState('');

  const [lat, setLat] = useState<number>();
  const [lng, setLng] = useState<number>();

  const onClickGotoPlace = useCallback(
    (placeSeq) => () => {
      console.log(placeSeq);
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
      console.log(result);
      setPopular(result.data.trendyPlaces);
      setAge(result.data.recByAgeGender.places);
      setMbti(result.data.recByMBTI.places);
      setMood1(result.data.recByMoods.mood1Places);
      setMood2(result.data.recByMoods.mood2Places);
      setMbtiname(result.data.recByMBTI.MBTI);
      setMood1name(result.data.recByMoods.mood1);
      setMood2name(result.data.recByMoods.mood2);
      setAgename(result.data.recByAgeGender.ageGroup);
      console.log(window.localStorage.getItem('gender'));
      if (window.localStorage.getItem('gender') === 'true') {
        setGendername('남자');
      } else {
        setGendername('여자');
      }
    }
  }

  // console.log(popular, '인기 있는 장소');
  // console.log(age, '나이');
  // console.log(mbti, 'mbti');
  // console.log(mood1, '분위기1');
  // console.log(mood2, '분위기2');
  // console.log(mood2Name);

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
      <h2 style={{ fontFamily: 'NotoSansKR', fontWeight: 'bold', margin : "10px 10px"  }}>{mood1Name} 인기 장소🎈</h2>
      {mood1.length > 0 ? (
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
          {mood1?.map((props: any) => {
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
      <h2 style={{ fontFamily: 'NotoSansKR', fontWeight: 'bold', margin : "10px 10px" }}>{mood2Name} 인기 장소🎁</h2>
      {mood2.length > 0 ? (
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
            height : "140px",
            marginBottom : 10
          }}
        >
          {mood2?.map((props: any) => {
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
          margin : "0px auto",
          marginBottom : 10
          
        }}
        >
          추천 장소가 없습니다😥
        </div>
      )}
    </>
  );
}

export default Trends;
