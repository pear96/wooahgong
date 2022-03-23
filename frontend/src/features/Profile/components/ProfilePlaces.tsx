import { ReducerType } from 'app/rootReducer';
import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import {
  ProfileFeedsOrPlacesGrid,
  FeedOrPlaceWrapper,
  FeedOrPlaceTwoModes,
  FeedOrPlaceImageWrapper,
  HoveredFeedOrPlaceWrapper,
} from 'features/Profile/styles/StyledFeedsAndPlaces';
import { profilePlaces } from '../reducers/profilePlaceReducer';

function ProfilePlaces() {
  const { places } = useSelector((state: ReducerType) => state.profilePlace);

  return (
    <ProfileFeedsOrPlacesGrid>
      {places.map((place) => (
        <FeedOrPlaceWrapper>
          <FeedOrPlaceTwoModes>
            <FeedOrPlaceImageWrapper>
              <img src={place.thumbnail} alt="" style={{ width: '100%', height: '100%' }} />
            </FeedOrPlaceImageWrapper>
            <HoveredFeedOrPlaceWrapper>something</HoveredFeedOrPlaceWrapper>
          </FeedOrPlaceTwoModes>
        </FeedOrPlaceWrapper>
      ))}
    </ProfileFeedsOrPlacesGrid>
  );
}

export default ProfilePlaces;
