import React from 'react';
import Navbar from 'common/Navbar';
import ProfileUpdateHeader from './components/update/ProfileUpdateHeader';
import ProfileImageUpdate from './components/update/ProfileImageUpdate';

function ProfileUpdate() {
  return (
    <>
      <Navbar />
      <div style={{ marginLeft: 'auto', marginRight: 'auto', maxWidth: '1024px' }}>
        <ProfileUpdateHeader />
        <ProfileImageUpdate />
        <div>
          <div>사진</div>
          <div>프로필 사진 변경</div>
        </div>
        <div>수정 부분</div>
        <div>우아공 떠나기</div>
      </div>
    </>
  );
}

export default ProfileUpdate;
