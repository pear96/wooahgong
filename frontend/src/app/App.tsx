import React from 'react';
import "./App.css";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import loadable from '@loadable/component';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Navbar from '../common/Navbar';
import Regist from '../features/Regist/regist';
import Map from '../features/Map/Map';
import 'antd/dist/antd.css';

const SocialLogin = loadable(() => import('../features/Auth/socialLogin'));
const MainLogin = loadable(() => import('../features/Auth/mainLogin'));

// const Login = loadable(() => import('../features/Login'));
declare global {
  interface Window {
    Tmapv2: any;
  }
}
function App() {
  return (
    <div>
      <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Map/>}/>
        {/* <Route path="/" element={<SocialLogin />} /> */}
        {/* <Route path="/login" element={<MainLogin />} /> */}
        <Route path="/regist/*" element={<Regist />}/>
      </Routes>
    </BrowserRouter>
      <ToastContainer autoClose={1500} style={{width : "100%", display : "inline"}} theme="colored"/>  
    </div>
  );
}
export default App;
