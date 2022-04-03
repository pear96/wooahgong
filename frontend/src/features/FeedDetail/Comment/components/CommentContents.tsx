import React, { useCallback, useState } from 'react';
import { Avatar } from 'antd';
import { UserOutlined, HeartOutlined, CloseOutlined, HeartTwoTone } from '@ant-design/icons';

import CommentApi from 'common/api/CommentApi';
import { useParams } from 'react-router-dom';
import {
  HeaderContainer,
  NicknameContainer,
  ContentText,
  CustomText,
  BelowContainer,
  HeartContainer,
} from '../styles/stylesCommentContets';

function CommentContents({
  userImage,
  content,
  amILike,
  amIOwner,
  nickname,
  commentSeq,
  createDate,
  likeCnt,
  setIsDelete,
}: any) {
  const [isLike, setIsLike] = useState(amILike);
  const [numOfLikes, setNumofLikes] = useState<number>(likeCnt);

  const { deleteComment, postCommentLike } = CommentApi;

  const { feedSeq } = useParams();

  const onclickLike = useCallback(async () => {
    const result = await postCommentLike(feedSeq, commentSeq);
    console.log(result.data);
    setNumofLikes((prev) => prev + 1);
    setIsLike(result.data);
  }, []);

  const onclickDisLike = useCallback(async () => {
    const result = await postCommentLike(feedSeq, commentSeq);
    console.log(result.data);
    setNumofLikes((prev) => prev - 1);
    setIsLike(result.data);
  }, []);

  const onClickDelete = useCallback(async () => {
    console.log('삭제');
    setIsDelete(true);
    await deleteComment(feedSeq, commentSeq);
  }, []);

  return (
    <HeaderContainer>
      <div style={{ marginRight: '25px', width: '20px' }}>
        <Avatar size={64} src={userImage} icon={<UserOutlined />} />
      </div>
      <div style={{ margin: '10px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start' }}>
        <NicknameContainer>{nickname}</NicknameContainer>
        <ContentText>
          <CustomText>{content}</CustomText>
        </ContentText>
        <BelowContainer style={{ marginLeft: '20px' }}>
          <p style={{ fontFamily: 'NotoSansKR' }}>
            {createDate} 좋아요 {numOfLikes}개
            {amIOwner && <CloseOutlined onClick={onClickDelete} style={{ marginLeft: '15px' }} />}
          </p>
        </BelowContainer>
      </div>
      <HeartContainer style={{ paddingTop: '35px' }}>
        {isLike ? (
          <HeartTwoTone onClick={onclickDisLike} style={{ fontSize: '20px' }} />
        ) : (
          <HeartOutlined onClick={onclickLike} style={{ fontSize: '20px' }} />
        )}
      </HeartContainer>
    </HeaderContainer>
  );
}

export default CommentContents;
