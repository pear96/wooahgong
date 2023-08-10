import React, { useEffect } from 'react';
import { BsShare } from 'react-icons/bs';

declare global {
  interface Window {
    Kakao: any;
  }
}
function KakaoShareIcon({ placeSeq, placeName, placeImg }: any) {
  const kakaoShare = () => {
    

    if (window.Kakao) {
      const kakao = window.Kakao;

      // 중복 initialization 방지
      if (!kakao.isInitialized()) {
        // 두번째 step 에서 가져온 javascript key 를 이용하여 initialize
        kakao.init('123f4cf5d9bd34c3496f145b3c88d778');
        kakao.Link.sendCustom({
          templateId: 73929,
          templateArgs: {
            place_name: placeName,
            place_seq: placeSeq,
            place_img: placeImg,
          },
        });
      }
    }
  };

  return <BsShare onClick={kakaoShare} />;
}

export default KakaoShareIcon;
