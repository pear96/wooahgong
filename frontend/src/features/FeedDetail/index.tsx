import React from 'react';
import Feedcontent from './components/Feedcontent';
import Feedfooter from './components/Feedfooter';
import Feedimages from './components/Feedimages';
import Feedheader from './components/Feedheader';

const dummydata = [
  {
    feedSeq: 1,
    userSeq: 1,
    userImage: 'https://joeschmoe.io/api/v1/random',
    nickname: '누누',
    placeSeq: 1,
    placeName: '명동성당',
    address: '서울 특별시 중구 명동길 74',
    images: ['https://picsum.photos/640/260', 'https://picsum.photos/640/300', 'https://picsum.photos/640/340'],
    content:
      '명동의 유명한 대성당 명동성당🏰 교회로도 유명하고 사진찍으로도 많이 관광객 뿐만 아니라 남녀노소에게 인기많은 명소 중 하나😍😍 이곳에서 결혼도 많이하는 걸로 유명한 곳🖤 엄청 넓고 푸릇푸릇한 나무들과 성당들이 이쁜 이곳💚 풍경과 같이 사진찍으면 그것이 바로 인생샷✔✔',
    amIOwner: true,
    ratings: 3,
    createDate: '2021.03.29',
    moods: ['빈티지', '감성적인'],
    amILike: true,
    likesCnt: 75,
    commentsCnt: 44,
  },
  // {
  //   feedSeq: 2,
  //   userSeq: 1,
  //   userImage: 'https://joeschmoe.io/api/v1/random',
  //   nickname: '누누',
  //   placeSeq: 1,
  //   plcaeName: '명동성당',
  //   address: '서울 특별시 중구 명동길 74',
  //   images: ['https://picsum.photos/640/260', 'https://picsum.photos/640/300', 'https://picsum.photos/640/340'],
  //   content:
  //     '명동의 유명한 대성당 명동성당🏰 교회로도 유명하고 사진찍으로도 많이 관광객 뿐만 아니라 남녀노소에게 인기많은 명소 중 하나😍😍 이곳에서 결혼도 많이하는 걸로 유명한 곳🖤 엄청 넓고 푸릇푸릇한 나무들과 성당들이 이쁜 이곳💚 풍경과 같이 사진찍으면 그것이 바로 인생샷✔✔',
  //   amIOwner: true,
  //   ratings: 3,
  //   createDate: '2021.03.29',
  //   moods: ['빈티지', '감성적인'],
  //   amILike: true,
  //   likesCnt: 75,
  //   commentsCnt: 44,
  // },
];

function FeedDetail() {
  // 밑에 4개 묶어서 인피니티 스크롤 구현
  return (
    <>
      {dummydata.map((props: any) => {
        return (
          <div key={props.feedSeq} style={{ display: 'flex', flexDirection: 'column' }}>
            <div>
              <Feedheader
                nickname={props.nickname}
                userImage={props.userImage}
                feedSeq={props.feedSeq}
                placeName={props.placeName}
                address={props.address}
              />
            </div>
            <div>
              <Feedimages images={props.images} />
            </div>
            <div>
              <Feedcontent />
            </div>
            <div>
              <Feedfooter />
            </div>
          </div>
        );
      })}
    </>
  );
}

export default FeedDetail;
