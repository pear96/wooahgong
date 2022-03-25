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
import { margin } from '@mui/system';
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
      style={{ maxWidth: '35%', margin: 'auto' }}
      //   onClick={(event) => {
      //     event.preventDefault();
      //   }}
      to={props.pathname}
      {...props}
    />
  );
}

const search = () => {
  // const [isFocus, setIsFocus] = useState(true);
  const [value, setValue] = useState(0);
  const { isFocus } = useSelector((state: ReducerType) => state.search);
  const handleChange = (event: any, newValue: any) => {
    setValue(newValue);
    // navigate(newValue);
  };

  // 자동완성 기능 구현

  const data = [
    { id: 1, name: '키움증권', img: 'https://picsum.photos/100' },
    { id: 2, name: '삼성전자', img: 'https://picsum.photos/100' },
    { id: 3, name: '삼성블루드래곤', img: 'https://picsum.photos/100' },
    { id: 4, name: 'LG전자', img: 'https://picsum.photos/100' },
    { id: 5, name: '스튜디오드래곤', img: 'https://picsum.photos/100' },
    { id: 6, name: '영호화학', img: 'https://picsum.photos/100' },
    { id: 7, name: '씨젠', img: 'https://picsum.photos/100' },
    { id: 8, name: 'LG화학', img: 'https://picsum.photos/100' },
    { id: 9, name: 'DL', img: 'https://picsum.photos/100' },
    { id: 10, name: '오뚜기', img: 'https://picsum.photos/100' },
  ];
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
  const onSearch = (text: any) => {
    const results: any = data.filter((item) => matchName(item.name, text) === true);
    setResult({ results });
  };

  // 검색해야할 문자열을 키워드와 비교하여 매칭이 되는지 체크
  const matchName = (name: any, keyword: any) => {
    const keyLen = keyword.length;
    name = name.toLowerCase().substring(0, keyLen);
    if (keyword === '') return false;
    return name === keyword.toString().toLowerCase();
  };

  return (
    <>
      <SearchBar keyword={keyword} results={results} updateField={updateField} />
      {false && <SearchHistory />}

      <Tabs
        variant="fullWidth"
        value={value}
        onChange={handleChange}
        aria-label="nav tabs example"
        TabIndicatorProps={{ style: { backgroundColor: '#9088F3' } }}
      >
        <LinkTab label="사용자" pathname="/search/nicknames" {...a11yProps(0)} />
        <LinkTab label="장소" pathname="/search/places" {...a11yProps(1)} />
      </Tabs>

      <Routes>
        <Route path="/places" element={<SearchResultPlaces />} />
        <Route path="/nicknames" element={<SearchResultNicknames />} />
      </Routes>
    </>
  );
};

export default search;
