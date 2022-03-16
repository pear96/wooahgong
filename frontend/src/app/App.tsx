import React from 'react';
import loadable from '@loadable/component';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import 'antd/dist/antd.css';

const SocialLogin = loadable(() => import('../features/Auth/socialLogin'));
const MainLogin = loadable(() => import('../features/Auth/mainLogin'));

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SocialLogin />} />
        <Route path="/login" element={<MainLogin />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
