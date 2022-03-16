import React from 'react';
import "./App.css";
import loadable from '@loadable/component';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Regist from '../features/Regist/Regist';
// const Login = loadable(() => import('../features/Login'));

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Regist />} />
        {/* <Route path="/login" element={<Login />} /> */}
      </Routes>
    </BrowserRouter>
  );
}
export default App;
