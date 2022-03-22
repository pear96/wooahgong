import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
// import Marker from '../../assets/maker.png';
import Comment from '../../assets/imageComment.png';
import Heart from '../../assets/heart.png';
import SearchType from './modal/SearchType';
// import {register, setId, setPwd, setEmail, setGender, setAtmos, setBirth, setNick, Register} from "./registerReducer";
import { ReducerType } from '../../app/rootReducer';

const Summary = styled.div`
    position : absolute;
    width : 340px;
    height : 103px;
    background : white;
    border-radius : 10px;
    top : 637px;
    left : 10px;
    cursor : pointer;
`;
const Title = styled.h3`
    position : absolute;
    top : 20px;
    left : 115px;
    font-family: 'NotoSansKR';
    font-size : 20px;
    font-weight : 900;
    // display : inline;
`
const Sub = styled.div`
    display: flex;
    align-items:center;
    position : absolute;
    top : 60px;
    left : 115px;
`
const SubText = styled.div`
    display : inline;
    width : fit-content;
    height : fit-content;
    padding-left : 5px;
    margin-right : 5px;
`
const SearchPath = styled.button`
    position : absolute;
    top : 5px;
    left : 270px;
    width : 60px;
    height : 25px;
    background-color : rgba(144, 136, 243, 1);
    color : white;
    font-family : 'NotoSansKR';
    font-size : 13px;
    border : none;
    border-radius : 5px;
    cursor : pointer;
    &:hover {
        background-color : rgba(144, 136, 243, 0.7);
    }
`
type MyProps = {
    spot : {
        img : string,
        name : string,
        like : number,
        comment : number,
        lat : number,
        lng : number,
    }
}


function SummarySpot({spot} : MyProps){
    const [open, setIsOpen] = useState<boolean>(false);
    // console.log(spot);

    const handleOpenModal = (e : React.MouseEvent<HTMLButtonElement>) =>{
        e.stopPropagation();
        setIsOpen(true);
    }
    const handleCloseModal = (e : MouseEvent) =>{
        e.stopPropagation();
        setIsOpen(false);
    }
    return (
        <Summary>
            <img style={{
                width : 103,
                height : 103,
                borderRadius : "10px 0px 0px 10px",
            }} src={spot.img} alt="img"/>
            <Title>{spot.name}</Title>
            <SearchPath
                type='button'
                onClick={handleOpenModal}>
                    길 찾기
            </SearchPath>
            <Sub>
                <img style={{
                    width : 14,
                    height : 14
                }}
                src={Heart} alt="img"/>
                <SubText>{spot.like}</SubText>
                <img style={{
                    width : 18,
                    height : 14
                }}
                src={Comment} alt="img"/>
                <SubText>{spot.comment}</SubText>
            </Sub>
            <SearchType open={open} onClose={handleCloseModal}/>
        </Summary>
    )
}


export default SummarySpot;
