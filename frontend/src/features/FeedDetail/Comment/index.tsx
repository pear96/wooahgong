import React from 'react';

// Components
import CommentHeader from './components/CommentHeader';
import CommentContents from './components/CommentContents';
import CommentInput from './components/CommentInput';

// CommentContent는 map으로 반복문 출력한것을 여기로 가져오자,,!
// 여기는 그냥 합치는 곳
function Comment() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <div>
        <CommentHeader />
      </div>
      <div>
        <CommentInput />
      </div>
      <div style={{ marginTop: '-50px' }}>
        <CommentContents />
      </div>
    </div>
  );
}

export default Comment;
