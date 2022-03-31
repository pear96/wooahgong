import React from 'react';
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

  console.log(userNickname, userImage);
  return (
    <>
      <HeaderContainer>
        <div style={{ marginRight: '25px', width: '20px' }}>
          <Avatar size={64} src={userImage} icon={<UserOutlined />} />
        </div>
        <NicknameContainer>{userNickname}</NicknameContainer>
      </HeaderContainer>
      <ContentText>
        <CustomText>{updateContent}</CustomText>
      </ContentText>
      <div style={{ marginLeft: '20px' }}>
        <p>{CreateDate}</p>
      </div>
    </>
  );
}

export default CommentHeader;
