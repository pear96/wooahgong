/* eslint-disable consistent-return */
import React, { useCallback, useEffect, useRef, useLayoutEffect } from 'react';
import { toast } from 'react-toastify';
import UserApi from 'common/api/UserApi';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../app/store';
import useInput from '../../common/hooks/useInput';

// extra reducers
// import { commonLogin } from './authSlice';

// reducers
import { setUser } from './authSlice';
// styled component
// import { LogoContainer } from './kakaosocialLogin/socialLogin';

// logo
import Logo from '../../assets/Logo.png';
import { ReactComponent as Title } from '../../assets/main/Title.svg';

const TitleContainer = styled.div`
  margin-top: 22px;
  margin-left: 69px;
  margin-bottom: 14px;
`;

const Img = styled.img`
  width: 112px;
  height: 112px;
  margin-top: 186px;
  margin-left: 124px;
  margin-bottom: 14px;
  // filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
`;

const Input = styled.input`
  font-family: 'NotoSansKR';
  font-size: 18px;
  width: 220px;
  height: 45px;
  margin-left: 70px;
  margin-bottom: 20px;
  padding-left: 3px;
  padding-bottom: 0px;
  border: 2px solid;
  border-left: none;
  border-top: none;
  border-right: none;
  border-image: linear-gradient(to right, #c09fdc 20.46%, #34b1ff 80.57%);
  border-image-slice: 1;
  text-align: center;
  &::placeholder {
    color: rgba(0, 0, 0, 0.3);
  }
  &:focus::-webkit-input-placeholder,
  textarea:focus::-webkit-input-placeholder {
    color: transparent;
  }

  &:focus + .underline {
    transform: scale(1);
  }
`;

const ActiveButton = styled.button`
  background: linear-gradient(90deg, #c09fdd -3.15%, #86a6eb 100%);
  font-family: 'NotoSansKR';
  border-style: none;
  border-radius: 10px;
  width: 102px;
  height: 46px;
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

export const Form = styled.form`
  margin: 0 auto;
  max-width: 400px;
`;

const mainLogin = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { getCommonLoginResult } = UserApi;

  const [id, onChangeId] = useInput('');
  const [password, onChangePassword] = useInput('');
  const inputRef = useRef<HTMLInputElement>(null);

  useLayoutEffect(() => {
    const detectMobileKeyboard = () =>{
      if(document.activeElement?.tagName === "INPUT"){
        console.log("??S?S?D?SSD?SD?SD?");
        if(inputRef.current !== null) {
          console.log(inputRef.current);
          inputRef.current.scrollIntoView({block : 'end'});

        } 
      }
    }
    window.addEventListener("resize", detectMobileKeyboard);
    return () => window.removeEventListener("resize", detectMobileKeyboard);
}, []);



  
  const handleLogin = async () => {
    // console.log(result);
  };
  const onSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      console.log(e.target[0].value, e.target[1].value);
      if (!id || !id.trim()) {
        return toast.info(
          <div style={{ width: 'inherit', fontSize: '10px' }}>
            <div>아이디를 입력해주세요.</div>
          </div>,
          {
            position: toast.POSITION.TOP_CENTER,
            role: 'alert',
          },
        );
      }
      if (!password || !password.trim()) {
        return toast.info(
          <div style={{ width: 'inherit', fontSize: '10px' }}>
            <div>비밀번호를 입력해주세요.</div>
          </div>,
          {
            position: toast.POSITION.TOP_CENTER,
            role: 'alert',
          },
        );
      }
      const data = { userId: id, password };
      const result = await getCommonLoginResult(data);
      if (result.status === 200) {
        toast.success(
          <div style={{ width: 'inherit', fontSize: '10px' }}>
            <div>로그인 성공!</div>
          </div>,
          {
            position: toast.POSITION.TOP_CENTER,
            role: 'alert',
          },
        );
        dispatch(setUser({ nickname: result.data.nickname, profileImg: result.data.profileImg, gender : result.data.gender }));
        window.localStorage.setItem('nickname', result.data.nickname);
        window.localStorage.setItem('profileImg', result.data.profileImg);
        window.localStorage.setItem('gender', result.data.gender);
        navigate('/main');
      } else {
        toast.error(
          <div style={{ width: 'inherit', fontSize: '10px' }}>
            <div>아이디와 비밀번호를 확인해주세요</div>
          </div>,
          {
            position: toast.POSITION.TOP_CENTER,
            role: 'alert',
          },
        );
      }
    },
    [id, password],
  );

  const onClickGotoSignupPage = useCallback(() => {
    navigate('/regist');
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
      <Form onSubmit={onSubmit}>
        <div style={{ marginTop: 40 }}>
          <Input ref={inputRef} placeholder="아이디 입력" type="text" name="id" value={id} onChange={onChangeId} />
        </div>
        <div style={{ marginTop: 25 }}>
          <Input
            placeholder="패스워드 입력"
            type="password"
            name="password"
            value={password}
            onChange={onChangePassword}
          />
        </div>
        <div
          ref={inputRef}
          style={{
            width: 360,
            marginTop: 36,
          }}
        >
          <ActiveButton
            style={{
              marginLeft: 69,
            }}
            onClick={handleLogin}
          >
            로그인
          </ActiveButton>
          <ActiveButton
            type="button"
            style={{
              marginLeft: 18,
              background: 'linear-gradient(270deg, #34B1FF 0%, #67A0E4 100%)',
            }}
            onClick={onClickGotoSignupPage}
          >
            회원가입
          </ActiveButton>
        </div >
      </Form>
    </div>
  );
};

export default mainLogin;
