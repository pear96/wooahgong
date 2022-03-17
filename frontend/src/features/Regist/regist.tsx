import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import ConfirmTOS from './ConfirmTOS';
import Checkmail from './Checkmail';
import ConfirmId from './ConfirmId';
import ConfirmPwd from './ConfirmPwd';
import ConfirmNickname from './ConfirmNickname';
import ConfirmEtc from './ConfirmEtc';
import addAtmosInter from './addAtmosInter';
import {register, setId, setPwd, setEmail, setGender, setAtmos, setBirth, setNick, Register} from "./registerReducer";
import { ReducerType } from '../../app/rootReducer';

const Container = styled.div`
    position : relative;
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
                <Route path="/checkmail" element={<Checkmail progress={14.5}/>}/>
                <Route path="/confirmid" element={<ConfirmId progress={29}/>}/>
                <Route path="/confirmpwd" element={<ConfirmPwd progress={43}/>}/>
                <Route path="/confirmetc" element={<ConfirmEtc progress={57}/>}/>
                <Route path="/confirmnick" element={<ConfirmNickname progress={71}/>}/>
            </Routes>
        </Container>
        
        
    )
}


export default Regist;
