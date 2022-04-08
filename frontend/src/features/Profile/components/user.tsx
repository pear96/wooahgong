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
// const mbti = 'ISFJ';


type MyProps = {
  nickname : string,
  userProps : {
    bookmarkedCnt: number ,
    feedsCnt: number ,
    image : string,
    likedCnt: number ,
    mbti : string ,
    moods: string[],
    owner: boolean,
  }
}

function UserProfile({ nickname, userProps }: MyProps) {
  const navigate = useNavigate();
  // const [userProps, setUserProps] = useState<UserPropsTypes>();

  return (
    // <div>UserProfile</div>
    <>
      <UserProfileWrapper>
        <ProfilePictureWrapper>
          {nickname && <ProfilePicture style={{objectFit : "cover"}} alt={`${nickname} profile picture`} src={userProps.image === 'default' ? picture : userProps.image} />}
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
          <strong>{userProps.mbti}</strong>
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
  );
}

export default UserProfile;
