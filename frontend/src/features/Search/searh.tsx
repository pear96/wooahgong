/* eslint-disable no-shadow */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/require-default-props */
import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { ReducerType } from 'app/rootReducer';
import { Link, Routes, Route } from 'react-router-dom';

// mui
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

// components
import SearchApi from 'common/api/SearchApi';
import SearchBar from './searchBar';
import SearchHistory from './searchHistory';
import SearchResultPlaces from './searchResultPlaces';
import SearchResultNicknames from './searchResultNicknames';

const CustomTab = styled(Tab)`
  &.Mui-selected {
    background-color: #fafafa;
    border-bottom-style: none;
  }
`;

export const ListContainer = styled.ul`
  margin-right: 20px;
  margin-left: -20px;
  margin-top: 20px;
`;

// &는 자기 자신을 나타냄
// 즉, 나 자신(li)들에서 마지막 요소 값을 제외한 값에 margin-bottom 속성 지정
export const KeywordContainer = styled.li`
  overflow: hidden;
  &:hover {
    background-color: #b8b2f8;
  }
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

function a11yProps(index: any) {
  return {
    id: `nav-tab-${index}`,
    'aria-controls': `nav-tabpanel-${index}`,
  };
}

function LinkTab(props: any) {
  return (
    <CustomTab
      component={Link}
      style={{ maxWidth: '35%', margin: 'auto', color: '#9088F3' }}
      //   onClick={(event) => {
      //     event.preventDefault();
      //   }}
      to={props.pathname}
      {...props}
    />
  );
}

const search = () => {
  const [value, setValue] = useState(0);
  const { autoCompete } = useSelector((state: ReducerType) => state.search);
  const { isFocus } = useSelector((state: ReducerType) => state.search);

  const { getPlaceResults } = SearchApi;
  const { postPlaceSearchResult } = SearchApi;
  const handleChange = (event: any, newValue: any) => {
    setValue(newValue);
    // navigate(newValue);
  };

  const onClickserchResult = useCallback(
    (placeSeq) => () => {
      // 상세페이지 이동페이지 만들어지면 navigate 추가해서 넣자
      console.log(placeSeq, typeof placeSeq);
      const result = postPlaceSearchResult(placeSeq);
      console.log(result);
    },
    [],
  );

  // 자동완성 기능 구현
  const [keyword, setKeyword] = useState<any>();
  const [results, setResult] = useState<any>([]);

  // 필드를 업데이트
  const updateField = useCallback((field: any, value: any, update = true) => {
    console.log(value);

    if (update) onSearch(value);
    if (field === 'keyword') {
      setKeyword(value);
    }
    if (field === 'results') {
      setResult(value);
    }
  }, []);

  // 입력된 텍스트로 data 배열에서 찾아 매칭되는 결과들을 저장
  const onSearch = async (text: any) => {
    if (text !== '') {
      const result = await getPlaceResults(text);
      setResult(result.data.results);
      console.log(result.data.results);
    } else {
      setResult([]);
    }

    // const results: any = data.filter((item) => matchName(item.name, text) === true);
    // console.log(results);
  };

  // 검색해야할 문자열을 키워드와 비교하여 매칭이 되는지 체크
  const matchName = (name: any, keyword: any) => {
    const keyLen = keyword.length;
    name = name.toLowerCase().substring(0, keyLen);
    if (keyword === '') return false;
    return name === keyword.toString().toLowerCase();
  };

  console.log(autoCompete);
  return (
    <>
      <SearchBar keyword={keyword} results={results} updateField={updateField} />
      {isFocus && <SearchHistory />}

      <Tabs
        variant="fullWidth"
        value={value}
        onChange={handleChange}
        aria-label="nav tabs"
        TabIndicatorProps={{ style: { backgroundColor: '#9088F3' } }}
      >
        <LinkTab label="사용자" pathname="/search/nicknames" {...a11yProps(0)} />
        <LinkTab label="장소" pathname="/search/places" {...a11yProps(1)} />
      </Tabs>

      <div style={{ position: 'relative', zIndex: 1 }}>
        {/* 자동검색결과 */}
        <ListContainer>
          {(autoCompete as any[])?.map((props: any) => {
            return (
              <KeywordContainer key={props.placeSeq} onClick={onClickserchResult(props.placeSeq)}>
                <img src={props.imageUrl} alt="img" style={{ width: 30, height: 30, marginRight: 15 }} />
                <Keyword>{props.name}</Keyword>
              </KeywordContainer>
            );
          })}
        </ListContainer>
        {/* <Outlet /> */}
      </div>

      <Routes>
        <Route path="/places" element={<SearchResultPlaces />} />
      </Routes>
    </>
  );
};

export default search;
