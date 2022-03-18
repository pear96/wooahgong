import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import ProgressBar from "@ramonak/react-progress-bar";
import { toast } from "react-toastify";
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
    font-family : "NotoSansKR";
    font-size : 22px;
`
const Input = styled.input`
    font-family : "NotoSansKR";
    font-size : 11px;
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
const ConfirmBtn = styled.button`
    width : 80px;
    height : 23px;
    margin-left : 10px;
    font-family : "NotoSansKR";
    font-size : 10px;
    font-style : normal;
    font-weight : 400;
    background: #FFFFFF;
    border : 0.7px solid #B0B0B0;
    border-radius : 50px;
    cursor : pointer;
`
const DisableButton = styled.button`
    border-style : none;
    border-radius : 10px;
    width : 200px;
    height : 40px;
    font-family : "NotoSansKR";
    font-size : 16px;
    font-style : normal;
    font-weight : 500;
    cursor : default;
    color : rgba(0,0,0, 0.5);
`
const ActiveButton = styled.button`
    background: #80B2FE;
    border-style : none;
    border-radius : 10px;
    width : 200px;
    height : 40px;
    font-family : "NotoSansKR";
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
const PwdErrorMsg = styled.span`
    position : absolute;
    color : red;
    font-family : "NotoSansKR";
    font-size : 3px;
    top : 428px;
    left : 0px;
    margin-left : 61px;
`
const PwdCheckErrorMsg = styled.span`
    position : absolute;
    color : red;
    font-family : "NotoSansKR";
    font-size : 3px;
    top : 481px;
    left : 0px;
    margin-left : 61px;
`

type MyProps = {
    progress : number
}

function ConfirmPwd({progress} : MyProps){
    const [isOk, setIsOk] = useState<boolean>(false);
    const [pwd, setStatePwd] = useState<string>("");
    const [pwdCheck, setPwdCheck] = useState<string>("");
    const [pwdErrorMsg, setPwdErrorMsg] = useState<string>("");
    const [pwdCheckErrorMsg, setPwdCheckErrorMsg] = useState<string>("");
    const navigate = useNavigate();

    const regist = useSelector<ReducerType, Register>(state => state.registerReducer);
    const dispatch = useDispatch();
    console.log(regist);

    const handleCheckPwd = (e : React.ChangeEvent<HTMLInputElement>)=>{
        e.preventDefault();
        const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,20}$/;
        const curPwd = e.currentTarget.value;
        setStatePwd(curPwd);
        console.log(pwd);
        if(!passwordRegex.test(curPwd)){
            setPwdErrorMsg("숫자+영문자+특수문자 조합으로 8자리 이상 입력!");
        }
        else{
            console.log(curPwd);
            // setStatePwd(curPwd);
            setPwdErrorMsg("");
        }
    };
    const handleCheckCheckPwd = (e : React.ChangeEvent<HTMLInputElement>)=>{
        e.preventDefault();
        const curPwd = e.currentTarget.value;
        console.log(curPwd);
        setPwdCheck(curPwd);

        if(pwd !== curPwd){
            // setStatePwd(pwd);
            setPwdCheckErrorMsg("비밀번호가 일치하지 않습니다.");
            setIsOk(false);
        }
        else{
            console.log("????");
            setPwdCheckErrorMsg("");
            setIsOk(true);
        }
    };


    const handleOnClickNextStep = (e : React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        dispatch(setPwd(pwd));
        navigate("/confirmetc");
    }
    return (
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
                    <Title>비밀번호 설정</Title>
                    <Input type="password" placeholder='비밀번호를 입력해주세요.' onChange={handleCheckPwd}/>
                    <PwdErrorMsg>{pwdErrorMsg}</PwdErrorMsg>
                    <Input type="password" placeholder='비밀번호 확인' onChange={handleCheckCheckPwd}/>
                    <PwdCheckErrorMsg>{pwdCheckErrorMsg}</PwdCheckErrorMsg>
                    <div style={{
                        position : "absolute",
                        marginLeft : "80px",
                        top : "523px"
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


export default ConfirmPwd;
