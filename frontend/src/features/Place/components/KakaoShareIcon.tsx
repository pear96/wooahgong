import React, { useEffect } from 'react';
import { BsShare } from 'react-icons/bs';

declare global {
  interface Window {
    Kakao: any;
  }
}
function KakaoShareIcon({ placeSeq, placeName, placeImg }: any) {
  useEffect(() => {
    // kakao sdk script이 정상적으로 불러와졌으면 window.Kakao로 접근이 가능합니다
    // if (window.Kakao) {
    //   const kakao = window.Kakao;
    //   // 중복 initialization 방지
    //   if (!kakao.isInitialized()) {
    //     // 두번째 step 에서 가져온 javascript key 를 이용하여 initialize
    //     kakao.init('123f4cf5d9bd34c3496f145b3c88d778');
    //     // kakao.Link.sendCustom({
    //     //   templateId: 73929,
    //     //   templateArgs: {
    //     //     place_name: placeName,
    //     //     place_seq: placeSeq,
    //     //     place_img: placeImg,
    //     //   },
    //     // });
    //   }
    // kakao.Link.createDefaultButton({
    //   // Render 부분 id=kakao-link-btn 을 찾아 그부분에 렌더링을 합니다
    //   container: '#kakao-link-btn',
    //   objectType: 'feed',
    //   content: {
    //     title: '타이틀',
    //     description: '#리액트 #카카오 #공유버튼',
    //     imageUrl: 'https://picsum.photos/300/300', // i.e. process.env.FETCH_URL + '/logo.png'
    //     link: {
    //       mobileWebUrl: window.location.href,
    //       webUrl: window.location.href,
    //     },
    //   },
    //   // social: {
    //   //   likeCount: 77,
    //   //   commentCount: 55,
    //   //   sharedCount: 333,
    //   // },
    //   buttons: [
    //     {
    //       title: '웹으로 보기',
    //       link: {
    //         mobileWebUrl: window.location.href,
    //         webUrl: window.location.href,
    //       },
    //     },
    //     {
    //       title: '앱으로 보기',
    //       link: {
    //         mobileWebUrl: window.location.href,
    //         webUrl: window.location.href,
    //       },
    //     },
    //   ],
    // });
  });

  const kakaoShare = () => {
    console.log('카카오톡 공유하기');

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
