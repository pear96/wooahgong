import { Avatar, Button, Space, Upload, message, Spin, Row, Col, Input, Select } from 'antd';
import {
  CenterAlignedSpace,
  StyledUpdateBody,
  UploadButton,
  LeaveButton,
  StyledInfoRow,
  StyledInfoTitle,
  StyledUpdateInfo,
  UnderlinedDiv,
  Warning,
  RePwdButton,
} from 'features/Profile/styles/update/StyledUpdateBody';
import { UserOutlined } from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ReducerType } from 'app/rootReducer';
import { setImage, setOriginalImg } from 'features/Profile/reducers/profileImageReducer';
import styled from 'styled-components';
import LeaveModal from 'features/Profile/components/update/LeaveModal';
import ProfileApi from 'common/api/ProfileApi';

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

function getBase64(img: Blob, callback: any) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

function beforeUpload(file: any) {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('JPG/PNG 파일만 업로드 할 수 있습니다!');
  }
  const isLt10M = file.size / 1024 / 1024 < 10;
  if (!isLt10M) {
    message.error('이미지는 10MB보다 작아야 합니다!');
  }
  return isJpgOrPng && isLt10M;
}

function ProfileUpdateBody({
  userId,
  oldNickname,
  oldMbti,
  oldMoods,
  isProvider,
  changePassword,
  changePasswordCheck,
  changeNickname,
  changeMbti,
  changeMoods,
}: any) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const { nickname, profileImg } = useSelector((state: ReducerType) => state.login);
  // 위에 만들어야함 리덕스

  const { file, image, originalImg } = useSelector((state: ReducerType) => state.profileImage);

  const [loading, setLoading] = useState<boolean>(false);

  const [password, setPassword] = useState<string>('');
  const [passwordCheck, setPasswordCheck] = useState<string>('');
  // const [userId, setUserId] = useState<string>('');
  const [nick, setNick] = useState<string>(oldNickname);
  const [mbti, setMbti] = useState<string>('');
  const [moods, setMoods] = useState<string[]>([]);
  // const [isProvider, setProvider] = useState<boolean>();

  const [dataLoading, setDataLoading] = useState<boolean>(false);

  const [showLeaveModal, setShowLeaveModal] = useState<boolean>(false);

  const [pic, setPic] = useState<any>();

  const handleUploadChange = (info: any) => {
    console.log(info.file.status);
    info.file.status = 'done';
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
    console.log(info.file.originFileObj);
    if (info.file.status === 'done') {
      getBase64(info.file.originFileObj, (imageUrl: any) => {
        dispatch(setImage(imageUrl));
        // setPic(imageUrl);
        setLoading(false);
      });
    }
  };
  // const getProfileForUpdateApi = async () => {
  //   if (nickname !== undefined) {
  //     const result = await ProfileApi.getProfileForUpdate(nickname);
  //     console.log('sss', result.data);

  //     if (result.status === 200) {
  //       dispatch(setImage(result.data.profileImg));
  //       setUserId(result.data.userId);
  //       setNick(result.data.nickname);
  //       setMbti(result.data.mbti);
  //       setMoods(result.data.moods);
  //       setProvider(result.data.provider);
  //       console.log(userId, nick, mbti, isProvider);
  //     } else {
  //       navigate('/not-found');
  //     }
  //   }
  // };
  // useEffect(() => {
  //   // dispatch(setImage(dummyLoggedInUserFromRedux.profileImg));
  //   // if (!dummyLoggedInUserFromRedux.provider) {
  //   //   setPassword(dummyLoggedInUserFromRedux.password);
  //   //   setPasswordCheck(dummyLoggedInUserFromRedux.password);
  //   // }
  //   // setNickname(dummyLoggedInUserFromRedux.nickname);
  //   // setMbti(dummyLoggedInUserFromRedux.mbti);
  //   // setMoods(dummyLoggedInUserFromRedux.moods);

  //   setDataLoading(true);
  //   getProfileForUpdateApi();
  //   return () => setDataLoading(false);
  // }, [isProvider]);

  const imageHandler = (e: any) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        dispatch(setImage(reader.result));
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  return (
    <>
      <StyledUpdateBody>
        <CenterAlignedSpace direction="vertical">
          {/* {loading && <Spin size="large" tip="로딩 중..." />} */}
          {loading ? <Avatar size={80} icon={<UserOutlined />} /> : <Avatar size={80} src={image} />}
          {/* <Avatar size={80} src={image} /> */}
          {/* <Upload
            name="file"
            maxCount={1}
            showUploadList={false}
            beforeUpload={beforeUpload}
            onChange={handleUploadChange}
          >
            <UploadButton>프로필 사진 변경</UploadButton>
          </Upload> */}
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
        {!isProvider && (
          <>
            <StyledInfoRow align="middle">
              <StyledInfoTitle xs={10}>비밀번호</StyledInfoTitle>
              <Col xs={14}>
                <RePwdButton size="small" href="/">
                  비밀번호 변경
                </RePwdButton>
                {/* <UnderlinedDiv>
                  <Input.Password
                    bordered={false}
                    defaultValue={dummyLoggedInUserFromRedux.password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      changePassword(e.target.value);
                    }}
                  />
                </UnderlinedDiv> */}
              </Col>
            </StyledInfoRow>
            {/* <StyledInfoRow align="middle">
              <StyledInfoTitle xs={10}>비밀번호 확인</StyledInfoTitle>
              <Col xs={14}>
                <UnderlinedDiv>
                  <Input.Password
                    bordered={false}
                    defaultValue={dummyLoggedInUserFromRedux.password}
                    onChange={(e) => {
                      setPasswordCheck(e.target.value);
                      changePasswordCheck(e.target.value);
                    }}
                  />
                </UnderlinedDiv>
              </Col>
              {password !== passwordCheck && <Warning>비밀번호가 일치하지 않습니다.</Warning>}
            </StyledInfoRow> */}
          </>
        )}
        <StyledInfoRow align="middle">
          <StyledInfoTitle xs={10}>닉네임</StyledInfoTitle>
          <Col xs={14}>
            <UnderlinedDiv>
              <Input
                bordered={false}
                value={oldNickname}
                onChange={(e) => {
                  // setNick(e.target.value);
                  changeNickname(e.target.value);
                }}
              />
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
      {showLeaveModal && <LeaveModal setShowModal={setShowLeaveModal} />}
    </>
  );
}

export default ProfileUpdateBody;
