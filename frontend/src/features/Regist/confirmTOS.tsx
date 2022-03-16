import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import {useNavigate} from "react-router-dom";
import ProgressBar from "@ramonak/react-progress-bar";
import Agree from "./modal/Agree";
import AccountPolicy from './modal/AccountPolicy';
import Logo from "../../assets/Logo.png";
import {ReactComponent as UnCheck} from "../../assets/comment.svg";
import {ReactComponent as Check} from "../../assets/checkComment.svg";

const Img = styled.img`
  width : 65px;
  height : 65px;
  margin-top : 135px;
  margin-left : 147px;
  margin-bottom : 25px;
  filter : drop-shadow(0px 4px 4px rgba(0,0,0,0.25));
`
const Title = styled.h3`
  text-align : left;
  margin-left : 25px;
  margin-top : 0px;
  margin-bottom : 5px;
`
const AllCheckBox = styled.div`
  margin-top : 42px;
  font-size : 18px;
  font-weight : bold;
  margin-left : 60px;
`
const CheckBox = styled.div`
  margin-top : 30px;
  font-size : 16px;
  font-weight : bold;
  margin-left : 60px;
`
const TextBox = styled.div`
  width : 254px;
  height : 55px;
  margin-top : 10px;
  margin-left : 61px;
  font-style : normal;
  font-size : 11px;
  font-weight : 400;
  line-height : 16px;
  display : flex;
  align-items : center;
`
const Line = styled.div`
  width : 310px;
  height : 0px;
  margin-top : 30px;

  margin-left : 25px;
  border : 1px solid #D7D7D7;
`

type MyProps = {
    progress : number
}

function ConfirmTOS({progress} : MyProps){
    const [TOS, setTOS] = useState<boolean>(false);
    const [privacy, setPrivacy] = useState<boolean>(false);
    const [total, setTotal] = useState<boolean>(false);
    const [confirm, setConfirm] = useState<boolean>(false);
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [accountOpen, setAccountOpen] = useState<boolean>(false);
    const navigate = useNavigate();

    const openRoomConfigModal = () => {
      setModalOpen(true);
    };
    const openAccountModal = () => {
      setAccountOpen(true);
    };
    const closeRoomConfigModal = (e : any) => {
      setModalOpen(false);
    };
    const closeAccountModal = (e : any) => {
      setAccountOpen(false);
    };
    const handleTosClick = (e : any) => {
      e.stopPropagation();
      setTOS(!TOS);
    };
    const handlePrivacyClick = (e : any) => {
      e.stopPropagation();
      setPrivacy(!privacy);
    };
    const handleTosPrivacyClick = () => {

        // setTOS(!TOS);
        // setPrivacy(!privacy);
        // setTotal(!total);
    
        // setTOS(!TOS);
        // setPrivacy(!privacy);
        // setTotal(!total);
      
      if(total && TOS && !privacy){
        setPrivacy(!privacy);
      }
      else if(total && !TOS && !privacy){
        setTOS(!TOS);
        setPrivacy(!privacy);
        setTotal(!total);
      }
      else if(total && !TOS && privacy){
        setTOS(!TOS);
        setPrivacy(!privacy);
        setTotal(!total);
      }
      else{
        setTOS(!TOS);
        setPrivacy(!privacy);
        setTotal(!total);
      }
      console.log(TOS, privacy);
    }
    const handleClick = (e : React.MouseEvent | React.KeyboardEvent) => {
      e.preventDefault();
      navigate("/user/signup/checkId");
    };
    const handleCheck = (e : any) => {
      e.stopPropagation();
    };
    const onCheckEnter = (e : React.KeyboardEvent) => {
      if (e.key === "Enter") {
        handleClick(e);
      }
    };
  
    useEffect(() => {
      if (TOS && privacy) {
        setConfirm(true);
      } else {
        setConfirm(false);
      }
    }, [TOS, privacy]);
    return (
      <main>
        <article>
          <div>
            <div>
              <Img src={Logo} alt="Logo"/>
              {/* <ProgressBar
                completed={progress}
                customLabel=" "
                width="20%"
                height="5px"
                bgColor="#ff2e63"
              baseBgColor="#0000"
              /> */}
            </div>
            <Title>우리만 아는 공간</Title>
            <Title>서비스 약관에 동의 해주세요.</Title>
            <AllCheckBox>
              {total === false ? (
                <UnCheck 
                onClick={handleTosPrivacyClick}
                filter = "invert(53%) sepia(7%) saturate(13%) hue-rotate(56deg) brightness(93%) contrast(88%)"
                style={{
                  width : "20px",
                  height : "20px",
                  // marginLeft : "29px",
                  // marginTop : "30px",
                  left : "29px",
                  top : "327px",
                  display : "inline",
                  position : "absolute",
                  cursor : "pointer"
                }}
              />
              ):(
                <Check 
                onClick={handleTosPrivacyClick}
                style={{
                  width : "20px",
                  height : "20px",
                  // marginLeft : "29px",
                  // marginTop : "30px",
                  left : "29px",
                  top : "327px",
                  display : "inline",
                  position : "absolute",
                  cursor : "pointer"
                }}/>
              )}
              
              모두 동의합니다.
            </AllCheckBox>
            <TextBox>
              전체동의는 필수 및 선택정보에 대한 동의도 포함되어 있으며, 개별적으로도 동의를 선택하실 수 있습니다. 선택항목에 대한 동의를 거부하시는 경우에도 서비스는 이용이 가능합니다.
            </TextBox>
            <Line/>
            <CheckBox
              onClick={openAccountModal}
            >
              {TOS === false ? (
                <UnCheck
                onClick = {handleTosClick} 
                filter = "invert(53%) sepia(7%) saturate(13%) hue-rotate(56deg) brightness(93%) contrast(88%)"
                style={{
                  width : "20px",
                  height : "20px",
                  // marginLeft : "29px",
                  // marginTop : "30px",
                  left : "29px",
                  top : "477px",
                  display : "inline",
                  position : "absolute",
                  cursor : "pointer"
                }}
              />
              ):(
                <Check 
                onClick = {handleTosClick} 
                style={{
                  width : "20px",
                  height : "20px",
                  // marginLeft : "29px",
                  // marginTop : "30px",
                  left : "29px",
                  top : "477px",
                  display : "inline",
                  position : "absolute",
                  cursor : "pointer"
                }}/>
              )}
              [필수] 우리만아는공간 계정약관
            </CheckBox>
            <CheckBox onClick={openRoomConfigModal}>
              {privacy === false ? (
                <UnCheck
                onClick = {handlePrivacyClick}
                filter = "invert(53%) sepia(7%) saturate(13%) hue-rotate(56deg) brightness(93%) contrast(88%)"
                style={{
                  width : "20px",
                  height : "20px",
                  // marginLeft : "29px",
                  // marginTop : "30px",
                  left : "29px",
                  top : "528px",
                  display : "inline",
                  position : "absolute"
                }}
              />
              ):(
                <Check
                onClick = {handlePrivacyClick}
                style={{
                  width : "20px",
                  height : "20px",
                  // marginLeft : "29px",
                  // marginTop : "30px",
                  left : "29px",
                  top : "528px",
                  display : "inline",
                  position : "absolute"
                }}
              />
              )}
              
              [필수] 개인정보 수집 및 이용동의
            </CheckBox>
            <AccountPolicy open={accountOpen} onClose={closeAccountModal}/>
            <Agree open={modalOpen} onClose={closeRoomConfigModal}/>
          </div>
        </article>
      </main>
    )
}


export default ConfirmTOS;
