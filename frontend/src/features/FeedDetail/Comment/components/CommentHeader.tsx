import React, { useEffect, useState } from 'react';
import { Avatar } from 'antd';
import { useAppSelector } from 'app/store';
import { UserOutlined } from '@ant-design/icons';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { typeState } from 'features/FeedDetail/components/Feedfooter';
import { HeaderContainer, NicknameContainer, ContentText, CustomText } from '../styles/styledCommentHeader';

// 리덕스로 전역처리해서 데이터 가져오면 될듯,,

interface locState {
  myState: typeState;
}

function CommentHeader() {
  const [userImage, setuserImage] = useState<string>();
  const [userNickname, setuserNickname] = useState<string>();
  const [updateContent, setupdateContent] = useState<string>();
  const [CreateDate, setCreateDate] = useState<string>();
  const [settingEnd, setSettingEnd] = useState<boolean>(false);
  const [myState, setMyState] = useState<any>(null);
  const [loadData, setLoadData] = useState<boolean>(false);

  const navigate = useNavigate();
  const location = useLocation();
  const state = location?.state as locState;
  // console.log(state);
  const {placeSeq, feedSeq} = useParams();
  
  const handleRedirect = () => {
    navigate(`/profile/${userNickname}`);
  }
  const handleStopEvent = (e : React.KeyboardEvent<HTMLDivElement>) => {
    e.stopPropagation();
  }
  useEffect(() => {
    if(settingEnd){
      console.log("???????????????????????????????????????");
      const iamge = window.localStorage.getItem('userImage');
      const name = window.localStorage.getItem('userNickname');
      const content = window.localStorage.getItem('updateContent');
      const date = window.localStorage.getItem('CreateDate');
      if (iamge !== null && name !== null && content !== null && date !== null) {
        setuserImage(iamge);  
        setuserNickname(name);
        setupdateContent(content);
        setCreateDate(date);
        setLoadData(true)
      }
      else{
        navigate(`/place/${placeSeq}/feeds/${feedSeq}`);
      }
    }
  }, [settingEnd]);
  useEffect(()=>{
    return () => {
      window.localStorage.removeItem('userImage');
      window.localStorage.removeItem('userNickname');
      window.localStorage.removeItem('updateContent');
      window.localStorage.removeItem('CreateDate');
    }
  
  },[]);

  useEffect(()=>{
    if(myState !== null){
      console.log(myState);
      window.localStorage.setItem('userImage', myState.userImage);
      window.localStorage.setItem('userNickname', myState.nickname);
      window.localStorage.setItem('updateContent', myState.content);
      window.localStorage.setItem('CreateDate', myState.createDate);
      setSettingEnd(true);
    }
  },[myState])

  useEffect(()=>{
    console.log(state);
    if(state !== null){
      setMyState(state.myState);
    }
    else if(window.localStorage.getItem('updateContent') === null){
      navigate(`/place/${placeSeq}/feeds/${feedSeq}`);
    }
  }, [state])

  return (
    <div>
      {loadData === true ? (
      <>
      <HeaderContainer>
        <div onKeyDown={handleStopEvent} onClick={handleRedirect} style={{ width: '64px', margin: '0px 15px', cursor : 'pointer' }} role="img">
          <Avatar size={64} src={userImage} icon={<UserOutlined />} />
        </div>
        <NicknameContainer style={{cursor : 'pointer'}} onClick={handleRedirect}>{userNickname}</NicknameContainer>
      </HeaderContainer>
      <ContentText>
        <CustomText>{updateContent}</CustomText>
      </ContentText>
      <div style={{ marginLeft: '20px', fontFamily: 'NotoSansKR' }}>
        <p>{CreateDate}</p>
      </div>
      </>) : (null)}
    </div>
  );
}

export default CommentHeader;
