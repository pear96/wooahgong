import React from 'react';
import loadable from '@loadable/component';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import 'antd/dist/antd.min.css';

const SocialLogin = loadable(() => import('../features/Auth/socialLogin'));
const MainLogin = loadable(() => import('../features/Auth/mainLogin'));
const RediretHandler = loadable(() => import('../features/Auth/OAuth2RedirectHandler'));
function App() {
  // 리프레시 토큰 사용하면
  /*
  useEffect(() => {
    axios.interceptors.response.use(
      response => {
        return response;
      },
      async error => {
        const {
          config,
          response: {status},
        } = error;
        if (status === 419) {
          if (error.response.data.code === 'expired') {
            const originalRequest = config;
            const refreshToken = await EncryptedStorage.getItem('refreshToken');
            // token refresh 요청
            const {data} = await axios.post(
              `${Config.API_URL}/refreshToken`, // token refresh api
              {},
              {headers: {authorization: `Bearer ${refreshToken}`}},
            );
            // 새로운 토큰 저장
            dispatch(userSlice.actions.setAccessToken(data.data.accessToken));
            originalRequest.headers.authorization = `Bearer ${data.data.accessToken}`;
            // 419로 요청 실패했던 요청 새로운 토큰으로 재요청
            return axios(originalRequest);
          }
        }
        return Promise.reject(error);
      },
    );
  }, [dispatch]);
  */

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SocialLogin />} />
          <Route path="/login" element={<MainLogin />} />
          <Route path="/oauth/callback/kakao" element={<RediretHandler />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer autoClose={1500} style={{ width: '100%', display: 'inline' }} theme="colored" />
    </>
  );
}
export default App;
