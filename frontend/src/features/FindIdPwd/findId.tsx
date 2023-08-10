import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import ProgressBar from '@ramonak/react-progress-bar';
import { toast } from 'react-toastify';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import UserApi from 'common/api/UserApi';
import FindApi from 'common/api/FindApi';
import { useNavigate } from 'react-router-dom';
import { ConsoleSqlOutlined } from '@ant-design/icons';
import Logo from '../../assets/Logo.png';
import { ReducerType } from '../../app/rootReducer';

const Img = styled.img`
  width: 65px;
  height: 65px;
  margin-top: 155px;
  margin-left: 147px;
  margin-bottom: 25px;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
`;
const Progress = styled.div`
  margin-top: 55px;
  margin-left: 61px;
`;
const Title = styled.h3`
  text-align: left;
  margin-left: 75px;
  margin-top: 35px;
  margin-bottom: 2px;
  font-family: 'NotoSansKR';
  font-size: 22px;
`;
const Input = styled.input`
  font-family: 'NotoSansKR';
  font-size: 11px;
  width: 200px;
  height: 31px;
  margin-left: 80px;
  margin-bottom: 20px;
  padding-left: 3px;
  padding-bottom: 0px;
  border-left: none;
  border-top: none;
  border-right: none;
  border-bottom: #d7d7d7 1px solid;
`;


const DisableButton = styled.button`
  border-style: none;
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
const ErrorMsg = styled.span`
  position: absolute;
  color: red;
  font-family: 'NotoSansKR';
  font-size: 11px;
  top: 385px;
  left: 20px;
  margin-left: 61px;
`;
const Desc = styled.span`
  display: block;
  text-align: left;
  margin-left: 75px;
  margin-bottom: 18px;
  font-family: 'NotoSansKR';
  font-size: 11px;
`;
function FindId() {

  const [isOk, setIsOk] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const navigate = useNavigate();

  const handleInputEmail = (e: React.ChangeEvent<HTMLInputElement>) => {

    const regEmail = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;

    const curWord = e.currentTarget.value;

    // 이메일 형식 검사
    if (regEmail.test(curWord) === true) {
      setIsOk(true);
      setErrorMsg("");
    } else {
      setIsOk(false);
      setErrorMsg("이메일 형식을 맞춰주세요");
    }
    setEmail(curWord);
  };


  const handleOnClickNextStep = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const result = await findIdByEmail();
    
    navigate('/find/email', { state: { email, userId: result.userId, provider: result.provider } });
  };
  const pressEnter = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === `Enter`) {
      const result = await findIdByEmail();
      
      navigate('/find/email', { state: { email, userId: result.userId, provider: result.provider } });
    }

  };
  const findIdByEmail = async () => {
    const result = await FindApi.findIdByEmail(email);
    return result.data
  }

  return (
    <main>
      <article>
        <div>
          <div>
            <Img src={Logo} alt="Logo" />
          </div>
          <Title>아이디 찾기</Title>
          <Desc>가입 이메일을 입력하세요.</Desc>
          <Input onKeyDown={pressEnter} onChange={handleInputEmail} placeholder="이메일을 입력하세요." />
          <ErrorMsg>{errorMsg}</ErrorMsg>

          <div
            style={{
              position: 'absolute',
              marginLeft: '80px',
              top: '423px',
            }}
          >
            {isOk ? (
              <ActiveButton onClick={handleOnClickNextStep}>다 음</ActiveButton>
            ) : (
              <DisableButton>다 음</DisableButton>
            )}
          </div>
        </div>
      </article>
    </main>
  );
}

export default FindId;
