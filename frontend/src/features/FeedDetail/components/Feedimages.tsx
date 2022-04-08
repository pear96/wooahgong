/* eslint-disable jsx-a11y/alt-text */
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

import './styles.css';

import { Pagination } from 'swiper';
import styled from 'styled-components';

const ImgWrapper = styled.img`
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

function Feedimages({ images }: any) {
  return (
    <Swiper
      pagination={{
        dynamicBullets: true,
      }}
      style={{
        width : 300,
        height : 300
      }}
      modules={[Pagination]}
      className="mySwiper"
    >
      {images.map((props: any) => {
        return (
          <SwiperSlide style={{
            width : 300,
            height : 300
          }} key={props}>
            <ImgWrapper src={props} />
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
}

export default Feedimages;
