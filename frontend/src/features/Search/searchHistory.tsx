import SearchApi from 'common/api/SearchApi';
import React, { useEffect, useState, useCallback } from 'react';
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

const searchHistory = () => {
  const { getRecentSearchs, deleteSeacrhHistory, deleteAllSeacrhHistory } = SearchApi;
  const [recentSearches, setRecentSearches] = useState([]);

  useEffect(() => {
    async function getAndRecentSearches() {
      const result = await getRecentSearchs();
      setRecentSearches(result.data.recentSearches);
    }

    getAndRecentSearches();
  }, []);

  const onClickDelete = useCallback(
    (historySeq) => () => {
      console.log(historySeq);
      deleteSeacrhHistory(historySeq);
    },
    [recentSearches],
  );

  const onClickAllDelete = useCallback(() => {
    deleteAllSeacrhHistory();
  }, []);

  console.log(recentSearches);
  return (
    <HistoryContainer>
      <HeaderContainer>
        <Title>최근 검색어</Title>
        <RemoveText onClick={onClickAllDelete}>전체삭제</RemoveText>
      </HeaderContainer>
      <ListContainer>
        {/* 자동검색결과 */}
        {recentSearches.length !== 0
          ? recentSearches.map((props: any) => {
              return (
                <KeywordContainer key={props.historySeq}>
                  <img src={props.imageUrl} alt="img" style={{ width: 30, height: 30, marginRight: 15 }} />
                  <Keyword>{props.searchWord}</Keyword>
                  <RemoveButton onClick={onClickDelete(props.historySeq)} role="button">
                    x
                  </RemoveButton>
                </KeywordContainer>
              );
            })
          : '최근 검색어가 없습니다.'}
      </ListContainer>
    </HistoryContainer>
  );
};

export default searchHistory;
