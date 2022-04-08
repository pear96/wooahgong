import SearchApi from 'common/api/SearchApi';
import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const HistoryContainer = styled.div`
  padding: 16px;
  border: 1px solid #EEEEEE;
  width: 340px;
  z-index: 2;
  position: fixed;
  border-radius : 15px;
  transition: all 0.3s ease 0s;
  transform: translateX(5%);
  background-color: #EEEEEE;
`;
const HeaderContainer = styled.div`
  border-bottom : 1px dashed black;
  overflow: hidden;
`;
const Title = styled.span`
  font-family: 'NotoSansKR';
  float: left;
  font-weight: bold;
  color: #000000;
  font-size: 25px;
  margin-top: 10px;
`;
const RemoveText = styled.button`
  font-family: 'NotoSansKR';
  float: right;
  margin-top: 40px;
  font-weight: 900;
  border : none;
  margin-bottom : 10px;
  color: tomato;

`;

const ListContainer = styled.ul`
  display : flex;
  flex-wrap : wrap;
  align-items : center;
  margin-top: 20px;
  padding : 0px;
`;

// &는 자기 자신을 나타냄
// 즉, 나 자신(li)들에서 마지막 요소 값을 제외한 값에 margin-bottom 속성 지정
const KeywordContainer = styled.li`
  overflow: hidden;
  width : 100%;
  height : 50px;
  display : flex;
  justify-content : space-between;
  align-items : center;
  border-bottom : 1px solid black;
  &:hover {
    background-color: #b8b2f8;
  }
  &:not(:last-child) {
    margin-bottom: 18px;
  }
`;

const RemoveButton = styled.button`
  border-radius : 5px;
  font-size : 11px;
  color: white;
  height : 20px;
  width : 20px;
  background : tomato;
  border : none;
  margin-right : 5px;
  &:hover {
    font-weight: bold;
  }
`;

const Keyword = styled.span`
  font-family: 'NotoSansKR';
  overflow: hidden;
  white-space : nowrap;
  text-overflow: ellipsis;
  font-size: 18px;
  font-weight: bold;
  padding-left : 10px;
  padding-right : 10px;
  cursor : default;
`;

const searchHistory = () => {
  const { getRecentSearchs, deleteSeacrhHistory, deleteAllSeacrhHistory } = SearchApi;
  const [recentSearches, setRecentSearches] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function getAndRecentSearches() {
      const result = await getRecentSearchs();
      console.log(result);
      setRecentSearches(result.data.recentSearches);
    }

    getAndRecentSearches();
  }, []);
  const onClickDelete = async (e : React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    const result = await deleteSeacrhHistory(e.currentTarget.value);
    console.log(result.data.recentSearches);
    setRecentSearches(result.data.recentSearches);
  }


  const onClickAllDelete = useCallback(async () => {
    const result = await deleteAllSeacrhHistory();
    setRecentSearches([]);
    console.log(result);
  }, [recentSearches]);

  // 장소랑, 사용자 별로 분기해서 라우팅해야 된다
  const onClickgoToRecentSearch = useCallback(
    (props) => () => {
      console.log(props.type);
      if (props.type === 'place') {
        navigate(`/place/${props.placeSeq}`);
      } else {
        navigate(`/profile/${props.searchWord}`);
      }
    },
    [],
  );

  const stopPropagation = useCallback((e) => {
    e.stopPropagation();
  }, []);

  console.log(recentSearches);
  return (
    <HistoryContainer>
      <div style={{
        width: 0,
        height: 0,
        // border : "1px solid",
        // transform : "rotate(45deg)",
        borderTop: "20px solid none",
        borderLeft: "20px solid transparent",
        borderRight: "20px solid transparent",
        borderBottom: "20px solid #EEEEEE",
        position : "absolute",
        // borderBottom : "none",
        // borderRight : "none",
        top : -21,
        left : 100,
      }}/>
      <HeaderContainer>
        <Title>최근 검색어</Title>
        <RemoveText onClick={onClickAllDelete}>전체삭제</RemoveText>
      </HeaderContainer>
      <ListContainer onClick={stopPropagation}>
        {/* 자동검색결과 */}
        {recentSearches.length !== 0
          ? recentSearches.map((props: any) => {
              return (
                <KeywordContainer onClick={onClickgoToRecentSearch(props)} key={props.historySeq}>
                  <img src={props.imageUrl} alt="img" style={{ width: 30, height: 30}} />
                  <Keyword>{props.searchWord}</Keyword>
                  <RemoveButton value={props.historySeq} onClick={onClickDelete}>
                    X
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
