import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Spin } from 'antd';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import ProfileApi from 'common/api/ProfileApi';
import ProfileUpdateHeader from './components/update/ProfileUpdateHeader';
import ProfileUpdateBody from './components/update/ProfileUpdateBody';

function ProfileUpdate() {
  
  const [userId, setUserId] = useState<string>("");
  const [newNickname, setNewNickname] = useState<string>("");
  const [newMbti, setNewMbti] = useState<string>("");
  const [newMoods, setNewMoods] = useState<string[]>([]);
  const [isProvider, setProvider] = useState<boolean>();
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [isNick,setIsnickName] = useState<boolean>(true);
  const [mounted, setMounted] = useState<boolean>(false);

  const { nickname } = useParams<string>();
  const navigate = useNavigate();
  const getProfileForUpdateApi = async () => {
    if (nickname !== undefined) {
      const result = await ProfileApi.getProfileForUpdate(nickname);
  
      if (result.status === 200) {
        setUserId(result.data.userId);
        setNewNickname(result.data.nickname);
        setNewMbti(result.data.mbti);
        setNewMoods(result.data.moods);
        setProvider(result.data.provider);
        console.log(newNickname, newMbti, newMoods);
        setMounted(true);
      } else {
        navigate('/not-found');
      }
    }
  };
  const handleCheckNickname = (e : React.ChangeEvent<HTMLInputElement>)=>{
    // e.preventDefault()
    const alphaRegex = /[a-zA-Z]/;
    const hanRegex = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;
    const specialRegex =  /[!?@#$%^&*():;+=~{}<>\\-]|[|\\"',/`₩]/;
    const numberRegex = /[0-9]/;

    const curWord = e.currentTarget.value;
    console.log(curWord);
    if ((curWord.length < 5 || curWord.length > 8) && 
              (hanRegex.test(curWord) || alphaRegex.test(curWord))) {
      setErrorMsg("5글자 이상 8글자 이하, 한글 영문 숫자만 사용가능합니다");
      setIsnickName(false);

    } else if(specialRegex.test(curWord)) {
      console.log("???")
      setErrorMsg("특수 문자는 . _ 만 사용가능합니다");
      setIsnickName(false);
    } else{
      setErrorMsg("");
      setIsnickName(true);
    }
    setNewNickname(curWord);
  }

  useEffect(() => {
    getProfileForUpdateApi();
  }, []);

  return (
    <div style={{ marginLeft: 'auto', marginRight: 'auto', maxWidth: '1024px' }}>
      {mounted ? (
        <>
          <ProfileUpdateHeader newNickname={newNickname} newMbti={newMbti} newMoods={newMoods} isNick = {isNick} />
          <ProfileUpdateBody
            userId={userId}
            oldNickname={newNickname}
            oldMbti={newMbti}
            oldMoods={newMoods}
            isProvider={isProvider}
            changeNickname={handleCheckNickname}
            error={errorMsg}
            changeMbti={(mbti: string) => setNewMbti(mbti)}
            changeMoods={(moods: string[]) => setNewMoods(moods)}
          />
        </>
      ) : (
        <div style={{
          height : 720,
          display : "flex",
          alignItems : "center",
          justifyContent : "center"
        }}>
          <Spin size='large'/>
        </div>
      )}
    </div>
  );
}

export default ProfileUpdate;
