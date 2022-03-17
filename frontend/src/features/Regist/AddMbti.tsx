import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import ProgressBar from "@ramonak/react-progress-bar";
import {useNavigate} from "react-router-dom";
import Logo from "../../assets/Logo.png";
import {register, setId, setPwd, setEmail, setGender, setAtmos, setBirth, setNick, Register} from "./registerReducer";
import { ReducerType } from '../../app/rootReducer';


const Img = styled.img`
    width : 65px;
    height : 65px;
    margin-top : 155px;
    margin-left : 147px;
    margin-bottom : 25px;
    filter : drop-shadow(0px 4px 4px rgba(0,0,0,0.25));
`
const Progress = styled.div`
    margin-top : 55px;
    margin-left : 61px;
`
const Title = styled.h3`
    text-align : left;
    margin-left : 58px;
    margin-top : 35px;
    margin-bottom : 20px;
    font-size : 22px;
`
const Input = styled.input`
    font-size : 5px;
    width : 238px;
    height : 31px;
    margin-left : 58px;
    margin-bottom : 20px;
    padding-left : 3px;
    padding-bottom : 0px;
    border-left : none;
    border-top : none;
    border-right : none;
    border-bottom : #D7D7D7 1px solid;
`
const DisableButton = styled.button`
    border-style : none;
    border-radius : 10px;
    width : 200px;
    height : 40px;
    font-size : 16px;
    font-style : normal;
    font-weight : 500;
    cursor : default;
    color : rgba(0,0,0, 0.5);
`
const ActiveButton = styled.button`
    background: linear-gradient(90deg, #B3A1E0 0%, #5DACF5 100%);
    border-style : none;
    border-radius : 10px;
    width : 200px;
    height : 40px;
    font-size : 16px;
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
const Button = styled.button`
    display : inline-block;
    font-size : 11px;
    width : 45px;
    height : 30px;
    margin : 0 2.5px;
    margin-bottom : 25px;
    border : none;
    border-radius : 5px;
    cursor : pointer;
`

type MyProps = {
    progress : number
}
// 분위기: 모던, 내추럴, 러블리, 럭셔리, 유니크, 
// 빈티지, 액티브, 클럽, 기타
function AddMbti({progress} : MyProps){
    const [isOk, setIsOk] = useState<boolean>(false);
    const [selectedAtmos, setSelectedAtmos] = useState<string[]>([]);
    const [atmos, setStateAtmos] = useState([
        {type : "모던", check : false},
        {type : "내추럴", check : false},
        {type : "러블리", check : false},
        {type : "럭셔리", check : false},
        {type : "유니크", check : false},
        {type : "빈티지", check : false},
        {type : "액티브", check : false},
        {type : "클럽", check : false},
        {type : "기타", check : false}
    ])
    const navigate = useNavigate();

    const regist = useSelector<ReducerType, Register>(state => state.registerReducer);
    const dispatch = useDispatch();

    const handleAtmos = (e : React.MouseEvent<HTMLButtonElement>) =>{
        e.stopPropagation();
        const index : number = +e.currentTarget.value;
        setStateAtmos(
            atmos.map((v : {type : string, check : boolean}, i : number) => i === index ? {...v, check : !v.check} : v)
        )
    }
    useEffect(()=>{
        if(selectedAtmos.length > 0){
            console.log(selectedAtmos)
            setIsOk(true);
        }
        else{
            setIsOk(false);
        }
    },[selectedAtmos])
    useEffect(()=>{
        const select = [];
        for(let i = 0; i < atmos.length; i += 1){
            if(atmos[i].check){
                select.push(atmos[i].type);
            }
        }
        setSelectedAtmos(select);
    },[atmos])
    const handleOnClickNextStep = (e : React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        dispatch(setAtmos(selectedAtmos));
        navigate("/addatmos");
    }

    return(
        <main>
            <article>
                <div>
                    <div>
                        <Img src={Logo} alt="Logo"/>
                        <Progress>
                            <ProgressBar
                            completed={progress}
                            customLabel=" "
                            width="238px"
                            height="5px"
                            bgColor="linear-gradient(90deg, #B3A1E0 0%, #5DACF5 100%)"
                            baseBgColor="#D7D7D7"
                            />
                        </Progress>
                    </div>
                    <Title>MBTI</Title>
                    
                    <div style={{
                        position : "absolute",
                        marginLeft : "80px",
                        top : "520px"
                    }}>
                        {isOk ? (
                            <ActiveButton onClick={handleOnClickNextStep}>다 음</ActiveButton>
                        ) : (
                            <DisableButton>다 음</DisableButton>
                        )}
                    </div>
                </div>
            </article>
        </main>
    )
}


export default AddMbti;
