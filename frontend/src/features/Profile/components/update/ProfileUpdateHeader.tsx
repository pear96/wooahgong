import {
  StyledProfileUpdateHeader,
  BackWrapper,
  ProfileUpdateTitle,
} from 'features/Profile/styles/update/StyledUpdateHeader';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LeftOutlined } from '@ant-design/icons';
import { AiOutlineCheck } from 'react-icons/ai';
import { message } from 'antd';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { ReducerType } from 'app/rootReducer';

interface InfoPropTypes {
  newPassword: string;
  newPasswordCheck: string;
  newNickname: string;
  newMbti: string;
  newMoods: string[];
}

function ProfileUpdateHeader({ newPassword, newPasswordCheck, newNickname, newMbti, newMoods }: InfoPropTypes) {
  const navigate = useNavigate();

  const updateProfile = () => {
    if (newPassword !== newPasswordCheck) {
      message.error('비밀번호가 다릅니다');
      return;
    }
    if (newMoods.length < 1 || newMoods.length > 2) {
      message.error('관심 분위기는 최소 1개 최대 2개 설정해야 합니다.');
      return;
    }

    const token = localStorage.getItem('Token');
    const formData = new FormData();
    const currentNickname = useSelector((state: ReducerType) => state.login.nickname);
    const image = useSelector((state: ReducerType) => state.profileImage.image);
    formData.append('image', image);

    // 프로필 사진 변경
    axios({
      method: 'PATCH',
      url: `/users/${currentNickname}/profileimg`,
      headers: { 'Content-Type': 'multipart/form-data', Authorization: `Bearer ${token}` },
      data: formData,
    })
      .then((res) => {
        console.log(res.data);
        console.log('프로필 이미지 바꾸기 성공');
      })
      .catch((err) => {
        console.log(err);
        console.log('프로필 이미지 바꾸기 실패');
      });

    // 프로필 정보 변경
    axios({
      method: 'PATCH',
      url: `/users/${currentNickname}`,
      headers: { Authorization: `Bearer ${token}` },
      data: {
        password: newPassword,
        nickname: newNickname,
        mbti: newMbti,
        moods: newMoods,
      },
    })
      .then((res) => {
        console.log(res.data);
        console.log('프로필 정보 바꾸기 성공');
      })
      .catch((err) => {
        console.log(err);
        console.log('프로필 정보 바꾸기 실패');
      });
  };

  return (
    <StyledProfileUpdateHeader>
      <BackWrapper to="#">
        <LeftOutlined style={{ color: '#000' }} onClick={() => navigate(-1)} />
      </BackWrapper>
      <ProfileUpdateTitle>프로필 수정</ProfileUpdateTitle>
      <AiOutlineCheck onClick={updateProfile} style={{ width: '30px', height: '30px', marginRight: '1rem' }} />
      {/* <div>체크</div> */}
      {/* <img src={mainLogo} alt="mainLogo" width={50} height={50} /> */}
      {/* <AiOutlineSearch style={{ width: '40px', height: '40px', marginRight: '1rem' }} /> */}
    </StyledProfileUpdateHeader>
  );
}

export default ProfileUpdateHeader;
