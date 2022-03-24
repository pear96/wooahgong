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

function ProfileFeeds() {
  const { feeds } = useSelector((state: ReducerType) => state.profileFeed);

  return (
    // <ProfileFeedsWrapper>
    //   <ProfileFeedsGrid>
    //     {feeds.length > 0
    //       ? feeds.map((feed) => (
    //           <FeedWrapper key={feed.feedSeq}>
    //             <img src={feed.imageUrl} alt="feed caption" />
    //             {/* <HoveredFeedWrapper>
    //             <p>33</p>
    //           </HoveredFeedWrapper> */}
    //           </FeedWrapper>
    //         ))
    //       : null}
    //   </ProfileFeedsGrid>
    // </ProfileFeedsWrapper>

    <ProfileFeedsOrPlacesGrid>
      {feeds.map((feed) => (
        <FeedOrPlaceWrapper>
          <FeedOrPlaceTwoModes>
            <FeedOrPlaceImageWrapper>
              <img src={feed.imageUrl} alt="" style={{ width: '100%', height: '100%' }} />
            </FeedOrPlaceImageWrapper>
            <HoveredFeedOrPlaceWrapper>something</HoveredFeedOrPlaceWrapper>
          </FeedOrPlaceTwoModes>
        </FeedOrPlaceWrapper>
      ))}
    </ProfileFeedsOrPlacesGrid>
  );
}

// const ProfileFeedsWrapper = styled.div`
//   padding-top: 1rem;
//   margin-top: 3rem;
//   /* height: 4rem; */
//   border-top-width: 1px;
// `;
// const ProfileFeedsGrid = styled.div`
//   display: grid;
//   margin-top: 1rem;
//   margin-bottom: 3rem;
//   grid-template-columns: repeat(3, minmax(0, 1fr));
//   gap: 2rem;

//   /* display: grid;
//   grid-template-columns: repeat(3, minmax(0, 1fr));
//   gap: 1.25rem; */
// `;
// const FeedWrapper = styled.div`
//   position: relative;

//   /* overflow: hidden;
//   height: 16rem; */
// `;
// const HoveredFeedWrapper = styled.div`
//   position: absolute;
//   bottom: 0;
//   left: 0;
//   z-index: 10;
//   background-color: #e5e7eb;
//   justify-content: space-evenly;
//   align-items: center;
//   width: 100%;
//   height: 100%;

//   &:hover {
//     display: flex;
//   }
// `;

export default ProfileFeeds;
