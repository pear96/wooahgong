import React, { useEffect, useState } from 'react';
import { useParams, useNavigate} from 'react-router-dom';
import { Row, Col, Rate } from 'antd';
import { BsBookmarkHeartFill, BsBookmarkHeart, BsPinMap } from 'react-icons/bs';
import { MdOutlineCreate } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import {
  PlaceInfoWrapper,
  PlaceName,
  AverageRatings,
  Address,
  Icons,
  Icon,
} from 'features/Place/styles/StyledPlaceInfo';
import PlaceApi from 'common/api/PlaceApi';
import KakaoShareIcon from './KakaoShareIcon';


type MyProps = {
  placeInfo : {
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
    placeImageUrl : string}
}
function PlaceInfo({placeInfo}: MyProps) {
  const { placeSeq } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isBookmarked, setBookmarked] = useState<boolean>(placeInfo.isWished);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://developers.kakao.com/sdk/js/kakao.js';
    script.async = true;

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const toggleBookmark = async () => {
    if (placeSeq !== undefined) {
      const result = await PlaceApi.bookmarkPlace(placeSeq);
      if (result.status === 200) setBookmarked(result.isWished);

    }
  };

  const goCreateFeed = () => {
    navigate('/report', {state : {placeSeq, flag : true, name : placeInfo.name, address : placeInfo.address}});
  };

  const viewOnMap = () => {
    // navigate(`/map?lat=${lat}/lng='${lng}`);
    const sendData = {
      name : placeInfo.name,

    }
    navigate(`/map`, { state: { placeSeq , ...placeInfo } });
  };

  return (
    <PlaceInfoWrapper>
      <Row style={{
        // justifyContent : "center"
        textAlign : "center",
        // alignItems : "center"
      }}>
        <Col xs={24} md={12}>
          <PlaceName style={{marginBottom : 0}}>{placeInfo.name}</PlaceName>
        </Col>
        <Col style={{
          display : "flex",
          justifyContent : "center",
          alignItems : "center"
        }} xs={24} md={12}>
          <Rate allowHalf disabled defaultValue={Math.round(placeInfo.avgRatings * 2) / 2} style={{ color: 'rgba(144, 136, 243, 1)' }} />
          <AverageRatings style={{marginLeft : 10}}>{placeInfo.avgRatings.toFixed(1)}</AverageRatings>
        </Col>
        <Col xs={24} md={12}>
          <Address>{placeInfo.address}</Address>
        </Col>
        <Icons xs={24} md={12}>
          <Icon style={{ color: 'palevioletred' }} onClick={toggleBookmark}>
            {isBookmarked ? <BsBookmarkHeartFill /> : <BsBookmarkHeart />}
          </Icon>
          <Icon>
            <MdOutlineCreate onClick={goCreateFeed} />
          </Icon>
          <Icon>
            <KakaoShareIcon placeSeq={placeSeq} placeName={placeInfo.name} placeImg={placeInfo.placeImageUrl} />
            {/* <BsShare /> */}
          </Icon>
          <Icon>
            <BsPinMap onClick={viewOnMap} />
          </Icon>
        </Icons>
      </Row>
    </PlaceInfoWrapper>
  );
}

export default PlaceInfo;
