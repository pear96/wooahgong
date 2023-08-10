import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Agree from './modal/Agree';
import AccountPolicy from './modal/AccountPolicy';
import Logo from '../../assets/Logo.png';
import { ReactComponent as UnCheck } from '../../assets/comment.svg';
import { ReactComponent as Check } from '../../assets/checkComment.svg';
import { register, setProvider, Register } from './registerReducer';
import { ReducerType } from '../../app/rootReducer';

const Img = styled.img`
  width: 65px;
  height: 65px;
  margin-top: 135px;
  margin-left: 147px;
  margin-bottom: 25px;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
`;
const Title = styled.h3`
  font-family: 'NotoSansKR';
  text-align: left;
  margin-left: 25px;
  margin-top: 0px;
  margin-bottom: 5px;
`;
const AllCheckBox = styled.div`
  margin-top: 42px;
  font-family: 'NotoSansKR';
  font-size: 18px;
  font-weight: bold;
  margin-left: 60px;
  cursor: default;
`;
const CheckBox = styled.div`
  margin-top: 30px;
  font-family: 'NotoSansKR';
  font-size: 16px;
  font-weight: bold;
  margin-left: 60px;
  cursor: pointer;
  width: 250px;
`;
const TextBox = styled.div`
  width: 254px;
  height: 55px;
  margin-top: 10px;
  margin-left: 61px;
  font-family: 'NotoSansKR';
  font-style: normal;
  font-size: 11px;
  font-weight: 400;
  line-height: 16px;
  display: flex;
  align-items: center;
  cursor: default;
`;
const Line = styled.div`
  width: 310px;
  height: 0px;
  margin-top: 30px;
  margin-left: 25px;
  border: 1px solid #d7d7d7;
`;
const DisableButton = styled.button`
  border-style: none;
  border-radius: 10px;
  width: 200px;
  height: 40px;
  font-family: 'NotoSansKR';
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  cursor: default;
  color: rgba(0, 0, 0, 0.5);
`;
const ActiveButton = styled.button`
  background: #80b2fe;
  border-style: none;
  border-radius: 10px;
  width: 200px;
  height: 40px;
  font-family: 'NotoSansKR';
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  cursor: pointer;
  color: rgba(255, 255, 255, 1);
  transition: all 0.3s ease 0s;
  &:hover {
    box-shadow: 0rem 0.5rem 2rem rgba(179, 161, 224, 0.4);
    transform: translateY(-7px);
  }
`;
type MyProps = {
  progress: number;
};

