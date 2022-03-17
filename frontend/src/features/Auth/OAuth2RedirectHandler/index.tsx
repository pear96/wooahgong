import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../../app/store';
// extrareducers
import { postKakacode, getToken } from '../authSlice';

// reducers
import { saveCode } from '../authSlice';

function OAuth2RedirectHandler() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const code = new URL(window.location.href).searchParams.get('code');
  console.log(code);

  // code를 저장
  useEffect(() => {
    dispatch(saveCode(code as string));
    dispatch(postKakacode(code as string)).unwrap();
  }, []);

  // 분기 처리가 있어야 함. 서버로 코드 보내고 토큰까지 받는데, 이미 회원가입한 사람이면 바로 main으로 넘어가고,
  // 그것이 아니라면 닉네임부터 입력받는 곳으로 redirect(회원가입 전이지만 토큰을 가지고 있긴해)

  return <>로딩중</>;
}

export default OAuth2RedirectHandler;
