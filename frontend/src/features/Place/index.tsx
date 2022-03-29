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
  lat: 37.50133339807373,
  lng: 127.03966018181657,
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
  // const [placeImageUrl, setPlaceImageUrl] = useState<string>('');
  // const [name, setName] = useState<string>('');
  // const [address, setAddress] = useState<string>('');
  // const [avgRatings, setAvgRatings] = useState<number>();
  // const [isWished, setWished] = useState<boolean>();
  // const [lat, setLat] = useState<number>();
  // const [lng, setLng] = useState<number>();
  // const [feeds, setFeeds] = useState<any>(null);
  const [place, setPlace] = useState<any>();
  const { placeSeq } = useParams();

  useEffect(() => {
    const readPlaceApi = async () => {
      if (placeSeq !== undefined) {
        const result = await PlaceApi.readPlace(placeSeq);
        if (result.status === 200) {
          console.log(result);

          setPlace(result.data);
        }
      }
    };

    readPlaceApi();
  }, []);

  return (
    <div>
      <div style={{ marginLeft: 'auto', marginRight: 'auto', maxWidth: '1024px' }}>
        <PlaceThumbnail thumbnail={place.placeImageUrl} />
        <PlaceInfo
          thumbnail={place.placeImageUrl}
          name={place.name}
          address={place.address}
          avgRatings={place.avgRatings}
          lat={place.latitude}
          lng={place.longitude}
          isWished={place.isWished}
        />
        {/* <PlaceFeeds feeds={feeds} sortFeeds={criterion => handleSortFeeds(criterion)}/>
         */}
        <PlaceFeeds placeFeeds={place.feeds} />
      </div>
    </div>
  );
}

export default PlacePage;
