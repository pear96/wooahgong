import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import PlaceApi from 'common/api/PlaceApi';
import PlaceThumbnail from './components/PlaceThumbnail';
import PlaceInfo from './components/PlaceInfo';
import PlaceFeeds from './components/PlaceFeeds';

function PlacePage() {
  // const [placeImageUrl, setPlaceImageUrl] = useState<string>('');
  // const [name, setName] = useState<string>('');
  // const [address, setAddress] = useState<string>('');
  // const [avgRatings, setAvgRatings] = useState<number>();
  // const [isWished, setWished] = useState<boolean>();
  // const [lat, setLat] = useState<number>();
  // const [lng, setLng] = useState<number>();
  // const [feeds, setFeeds] = useState<any>(null);
  const [place, setPlace] = useState<{
    address : string, 
    avgRatings : number, 
    feeds : {
      feedSeq : number, 
      thumbnail : string
    }, 
    isWished : boolean, 
    latitude : number, 
    longitude : number, 
    name : string, 
    placeImageUrl : string}>();
  const { placeSeq } = useParams();
  const readPlaceApi = async () => {
    if (placeSeq !== undefined) {
      const result = await PlaceApi.readPlace(placeSeq);
      console.log(result)
      if (result?.status === 200) {
        console.log(result);

        setPlace(result.data);
      }
    }
  };
  
  useEffect(() => {
    readPlaceApi();
  },[]);

  return (
    <div>
      <div style={{ marginLeft: 'auto', marginRight: 'auto', maxWidth: '1024px' }}>
        {place === undefined ? (<>로딩중</>) 
        : (
          <>
            <PlaceThumbnail thumbnail={place.placeImageUrl} />
            <PlaceInfo placeInfo={place}
            />
            {/* <PlaceFeeds feeds={feeds} sortFeeds={criterion => handleSortFeeds(criterion)}/>
            */}
            <PlaceFeeds placeFeeds={place.feeds} />
        </>
        )}
      </div>
    </div>
  );
}

export default PlacePage;
