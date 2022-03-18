import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import ProgressBar from "@ramonak/react-progress-bar";
import {useNavigate} from "react-router-dom";
import Logo from "../../assets/Logo.png";
import MbtiModal from './modal/MbtiModal';
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
    margin-top : 20px;
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
    const [modal, setModal] = useState<boolean>(false);
    const [selectedmbti, setSelectedmbti] = useState<string[]>([]);
    const [mbti, setStatembti] = useState([
        {type : "ISTJ", check : false},
        {type : "ISTP", check : false},
        {type : "ISFJ", check : false},
        {type : "ISFP", check : false},
        {type : "INTJ", check : false},
        {type : "INTP", check : false},
        {type : "INFJ", check : false},
        {type : "INFP", check : false},
        {type : "ESTJ", check : false},
        {type : "ESTP", check : false},
        {type : "ESFJ", check : false},
        {type : "ESFP", check : false},
        {type : "ENTJ", check : false},
        {type : "ENTP", check : false},
        {type : "ENFJ", check : false},
        {type : "ENFP", check : false}
    ])
    const navigate = useNavigate();

    const regist = useSelector<ReducerType, Register>(state => state.registerReducer);
    const dispatch = useDispatch();

    const handleMbti = (e : React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const index = +e.currentTarget.value;
        setStatembti(
            mbti.map((v : {type : string , check : boolean}, i : number) => i === index ? {...v, check : !v.check } : v)
        )
    }

    const handleOpenModal = (e : React.MouseEvent<HTMLInputElement>) =>{
        e.stopPropagation();
        setModal(true);
        // const index : number = +e.currentTarget.value;
        // setStatembti(
        //     mbti.map((v : {type : string, check : boolean}, i : number) => i === index ? {...v, check : !v.check} : v)
        // )
    }
    const handleCloseModal = (e : React.MouseEvent) => { 
        e.stopPropagation();
        setModal(false);
    }
    useEffect(()=>{
        if(selectedmbti.length > 0){
            console.log(selectedmbti)
            setIsOk(true);
        }
        else{
            setIsOk(false);
        }
    },[selectedmbti])
    useEffect(()=>{
        const select = [];
        for(let i = 0; i < mbti.length; i += 1){
            if(mbti[i].check){
                select.push(mbti[i].type);
            }
        }
        setSelectedmbti(select);
    },[mbti])
    const handleOnClickNextStep = (e : React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        // dispatch(setmbti(selectedmbti));
        navigate("/addmbti");
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
                    <Title>MBTI 설정</Title>
                    <Input onClick={handleOpenModal} placeholder="클릭하여 MBTI를 설정해주세요."/>
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
                    <MbtiModal open = {modal} onClose = {handleCloseModal} handleMbti = {handleMbti} mbti = {mbti}/>
                </div>
            </article>
        </main>
    )
}


export default AddMbti;
