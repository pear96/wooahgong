import React from 'react';
import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import loadable from '@loadable/component';
import { ToastContainer } from 'react-toastify';

import { Routes, Route, BrowserRouter } from 'react-router-dom';
import 'antd/dist/antd.min.css';
import NotFound from 'not-found';
import Navbar from '../common/Navbar';
// import Regist from '../features/Regist/regist';
// import Map from '../features/Map/Map';
// import FeedAdd from '../features/Feed/Feedadd';
import Find from '../features/FindIdPwd/find';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

// const Login = loadable(() => import('../features/Login'));
declare global {
  interface Window {
    Tmapv2: any;
  }
}

const Regist = loadable(() => import('../features/Regist/regist'));
const SocialLogin = loadable(() => import('../features/Auth/kakaosocialLogin/socialLogin'));
const MainLogin = loadable(() => import('../features/Auth/mainLogin'));

const RediretHandler = loadable(() => import('../features/Auth/kakaosocialLogin/OAuth2RedirectHandler'));
const Map = loadable(() => import('../features/Map/Map'));

const Search = loadable(() => import('../features/Search/searh'));

const Profile = loadable(() => import('../features/Profile/Profile'));
const ProfileUpdate = loadable(() => import('../features/Profile/profileUpdate'));

const Place = loadable(() => import('../features/Place/Place'));

const FeedAdd = loadable(() => import('../features/Feed/Feedadd'));
const FeedDetail = loadable(() => import('../features/FeedDetail'));
const Comment = loadable(() => import('../features/FeedDetail/Comment'));

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
          <Route path="/regist/*" element={<Regist />} />
          <Route path="/find/*" element={<Find />} />

          <Route element={<Navbar />}>
            <Route path="/map" element={<Map />} />
            <Route path="/search/*" element={<Search />} />
            <Route path="/profile/:nickname" element={<Profile />} />
            <Route path="/profile/:nickname/edit" element={<ProfileUpdate />} />
            <Route path="/place/:placeSeq" element={<Place />} />
            <Route path="/place/:placeSeq/feeds/:feedSeq" element={<FeedDetail />} />
            <Route path="/place/:placeSeq/feeds/:feedSeq/comments" element={<Comment />} />
            <Route path="/not-found" element={<NotFound />} />
            <Route path="/report/*" element={<FeedAdd />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <ToastContainer autoClose={1500} style={{ width: '100%', display: 'inline' }} theme="colored" />
    </>
  );
}
export default App;
