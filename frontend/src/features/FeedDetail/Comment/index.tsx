import React, { useEffect, useState } from 'react';

// Components
import CommentApi from 'common/api/CommentApi';
import { useParams } from 'react-router-dom';
import CommentHeader from './components/CommentHeader';
import CommentContents from './components/CommentContents';
import CommentInput from './components/CommentInput';

function Comment() {
  const { getFeedComment } = CommentApi;
  const { feedSeq } = useParams();
  const [comments, setComments] = useState([]);
  const [isDelete, setIsDelete] = useState(false);
  const [isWrite, setIsWrite] = useState(false);

  // 정리 진짜 중요!!,, state 끌어올리기,,자식 컴포넌트의 변화를 부모에서도 인지 with api연결
  async function getAndFeedComment() {
    if (feedSeq !== undefined) {
      const result = await getFeedComment(feedSeq);
      setComments(result.data);
      if (isDelete === true) {
        setIsDelete(false);
      }
      if (isWrite === true) {
        setIsWrite(false);
      }
    } else {
      console.log('error');
    }
  }

  useEffect(() => {
    getAndFeedComment();
  }, [isDelete, isWrite]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <div>
        <CommentHeader />
      </div>
      <div>
        <CommentInput setIsWrite={setIsWrite} />
      </div>
      <div style={{ marginTop: '-30px' }}>
        {(comments as any).map((item: any) => {
          return (
            <CommentContents
              key={item.commentSeq}
              userImage={item.userImage}
              content={item.content}
              amILike={item.amILike}
              amIOwner={item.amIOwner}
              nickname={item.nickname}
              commentSeq={item.commentSeq}
              createDate={item.createDate}
              likeCnt={item.likeCnt}
              setIsDelete={setIsDelete}
            />
          );
        })}
      </div>
    </div>
  );
}

export default Comment;
