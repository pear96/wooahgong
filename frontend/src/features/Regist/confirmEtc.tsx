import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import "react-datepicker/dist/react-datepicker.css";
import styled from 'styled-components';
import ProgressBar from "@ramonak/react-progress-bar";
import { toast } from "react-toastify";
import {useNavigate} from "react-router-dom";
import BirthDate from "./BirthDate";
import Logo from "../../assets/Logo.png";
import {ReactComponent as Calendar} from "../../assets/calendar.svg";
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
    margin-top : 20px;
    margin-bottom : 10px;
    font-size : 22px;
`
const CheckBox = styled.button`
    width: 110px;
    height: 44px;
    margin-left: 57px;
    font-style: normal;
    font-weight: 400;
    font-size: 18px;
    border-radius : 10px;
    box-sizing: border-box;
    border: none;
    cursor : pointer;
`
const Input = styled.input`
    font-size : 11px;
    width : 150px;
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
const ErrorMsg = styled.span`
    position : absolute;
    color : red;
    font-size : 3px;
    top : 450px;
    left : 0px;
    margin-left : 61px;
`
const Birth = styled.div`
    width : 208px;
    input{
        width : 100%;
        border-left : none;
        border-top : none;
        border-right : none;
        border-bottom : 1px solid #D7D7D7;
        margin-left : 58px;
        padding-left : 35px;
        padding-right : 0px;
        line-height: 28px;
        background : rgba(0,0,0,0);
    }
    .react-datepicker-popper {
        margin-left : 58px;
    }
    
`
type MyProps = {
    progress : number
}

function ConfirmEtc({progress} : MyProps){
    const [isOk, setIsOk] = useState<boolean>(false);
    const [gender , setStateGender] = useState<boolean>(true);
    const [birthday, setBirthday] = useState<any>("");
    const [birthdayCheck, setBirthdayCheck] = useState(false);
    const navigate = useNavigate();

    const regist = useSelector<ReducerType, Register>(state => state.registerReducer);
    const dispatch = useDispatch();

    const handleInputBirthday = useCallback((date) => {
        console.log(date);
        setBirthday(date);
        console.log(birthday);
        setBirthdayCheck(true);
        setIsOk(true);
    }, []);
    

    const handleClickMale = (e : React.MouseEvent<HTMLButtonElement>) =>{
        e.preventDefault();
        setStateGender(true);
    }
    const handleClickFeMale = (e : React.MouseEvent<HTMLButtonElement>) =>{
        e.preventDefault();
        setStateGender(false);
    }

    const handleOnClickNextStep = (e : React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const newBirth = birthday.toLocaleDateString();
        const map = newBirth.split(". ");
        const realBirth : number[] = [];
        map.map((v : any, i : any) => {
            realBirth[i] = v * 1;
            return null;
        });
        const objBirth ={
            year : realBirth[0],
            month : realBirth[1],
            day : realBirth[2]
        }
        dispatch(setBirth(objBirth));
        dispatch(setGender(gender));
        navigate("/confirmnick");
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
                    <Title>성별</Title>
                    {gender ? (
                        <>
                            <CheckBox style={{
                                background : "linear-gradient(96.42deg, #C09FDC 20.46%, #34B1FF 80.57%)",
                                color : "white"
                            }} onClick={handleClickMale}
                            >남</CheckBox>
                            <CheckBox style={{
                                marginLeft : "25px",
                            }} onClick={handleClickFeMale}
                            >여</CheckBox>
                        </>
                    ) : (
                        <>
                            <CheckBox onClick={handleClickMale}>남</CheckBox>
                            <CheckBox style={{
                                background : "linear-gradient(96.42deg, #C09FDC 20.46%, #34B1FF 80.57%)",
                                color : "white",
                                marginLeft : "25px"
                            }} onClick={handleClickFeMale}
                            >여</CheckBox>
                        </>
                    )}
                    <Title>생년월일</Title>
                    <Birth>
                        <Calendar
                            style={{
                                // zIndex : "",
                                position : "absolute",
                                width : "23px",
                                height : "23px",
                                left : "60px",
                                top : "472px"
                                // marginBottom : "5px"
                                // color : "#D7D7D7",

                            }}
                        />
                        <BirthDate date2={birthday} onChange={handleInputBirthday} />
                    </Birth>
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


export default ConfirmEtc;
