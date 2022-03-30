/* eslint-disable jsx-a11y/alt-text */
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

import './styles.css';

import { Pagination } from 'swiper';

function Feedimages({ images }: any) {
  return (
    <Swiper
      pagination={{
        dynamicBullets: true,
      }}
      modules={[Pagination]}
      className="mySwiper"
    >
      {images.map((props: any) => {
        return (
          <SwiperSlide key={props}>
            <img src={props} />
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
}

export default Feedimages;
