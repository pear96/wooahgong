import React, { useState, useEffect } from 'react';
import { Tabs } from 'antd';
import { BsGrid3X3, BsHeart, BsBookmarkHeart } from 'react-icons/bs';
import { FeedsAndPlacesWrapper } from '../styles/StyledFeedsAndPlaces';
import ProfileFeeds from './ProfileFeeds';
import ProfileLikeFeeds from './ProfileLikeFeeds';
import ProfilePlaces from './ProfilePlaces';
// import { setFeeds } from '../reducers/profileFeedReducer';

const { TabPane } = Tabs;

type MyProps ={
  nickname : string
}

function FeedsAndPlaces({nickname} : MyProps) {
  const setFeedsOrPlaces = (key: string) => {
    switch (key) {
      case '1':
        break;
      case '2':
        break;
      case '3':
        break;
      default:
        break;
    }
  };
  return (
    <FeedsAndPlacesWrapper>
      <Tabs defaultActiveKey="1" centered onChange={setFeedsOrPlaces}>
        <TabPane
          tab={
            <span style={{
              display: "flex",
              alignItems : "center"
            }}>
              <BsGrid3X3 />
              &nbsp;올린 피드
            </span>
          }
          key="1"
        >
          <ProfileFeeds nickname={nickname}/>
        </TabPane>
        <TabPane
          tab={
            <span style={{
              display: "flex",
              alignItems : "center"
            }}>
              <BsHeart />
              &nbsp;좋아한 피드
            </span>
          }
          key="2"
        >
          <ProfileLikeFeeds nickname={nickname}/>
        </TabPane>
        <TabPane
          tab={
            <span style={{
              display: "flex",
              alignItems : "center"
            }}>
              <BsBookmarkHeart />
              &nbsp; 찜한 장소
            </span>
          }
          key="3"
        >
          <ProfilePlaces nickname={nickname}/>
        </TabPane>
      </Tabs>
    </FeedsAndPlacesWrapper>
  );
}

export default FeedsAndPlaces;
