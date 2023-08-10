import React, {useState} from 'react';
import styled from 'styled-components';
import ProfileApi from 'common/api/ProfileApi';
import style from './PasswordChange.module.css';


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
  font-size: 11px;
  width: 238px;
  height: 31px;
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
const PwdErrorMsg = styled.span`
  position: absolute;
  color: red;
  font-family: 'NotoSansKR';
  font-size: 3px;
  top : 30px;
  left: -50px;
  margin-left: 61px;
`;
const PwdCheckErrorMsg = styled.span`
  position: absolute;
  color: red;
  font-family: 'NotoSansKR';
  font-size: 3px;
  top : 80px;
  left: -50px;
  margin-left: 61px;
`;

type MyProps = {
    open: boolean,
    id : string,
    onClose: (e: any) => void
};

function PasswordChange({ open, id, onClose }: MyProps) {
    
    const [isOk, setIsOk] = useState<boolean>(false);
    const [pwd, setStatePwd] = useState<string>('');
    const [pwdCheck, setPwdCheck] = useState<string>('');
    const [pwdErrorMsg, setPwdErrorMsg] = useState<string>('');
    const [pwdCheckErrorMsg, setPwdCheckErrorMsg] = useState<string>('');
    
    const {getPwdChangeResult} = ProfileApi;
    
    const handleStopEvent = (e: React.MouseEvent<HTMLDivElement> | any) => {
        e.stopPropagation();
    };
    const handleCheckPwd = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{5,15}$/;
        const curPwd = e.currentTarget.value;
        setStatePwd(curPwd);
        
        if (!passwordRegex.test(curPwd)) {
            setPwdErrorMsg('숫자+영문자+특수문자 조합으로 8자리 이상 입력!');
        } else {
            
            // setStatePwd(curPwd);
            setPwdErrorMsg('');
        }
    };
    const handleCheckCheckPwd = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        const curPwd = e.currentTarget.value;
        
        setPwdCheck(curPwd);
        if (pwd !== curPwd) {
            setPwdCheckErrorMsg('비밀번호가 일치하지 않습니다.');
            setIsOk(false);
        } else {
            setPwdCheckErrorMsg('');
            setIsOk(true);
        }
    };
    const handleClickConfirm = async (e : React.MouseEvent) => {
        const body = {
            userId : id,
            password : pwd
        }
        const result = await getPwdChangeResult(body);
        if(result.status === 200){
            
            onClose(e);
        }
    
    }

    return (
        <div
        className={open ? `${style.openModal} ${style.modal}` : style.modal}
        onClick={onClose}
        onKeyDown={handleStopEvent}
        role="button"
        tabIndex={0}
        >
        {open ? (
            <section className={style.modalForm} onClick={handleStopEvent} onKeyDown={handleStopEvent} role="button" tabIndex={0}>
            <header>
                <h3 className={style.title}>비밀번호 재설정</h3>
            </header>
            <main>
                <div className={style.configForm}>
                    <Input type="password" placeholder="비밀번호를 입력해주세요." onChange={handleCheckPwd} />
                    <PwdErrorMsg>{pwdErrorMsg}</PwdErrorMsg>
                    <Input type="password" placeholder="비밀번호 확인" onChange={handleCheckCheckPwd} />
                    <PwdCheckErrorMsg>{pwdCheckErrorMsg}</PwdCheckErrorMsg>
                    <div
                        style={{
                        position: 'absolute',
                        marginLeft: '30px',
                        top: 120,
                        }}
                    >
                        {isOk ? (
                        <ActiveButton onClick={handleClickConfirm}>변경</ActiveButton>
                        ) : (
                        <DisableButton>변경</DisableButton>
                        )}
                    </div>
                </div>
            </main>
            </section>
        ) : null}
        </div>
    );
}

export default PasswordChange;
