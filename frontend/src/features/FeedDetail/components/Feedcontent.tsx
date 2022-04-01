import React, { useCallback, useEffect, useState } from 'react';
import { Input, Rate } from 'antd';

// styled

import { useAppDispatch, useAppSelector } from 'app/store';
import FeedDetailApi from 'common/api/FeedDetailApi';
import {
  ContentWrapper,
  RateWrapper,
  ContentText,
  CustomText,
  MoodContainer,
  CustomButtom,
} from '../styles/styledFeedcontent';

// aciotns

import { setUpdate, setContent } from '../feedDetailSlice';

function Feedcontent({ ratings, content, createDate, moods, feedSeq, placeSeq }: any) {
  const { isUpdate } = useAppSelector((state) => state.feeddetail);
  console.log('콘텐츠 컴포넌트인데', isUpdate);

  const dispatch = useAppDispatch();
  const { patchFeedDetail } = FeedDetailApi;

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
    await patchFeedDetail(feedSeq, data);
  }, [updateContent]);

  const { TextArea } = Input;

  useEffect(() => {
    dispatch(setContent(updateContent));
  }, [updateContent]);

  return (
    <>
      <ContentWrapper>
        <RateWrapper>
          <Rate allowHalf disabled defaultValue={ratings} style={{ color: '#9088F3', marginLeft: '25px' }} />
        </RateWrapper>
        <ContentText>
          {isUpdate ? (
            <>
              <TextArea
                style={{ resize: 'none', fontFamily: 'NotoSansKR', height: '150px', borderRadius: '10px' }}
                onChange={onChangeTextArea}
                value={updateContent}
                rows={4}
              />
              <CustomButtom type="submit" onClick={onClickUpdate}>
                수정
              </CustomButtom>
            </>
          ) : (
            <CustomText>{updateContent}</CustomText>
          )}
        </ContentText>
        <div style={{ marginLeft: '20px', fontFamily: 'NotoSansKR' }}>
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
