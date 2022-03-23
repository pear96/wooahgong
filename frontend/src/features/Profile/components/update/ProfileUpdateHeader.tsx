import {
  StyledProfileUpdateHeader,
  BackWrapper,
  ProfileUpdateTitle,
} from 'features/Profile/styles/update/StyledUpdateHeader';
import React from 'react';
import { LeftOutlined, CheckOutlined } from '@ant-design/icons';
import { AiOutlineCheck } from 'react-icons/ai';

function ProfileUpdateHeader() {
  return (
    <StyledProfileUpdateHeader>
      <BackWrapper to="#">
        <LeftOutlined style={{ color: '#000' }} />
      </BackWrapper>
      <ProfileUpdateTitle>프로필 수정</ProfileUpdateTitle>
      <AiOutlineCheck style={{ width: '30px', height: '30px', marginRight: '1rem' }} />
      {/* <div>체크</div> */}
      {/* <img src={mainLogo} alt="mainLogo" width={50} height={50} /> */}
      {/* <AiOutlineSearch style={{ width: '40px', height: '40px', marginRight: '1rem' }} /> */}
    </StyledProfileUpdateHeader>
  );
}

export default ProfileUpdateHeader;
