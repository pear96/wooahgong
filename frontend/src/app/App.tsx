import React from 'react';
import loadable from '@loadable/component';
import { Routes, Route, BrowserRouter } from 'react-router-dom';

const Login = loadable(() => import('../features/Login'));

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
