import React, { useCallback, useState } from 'react';
import { Avatar } from 'antd';
import { UserOutlined, HeartOutlined, CloseOutlined, HeartTwoTone } from '@ant-design/icons';

import {
  HeaderContainer,
  NicknameContainer,
  ContentText,
  CustomText,
  BelowContainer,
  HeartContainer,
} from '../styles/stylesCommentContets';

const test = [
  {
    commentSeq: 1,
    userSeq: 1,
    userImage: 'https://joeschmoe.io/api/v1/random',
    nickname: '누누',
    content: '와 명동성당 저도 가보고 싶네요 거기에 맛집도있나요??',
    amILike: true,
    amIOwner: false,
    createDate: '2022.03.14',
    likeCnt: 1,
  },
  {
    commentSeq: 2,
    userSeq: 2,
    userImage: 'https://joeschmoe.io/api/v1/random',
    nickname: '우아공_하은',
    content: '와 명동성당 저도 가보고 싶네요 거기에 맛집도있나요??',
    amILike: true,
    amIOwner: false,
    createDate: '2022.03.14',
    likeCnt: 2,
  },
  {
    commentSeq: 3,
    userSeq: 3,
    userImage: 'https://joeschmoe.io/api/v1/random',
    nickname: '우아공_지환',
    content: '와 명동성당 저도 가보고 싶네요 거기에 맛집도있나요??',
    amILike: true,
    amIOwner: false,
    createDate: '2022.03.14',
    likeCnt: 3,
  },
  {
    commentSeq: 4,
    userSeq: 4,
    userImage: 'https://joeschmoe.io/api/v1/random',
    nickname: 'kim_kim99',
    content: '와우',
    amILike: true,
    amIOwner: false,
    createDate: '2022.03.14',
    likeCnt: 4,
  },
];

const dummydata = {
  commentSeq: 1,
  userSeq: 1,
  userImage: 'https://joeschmoe.io/api/v1/random',
  nickname: '누누',
  content: '와 명동성당 저도 가보고 싶네요 거기에 맛집도있나요??',
  amILike: true,
  amIOwner: false,
  createDate: '2022.03.14',
  likeCnt: 1,
};
function CommentContents() {
  const [isLike, setIsLike] = useState(dummydata.amILike);

  const onclickLike = useCallback(() => {
    setIsLike((prev) => !prev);
  }, []);

  return (
    <>
      {(test as any).map((item: any) => {
        return (
          <HeaderContainer>
            <div style={{ marginRight: '25px', width: '20px' }}>
              <Avatar size={64} src={item.userImage} icon={<UserOutlined />} />
            </div>
            <div style={{ margin: '10px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start' }}>
              <NicknameContainer>{item.nickname}</NicknameContainer>
              <ContentText>
                <CustomText>{item.content}</CustomText>
              </ContentText>
              <BelowContainer style={{ marginLeft: '20px' }}>
                <p>
                  {item.createDate} 좋아요 {item.likeCnt}개
                  <CloseOutlined style={{ marginLeft: '15px' }} />
                </p>
              </BelowContainer>
            </div>
            <HeartContainer style={{ paddingTop: '35px', position: 'absolute', right: '20px' }}>
              {isLike ? (
                <HeartTwoTone onClick={onclickLike} style={{ fontSize: '20px' }} />
              ) : (
                <HeartOutlined onClick={onclickLike} style={{ fontSize: '20px' }} />
              )}
            </HeartContainer>
          </HeaderContainer>
        );
      })}
    </>
    //   <HeaderContainer>
    //   <div style={{ marginRight: '25px', width: '20px' }}>
    //   <Avatar size={64} src={dummydata.userImage} icon={<UserOutlined />} />
    //   </div>
    //   <div style={{ margin: '10px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start' }}>
    //     <NicknameContainer>{dummydata.nickname}</NicknameContainer>
    //     <ContentText>
    //       <CustomText>{dummydata.content}</CustomText>
    //     </ContentText>
    //     <BelowContainer style={{ marginLeft: '20px' }}>
    //       <p>
    //         {dummydata.createDate} 좋아요 {dummydata.likeCnt}개
    //         <CloseOutlined style={{ marginLeft: '15px' }} />
    //       </p>
    //     </BelowContainer>
    //   </div>
    //   <div style={{ paddingTop: '35px' }}>
    //     {isLike ? (
    //       <HeartTwoTone onClick={onclickLike} style={{ fontSize: '20px' }} />
    //     ) : (
    //       <HeartOutlined onClick={onclickLike} style={{ fontSize: '20px' }} />
    //     )}
    //   </div>
    // </HeaderContainer>
  );
}

export default CommentContents;
