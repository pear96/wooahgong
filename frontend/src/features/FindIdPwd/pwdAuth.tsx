import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import ProgressBar from '@ramonak/react-progress-bar';
import { toast } from 'react-toastify';
import UserApi from 'common/api/UserApi';
import FindApi from 'common/api/FindApi';
import { useNavigate, useLocation } from 'react-router-dom';
import Logo from '../../assets/Logo.png';
import { ReducerType } from '../../app/rootReducer';
import useInput from '../../common/hooks/useInput';

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
  margin-left: 80px;
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
interface Location {
  userId: string,
  email: string
}
function FindPwd() {
  const location = useLocation();
  const [isOk, setIsOk] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [authcode, onChangeAuthcode] = useState<string>('');
  const navigate = useNavigate();
  const state = location.state as Location;

  // APIs.
  const { findPwInsertCode } = FindApi

  const onSubmit = async (e : React.MouseEvent) => {
      console.log(authcode)
      e.preventDefault();
      // 인증코드가 비어있을때
      if (!authcode || !authcode.trim()) {
        return toast.info(
          <div style={{ width: 'inherit', fontSize: '10px' }}>
            <div>인증코드를 입력해주세요.</div>
          </div>,
          {
            position: toast.POSITION.TOP_CENTER,
            role: 'alert',
          },
        );
      }
      const data = { userId: state.userId, authCode: authcode }
      const result = await findPwInsertCode(data);
      // 인증코드 성공
      if (result.status === 200) {
        navigate('/find/resetPwd', { state: { userId: state.userId } });
        
        return (toast.info(
          <div style={{ width: 'inherit', fontSize: '10px' }}>
            <div>인증코드가 일치합니다.</div>
          </div>,
          {
            position: toast.POSITION.TOP_CENTER,
            role: 'alert',
          },
        ))

      }
      toast.error(
        <div style={{ width: 'inherit', fontSize: '10px' }}>
          <div>인증코드가 올바르지 않습니다.</div>
        </div>,
        {
          position: toast.POSITION.TOP_CENTER,
          role: 'alert',
        },
      );
      return null;
    }

  const handleOnChangeAuthcode = (e: React.ChangeEvent<HTMLInputElement>) => {
    const curWord = e.currentTarget.value;
    onChangeAuthcode(curWord);
    setIsOk(true);
  };

  return (
    <main>
      <article>
        <div>
          <div>
            <Img src={Logo} alt="Logo" />
          </div>
          <Title>비밀번호 찾기</Title>
          <Input name="authcode" onChange={handleOnChangeAuthcode} placeholder="인증코드를 입력하세요." />
          <ErrorMsg>{errorMsg}</ErrorMsg>

          <div
            style={{
              position: 'absolute',
              marginLeft: '80px',
              top: '423px',
            }}
          >
            {isOk ? (
              <ActiveButton onClick={onSubmit}>다 음</ActiveButton>
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
