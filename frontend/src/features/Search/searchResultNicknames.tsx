/* eslint-disable no-shadow */
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Outlet } from 'react-router-dom';
import { shallowEqual, useSelector } from 'react-redux';
import { ReducerType } from 'app/rootReducer';

export const ListContainer = styled.ul`
  margin-right: 20px;
  margin-left: -20px;
  margin-top: 20px;
`;

// &는 자기 자신을 나타냄
// 즉, 나 자신(li)들에서 마지막 요소 값을 제외한 값에 margin-bottom 속성 지정
export const KeywordContainer = styled.li`
  overflow: hidden;

  &:not(:last-child) {
    margin-bottom: 18px;
  }
`;

export const RemoveButton = styled.div`
  float: right;
  color: #000000;
  padding: 3px 5px;
  font-size: 20px;
`;

export const Keyword = styled.span`
  font-size: 18px;
  font-weight: bold;
`;

const dummyData = [
  { id: 1, img: 'https://picsum.photos/100', name: 'kim_kim99' },
  { id: 2, img: 'https://picsum.photos/100', name: 'kim_kim100' },
  { id: 3, img: 'https://picsum.photos/100', name: 'kim_kim101' },
];

function SearchResultNicknames() {
  const { autoCompete } = useSelector((state: ReducerType) => state.search);
  console.log('안녕');
  console.log(autoCompete);

  return (
    <div style={{ position: 'relative', zIndex: 1 }}>
      {/* 자동검색결과 */}
      <ListContainer>
        {(autoCompete as any[])?.map(({ id, img, name }: any) => {
          return (
            <KeywordContainer key={id}>
              <img src={img} alt="img" style={{ width: 30, height: 30, marginRight: 15 }} />
              <Keyword
                onClick={() => {
                  console.log('이거 눌럿다');
                }}
              >
                {name}
              </Keyword>
            </KeywordContainer>
          );
        })}
      </ListContainer>
      <Outlet />
    </div>
  );
}

export default SearchResultNicknames;
