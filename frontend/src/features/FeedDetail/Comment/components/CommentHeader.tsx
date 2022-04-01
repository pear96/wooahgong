import React, { useEffect, useState } from 'react';
import { useAppSelector } from 'app/store';
import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { HeaderContainer, NicknameContainer, ContentText, CustomText } from '../styles/styledCommentHeader';

// 리덕스로 전역처리해서 데이터 가져오면 될듯,,

function CommentHeader() {
  const { updateContent } = useAppSelector((state) => state.feeddetail);
  const { userImage } = useAppSelector((state) => state.feeddetail);
  const { userNickname } = useAppSelector((state) => state.feeddetail);
  const { CreateDate } = useAppSelector((state) => state.feeddetail);

  const [image, setImage] = useState(userImage);
  const [content, setContent] = useState(updateContent);
  const [nickname, setNickname] = useState(userNickname);
  const [createDate, setCreateDate] = useState(CreateDate);

  useEffect(() => {
    setImage(window.localStorage.getItem('image') || '');
    setContent(window.localStorage.getItem('content') || '');
    setNickname(window.localStorage.getItem('nickname') || '');
    setCreateDate(window.localStorage.getItem('createDate') || '');
  }, []);

  useEffect(() => {
    window.localStorage.setItem('image', image);
    window.localStorage.setItem('content', content);
    window.localStorage.setItem('nickname', nickname);
    window.localStorage.setItem('createDate', createDate);
  }, [image, content, nickname, createDate]);
  console.log(userNickname, userImage);
  return (
    <>
      <HeaderContainer>
        <div style={{ marginRight: '25px', width: '20px' }}>
          <Avatar size={64} src={image} icon={<UserOutlined />} />
        </div>
        <NicknameContainer>{nickname}</NicknameContainer>
      </HeaderContainer>
      <ContentText>
        <CustomText>{content}</CustomText>
      </ContentText>
      <div style={{ marginLeft: '20px', fontFamily: 'NotoSansKR' }}>
        <p>{createDate}</p>
      </div>
    </>
  );
}

export default CommentHeader;
