import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import ProgressBar from '@ramonak/react-progress-bar';
import { toast } from 'react-toastify';
import UserApi from 'common/api/UserApi';
import { useNavigate } from 'react-router-dom';
import Logo from '../../assets/Logo.png';
import { register, setId, setPwd, setEmail, setGender, setAtmos, setBirth, setNick, Register } from './registerReducer';
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
  margin-left: 58px;
  margin-top: 35px;
  margin-bottom: 40px;
  font-family: 'NotoSansKR';
  font-size: 22px;
`;
const Input = styled.input`
  font-family: 'NotoSansKR';
  font-size: 11px;
  width: 150px;
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
  font-style: normal;
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
const ErrorMsg = styled.span`
  position: absolute;
  color: red;
  font-family: 'NotoSansKR';
  font-size: 3px;
  top: 450px;
  left: 0px;
  margin-left: 61px;
`;

type MyProps = {
  progress: number;
};
function ConfirmId({ progress }: MyProps) {
  const [isOk, setIsOk] = useState<boolean>(false);
  const [id, setStateId] = useState<string>('');
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [isId, setIsId] = useState<boolean>(false);
  const navigate = useNavigate();


  const {getIdDuplicateCheck} = UserApi;
  const regist = useSelector<ReducerType, Register>((state) => state.registerReducer);
  const dispatch = useDispatch();
  // console.log(regist);

  const handleCheckId = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const idPattern = /^[a-zA-Z0-9]*$/;
    const idCurrent = e.currentTarget.value;
    setStateId(idCurrent);
    console.log(id);
    if (idCurrent === '') {
      setErrorMsg('아이디를 입력해주세요.');
      setIsId(false);
    } else if (idCurrent.length < 5 || idCurrent.length > 16) {
      setErrorMsg('5 ~ 16자 사이의 아이디를 입력해주세요.');
      setIsId(false);
    } else if (!idPattern.test(idCurrent)) {
      setErrorMsg('아이디는 숫자와 영어만 입력이 가능합니다.');
      setIsId(false);
    } else {
      setErrorMsg('');
      setIsId(true);
    }
  }, []);

  const handleCheckDuplicationId = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    // axios 요청
    const result = await getIdDuplicateCheck(id);
    
    if(result.status === 200){
      toast.success(<div style={{ width: 'inherit', fontSize: '14px' }}>사용가능한 아이디 입니다.</div>, {
        position: toast.POSITION.TOP_CENTER,
        role: 'alert',
      });
      setIsOk(true);
    }
    else{
      toast.error(<div style={{ width: 'inherit', fontSize: '14px' }}>사용불가능한 아이디 입니다.</div>, {
        position: toast.POSITION.TOP_CENTER,
        role: 'alert',
      });
      setIsOk(false);
    }
    // id 중복시 toast error 메세지
  };

  const handleOnClickNextStep = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    dispatch(setId(id));
    navigate('/regist/confirmpwd');
  };

  return (
    <main>
      <article>
        <div>
          <div>
            <Img src={Logo} alt="Logo" />
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
          <Title>아이디 설정</Title>
          <Input onChange={handleCheckId} placeholder="아이디를 입력해주세요." />
          <ConfirmBtn onClick={handleCheckDuplicationId} disabled={!isId}>
            중복확인
          </ConfirmBtn>
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
        </div>
      </article>
    </main>
  );
}

export default ConfirmId;
