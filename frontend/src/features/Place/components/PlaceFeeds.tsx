import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
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

const dummyLatestFeeds = [
  {
    feedSeq: 1,
    thumbnail: 'https://picsum.photos/640/260',
  },
  {
    feedSeq: 2,
    thumbnail: 'https://picsum.photos/640/300',
  },
  {
    feedSeq: 3,
    thumbnail: 'https://picsum.photos/640/340',
  },
  {
    feedSeq: 4,
    thumbnail: 'https://picsum.photos/640/380',
  },
];

const dummyPopularFeeds = [
  {
    feedSeq: 1,
    thumbnail: 'https://picsum.photos/640/240',
  },
  {
    feedSeq: 2,
    thumbnail: 'https://picsum.photos/640/280',
  },
  {
    feedSeq: 3,
    thumbnail: 'https://picsum.photos/640/320',
  },
  {
    feedSeq: 4,
    thumbnail: 'https://picsum.photos/640/360',
  },
  {
    feedSeq: 5,
    thumbnail: 'https://picsum.photos/640/400',
  },
];

function PlaceFeeds({ placeFeeds }: any) {
  const { placeSeq } = useParams<string>();
  const [feeds, setFeeds] = useState<any>(placeFeeds);

  const sortFeeds = async (value: string) => {
    // TODO: axios
    console.log(`selected ${value}`);
    if (placeSeq !== undefined) {
      if (value === 'latest') {
        const result = await PlaceApi.getLatestFeeds(placeSeq);
        if (result.status === 200) setFeeds(result.data.feeds);
      } else if (value === 'popular') {
        const result = await PlaceApi.getPopularFeeds(placeSeq);
        if (result.status === 200) setFeeds(result.data.feeds);
      }
    }
  };

  return (
    <PlaceFeedsWrapper>
      <SortOption>
        <Select defaultValue="latest" onChange={sortFeeds} bordered={false}>
          <Option value="latest">최신순</Option>
          <Option value="popular">인기순</Option>
        </Select>
      </SortOption>
      <PlaceFeedsGrid>
        {feeds.map((feed: any) => (
          // <FeedWrapper>
          <FeedImageWrapper>
            <FeedImage src={feed.thumbnail} alt="" />
          </FeedImageWrapper>
          // </FeedWrapper>
        ))}
      </PlaceFeedsGrid>
    </PlaceFeedsWrapper>
  );
}

export default PlaceFeeds;
