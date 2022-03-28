import React, { ChangeEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import Slider from "react-slick";
import { useNavigate } from 'react-router-dom';
import { feed, setImage, setType, Feed } from './feedReducer';
import { ReducerType } from '../../app/rootReducer';



const Title = styled.h3`
    position : absolute;
    text-align: left;
    width : 200px;
    top : 55px;
    left : 58px;
    // margin-left: 58px;
    // margin-top: 20px;
    margin-bottom: 10px;
    font-family: 'NotoSansKR';
    font-size: 25px;
    font-weight : 700;
`;
const Upload = styled.input`    
    display: none;
    position : absolute;
    top : 5px;
    left : 58px;
    width : 300px;
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
const Button = styled.div`    
    position : absolute;
    display: flex;
    align-items : center;
    justify-content: center;
    top : 155px;
    width : 200px;
    left : 80px;
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
const Desc = styled.span`
    position : absolute;
    top : 95px;
    left : 58px;
    text-align: left;
    font-family: 'NotoSansKR';
    font-size: 13px;
`;
const DisableButton = styled.button`
    border-style: none;
    margin-top : 80px;
    border-radius: 10px;
    width: 200px;
    height: 40px;
    font-family: 'NotoSansKR';
    font-size: 16px;
    font-weight: 500;
    cursor: default;
    color: rgba(0, 0, 0, 0.5);
`;
const ActiveButton = styled.button`
    background: #80b2fe;
    border-style: none;
    margin-top : 80px;
    border-radius: 10px;
    width: 200px;
    height: 40px;
    font-family: 'NotoSansKR';
    font-size: 16px;
    font-weight: 500;
    cursor: pointer;
    color: rgba(255, 255, 255, 1);
    transition: all 0.3s ease 0s;
    &:hover {
        box-shadow: 0rem 0.5rem 2rem rgba(179, 161, 224, 0.4);
        transform: translateY(-7px);
    }
`;

function FeedLast() {

    const [images, setUploadImage] = useState<File[]>([]);
    const [preview, setPreview] = useState<string[]>([]);
    
    const feedstore = useSelector<ReducerType, Feed>((state) => state.feedReducer);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    console.log(feedstore);

    return (
        <div>
            <Title>이미지 업로드</Title>
            <Desc>피드에 등록 할 한장 이상의 사진을<br/>업로드 해주세요. (최대 5장)</Desc>
        </div>
        
    );
}

export default FeedLast;
