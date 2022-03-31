import {
  StyledProfileUpdateHeader,
  BackWrapper,
  ProfileUpdateTitle,
} from 'features/Profile/styles/update/StyledUpdateHeader';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LeftOutlined } from '@ant-design/icons';
import { AiOutlineCheck } from 'react-icons/ai';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { ReducerType } from 'app/rootReducer';
import ProfileApi from 'common/api/ProfileApi';
import { setProfileNick } from '../../../Auth/authSlice';


type MyProps = {
  newNickname: string,
  newMbti: string,
  newMoods: string[],
  isNick : boolean
}

function ProfileUpdateHeader({ newNickname, newMbti, newMoods, isNick }: MyProps) {

  const navigate = useNavigate();
  const currentNickname = useSelector((state: ReducerType) => state.login.nickname);
  const dispatch = useDispatch();
  const updateProfile = async () => {
    
    if (newMoods !== undefined && (newMoods.length < 1 || newMoods.length > 2)) {
      toast.error(<div style={{ width: 'inherit', fontSize: '14px' }}>관심 분위기는 최소 1개 최대 2개 설정해야 합니다.</div>, {
        position: toast.POSITION.TOP_CENTER,
        role: 'alert',
      });
      return;
    }
    if(!isNick){
      toast.error(<div style={{ width: 'inherit', fontSize: '14px' }}>닉네임 형식이 올바르지 않습니다.</div>, {
        position: toast.POSITION.TOP_CENTER,
        role: 'alert',
      });
      return;
    }
    if (newNickname !== undefined && newMbti !== undefined && newMoods !== undefined) {
      const result = await ProfileApi.updateProfile(currentNickname, {
        nickname: newNickname,
        mbti: newMbti,
        moods: newMoods,
      });
      if (result.status === 200 && result.status === 200) {
        toast.success(<div style={{ width: 'inherit', fontSize: '14px' }}>회원정보를 업데이트 완료 했습니다.</div>, {
          position: toast.POSITION.TOP_CENTER,
          role: 'alert',
        });
        if(currentNickname !== newNickname){
          dispatch(setProfileNick(newNickname));
        }
        navigate(`/profile/${newNickname}`);
      } else {
        console.log('infoResult', result);
        toast.error(<div style={{ width: 'inherit', fontSize: '14px' }}>사용불가능한 닉네임 입니다.</div>, {
          position: toast.POSITION.TOP_CENTER,
          role: 'alert',
        });
      }
    }
  };

  return (
    <StyledProfileUpdateHeader>
      <BackWrapper to="#">
        <LeftOutlined style={{ color: '#000' }} onClick={() => navigate(-1)} />
      </BackWrapper>
      <ProfileUpdateTitle>프로필 수정</ProfileUpdateTitle>
      <AiOutlineCheck
        onClick={updateProfile}
        style={{ width: '30px', height: '30px', marginRight: '1rem', cursor: 'pointer' }}
      />
    </StyledProfileUpdateHeader>
  );
}

export default ProfileUpdateHeader;
