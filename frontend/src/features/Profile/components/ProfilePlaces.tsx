import React, { useEffect, useState } from 'react';
import ProfileApi from 'common/api/ProfileApi';
import {
  ProfileFeedsOrPlacesGrid,
  FeedOrPlaceWrapper,
  FeedOrPlaceTwoModes,
  FeedOrPlaceImageWrapper,
  HoveredFeedOrPlaceWrapper,
} from 'features/Profile/styles/StyledFeedsAndPlaces';
import { useNavigate, useParams } from 'react-router-dom';

function ProfilePlaces() {
  // const { places } = useSelector((state: ReducerType) => state.profilePlace);
  console.log("??????????");
  const { nickname } = useParams<string>();
  const [places, setPlaces] = useState<{ placeSeq: number; thumbnail: string }[]>();
  const navigate = useNavigate();
  const getWishedFeedsApi = async () => {
    if (nickname !== undefined) {
      const result = await ProfileApi.getWishedFeeds(nickname);

      if (result.status === 200) {
        console.log(result.data);
        setPlaces([...result.data]);
      } else {
        navigate('/not-found');
      }
    }
  };
  useEffect(()=>{
    getWishedFeedsApi();
  
  }, [])
  
  return (
    <ProfileFeedsOrPlacesGrid>
      {places !== undefined ? (
        places.map((place) => (
          <FeedOrPlaceWrapper>
            <FeedOrPlaceTwoModes>
              <FeedOrPlaceImageWrapper>
                <img src={place.thumbnail} alt="" style={{ width: '100%', height: '100%' }} />
              </FeedOrPlaceImageWrapper>
              <HoveredFeedOrPlaceWrapper>something</HoveredFeedOrPlaceWrapper>
            </FeedOrPlaceTwoModes>
          </FeedOrPlaceWrapper>
        ))
      ): (<>loading</>)}
    </ProfileFeedsOrPlacesGrid>
  );
}

export default ProfilePlaces;
