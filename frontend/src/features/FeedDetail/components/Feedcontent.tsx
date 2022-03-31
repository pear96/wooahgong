import React, { useCallback, useState } from 'react';
import { Input, Rate } from 'antd';

// styled

import { useAppDispatch, useAppSelector } from 'app/store';
import FeedDetailApi from 'common/api/FeedDetailApi';
import { useNavigate } from 'react-router-dom';
import { ContentWrapper, RateWrapper, ContentText, CustomText, MoodContainer } from '../styles/styledFeedcontent';

// aciotns

import { setUpdate } from '../feedDetailSlice';

function Feedcontent({ ratings, content, createDate, moods, feedSeq, placeSeq }: any) {
  const { isUpdate } = useAppSelector((state) => state.feeddetail);
  console.log('콘텐츠 컴포넌트인데', isUpdate);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { patchFeedDetail, getFeedDetail } = FeedDetailApi;

  const [updateContent, setUpdateContent] = useState(content);

  const onChangeTextArea = useCallback((e) => {
    console.log(e.target.value);
    setUpdateContent(e.target.value);
  }, []);

  const onClickUpdate = useCallback(async () => {
    const data = { content: updateContent };
    console.log(data);
    console.log(feedSeq);
    dispatch(setUpdate(false));
    await patchFeedDetail(feedSeq, data).then(() => {
      const result = getFeedDetail(feedSeq);
    });
  }, [updateContent]);
  const { TextArea } = Input;
  return (
    <>
      <ContentWrapper>
        <RateWrapper>
          <Rate allowHalf disabled defaultValue={ratings} style={{ color: '#9088F3', marginLeft: '25px' }} />
        </RateWrapper>
        <ContentText>
          {isUpdate ? (
            <>
              <TextArea onChange={onChangeTextArea} value={updateContent} rows={4} />
              <button type="submit" onClick={onClickUpdate}>
                수정
              </button>
            </>
          ) : (
            <CustomText>{updateContent}</CustomText>
          )}
        </ContentText>
        <div style={{ marginLeft: '20px' }}>
          <p>{createDate}</p>
        </div>
      </ContentWrapper>
      <MoodContainer>
        {moods.map((item: any) => {
          return (
            <p key={item} style={{ color: '#9088F3', marginRight: '15px' }}>
              #{item}
            </p>
          );
        })}
      </MoodContainer>
    </>
  );
}

export default Feedcontent;