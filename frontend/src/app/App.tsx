import React from 'react';
import "./App.css";
import 'react-toastify/dist/ReactToastify.css';
import Regist from '../features/Regist/Regist';
import { ToastContainer } from 'react-toastify';
import Navbar from '../common/Navbar';
import loadable from '@loadable/component';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import 'antd/dist/antd.css';

const SocialLogin = loadable(() => import('../features/Auth/socialLogin'));
const MainLogin = loadable(() => import('../features/Auth/mainLogin'));

// const Login = loadable(() => import('../features/Login'));

function App() {
  return (
    <div>
      <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<SocialLogin />} />
        <Route path="/login" element={<MainLogin />} />
      </Routes>
    </BrowserRouter>
      <ToastContainer autoClose={1500} style={{width : "100%", display : "inline"}} theme="colored"/>  
    </div>
  );
}
export default App;
