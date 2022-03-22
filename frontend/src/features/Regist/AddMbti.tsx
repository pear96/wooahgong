import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import ProgressBar from '@ramonak/react-progress-bar';
import { useNavigate } from 'react-router-dom';
import Logo from '../../assets/Logo.png';
import MbtiModal from './modal/MbtiModal';
import { register, setMbti, Register } from './registerReducer';
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
  margin-bottom: 20px;
  font-family: 'NotoSansKR';
  font-size: 22px;
`;
const Input = styled.input`
  font-family: 'NotoSansKR';
  font-size: 16px;
  font-weight: 700;
  width: 238px;
  height: 31px;
  margin-left: 58px;
  margin-top: 20px;
  padding-left: 3px;
  padding-bottom: 0px;
  border-left: none;
  border-top: none;
  border-right: none;
  border-bottom: #d7d7d7 1px solid;
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

type MyProps = {
  progress: number;
};
// 분위기: 모던, 내추럴, 러블리, 럭셔리, 유니크,
// 빈티지, 액티브, 클럽, 기타
function AddMbti({ progress }: MyProps) {
  const [isOk, setIsOk] = useState<boolean>(false);
  const [modal, setModal] = useState<boolean>(false);
  const [selectedmbti, setSelectedmbti] = useState<string>('');
  const [mbti, setStatembti] = useState([
    { type: 'ISTJ', check: false, color: '#F16464' },
    { type: 'ISTP', check: false, color: '#65FF74' },
    { type: 'ISFJ', check: false, color: '#2FBEFC' },
    { type: 'ISFP', check: false, color: '#FDABE1' },
    { type: 'INTJ', check: false, color: '#F18F64' },
    { type: 'INTP', check: false, color: '#4BE589' },
    { type: 'INFJ', check: false, color: '#2F81FC' },
    { type: 'INFP', check: false, color: '#8458FF' },
    { type: 'ESTJ', check: false, color: '#FFB951' },
    { type: 'ESTP', check: false, color: '#1AF2B1' },
    { type: 'ESFJ', check: false, color: '#18E2D6' },
    { type: 'ESFP', check: false, color: '#B386FD' },
    { type: 'ENTJ', check: false, color: '#FFCF25' },
    { type: 'ENTP', check: false, color: '#9AF562' },
    { type: 'ENFJ', check: false, color: '#33DAFF' },
    { type: 'ENFP', check: false, color: '#FD86F8' },
  ]);

  const navigate = useNavigate();

  const regist = useSelector<ReducerType, Register>((state) => state.registerReducer);
  const dispatch = useDispatch();

  const handleChangeValue = (e: any) => {
    e.stopPropagation();
  };
  const handleMbti = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    const index = e.currentTarget.innerText;
    setStatembti(
      mbti.map((v: { type: string; check: boolean; color: string }, i: number) =>
        v.type === index ? { ...v, check: true } : { ...v, check: false },
      ),
    );
    // handleChangeValue(e);
    handleCloseModal(e);
  };
  const handleOpenModal = (e: React.MouseEvent<HTMLInputElement>) => {
    e.stopPropagation();
    setModal(true);
  };
  const handleCloseModal = (e: React.MouseEvent) => {
    e.stopPropagation();
    setModal(false);
  };
  useEffect(() => {
    if (selectedmbti.length > 0) {
      console.log(selectedmbti);
      setIsOk(true);
    } else {
      setIsOk(false);
    }
  }, [selectedmbti]);
  useEffect(() => {
    for (let i = 0; i < mbti.length; i += 1) {
      if (mbti[i].check) {
        setSelectedmbti(mbti[i].type);
        break;
      }
    }
  }, [mbti]);
  const handleOnClickNextStep = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    dispatch(setMbti(selectedmbti));
    navigate('/regist/complete');
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
          <Title>MBTI 설정</Title>
          <Input
            value={selectedmbti}
            onChange={handleChangeValue}
            onClick={handleOpenModal}
            placeholder="클릭하여 MBTI를 설정해주세요."
          />
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
          <MbtiModal open={modal} onClose={handleCloseModal} handleMbti={handleMbti} mbti={mbti} />
        </div>
      </article>
    </main>
  );
}

export default AddMbti;
