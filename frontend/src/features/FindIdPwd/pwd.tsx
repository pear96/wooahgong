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

const Form = styled.form`
  display : flex;
  flex-wrap : wrap;
  justify-content : center;
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
  margin-top : 20px;
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
  top: 420px;
  left: 80px;
  // margin-left: 61px;
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
  const { findPwSendEmail } = FindApi

  const onSubmit = useCallback(
    (e) => {
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
      if (!e.target[1].value || !e.target[1].value.trim()) {
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
      return null;
    },
    [id, inputEmail],
  );
  const handleOnClickNextStep = async (e : React.MouseEvent) => {
    const data = { userId: id, email };
      console.log("data : ", data)
      const result = await findPwSendEmail(data);

      if (result.status === 200) {
        navigate('/find/pwdAuth', { state: { userId: id, email: inputEmail } });
        return (toast.info(
          <div style={{ width: 'inherit', fontSize: '10px' }}>
            <div>이메일을 보냈습니다. 인증코드를 입력하세요.</div>
          </div>,
          {
            position: toast.POSITION.TOP_CENTER,
            role: 'alert',
          },
        ))
        // dispatch(setUser({ nickname: result.data.nickname, profileImg: result.data.profileImg }));
        // navigate("/map");
      }
      toast.error(
        <div style={{ width: 'inherit', fontSize: '10px' }}>
          <div>아이디와 이메일을 확인해주세요</div>
        </div>,
        {
          position: toast.POSITION.TOP_CENTER,
          role: 'alert',
        },
      );
      return null;
  }
  const handleInputEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    const regEmail = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;

    const curWord = e.currentTarget.value;
    // 이메일 형식 검사
    if (regEmail.test(curWord) === true) {
      setIsOk(true);
      setErrorMsg("");
      setEmail(curWord);
    } else {
      setIsOk(false);
      setErrorMsg("이메일 형식을 맞춰주세요");
    }
  };



  return (
    <main>
      <article>
        <div>
          <div>
            <Img src={Logo} alt="Logo" />
          </div>
          <Title>비밀번호 찾기</Title>
          <Form onSubmit={onSubmit}>
            <Input name="id" onChange={onChangeId} placeholder="아이디를 입력하세요." />
            <Input name="inputEmail" onChange={handleInputEmail} placeholder="이메일을 입력하세요." />
            <ErrorMsg>{errorMsg}</ErrorMsg>
          </Form>
          <div
              style={{
                position: 'absolute',
                marginLeft: '80px',
                top: '473px',
              }}
            >
              {isOk ? (
                <ActiveButton onClick={handleOnClickNextStep} >다 음</ActiveButton>
              ) : (
                <DisableButton>다 음</DisableButton>
              )}
            </div>
        </div>
      </article>
    </main>
  );
}

export default FindPwd;
