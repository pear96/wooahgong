import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Row, Col, Avatar, Image } from 'antd';
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

function UserProfile({ nickname, userProps }: any) {
  const [isMe, setIsMe] = useState<boolean>(false);
  const stats = userProps;
  const navigate = useNavigate();

  return (
    <>
      <UserProfileWrapper>
        <ProfilePictureWrapper>
          {nickname && <ProfilePicture alt={`${nickname} profile picture`} src={picture} />}
        </ProfilePictureWrapper>
        <ProfileRightWrapper>
          <ProfileRight>
            <ProfileNickname>{nickname}</ProfileNickname>
          </ProfileRight>
          <ProfileStats stats={stats} />
        </ProfileRightWrapper>
      </UserProfileWrapper>
      <ProfileBottomWrapper>
        <ProfileMBTI>
          <strong>{mbti}</strong>
        </ProfileMBTI>
        <ProfileMoods>{userProps.moods.map((mood: string) => `#${mood} `)}</ProfileMoods>
      </ProfileBottomWrapper>
      {userProps.isOwner && (
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
