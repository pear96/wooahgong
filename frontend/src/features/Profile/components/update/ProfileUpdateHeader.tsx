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
import ProfileApi from 'common/api/ProfileApi';

interface InfoPropTypes {
  newNickname: string | undefined;
  newMbti: string | undefined;
  newMoods: string[] | undefined;
}

function ProfileUpdateHeader({ newNickname, newMbti, newMoods }: InfoPropTypes) {
  const navigate = useNavigate();
  const currentNickname = useSelector((state: ReducerType) => state.login.nickname);
  const image = useSelector((state: ReducerType) => state.profileImage.image);

  const updateProfile = async () => {
    // if (newPassword !== newPasswordCheck) {
    //   message.error('비밀번호가 다릅니다');
    //   return;
    // }
    if (newMoods !== undefined && (newMoods.length < 1 || newMoods.length > 2)) {
      message.error('관심 분위기는 최소 1개 최대 2개 설정해야 합니다.');
      return;
    }

    // const token = localStorage.getItem('Token');
    const formData = new FormData();
    formData.append('image', image);

    // 프로필 사진 변경
    if (newNickname !== undefined && newMbti !== undefined && newMoods !== undefined) {
      const imageResult = await ProfileApi.updateProfileImage(currentNickname, formData);
      const infoResult = await ProfileApi.updateProfile(currentNickname, {
        nickname: newNickname,
        mbti: newMbti,
        moods: newMoods,
      });
      if (imageResult.status === 200 && infoResult.status === 200) {
        message.success('정보를 수정하였습니다.');
      } else {
        console.log('imageResult', imageResult);
        console.log('infoResult', infoResult);
        message.error('정보를 수정하지 못하였습니다.');
      }
    }
    // axios({
    //   method: 'PATCH',
    //   url: `/users/${currentNickname}/profileimg`,
    //   headers: { 'Content-Type': 'multipart/form-data', Authorization: `Bearer ${token}` },
    //   data: formData,
    // })
    //   .then((res) => {
    //     console.log(res.data);
    //     console.log('프로필 이미지 바꾸기 성공');
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //     console.log('프로필 이미지 바꾸기 실패');
    //   });

    // // 프로필 정보 변경
    // axios({
    //   method: 'PATCH',
    //   url: `/users/${currentNickname}`,
    //   headers: { Authorization: `Bearer ${token}` },
    //   data: {
    //     password: newPassword,
    //     nickname: newNickname,
    //     mbti: newMbti,
    //     moods: newMoods,
    //   },
    // })
    //   .then((res) => {
    //     console.log(res.data);
    //     console.log('프로필 정보 바꾸기 성공');
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //     console.log('프로필 정보 바꾸기 실패');
    //   });
  };

  return (
    <StyledProfileUpdateHeader>
      <BackWrapper to="#">
        <LeftOutlined style={{ color: '#000' }} onClick={() => navigate(-1)} />
      </BackWrapper>
      <ProfileUpdateTitle>프로필 수정{newMoods?.length}</ProfileUpdateTitle>
      <AiOutlineCheck onClick={updateProfile} style={{ width: '30px', height: '30px', marginRight: '1rem' }} />
      {/* <div>체크</div> */}
      {/* <img src={mainLogo} alt="mainLogo" width={50} height={50} /> */}
      {/* <AiOutlineSearch style={{ width: '40px', height: '40px', marginRight: '1rem' }} /> */}
    </StyledProfileUpdateHeader>
  );
}

export default ProfileUpdateHeader;
