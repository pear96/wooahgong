import { Avatar, Col, Input, Select } from 'antd';
import {
  CenterAlignedSpace,
  StyledUpdateBody,
  LeaveButton,
  StyledInfoRow,
  StyledInfoTitle,
  StyledUpdateInfo,
  UnderlinedDiv,
  Warning,
  RePwdButton,
} from 'features/Profile/styles/update/StyledUpdateBody';
import { UserOutlined } from '@ant-design/icons';
import React, { useLayoutEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ReducerType } from 'app/rootReducer';
import LeaveModal from 'features/Profile/components/update/LeaveModal';
import ProfileApi from 'common/api/ProfileApi';
import PasswordChange from './PasswordChange';
import { setProfileImg } from '../../../Auth/authSlice';

const { Option } = Select;

const mbtiOpts = [
  'ISTJ',
  'ISFJ',
  'INFJ',
  'INTJ',
  'ISTP',
  'ISFP',
  'INFP',
  'INTP',
  'ESTP',
  'ESFP',
  'ENFP',
  'ENTP',
  'ESTJ',
  'ESFJ',
  'ENFJ',
  'ENTJ',
];
const moodOpts = [
  '현대적인',
  '자연주의',
  '복고풍의',
  '활동적인',
  '낭만적인',
  '야경이멋진',
  '평화로운',
  '이국적인',
  '기타',
];

type MyProps = {
  userId: string;
  oldNickname: string;
  oldMbti: string;
  oldMoods: string[];
  isProvider: boolean | undefined;
  changeNickname: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error: string;
  changeMbti: (mbti: string) => void;
  changeMoods: (moods: string[]) => void;
};

function ProfileUpdateBody({
  userId,
  oldNickname,
  oldMbti,
  oldMoods,
  isProvider,
  changeMbti,
  changeNickname,
  error,
  changeMoods,
}: MyProps) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { nickname, profileImg } = useSelector((state: ReducerType) => state.login);
  // 위에 만들어야함 리덕스

  // const { file, image, originalImg } = useSelector((state: ReducerType) => state.profileImage);
  const image = useSelector((state: ReducerType) => state.login);

  const [loading, setLoading] = useState<boolean>(false);

  const [showLeaveModal, setShowLeaveModal] = useState<boolean>(false);
  const [open, setIsOpen] = useState<boolean>(false);
  const listRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
      const detectMobileKeyboard = () =>{
        if(document.activeElement?.tagName === "INPUT"){
          console.log("??S?S?D?SSD?SD?SD?");
          if(listRef.current !== null) {
            console.log(listRef.current);
            listRef.current.scrollIntoView({block : 'end'});

          } 
        }
      }
      window.addEventListener("resize", detectMobileKeyboard);
      return () => window.removeEventListener("resize", detectMobileKeyboard);
  }, []);
  const imageHandler = async (e: any) => {
    const formData = new FormData();
    if (e.currentTarget.files) {
      formData.append('image', e.currentTarget.files[0]);
      // setTempImg(reader.result);
      console.log(nickname);
      const result = await ProfileApi.updateProfileImage(window.localStorage.getItem("nickname"), formData);
      if (result?.status === 200) {
        console.log(result.data);
        window.localStorage.setItem('profileImg', result.data);
        dispatch(setProfileImg(result.data));
      } else {
        console.log('error');
      }
    }
  };

  const handleClickPwdChange = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setIsOpen(true);
  };
  const handleClosePwdModal = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsOpen(false);
  };

  return (
    <div ref={listRef}>
      <StyledUpdateBody>
        <CenterAlignedSpace direction="vertical">
          {/* {loading && <Spin size="large" tip="로딩 중..." />} */}
          {loading ? (
            <Avatar size={80} icon={<UserOutlined />} />
          ) : (
            <Avatar size={80} src={window.localStorage.getItem('profileImg')} />
          )}
          <input
            type="file"
            name="image-upload"
            id="input"
            accept="image/*"
            onChange={imageHandler}
            style={{ display: 'none' }}
          />
          <label htmlFor="input">
            <div style={{ cursor: 'pointer' }}>프로필 사진 변경</div>
          </label>
        </CenterAlignedSpace>
      </StyledUpdateBody>
      <StyledUpdateInfo>
        <StyledInfoRow align="middle">
          <StyledInfoTitle xs={10}>아이디</StyledInfoTitle>
          <Col xs={14}>{userId}</Col>
        </StyledInfoRow>
        {!isProvider ? (
          <StyledInfoRow align="middle">
            <StyledInfoTitle xs={10}>비밀번호</StyledInfoTitle>
            <Col xs={14}>
              <RePwdButton size="small" onClick={handleClickPwdChange}>
                비밀번호 변경
              </RePwdButton>
            </Col>
          </StyledInfoRow>
        ) : null}
        <StyledInfoRow align="middle">
          <StyledInfoTitle xs={10}>닉네임</StyledInfoTitle>
          <Col xs={14}>
            <UnderlinedDiv>
              <Input bordered={false} value={oldNickname} onChange={changeNickname} />
            </UnderlinedDiv>
          </Col>
        </StyledInfoRow>
        <StyledInfoRow align="middle">
          <StyledInfoTitle xs={10}>MBTI</StyledInfoTitle>
          <Col xs={14}>
            <UnderlinedDiv>
              <Select
                bordered={false}
                style={{ width: '100%' }}
                value={oldMbti}
                onChange={(e) => {
                  // setMbti(e);
                  changeMbti(e);
                }}
              >
                {mbtiOpts.map((v: string) => (
                  <Option value={v} key={v}>
                    {v}
                  </Option>
                ))}
              </Select>
            </UnderlinedDiv>
          </Col>
        </StyledInfoRow>

        {/* {renderMoods()} */}
        <StyledInfoRow align="middle">
          <StyledInfoTitle xs={10}>관심 분위기</StyledInfoTitle>
          <Col xs={14}>
            <UnderlinedDiv>
              <Select
                mode="multiple"
                style={{ width: '100%' }}
                value={oldMoods}
                onChange={(e) => {
                  // setMoods(e);
                  changeMoods(e);
                }}
                showArrow
                bordered={false}
              >
                {moodOpts.map((mood) => (
                  <Option value={mood} key={mood} disabled={oldMoods.length > 1 ? !oldMoods.includes(mood) : false}>
                    #{mood}
                  </Option>
                ))}
              </Select>
            </UnderlinedDiv>
          </Col>
          {(oldMoods.length > 2 || oldMoods.length === 0) && (
            <Warning>관심 분위기는 최소 1개 최대 2개 선택해야 합니다.</Warning>
          )}
        </StyledInfoRow>
      </StyledUpdateInfo>
      <LeaveButton onClick={() => setShowLeaveModal(true)}>우아공 떠나기</LeaveButton>
      <PasswordChange open={open} id={userId} onClose={handleClosePwdModal} />
      {showLeaveModal && <LeaveModal setShowModal={setShowLeaveModal} />}
    </div>
  );
}

export default ProfileUpdateBody;
