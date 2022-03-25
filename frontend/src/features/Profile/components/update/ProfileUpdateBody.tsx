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
} from 'features/Profile/styles/update/StyledUpdateBody';
import { UserOutlined } from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ReducerType } from 'app/rootReducer';
import { setImage, setOriginalImg } from 'features/Profile/reducers/profileImageReducer';
import styled from 'styled-components';
import LeaveModal from 'features/Profile/components/update/LeaveModal';

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

function ProfileUpdateBody({ changePassword, changePasswordCheck, changeNickname, changeMbti, changeMoods }: any) {
  const dispatch = useDispatch();
  // const { nickname, profileImg } = useSelector((state: ReducerType) => state.login);
  // 위에 만들어야함 리덕스

  const { file, image, originalImg } = useSelector((state: ReducerType) => state.profileImage);

  const [loading, setLoading] = useState<boolean>(false);
  const [password, setPassword] = useState<string>('');
  const [passwordCheck, setPasswordCheck] = useState<string>('');
  const [nickname, setNickname] = useState<string>('');
  const [mbti, setMbti] = useState<string>('');
  // const [moods, setMoods] = useState<any>([
  //   { type: '모던', selected: false, color: 'gray' },
  //   { type: '내추럴', selected: false, color: 'gray' },
  //   { type: '러블리', selected: false, color: 'gray' },
  //   { type: '럭셔리', selected: false, color: 'gray' },
  //   { type: '유니크', selected: false, color: 'gray' },
  //   { type: '빈티지', selected: false, color: 'gray' },
  //   { type: '액티브', selected: false, color: 'gray' },
  //   { type: '클럽', selected: false, color: 'gray' },
  //   { type: '기타', selected: false, color: 'gray' },
  // ]);
  // const [selectedMoods, setSelectedMoods] = useState<string[]>([]);
  const [moods, setMoods] = useState<string[]>([]);

  const [showLeaveModal, setShowLeaveModal] = useState<boolean>(false);

  const handleUploadChange = (info: any) => {
    setLoading(true);
    console.log(info.file.status);
    info.file.status = 'done';
    if (info.file.status === 'uploading') {
      setLoading(false);
      return;
    }
    if (info.file.status === 'done') {
      getBase64(info.file.originFileObj, (imageUrl: any) => {
        dispatch(setImage(imageUrl));
        setLoading(false);
      });
    }
    setLoading(false);
  };

  useEffect(() => {
    dispatch(setImage(dummyLoggedInUserFromRedux.profileImg));
    if (!dummyLoggedInUserFromRedux.provider) {
      setPassword(dummyLoggedInUserFromRedux.password);
      setPasswordCheck(dummyLoggedInUserFromRedux.password);
    }
    setNickname(dummyLoggedInUserFromRedux.nickname);
    setMbti(dummyLoggedInUserFromRedux.mbti);
    setMoods(dummyLoggedInUserFromRedux.moods);
  }, []);

  return (
    <>
      <StyledUpdateBody>
        <CenterAlignedSpace direction="vertical">
          {loading && <Spin size="large" tip="로딩 중..." />}
          {image ? <Avatar size={80} src={image} /> : <Avatar size={80} icon={<UserOutlined />} />}
          {/* <Avatar size={80} src={image} /> */}
          <Upload
            name="file"
            maxCount={1}
            showUploadList={false}
            beforeUpload={beforeUpload}
            onChange={handleUploadChange}
          >
            <UploadButton>프로필 사진 변경</UploadButton>
          </Upload>
        </CenterAlignedSpace>
      </StyledUpdateBody>
      <StyledUpdateInfo>
        <StyledInfoRow align="middle">
          <StyledInfoTitle xs={10}>아이디</StyledInfoTitle>
          <Col xs={14}>{dummyLoggedInUserFromRedux.userId}</Col>
        </StyledInfoRow>
        {!dummyLoggedInUserFromRedux.provider && (
          <>
            <StyledInfoRow align="middle">
              <StyledInfoTitle xs={10}>비밀번호</StyledInfoTitle>
              <Col xs={14}>
                <UnderlinedDiv>
                  <Input.Password
                    bordered={false}
                    defaultValue={dummyLoggedInUserFromRedux.password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      changePassword(e.target.value);
                    }}
                  />
                </UnderlinedDiv>
              </Col>
            </StyledInfoRow>
            <StyledInfoRow align="middle">
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
            </StyledInfoRow>
          </>
        )}
        <StyledInfoRow align="middle">
          <StyledInfoTitle xs={10}>닉네임</StyledInfoTitle>
          <Col xs={14}>
            <UnderlinedDiv>
              <Input
                bordered={false}
                defaultValue={dummyLoggedInUserFromRedux.nickname}
                onChange={(e) => {
                  setNickname(e.target.value);
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
                defaultValue={dummyLoggedInUserFromRedux.mbti}
                onChange={(e) => {
                  setMbti(e);
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
                defaultValue={dummyLoggedInUserFromRedux.moods}
                onChange={(e) => {
                  setMoods(e);
                  changeMoods(e);
                }}
                showArrow
                bordered={false}
              >
                {moodOpts.map((mood) => (
                  <Option value={mood} key={mood} disabled={moods.length > 1 ? !moods.includes(mood) : false}>
                    #{mood}
                  </Option>
                ))}
              </Select>
            </UnderlinedDiv>
          </Col>
          {(moods.length > 2 || moods.length === 0) && (
            <Warning>관심 분위기는 최소 1개 최대 2개 선택해야 합니다.</Warning>
          )}
        </StyledInfoRow>
        {/* <StyledInfoRow align="middle">
          <StyledInfoTitle xs={10}>관심 분위기</StyledInfoTitle>
          <Col xs={14}>
            <StyledInfoRow>1 2</StyledInfoRow>
            <StyledInfoRow>3 4</StyledInfoRow>
            <StyledInfoRow>5 6</StyledInfoRow>
            <StyledInfoRow>7 8</StyledInfoRow>
          </Col>
        </StyledInfoRow> */}
      </StyledUpdateInfo>
      <LeaveButton onClick={() => setShowLeaveModal(true)}>우아공 떠나기</LeaveButton>
      {showLeaveModal && <LeaveModal setShowModal={setShowLeaveModal} />}
    </>
  );
}
export default ProfileUpdateBody;
