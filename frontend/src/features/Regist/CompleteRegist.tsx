import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import {useNavigate} from "react-router-dom";
import Logo from "../../assets/Logo.png";
import { ReducerType } from '../../app/rootReducer';


const Img = styled.img`
    width : 108px;
    height : 108px;
    margin-top : 223px;
    margin-left : 126px;
    filter : drop-shadow(0px 4px 4px rgba(0,0,0,0.25));
`
const ActiveButton = styled.button`
    background: linear-gradient(90deg, #B3A1E0 0%, #5DACF5 100%);
    border-style : none;
    font-family : "NotoSansKR";
    border-radius : 10px;
    width : 220px;
    height : 45px;
    font-size : 18px;
    font-style : normal;
    font-weight : 500;
    cursor : pointer;
    color : rgba(255,255,255, 1);
    transition: all 0.3s ease 0s;
    &:hover{
        box-shadow: 0rem 0.5rem 2rem rgba(179, 161, 224, 0.4);
        transform: translateY(-7px);
    }
`

function CompleteRegist(){
    const navigate = useNavigate();
    const handleOnClickNextStep = (e : React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        // dispatch(setMbti(selectedmbti));
        // navigate("/CompleteRegist");
    }

    return(
        <main>
            <article>
                <div>
                    <div>
                        <Img src={Logo} alt="Logo"/>
                    </div>
                    <div style={{
                        position : "absolute",
                        marginLeft : "70px",
                        top : "409px"
                    }}>
                            <ActiveButton onClick={handleOnClickNextStep}>우리만 아는 공간으로 출발!</ActiveButton>
                    </div>
                </div>
            </article>
        </main>
    )
}


export default CompleteRegist;
