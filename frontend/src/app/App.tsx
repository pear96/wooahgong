import React from 'react';
import loadable from '@loadable/component';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import 'antd/dist/antd.min.css';

const SocialLogin = loadable(() => import('../features/Auth/socialLogin'));
const MainLogin = loadable(() => import('../features/Auth/mainLogin'));
const RediretHandler = loadable(() => import('../features/Auth/OAuth2RedirectHandler'));
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SocialLogin />} />
        <Route path="/login" element={<MainLogin />} />
        <Route path="/oauth/callback/kakao" element={<RediretHandler />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
