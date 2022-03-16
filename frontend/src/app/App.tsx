import React from 'react';
import loadable from '@loadable/component';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Navbar from '../common/Navbar';

// const Login = loadable(() => import('../features/Login'));

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        {/* <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} /> */}
        <Route path="/" />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
