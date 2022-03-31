import React, { useState,useEffect } from 'react';
import { Tabs } from 'antd';
import { BsGrid3X3, BsHeart, BsBookmarkHeart } from 'react-icons/bs';
import { FeedsAndPlacesWrapper } from '../styles/StyledFeedsAndPlaces';
import ProfileFeeds from './ProfileFeeds';
import ProfileLikeFeeds from './ProfileLikeFeeds';
import ProfilePlaces from './ProfilePlaces';
// import { setFeeds } from '../reducers/profileFeedReducer';

const { TabPane } = Tabs;

function FeedsAndPlaces() {

  const setFeedsOrPlaces = (key: string) => {
    switch (key) {
      case '1':
        // getMyFeedsApi();
        // dispatch(setFeeds(dummyFeeds));
        break;
      case '2':
        // getLikedFeedsApi();
        // dispatch(setFeeds(dummyFeeds));
        break;
      case '3':
        // getWishedFeedsApi();
        // dispatch(setPlaces(dummyPlaces));
        break;
      default:
        break;
    }
  };
  // useEffect(()=>{
  //   getMyFeedsApi();
  // }, []);
  return (
    <FeedsAndPlacesWrapper>
      <Tabs defaultActiveKey="1" centered onChange={setFeedsOrPlaces}>
        <TabPane
          tab={
            <span>
              <BsGrid3X3 />
              &nbsp;올린 피드
            </span>
          }
          key="1"
        >
          <ProfileFeeds />
        </TabPane>
        <TabPane
          tab={
            <span>
              <BsHeart />
              &nbsp;좋아한 피드
            </span>
          }
          key="2"
        >
          <ProfileLikeFeeds/>
        </TabPane>
        <TabPane
          tab={
            <span>
              <BsBookmarkHeart />
              &nbsp; 찜한 장소
            </span>
          }
          key="3"
        >
          <ProfilePlaces />
        </TabPane>
      </Tabs>
    </FeedsAndPlacesWrapper>
  );
}

export default FeedsAndPlaces;
