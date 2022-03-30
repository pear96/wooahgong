import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Row, Col, Avatar, Image } from 'antd';
import ProfileApi from 'common/api/ProfileApi';
import {
  UserProfileWrapper,
  ProfilePictureWrapper,
  ProfilePicture,
  ProfileRightWrapper,
  ProfileRight,
  ProfileNickname,
  ProfileBottomWrapper,
  ProfileMBTI,
  ProfileMoods,
  ProfileEditButton,
  ProfileEditButtonWrapper,
} from '../styles/StyledUserProfile';
import ProfileStats from './ProfileStats';

const picture = 'https://joeschmoe.io/api/v1/random';
const mbti = 'ISFJ';

interface UserPropsTypes {
  owner: boolean;
  feedsCnt: number;
  likedCnt: number;
  bookmarkedCnt: number;
  moods: string[];
}

function UserProfile({ nickname, userProps }: any) {
  const navigate = useNavigate();
  // const [userProps, setUserProps] = useState<UserPropsTypes>();

  return (
    // <div>UserProfile</div>
    <>
      <UserProfileWrapper>
        <ProfilePictureWrapper>
          {nickname && <ProfilePicture alt={`${nickname} profile picture`} src={picture} />}
        </ProfilePictureWrapper>
        <ProfileRightWrapper>
          <ProfileRight>
            <ProfileNickname>{nickname}</ProfileNickname>
          </ProfileRight>
          <ProfileStats stats={userProps} />
        </ProfileRightWrapper>
      </UserProfileWrapper>
      <ProfileBottomWrapper>
        <ProfileMBTI>
          <strong>{mbti}</strong>
        </ProfileMBTI>
        {userProps !== undefined && userProps.moods.length > 0 && (
          <ProfileMoods>{userProps.moods.map((mood: string) => `#${mood} `)}</ProfileMoods>
        )}
      </ProfileBottomWrapper>
      {userProps !== undefined && userProps.owner && (
        <ProfileEditButtonWrapper onClick={() => navigate(`/profile/${nickname}/edit`)}>
          <ProfileEditButton>프로필 수정</ProfileEditButton>
        </ProfileEditButtonWrapper>
      )}
    </>

    // <Row align="middle" style={{ height: '200px' }}>
    //   <Col xs={8}>
    //     <img src={picture} alt="profile" width="60" height="60" style={{ borderRadius: '100%', marginLeft: '25%' }} />
    //   </Col>
    //   <Col xs={16}>hi</Col>
    // </Row>
  );
}

export default UserProfile;
