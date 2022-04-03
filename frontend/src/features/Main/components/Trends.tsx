/* eslint-disable jsx-a11y/alt-text */
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

import './styles.css';

import { Pagination } from 'swiper';

function Trends() {
  const images = [
    'https://picsum.photos/200',
    'https://picsum.photos/201',
    'https://picsum.photos/202',
    'https://picsum.photos/203',
    'https://picsum.photos/204',
  ];
  return (
    <>
      <h2>현재 인기 있는 장소들</h2>;
      <Swiper
        slidesPerView={2}
        spaceBetween={30}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        className="mySwiper"
      >
        {images.map((props: any) => {
          console.log(props);
          return (
            <SwiperSlide key={props}>
              <img src={props} />
            </SwiperSlide>
          );
        })}
      </Swiper>
      <h2>현재 인기 있는 장소들</h2>;
      <Swiper
        slidesPerView={2}
        spaceBetween={30}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        className="mySwiper"
      >
        {images.map((props: any) => {
          console.log(props);
          return (
            <SwiperSlide key={props}>
              <img src={props} />
            </SwiperSlide>
          );
        })}
      </Swiper>
      <h2>현재 인기 있는 장소들</h2>;
      <Swiper
        slidesPerView={2}
        spaceBetween={30}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        className="mySwiper"
      >
        {images.map((props: any) => {
          console.log(props);
          return (
            <SwiperSlide key={props}>
              <img src={props} />
            </SwiperSlide>
          );
        })}
      </Swiper>
      <h2>현재 인기 있는 장소들</h2>;
      <Swiper
        slidesPerView={2}
        spaceBetween={30}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        className="mySwiper"
      >
        {images.map((props: any) => {
          console.log(props);
          return (
            <SwiperSlide key={props}>
              <img src={props} />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </>
  );
}

export default Trends;
