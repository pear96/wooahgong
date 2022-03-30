import React from 'react';

import { Rate } from 'antd';

// styled

import { ContentWrapper, RateWrapper, ContentText, CustomText, MoodContainer } from '../styles/styledFeedcontent';

function Feedcontent({ ratings, content, createDate, moods }: any) {
  return (
    <>
      <ContentWrapper>
        <RateWrapper>
          <Rate allowHalf disabled defaultValue={ratings} style={{ color: '#9088F3', marginLeft: '25px' }} />
        </RateWrapper>
        <ContentText>
          <CustomText>{content}</CustomText>
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
