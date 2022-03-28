import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import SearchApi from 'common/api/SearchApi';
import { useSelector } from 'react-redux';
import { ReducerType } from 'app/rootReducer';
import { setNickname } from './searchSlice';

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

// const dummyData = [
//   { id: 1, img: 'https://picsum.photos/100', name: '명동성당' },
//   { id: 2, img: 'https://picsum.photos/100', name: '명동성당' },
//   { id: 3, img: 'https://picsum.photos/100', name: '명동성당' },
// ];

function SearchResultPlaces() {
  // const { getNicknameResults } = SearchApi;
  // const { nickname } = useSelector((state: ReducerType) => state.search);
  // console.log(nickname);
  // useEffect(() => {
  //   async function getAndgetNicknameResults() {
  //     const result = await getNicknameResults(nickname);
  //   }
  // }, []);
  console.log('hello');
  // return (
  //   <div style={{ position: 'relative', zIndex: 1 }}>
  //     <ListContainer>
  //       {dummyData.map(({ id, img, name }) => {
  //         return (
  //           <KeywordContainer key={id}>
  //             <img src={img} alt="img" style={{ width: 30, height: 30, marginRight: 15 }} />
  //             <Keyword>{name}</Keyword>
  //             <RemoveButton>x</RemoveButton>
  //           </KeywordContainer>
  //         );
  //       })}
  //     </ListContainer>
  //     <Outlet />
  //   </div>
  // );
}

export default SearchResultPlaces;
