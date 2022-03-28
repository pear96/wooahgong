import React from 'react';
import styled from 'styled-components';

const HistoryContainer = styled.div`
  padding: 18px;
  border: 2px solid;
  width: 90%;
  z-index: 2;
  position: fixed;
  transform: translateX(5%);
  background-color: white;
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
  font-weight: 900;
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
  &:hover {
    background-color: #b8b2f8;
  }
  &:not(:last-child) {
    margin-bottom: 18px;
  }
`;

const RemoveButton = styled.div`
  float: right;
  color: #000000;
  padding: 3px 5px;
  font-size: 20px;
  &:hover {
    font-weight: bold;
  }
`;

const Keyword = styled.span`
  font-size: 18px;
  font-weight: bold;
`;

// 최근 검색어 읽기, 삭제, 전체 삭제는 api 통신의 영역
const dummyData = [
  { id: 1, img: 'https://picsum.photos/100', name: '명동성당' },
  { id: 2, img: 'https://picsum.photos/100', name: 'kim_kim99' },
  { id: 3, img: 'https://picsum.photos/100', name: '강동구청역' },
  { id: 4, img: 'https://picsum.photos/100', name: '천호역' },
];

const searchHistory = () => {
  return (
    <HistoryContainer>
      <HeaderContainer>
        <Title>최근 검색어</Title>
        <RemoveText>전체삭제</RemoveText>
      </HeaderContainer>
      <ListContainer>
        {/* 자동검색결과 */}
        {dummyData.map(({ id, img, name }) => {
          return (
            <KeywordContainer key={id}>
              <img src={img} alt="img" style={{ width: 30, height: 30, marginRight: 15 }} />
              <Keyword>{name}</Keyword>
              <RemoveButton role="button">x</RemoveButton>
            </KeywordContainer>
          );
        })}
      </ListContainer>
    </HistoryContainer>
  );
};

export default searchHistory;
