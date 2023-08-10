import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import UserApi from 'common/api/UserApi';
import { useAppDispatch } from '../../../app/store';
import { setEmail } from '../../Regist/registerReducer';

// reducers
import { setUser } from '../authSlice';
import { saveToken } from '../../../common/api/JTW-Token';

function OAuth2RedirectHandler() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { getKakaoLoginResult } = UserApi;

  const code = new URL(window.location.href).searchParams.get('code');
  
  const apiResult = async () => {
    const result = await getKakaoLoginResult(code as string);
    if (result.data.email) {
      dispatch(setEmail(result.data.email));
      navigate('/regist/confirmetc');
    } else {
      // 
      saveToken(result.data.token);

      // 추후 /main 으로 변경
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          dispatch(setUser({ nickname: result.data.nickname, 
                              profileImg: result.data.profileImg, 
                              gender : result.data.gender,
                              lat : position.coords.latitude,
                              lng : position.coords.longitude}));
          window.localStorage.setItem('lat', position.coords.latitude.toString());
          window.localStorage.setItem('lng', position.coords.longitude.toString());
          // setLat(37.557620);
          // setLng(126.923110);
          // setLat(position.coords.latitude);
          // setLng(position.coords.longitude);
        });
      }
      window.localStorage.setItem('nickname', result.data.nickname);
      window.localStorage.setItem('profileImg', result.data.profileImg);
      window.localStorage.setItem('gender', result.data.gender);
      navigate('/main');
    }
    return result;
  };
  // code를 저장
  useEffect(() => {
    const result = apiResult();
  }, []);

  // 분기 처리가 있어야 함. 서버로 코드 보내고 토큰까지 받는데, 이미 회원가입한 사람이면 바로 main으로 넘어가고,
  // 그것이 아니라면 닉네임부터 입력받는 곳으로 redirect
  return null;
}

export default OAuth2RedirectHandler;