function ConfirmTOS({ progress }: MyProps) {
  const [TOS, setTOS] = useState<boolean>(false);
  const [privacy, setPrivacy] = useState<boolean>(false);
  const [total, setTotal] = useState<boolean>(false);
  const [confirm, setConfirm] = useState<boolean>(false);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [accountOpen, setAccountOpen] = useState<boolean>(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const openModal = () => {
    setModalOpen(true);
  };
  const openAccountModal = () => {
    setAccountOpen(true);
  };
  const closeModal = (e: any) => {
    e.stopPropagation();
    setModalOpen(false);
  };
  const closeAccountModal = (e: any) => {
    e.stopPropagation();
    setAccountOpen(false);
  };
  const handleTosClick = (e: any) => {
    e.stopPropagation();
    if (total) setTotal(!total);
    setTOS(!TOS);
  };
  const handlePrivacyClick = (e: any) => {
    e.stopPropagation();
    if (total) setTotal(!total);
    setPrivacy(!privacy);
  };
  const handleTosPrivacyClick = () => {
    if (!total && TOS && !privacy) {
      setPrivacy(!privacy);
      setTotal(!total);
    } else if (!total && !TOS && privacy) {
      setTOS(!TOS);
      setTotal(!total);
    } else if (total && TOS && !privacy) {
      setTOS(!TOS);
      setTotal(!total);
    } else if (total && !TOS && privacy) {
      setPrivacy(!privacy);
      setTotal(!total);
    } else if (!total && TOS && privacy) {
      setTotal(!total);
    } else {
      setTOS(!TOS);
      setPrivacy(!privacy);
      setTotal(!total);
    }
    
  };
  const handleClick = (e: React.MouseEvent | React.KeyboardEvent) => {
    e.preventDefault();
    dispatch(setProvider(false));
    navigate('/regist/checkmail');
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
            <Img src={Logo} alt="Logo" />
          </div>
          <Title>우리만 아는 공간</Title>
          <Title>서비스 약관에 동의 해주세요.</Title>
          <AllCheckBox>
            {total === false ? (
              <UnCheck
                onClick={handleTosPrivacyClick}
                filter="invert(53%) sepia(7%) saturate(13%) hue-rotate(56deg) brightness(93%) contrast(88%)"
                style={{
                  width: '20px',
                  height: '20px',
                  left: '29px',
                  top: '334px',
                  display: 'inline',
                  position: 'absolute',
                  cursor: 'pointer',
                }}
              />
            ) : (
              <Check
                onClick={handleTosPrivacyClick}
                style={{
                  width: '20px',
                  height: '20px',
                  left: '29px',
                  top: '334px',
                  display: 'inline',
                  position: 'absolute',
                  cursor: 'pointer',
                }}
              />
            )}
            모두 동의합니다.
          </AllCheckBox>
          <TextBox>
            전체동의는 필수 및 선택정보에 대한 동의도 포함되어 있으며, 개별적으로도 동의를 선택하실 수 있습니다.
            선택항목에 대한 동의를 거부하시는 경우에도 서비스는 이용이 가능합니다.
          </TextBox>
          <Line />
          {TOS === false ? (
            <UnCheck
              onClick={handleTosClick}
              filter="invert(53%) sepia(7%) saturate(13%) hue-rotate(56deg) brightness(93%) contrast(88%)"
              style={{
                width: '20px',
                height: '20px',
                left: '29px',
                top: '486px',
                display: 'inline',
                position: 'absolute',
                cursor: 'pointer',
              }}
            />
          ) : (
            <Check
              onClick={handleTosClick}
              style={{
                width: '20px',
                height: '20px',
                left: '29px',
                top: '486px',
                display: 'inline',
                position: 'absolute',
                cursor: 'pointer',
              }}
            />
          )}
          <CheckBox onClick={openAccountModal}>[필수] 우리만아는공간 계정약관</CheckBox>
          {privacy === false ? (
            <UnCheck
              onClick={handlePrivacyClick}
              filter="invert(53%) sepia(7%) saturate(13%) hue-rotate(56deg) brightness(93%) contrast(88%)"
              style={{
                width: '20px',
                height: '20px',
                // marginLeft : "29px",
                // marginTop : "30px",
                left: '29px',
                top: '540px',
                display: 'inline',
                position: 'absolute',
              }}
            />
          ) : (
            <Check
              onClick={handlePrivacyClick}
              style={{
                width: '20px',
                height: '20px',
                // marginLeft : "29px",
                // marginTop : "30px",
                left: '29px',
                top: '540px',
                display: 'inline',
                position: 'absolute',
              }}
            />
          )}
          <CheckBox onClick={openModal}>[필수] 개인정보 수집 및 이용동의</CheckBox>
          <div
            style={{
              textAlign: 'center',
              marginTop: '65px',
            }}
          >
            {confirm ? <ActiveButton onClick={handleClick}>다 음</ActiveButton> : <DisableButton>다 음</DisableButton>}
          </div>

          <AccountPolicy open={accountOpen} onClose={closeAccountModal} />
          <Agree open={modalOpen} onClose={closeModal} />
        </div>
        {/* {confirm ? null :(
            <DisableButton>다음</DisableButton>
          )} */}
      </article>
    </main>
  );
}

export default ConfirmTOS;
