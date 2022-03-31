import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import FindId from './findId';
import Pwd from './pwd';
import EmailRes from './emailRes';
import { ReducerType } from '../../app/rootReducer';

const Container = styled.div`
  position: relative;
  width: 360px;
  height: 800px;
  background: none;
  margin: 0 auto;
`;

function Find() {
  // const regist = useSelector<ReducerType, Register>((state) => state.registerReducer);
  // console.log(regist);
  const dispatch = useDispatch();
  // const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
  //   dispatch(setId('sterr'));
  //   dispatch(setPwd('123456'));
  //   console.log(regist);
  // };
  return (
    <Container>
      <Routes>
        <Route path="/" element={<FindId />} />
        <Route path="/email" element={<EmailRes />} />
        <Route path="/pwd" element={<Pwd />} />

      </Routes>
    </Container>
  );
}

export default Find;
