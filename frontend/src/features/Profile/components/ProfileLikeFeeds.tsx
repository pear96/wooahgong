import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import ProfileApi from 'common/api/ProfileApi';
import {
  ProfileFeedsOrPlacesGrid,
  FeedOrPlaceWrapper,
  FeedOrPlaceTwoModes,
  FeedOrPlaceImageWrapper,
  HoveredFeedOrPlaceWrapper,
} from 'features/Profile/styles/StyledFeedsAndPlaces';
import { useNavigate, useParams } from 'react-router-dom';

function ProfileLikeFeeds() {
  // const { feeds } = useSelector((state: ReducerType) => state.profileFeed);
  const { nickname } = useParams<string>();
  const [feeds, setFeeds] = useState<{ feedSeq: number; imageUrl: string }[]>();
  const navigate = useNavigate();

  const getLikedFeedsApi = async () => {
    if (nickname !== undefined) {
      const result = await ProfileApi.getLikedFeeds(nickname);
      if (result.status === 200) {
        setFeeds([...result.data]);
      } else {
        navigate('/not-found');
      }
    }
  };
  useEffect(()=>{
    getLikedFeedsApi();
  },[])


  return (
    <ProfileFeedsOrPlacesGrid>
      {feeds !== undefined ? (
        feeds.map((feed) => (
          <FeedOrPlaceWrapper>
            <FeedOrPlaceTwoModes>
              <FeedOrPlaceImageWrapper>
                <img src={feed.imageUrl} alt="" style={{ width: '100%', height: '100%' }} />
              </FeedOrPlaceImageWrapper>
              <HoveredFeedOrPlaceWrapper>something</HoveredFeedOrPlaceWrapper>
            </FeedOrPlaceTwoModes>
          </FeedOrPlaceWrapper>
        ))
      ) : (<>loading</>)}
      
    </ProfileFeedsOrPlacesGrid>
  );
}

export default ProfileLikeFeeds;
