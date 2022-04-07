import React, { useState } from 'react';
import { Tabs, Menu, Dropdown, Button } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { useNavigate, useParams } from 'react-router-dom';
import {
  PlaceFeedsWrapper,
  SortOption,
  PlaceFeedsGrid,
  FeedImageWrapper,
  FeedImage,
} from 'features/Place/styles/StyledPlaceFeeds';
import PlaceApi from 'common/api/PlaceApi';


type MyProps = {
  placeFeeds : {
    feedSeq : number,
    thumbnail : string
  }
}

function PlaceFeeds({ placeFeeds }: MyProps) {
  
  const {placeSeq} = useParams();
  const [feeds, setFeeds] = useState<any>(placeFeeds);
  const [type, setType] = useState<string>("최신순");
  const navigate = useNavigate();

  const menu = (
    <Menu>
      <Menu.Item
        onClick={() => sortFeeds("latest")}
        key="1"
      >
        최신순
      </Menu.Item>
      <Menu.Item
        onClick={() => sortFeeds("popular")}
        key="2"
      >
        인기순
      </Menu.Item>
    </Menu>
  );

  const sortFeeds = async (value: string) => {
    // TODO: axios
    console.log(`selected ${value}`);
    if (placeSeq !== undefined) {
      const result = await PlaceApi.getFeedsSortResult(placeSeq, value);
      console.log(result);
      if (result?.status === 200) {
        setFeeds(result.data.feeds);
        if(value === "latest") setType("최신순");
        else setType("인기순");
      }
    }
  };

  const handleClickFeed = (value : number | string) =>{
      navigate(`/place/${placeSeq}/feeds/${value}`)
  }

  return (
    <PlaceFeedsWrapper>
      <SortOption>
        {/* <Select tabIndex={0} defaultValue="latest" onChange={sortFeeds} bordered={false}>
          <Option value="latest">최신순</Option>
          <Option value="popular">인기순</Option>
        </Select> */}
        <Dropdown.Button icon={<DownOutlined />} trigger={['click']} overlay={menu} placement="bottom" style={{ border: 'none' }} >{type}</Dropdown.Button>
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
