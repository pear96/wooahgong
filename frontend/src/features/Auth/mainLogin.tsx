/* eslint-disable consistent-return */
import React, { useCallback, useEffect, useRef } from 'react';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ReducerType } from 'app/rootReducer';
import { useAppDispatch } from '../../app/store';
import useInput from '../../common/hooks/useInput';

// extra reducers
import { commonLogin } from './authSlice';

// reducers
import { setUser } from './authSlice';
// styled component
import { LogoContainer } from './kakaosocialLogin/socialLogin';

// logo
import { ReactComponent as Logo } from '../../assets/main/Logo.svg';
import { ReactComponent as Title } from '../../assets/main/Title.svg';
import { TitleContainer } from './kakaosocialLogin/socialLogin';

const Input = styled.input`
  font-size: 11px;
  width: 238px;
  height: 31px;
  margin-left: 58px;
  margin-bottom: 20px;
  padding-left: 3px;
  padding-bottom: 0px;
  border-left: none;
  border-top: none;
  border-right: none;
  border-bottom: #d7d7d7 1px solid;

  /* background-color: transparent;
  border: none;
  border-bottom: 1px solid #ccc;
  color: #555;
  box-sizing: border-box;
  font-family: 'Arvo';
  font-size: 15px;
  height: 50px;
  left: 50%;
  margin: -25px 0 0 -100px;
  padding: 10px 0px;
  position: relative;
  top: 50%;
  width: 200px;

  &:focus {
    outline: none;
  }

  &:-webkit-input-placeholder {
    color: #aaa;
  }

  &:focus::-webkit-input-placeholder {
    color: dodgerblue;
  }

  &:focus + .underline {
    transform: scale(1);
  } */
`;

const inputContainer = styled.div`
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0px 2px 1px 0px #ddd;
  box-sizing: border-box;
  height: 300px;
  left: 50%;
  margin: -150px 0 0 -150px;
  position: absolute;
  top: 50%;
  width: 300px;
`;

const ActiveButton = styled.button`
  background: linear-gradient(90deg, #b3a1e0 0%, #5dacf5 100%);
  border-style: none;
  border-radius: 10px;
  width: 100px;
  height: 40px;
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
  const { test } = useSelector((state: ReducerType) => state.login);
  console.log(test);
  const [id, onChangeId] = useInput('');
  const [password, onChangePassword] = useInput('');

  const idRef = useRef<any>();

  const onSubmit = useCallback(
    (e) => {
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

      const data = { id, password };
      // 로그인 완료 후 store에 닉네임과 프로필 이미지 저장
      dispatch(commonLogin(data))
        .unwrap()
        .then((res: any) => {
          console.log(res);
          dispatch(setUser({ nickname: res.data.nickname, profileImg: res.data.profileImg }));
        });
      // 추후에 메인으로 움직이는 코드 작성
    },
    [id, password],
  );

  const onClickGotoSignupPage = useCallback(() => {
    navigate('/signup');
  }, []);

  useEffect(() => {
    idRef.current.focus();
  }, []);

  return (
    <>
      <LogoContainer>
        <Logo />
      </LogoContainer>
      <TitleContainer>
        <Title />
      </TitleContainer>
      <Form onSubmit={onSubmit}>
        <div style={{ marginTop: 40 }}>
          <Input ref={idRef} placeholder="아이디 입력" type="text" name="id" value={id} onChange={onChangeId} />
        </div>
        <div style={{ marginTop: 40 }}>
          <Input
            placeholder="패스워드 입력"
            type="password"
            name="password"
            value={password}
            onChange={onChangePassword}
          />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-evenly', marginTop: 20 }}>
          <ActiveButton>로그인</ActiveButton>
          <ActiveButton type="button" onClick={onClickGotoSignupPage}>
            회원가입
          </ActiveButton>
        </div>
      </Form>
    </>
  );
};

export default mainLogin;
