import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import ProgressBar from '@ramonak/react-progress-bar';
import { toast } from 'react-toastify';
import UserApi from 'common/api/UserApi';
import FindApi from 'common/api/FindApi';
import { useNavigate } from 'react-router-dom';
import Logo from '../../assets/Logo.png';
import { ReducerType } from '../../app/rootReducer';
import useInput from '../../common/hooks/useInput';

export const Form = styled.form`
  margin: 0 auto;
  max-width: 400px;
`;
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
  margin-left: 58px;
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
  margin-left: 58px;
  margin-bottom: 20px;
  padding-left: 3px;
  padding-bottom: 0px;
  border-left: none;
  border-top: none;
  border-right: none;
  border-bottom: #d7d7d7 1px solid;
`;
const ConfirmBtn = styled.button`
  width: 80px;
  height: 23px;
  margin-left: 10px;
  font-family: 'NotoSansKR';
  font-size: 10px;
  font-weight: 400;
  background: #ffffff;
  border: 0.7px solid #b0b0b0;
  border-radius: 50px;
  cursor: pointer;
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
  font-size: 3px;
  top: 450px;
  left: 0px;
  margin-left: 61px;
`;
const Desc = styled.span`
  display: block;
  text-align: left;
  margin-left: 60px;
  margin-bottom: 18px;
  font-family: 'NotoSansKR';
  font-size: 11px;
`;
// type MyProps = {
//   progress: number;
// };
function FindPwd() {
  const [isOk, setIsOk] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [id, onChangeId] = useInput('');
  const [inputEmail, onChangeEmail] = useInput('');
  const navigate = useNavigate();

  // APIs.
  const { getNickDuplicateCheck } = UserApi

  const onSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      console.log(e.target[0].value, e.target[1].value);
      if (!id || !id.trim()) {
        return toast.info(
          <div style={{ width: 'inherit', fontSize: '10px' }}>
            <div>아이디를 입력해주세요.</div>
          </div>,
          {
            position: toast.POSITION.TOP_CENTER,
            role: 'alert',
          },
        );
      }
      if (!inputEmail || !inputEmail.trim()) {
        return toast.info(
          <div style={{ width: 'inherit', fontSize: '10px' }}>
            <div>이메일을 입력해주세요.</div>
          </div>,
          {
            position: toast.POSITION.TOP_CENTER,
            role: 'alert',
          },
        );
      }
      const data = { id, email };
      const result = await getCommonLoginResult(data);
    },
    [id, inputEmail],
  );

  // const regist = useSelector<ReducerType, Register>((state) => state.registerReducer);
  const dispatch = useDispatch();

  const handleInputEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

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
    const userId = await findIdByEmail();
    navigate('/find/email', { state: { email, userId } });
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
          <Title>비밀번호 찾기</Title>
          <Form onSubmit={onSubmit}>
            <Input placeholder="아이디를 입력하세요." />
            <Input onChange={handleInputEmail} placeholder="이메일을 입력하세요." />
            <ErrorMsg>{errorMsg}</ErrorMsg>

            <div
              style={{
                position: 'absolute',
                marginLeft: '80px',
                top: '523px',
              }}
            >
              {isOk ? (
                <ActiveButton onClick={handleOnClickNextStep}>다 음</ActiveButton>
              ) : (
                <DisableButton>다 음</DisableButton>
              )}
            </div>
          </Form>
        </div>
      </article>
    </main>
  );
}

export default FindPwd;
