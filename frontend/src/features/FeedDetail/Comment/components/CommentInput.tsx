/* eslint-disable consistent-return */
import React, { useCallback } from 'react';
import { toast } from 'react-toastify';

import useInput from 'common/hooks/useInput';
import CommentApi from 'common/api/CommentApi';
import { useParams } from 'react-router-dom';
import { InputWrapper, CustomInput, CustomButton, CustomForm, ButtonContainer } from '../styles/styledCommentInput';

function CommentInput({ setIsWrite }: any) {
  const [comment, onChangeComment] = useInput('');

  const { feedSeq } = useParams();

  const { postFeedComment, getFeedComment } = CommentApi;
  const onSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      console.log('hello');
      console.log(comment);
      if (!comment || !comment.trim()) {
        console.log(e.target[0].value);

        return toast.info(
          <div style={{ width: 'inherit', fontSize: '10px' }}>
            <div>댓글을 입력해주세요.</div>
          </div>,
          {
            position: toast.POSITION.TOP_CENTER,
            role: 'alert',
          },
        );
      }

      const data = { content: comment };
      setIsWrite(true);
      await postFeedComment(feedSeq, data).then(() => {
        getFeedComment(feedSeq);
      });
    },
    [comment, feedSeq],
  );

  return (
    <div style={{ padding: '20px' }}>
      <h3 style={{ fontWeight: 'bold' }}>댓글</h3>
      <CustomForm onSubmit={onSubmit}>
        <InputWrapper>
          <CustomInput value={comment} onChange={onChangeComment} placeholder="댓글을 입력해주세요." type="text" />
        </InputWrapper>
        <ButtonContainer>
          <CustomButton type="submit">작성</CustomButton>
        </ButtonContainer>
      </CustomForm>
    </div>
  );
}

export default CommentInput;
