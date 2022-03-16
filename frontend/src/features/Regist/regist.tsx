import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import ConfirmTOS from './ConfirmTOS';
import confirmId from './confirmId';
import confirmPwd from './confirmPwd';
import confirmNickname from './confirmNickname';
import confirmEtc from './confirmEtc';
import addAtmosInter from './addAtmosInter';
import checkmail from './checkmail';
import {register, setId, setPwd, setEmail, setGender, setAtmos, setBirth, setNick, Register} from "./registerReducer";
import { ReducerType } from '../../app/rootReducer';

const Container = styled.div`
    width : 360px;
    height : 800px;
    background : none;
    margin : 0 auto;
`;

function Regist(){
    const regist = useSelector<ReducerType, Register>(state => state.registerReducer);
    console.log(regist);
    const dispatch = useDispatch();
    // dispatch(setId("sterr"))
    // dispatch(setPwd("123456"))
    const handleClick = (e : React.MouseEvent<HTMLButtonElement>) => {
        dispatch(setId("sterr"))
        dispatch(setPwd("123456"))
        console.log(regist);
    }
    console.log(regist);
    return (
        
        <Container>
            <Routes>
                <Route path="/" element={<ConfirmTOS progress={20}/>}/>
            </Routes>
        </Container>
        
        
    )
}


export default Regist;
