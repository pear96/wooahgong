/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/interactive-supports-focus */
import React, { FC, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from 'app/store';
// antd
import { Button } from 'antd';
// asseets main logo image
import styled from 'styled-components';
import { testNum } from '../authSlice';
import Logo from '../../../assets/Logo.png';
import * as kakalogin from '../../../assets/kakaoLogo/kakao_login_large_wide.png';
import { ReactComponent as Title } from '../../../assets/main/Title.svg';

// kakao socail login
import { KAKAO_AUTH_URL } from './OAuth';

const TitleContainer = styled.div`
  margin-top: 22px;
  margin-left: 69px;
  margin-bottom: 60px;
`;

const SmallMenu = styled.div`
  font-size: 11px;
  font-weight: 500;
  line-height: 1;
  transition: transform 250ms;
  cursor: pointer;
  &:hover {
    transform: translateY(-2px);
  }
`;
const Img = styled.img`
  width: 112px;
  height: 112px;
  margin-top: 209px;
  margin-left: 124px;
  margin-bottom: 25px;
  // filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
`;

export const ActiveButton = styled.button`
  background: linear-gradient(90deg, #b3a1e0 0%, #5dacf5 100%);
  border-style: none;
  border-radius: 10px;
  width: 221px;
  height: 45px;
  margin-top: 20px;
  margin-left: 70px;
  font-family: 'NotoSansKR';
  font-size: 18px;
  // font-style: normal;
  font-weight: 500;
  cursor: pointer;
  color: rgba(255, 255, 255, 1);
  transition: all 0.3s ease 0s;
  &:hover {
    box-shadow: 0rem 0.5rem 2rem rgba(179, 161, 224, 0.4);
    transform: translateY(-7px);
  }
`;

function socialLogin() {
  const navigate = useNavigate();
  const diapatch = useAppDispatch();
  const onClickGotoLoginPage = useCallback(() => {
    diapatch(testNum(4));
    navigate('/login');
  }, []);

  const onClickGotoSignupPage = useCallback(() => {
    navigate('/regist');
  }, []);

  const onClickGotoFindId = useCallback(() => {
    navigate('/find');
  }, []);

  const onClickGotoSearcPassword = useCallback(() => {
    navigate('/find/pwd');
  }, []);

  return (
    <div
      style={{
        position: 'relative',
        width: '360px',
        height: '800px',
        background: 'none',
        margin: '0 auto',
      }}
    >
      <Img src={Logo} alt="Logo" />
      <TitleContainer>
        <Title width="222px" />
      </TitleContainer>
      <ActiveButton onClick={onClickGotoLoginPage}>로그인</ActiveButton>
      <Button
        href={KAKAO_AUTH_URL}
        style={{
          backgroundColor: '#B3A1E0',
          width: 221,
          marginLeft: 70,
          height: 45,
          marginTop: 20,
        }}
        shape="round"
        size="large"
      >
        카카오 로그인
      </Button>

      <div style={{ width: 221, margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-evenly', marginTop: 20 }}>
          <SmallMenu role="button" onClick={onClickGotoSignupPage}>
            회원가입
          </SmallMenu>
          <SmallMenu role="button" onClick={onClickGotoFindId}>
            아이디 찾기
          </SmallMenu>
          <SmallMenu role="button" onClick={onClickGotoSearcPassword}>
            비밀번호 찾기
          </SmallMenu>
        </div>
      </div>
    </div>
  );
}
export default socialLogin;
