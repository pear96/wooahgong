import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import {
  PlaceFeedsWrapper,
  SortOption,
  PlaceFeedsGrid,
  FeedImageWrapper,
  FeedImage,
} from 'features/Place/styles/StyledPlaceFeeds';
import PlaceApi from 'common/api/PlaceApi';
import { Select } from 'antd';

const { Option } = Select;

type MyProps = {
  placeFeeds : {
    feedSeq : number,
    thumbnail : string
  }
}

function PlaceFeeds({ placeFeeds }: MyProps) {
  
  const {placeSeq} = useParams();
  const [feeds, setFeeds] = useState<any>(placeFeeds);
  const navigate = useNavigate();


  const sortFeeds = async (value: string) => {
    // TODO: axios
    console.log(`selected ${value}`);
    if (placeSeq !== undefined) {
      const result = await PlaceApi.getFeedsSortResult(placeSeq, value);
      console.log(result);
      if (result?.status === 200) setFeeds(result.data.feeds);
    }
  };
  const handleClickFeed = (value : number | string) =>{
      navigate(`/place/${placeSeq}/feeds/${value}`)
  }

  return (
    <PlaceFeedsWrapper>
      <SortOption>
        <Select defaultValue="latest" onChange={sortFeeds} bordered={false}>
          <Option value="latest">최신순</Option>
          <Option value="popular">인기순</Option>
        </Select>
      </SortOption>
      <PlaceFeedsGrid>
          {feeds.map((feed: {feedSeq : number, thumbnail : string}, i : number) => {
            const idx = i;
            return (
              <FeedImageWrapper key = {idx} onClick={() => handleClickFeed(feed.feedSeq)}>
                <FeedImage src={feed.thumbnail} alt="" style={{objectFit : "cover"}} />
              </FeedImageWrapper>
            )}
          )}
      </PlaceFeedsGrid>
    </PlaceFeedsWrapper>
  );
}

export default PlaceFeeds;
