import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import ConfirmTOS from './confirmTOS';
import Checkmail from './checkmail';
import ConfirmId from './confirmId';
import ConfirmPwd from './confirmPwd';
import ConfirmNickname from './confirmNickname';
import ConfirmEtc from './confirmEtc';
import AddAtmosInter from './addAtmosInter';
import AddMbti from './AddMbti';
import CompleteRegist from './CompleteRegist';
import { register, setId, setPwd, setEmail, setGender, setAtmos, setBirth, setNick, Register } from './registerReducer';
import { ReducerType } from '../../app/rootReducer';

const Container = styled.div`
  position: relative;
  width: 360px;
  height: 800px;
  background: none;
  margin: 0 auto;
`;

function Regist() {
  const regist = useSelector<ReducerType, Register>((state) => state.registerReducer);
  
  const dispatch = useDispatch();
  // dispatch(setId("sterr"))
  // dispatch(setPwd("123456"))
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    dispatch(setId('sterr'));
    dispatch(setPwd('123456'));
    
  };
  
  return (
    <Container>
      <Routes>
        <Route path="/" element={<ConfirmTOS progress={20} />} />
        <Route path="/checkmail" element={<Checkmail progress={14.5} />} />
        <Route path="/confirmid" element={<ConfirmId progress={29} />} />
        <Route path="/confirmpwd" element={<ConfirmPwd progress={43} />} />
        <Route path="/confirmetc" element={<ConfirmEtc progress={57} />} />
        <Route path="/confirmnick" element={<ConfirmNickname progress={71} />} />
        <Route path="/addatmos" element={<AddAtmosInter progress={85} />} />
        <Route path="/addmbti" element={<AddMbti progress={100} />} />
        <Route path="/complete" element={<CompleteRegist />} />
      </Routes>
    </Container>
  );
}

export default Regist;
