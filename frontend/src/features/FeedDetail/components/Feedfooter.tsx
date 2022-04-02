/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useCallback, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { HeartOutlined, HeartTwoTone, CommentOutlined } from '@ant-design/icons';
import FeedDetailApi from 'common/api/FeedDetailApi';
import { CustomText } from '../styles/styledFeedfooter';

function Feedfooter({ amILike, likesCnt, commentsCnt, feedSeq, placeSeq }: any) {
  const [islike, setLike] = useState(amILike);
  const [cnt, setCnt] = useState<number>(likesCnt);
  // const [value, setValue] = useState(0);

  const naviate = useNavigate();
  const { postFeedLike } = FeedDetailApi;
  console.log('렌더링 확인용');

  const onClickLike = useCallback(async () => {
    const result = await postFeedLike(feedSeq);
    console.log(result.data);

    setCnt((prev) => prev + 1);
    setLike(result.data);
  }, []);

  const onClickDisLike = useCallback(async () => {
    const result = await postFeedLike(feedSeq);
    console.log(result.data);
    setCnt((prev) => prev - 1);
    setLike(result.data);
  }, []);

  const onClickgotoComment = useCallback(() => {
    naviate(`/place/${placeSeq}/feeds/${feedSeq}/comments`);
  }, [placeSeq, feedSeq]);

  return (
    <div style={{ display: 'flex', marginLeft: '20px' }}>
      {islike ? (
        <div onClick={onClickDisLike}>
          <HeartTwoTone twoToneColor="#9088F3" style={{ fontSize: '32px' }} />
        </div>
      ) : (
        <div onClick={onClickLike}>
          <HeartOutlined style={{ fontSize: '32px' }} />
        </div>
      )}
      <CustomText>{cnt}</CustomText>
      <div>
        <CommentOutlined onClick={onClickgotoComment} style={{ fontSize: '32px', marginLeft: '20px' }} />
      </div>
      <CustomText>{commentsCnt}</CustomText>
    </div>
  );
}

export default Feedfooter;
