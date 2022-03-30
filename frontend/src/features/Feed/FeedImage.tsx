import React, { ChangeEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import Slider from "react-slick";
import { useNavigate } from 'react-router-dom';
import { feed, setImage, setType, Feed, setPlace } from './feedReducer';
import { setAddress, setName, setPlaceSeq, setRegistered, PlaceInterface } from '../Place/reducers/PlaceReducer';

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

function FeedImage() {

    const [images, setUploadImage] = useState<File[]>([]);
    const [preview, setPreview] = useState<string[]>([]);
    
    const feedstore = useSelector<ReducerType, Feed>((state) => state.feedReducer);
    const placestore = useSelector<ReducerType, PlaceInterface>((state) => state.PlaceReducer);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    console.log(feedstore);
    const handleUploadImage = (e : React.ChangeEvent<HTMLInputElement>) =>{
        if(preview.length >= 5){

            // toastfy 써야함
            console.log("불가");
        }
        else if(e.currentTarget.files && preview.length < 5){
            if((e.currentTarget.files[0] !== undefined)){
                setPreview([...preview, URL.createObjectURL(e.currentTarget.files[0])]);
                setUploadImage([...images, e.currentTarget.files[0]]);
            }
        }
    }

    const handleDeleteImage = (index : number) =>{
        console.log(index);
        setPreview(preview.filter((v,i)=> i !== index));
        setUploadImage(images.filter((v,i)=> i !== index));
    }
    const handleNextStep = (e : React.MouseEvent) => {
        e.preventDefault();
        dispatch(setImage(images));
        if(placestore.isRegistered){
            const body = {
                placeSeq : placestore.placeSeq,
                name : placestore.name,
                address : placestore.address
            }
            dispatch(setPlace(body));
            dispatch(setType(true));
            dispatch(setRegistered(false));
            navigate(`/report/final`);
        }
        else{
            navigate(`/report/searchplace`);
            console.log(images, preview);
        }
    }
    useEffect(()=>{
        if(feedstore.image.length > 0){
            const preimage = [];
            const upload = [];
            for(let i = 0; i < feedstore.image.length; i += 1){
                upload.push(feedstore.image[i]);
                preimage.push(URL.createObjectURL(feedstore.image[i]));
            }
            setUploadImage([...upload]);
            setPreview([...preimage]);
        }
    },[]);

    return (
        <div>
            <Title>이미지 업로드</Title>
            <Desc>피드에 등록 할 한장 이상의 사진을<br/>업로드 해주세요. (최대 5장)</Desc>
            <label htmlFor='up-load'><Button>업로드</Button></label>
            <Upload type="file" id="up-load" accept='image/png, image/jpeg' onChange={handleUploadImage}/>
            <div style={{
                display : "flex",
                // alignItems : "center"
                justifyContent: "center"
            }}>
                {preview.length === 0 ? (<div style={{
                            // left : 50,
                            marginTop : 200,
                            width: 200,
                            height : 200,
                            display : "flex",
                            alignItems : "center",
                            justifyContent: "center",
                            fontSize : 30,
                            fontWeight : 700,
                            border : "2px dashed rgba(0,0,0,0.5)"
                        }}>
                    No Image😅
                </div>) : (
                        <div style={{
                            // left : 50,
                            marginTop : 178,
                            width: 300,
                            // textAlign : "center"
                        }}>
                            <Slider
                                className="center"
                                centerMode
                                centerPadding = "45px"
                                dots
                                infinite = {false}
                                slidesToSHow={1}
                                slidesToScroll={1}
                                speed ={500}>
                                {preview.map((v, i)=>{
                                    return (
                                        <>
                                        <button style={{
                                                position : "relative",
                                                border : "none",
                                                background : "tomato",
                                                color : "white",
                                                borderRadius : 5,
                                                fontSize : 11,
                                                top : 25,
                                                left : 180,
                                                cursor : "pointer" 
                                            }} type='button' onClick={()=>handleDeleteImage(i)}>X</button>
                                        <div>
                                            <img key={1} src={v} style={{margin : "0 auto",width : 200, height : 200}} alt="images"/>
                                        </div>
                                        </>
                                    );
                                })}
                            </Slider>
                            
                        </div>
                )}
                
            </div>
            <div style={{
                            width: "100%",
                            display : "flex",
                            justifyContent: "center",
                        }}>
                
                {preview.length === 0 ? (<DisableButton>다음</DisableButton>) : (<ActiveButton onClick={handleNextStep}>다음</ActiveButton>)}
                {/* <button 
                style={{
                    marginTop : 80,
                    width : 220,
                    height : 40
                }}
                type='button' onClick={handleNextStep}>다음</button> */}
            </div>
        </div>
        
    );
}

export default FeedImage;
