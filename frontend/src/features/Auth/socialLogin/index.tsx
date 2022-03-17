import React, { FC, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
// antd

import { Button } from 'antd';

// asseets main logo image
import { ReactComponent as Logo } from '../../../assets/Logo/Logo.svg';
import * as kakalogin from '../../../assets/kakaoLogo/kakao_login_large_wide.png';

// kakao socail login
import { KAKAO_AUTH_URL } from '../OAuth';
// styled-componets
import { LogoContainer } from './styles';

function socialLogin() {
  const navigate = useNavigate();

  const onClickGotoLoginPage = useCallback(() => {
    navigate('/login');
  }, []);

  return (
    <>
      <LogoContainer>
        <Logo />
      </LogoContainer>
      <div style={{ marginLeft: 110, marginTop: 20 }}>A place only we know</div>
      <div style={{ marginLeft: 120, marginTop: 10 }}>우리만 아는 공간</div>
      <Button
        onClick={onClickGotoLoginPage}
        style={{ color: '#C09FDC', width: 221, marginLeft: 60, marginTop: 150 }}
        shape="round"
        size="large"
      >
        로그인
      </Button>
      <Button
        href={KAKAO_AUTH_URL}
        style={{ color: '#C09FDC', width: 221, marginLeft: 60, marginTop: 20 }}
        shape="round"
        size="large"
      >
        카카오 로그인
      </Button>
      <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: 20 }}>
        <div>회원가입</div>
        <div>아이디 찾기</div>
        <div>비밀번호 찾기</div>
      </div>
    </>
  );
}
export default socialLogin;
