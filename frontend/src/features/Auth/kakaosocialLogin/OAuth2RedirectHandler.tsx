import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../../app/store';
// reducers
import { postKakaocode, setUser, getKakaoToken } from '../authSlice';
import { saveToken } from '../../../common/api/JTW-Token';

function OAuth2RedirectHandler() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const code = new URL(window.location.href).searchParams.get('code');
  console.log(code);

  // code를 저장
  useEffect(() => {
    dispatch(postKakaocode(code as string))
      .unwrap()
      .then(() => {
        dispatch(getKakaoToken())
          .unwrap()
          .then((res) => {
            if (res.data.isSigned) {
              // 소셜 로그인 토큰 저장
              const { accessToken } = res.data;
              saveToken(accessToken);
              // 닉네임과 imgProfile store에 저장
              dispatch(setUser({ nickname: res.data.nickname, profileImg: res.data.profileImg }));
            } else {
              navigate('/signup');
            }
          });
      });
  }, []);

  // 분기 처리가 있어야 함. 서버로 코드 보내고 토큰까지 받는데, 이미 회원가입한 사람이면 바로 main으로 넘어가고,
  // 그것이 아니라면 닉네임부터 입력받는 곳으로 redirect

  return <>로딩중</>;
}

export default OAuth2RedirectHandler;
