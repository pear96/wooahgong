import React, { useState } from 'react';
import Navbar from 'common/Navbar';
import { Col, Row } from 'antd';
import ProfileUpdateHeader from './components/update/ProfileUpdateHeader';
import ProfileUpdateBody from './components/update/ProfileUpdateBody';

const dummyLoggedInUserFromRedux = {
  userSeq: 2,
  userId: 'qweadzs',
  nickname: 'nicknick',
  password: 'passpass',
  profileImg: 'https://picsum.photos/640/360',
  mbti: 'ISTJ',
  moods: ['낭만적인', '이국적인'],
  provider: false,
};

interface InfoPropTypes {
  newNickname: string;
  newPassword: string;
  newPasswordCheck: string;
  newMbti: string;
  newMoods: string[];
}

function ProfileUpdate() {
  const [newPassword, setNewPassword] = useState<string>(dummyLoggedInUserFromRedux.password);
  const [newPasswordCheck, setNewPasswordCheck] = useState<string>(dummyLoggedInUserFromRedux.password);
  const [newNickname, setNewNickname] = useState<string>(dummyLoggedInUserFromRedux.nickname);
  const [newMbti, setNewMbti] = useState<string>(dummyLoggedInUserFromRedux.mbti);
  const [newMoods, setNewMoods] = useState<string[]>(dummyLoggedInUserFromRedux.moods);
  // const props = {newPassword,newPasswordCheck,newNickname,newMbti,newMoods};

  return (
    <div style={{ marginLeft: 'auto', marginRight: 'auto', maxWidth: '1024px' }}>
      <ProfileUpdateHeader
        newPassword={newPassword}
        newPasswordCheck={newPasswordCheck}
        newNickname={newNickname}
        newMbti={newMbti}
        newMoods={newMoods}
      />
      <ProfileUpdateBody
        changePassword={(password: string) => setNewPassword(password)}
        changePasswordCheck={(passwordCheck: string) => setNewPasswordCheck(passwordCheck)}
        changeNickname={(nickname: string) => setNewNickname(nickname)}
        changeMbti={(mbti: string) => setNewMbti(mbti)}
        changeMoods={(moods: string[]) => setNewMoods(moods)}
      />
    </div>
  );
}

export default ProfileUpdate;
