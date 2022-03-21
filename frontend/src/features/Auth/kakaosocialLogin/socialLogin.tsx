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
import { ReactComponent as Logo } from '../../../assets/main/Logo.svg';
import * as kakalogin from '../../../assets/kakaoLogo/kakao_login_large_wide.png';
import { ReactComponent as Title } from '../../../assets/main/Title.svg';

// kakao socail login
import { KAKAO_AUTH_URL } from './OAuth';

export const TitleContainer = styled.div`
  margin-top: 50px;
  margin-left: 70px;
  margin-bottom: 50px;
`;

const SmallMenu = styled.div`
  font-size: 12px;
  font-weight: 500;
  line-height: 1;
  transition: transform 250ms;

  &:hover {
    transform: translateY(-10px);
  }
`;

export const LogoContainer = styled.div`
  margin-top: 213px;
  margin-left: 120px;
  color: rgba(179, 161, 224, 0.4);
`;

export const ActiveButton = styled.button`
  background: linear-gradient(90deg, #b3a1e0 0%, #5dacf5 100%);
  border-style: none;
  border-radius: 10px;
  width: 200px;
  height: 40px;
  margin-top: 20px;
  margin-left: 65px;
  font-size: 16px;
  font-style: normal;
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

  // 정확한 url 알아내서 navigate 붙이기
  const onClickGotoSignupPage = useCallback(() => {
    navigate('/sigup');
  }, []);

  const onClickGotoSearchId = useCallback(() => {
    navigate('/searchId');
  }, []);

  const onClickGotoSearcPassword = useCallback(() => {
    navigate('/searchPassword');
  }, []);

  return (
    <>
      <LogoContainer>
        <Logo />
      </LogoContainer>
      <TitleContainer>
        <Title />
      </TitleContainer>
      <ActiveButton onClick={onClickGotoLoginPage}>로그인</ActiveButton>
      <Button
        href={KAKAO_AUTH_URL}
        style={{
          backgroundColor: '#B3A1E0',
          width: 221,
          marginLeft: 55,
          marginTop: 20,
        }}
        shape="round"
        size="large"
      >
        카카오 로그인
      </Button>
      <div style={{ display: 'flex', justifyContent: 'space-evenly', marginTop: 20 }}>
        <SmallMenu role="button" onClick={onClickGotoSignupPage}>
          회원가입
        </SmallMenu>
        <SmallMenu role="button" onClick={onClickGotoSearchId}>
          아이디 찾기
        </SmallMenu>
        <SmallMenu role="button" onClick={onClickGotoSearcPassword}>
          비밀번호 찾기
        </SmallMenu>
      </div>
    </>
  );
}
export default socialLogin;
