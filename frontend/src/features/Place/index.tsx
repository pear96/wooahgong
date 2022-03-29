import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import PlaceApi from 'common/api/PlaceApi';
import PlaceThumbnail from './components/PlaceThumbnail';
import PlaceInfo from './components/PlaceInfo';
import PlaceFeeds from './components/PlaceFeeds';

const dummyPlace = {
  // 피드 0번 인덱스의 사진을 썸네일 활용
  placeImageUrl: 'https://picsum.photos/640/320',
  name: '장소이름',
  address: '서울특별시 어쩌구 저쩌구',
  avgRatings: 3.64, // 피드들의 평균 평점
  isWished: true,
  feeds: [
    {
      feedSeq: 1,
      thumbnail: 'https://picsum.photos/640/260',
    },
    {
      feedSeq: 2,
      thumbnail: 'https://picsum.photos/640/300',
    },
    {
      feedSeq: 3,
      thumbnail: 'https://picsum.photos/640/340',
    },
    {
      feedSeq: 4,
      thumbnail: 'https://picsum.photos/640/380',
    },
  ],
};

function PlacePage() {
  const [feeds, setFeeds] = useState<any>(dummyPlace.feeds);
  const { placeSeq } = useParams();

  useEffect(() => {
    if (placeSeq !== undefined) {
      const result = PlaceApi.readPlace(placeSeq);
      console.log(result);
    }
  }, []);

  return (
    <div>
      <div style={{ marginLeft: 'auto', marginRight: 'auto', maxWidth: '1024px' }}>
        <PlaceThumbnail thumbnail={dummyPlace.placeImageUrl} />
        <PlaceInfo
          thumbnail={dummyPlace.placeImageUrl}
          name={dummyPlace.name}
          address={dummyPlace.address}
          avgRatings={dummyPlace.avgRatings}
          isWished={dummyPlace.isWished}
        />
        {/* <PlaceFeeds feeds={feeds} sortFeeds={criterion => handleSortFeeds(criterion)}/>
         */}
        <PlaceFeeds />
      </div>
    </div>
  );
}

export default PlacePage;
