import React from 'react';
import styled from 'styled-components';

// component
import SearchResult from './searchResultPlaces';

const HistoryContainer = styled.div`
  padding: 18px;
`;
const HeaderContainer = styled.div`
  overflow: hidden;
`;
const Title = styled.span`
  float: left;
  font-weight: bold;
  color: #000000;
  font-size: 25px;
  margin-top: 20px;
`;
const RemoveText = styled.span`
  float: right;
  margin-top: 60px;
  font-weight: bold;
  color: #000000;
`;

const ListContainer = styled.ul`
  margin-right: 20px;
  margin-left: -40px;
  margin-top: 20px;
`;

// &는 자기 자신을 나타냄
// 즉, 나 자신(li)들에서 마지막 요소 값을 제외한 값에 margin-bottom 속성 지정
const KeywordContainer = styled.li`
  overflow: hidden;

  &:not(:last-child) {
    margin-bottom: 18px;
  }
`;

const RemoveButton = styled.div`
  float: right;
  color: #000000;
  padding: 3px 5px;
  font-size: 20px;
`;

const Keyword = styled.span`
  font-size: 18px;
  font-weight: bold;
`;

const dummyData = [
  { id: 1, img: 'https://picsum.photos/100', name: '명동성당' },
  { id: 2, img: 'https://picsum.photos/100', name: 'kim_kim99' },
];

const searchHistory = () => {
  return (
    <HistoryContainer>
      <HeaderContainer>
        <Title>최근 검색어</Title>
        <RemoveText>전체삭제</RemoveText>
      </HeaderContainer>
      <SearchResult />
    </HistoryContainer>
  );
};

export default searchHistory;

// <RemoveButton>x</RemoveButton>
