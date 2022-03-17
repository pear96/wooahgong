import React from 'react';
import "./App.css";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import loadable from '@loadable/component';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Regist from '../features/Regist/Regist';
// const Login = loadable(() => import('../features/Login'));

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/*" element={<Regist />} />
          {/* <Route path="/login" element={<Login />} /> */}
        </Routes>
      </BrowserRouter>
      <ToastContainer autoClose={1500} style={{width : "100%", display : "inline"}} theme="colored"/>  
    </div>
  );
}
export default App;
