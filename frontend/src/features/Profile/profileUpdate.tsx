import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Navbar from 'common/Navbar';
import { Col, Row } from 'antd';
import ProfileApi from 'common/api/ProfileApi';
import { setImage, setOriginalImg } from 'features/Profile/reducers/profileImageReducer';
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

  const [userId, setUserId] = useState<string>();
  const [newNickname, setNewNickname] = useState<string>();
  const [newMbti, setNewMbti] = useState<string>();
  const [newMoods, setNewMoods] = useState<string[]>();
  const [isProvider, setProvider] = useState<boolean>();
  // const props = {newPassword,newPasswordCheck,newNickname,newMbti,newMoods};
  const [mounted, setMounted] = useState<boolean>(false);

  const { nickname } = useParams<string>();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const getProfileForUpdateApi = async () => {
    if (nickname !== undefined) {
      const result = await ProfileApi.getProfileForUpdate(nickname);
      // console.log('gpfua', result);

      if (result.status === 200) {
        dispatch(setImage(result.data.profileImg));
        setUserId(result.data.userId);
        setNewNickname(result.data.nickname);
        setNewMbti(result.data.mbti);
        setNewMoods(result.data.moods);
        setProvider(result.data.provider);
        console.log(newNickname, newMbti, newMoods);
      } else {
        navigate('/not-found');
      }
    }
  };
  if (!mounted) {
    getProfileForUpdateApi();
  }

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div style={{ marginLeft: 'auto', marginRight: 'auto', maxWidth: '1024px' }}>
      {mounted ? (
        <>
          {/* <ProfileUpdateHeader
            newPassword={newPassword}
            newPasswordCheck={newPasswordCheck}
            newNickname={newNickname}
            newMbti={newMbti}
            newMoods={newMoods}
          /> */}
          <ProfileUpdateBody
            userId={userId}
            oldNickname={newNickname}
            oldMbti={newMbti}
            oldMoods={newMoods}
            isProvider={isProvider}
            changePassword={(password: string) => setNewPassword(password)}
            changePasswordCheck={(passwordCheck: string) => setNewPasswordCheck(passwordCheck)}
            changeNickname={(nnickname: string) => setNewNickname(nnickname)}
            changeMbti={(mbti: string) => setNewMbti(mbti)}
            changeMoods={(moods: string[]) => setNewMoods(moods)}
          />
        </>
      ) : (
        <p>Loading..</p>
      )}
    </div>
  );
}

export default ProfileUpdate;
