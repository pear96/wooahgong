/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState, useCallback, useEffect } from 'react';
import styled, { css } from 'styled-components';
import { useAppDispatch } from 'app/store';
import Select from 'react-select';
import { ReactComponent as Back } from '../../assets/search/back.svg';
import { setToggle, setAutoComplete } from './searchSlice';
import SearchResultNicknames, { Keyword, KeywordContainer, RemoveButton } from './searchResultNicknames';

const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' },
];
const horizontalCenter = css`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
`;

const Container = styled.div`
  position: relative;
  width: 90%;
  margin-left: 15px;
  border-bottom: 1px solid;
  background-color: #fff;
  padding: 20px 90px;
  box-sizing: border-box;
`;

// horizontalCenter 스타일 컴포넌트를 믹스인하여 속성값 전달
const BackContainer = styled.div`
  ${horizontalCenter}
  left: -5px;
  display: block;
  width: 21px;
  height: 18px;
  background-position: -165px -343px;
  vertical-align: top;
`;

const InputContainer = styled.div`
  position: relative;
  width: 100%;
  padding-top: 5px;
`;

const Input = styled.input`
  width: 100%;
  background-color: #fff;
  font-weight: 700;
  font-size: 15px;
  padding: 0;
  border-width: 0;
  border: none;
  box-sizing: border-box;
`;
function SearchBar({ keyword, results, updateField }: any) {
  const dispatch = useAppDispatch();
  const [isOpen, setIsOpen] = useState(false);

  const onClickToggle = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  console.log(results);
  // 자동완성 구현
  const updateText = useCallback((text: any) => {
    // console.log(keyword);
    // console.log('update text', text);
    updateField('keyword', text, false);
    updateField('results', []);
  }, []);

  let renderResults: any;
  const arr: any[] = results.results;
  if (arr) {
    // arr 에 검색어에 대한 결과가 담기면, SearchView 호출
    renderResults = arr.map((item: any) => {
      console.log(item.name);
      return <SearchView updateText={updateText} name={item.name} key={item.code} img={item.img} />;
    });
  }

  useEffect(() => {
    return setIsOpen(false);
  }, [keyword]);

  const propsTofunction = useCallback((e) => {
    updateField('keyword', e.target.value);
  }, []);

  useEffect(() => {
    dispatch(setToggle(isOpen));
  }, [isOpen]);

  console.log(arr);
  useEffect(() => {
    dispatch(setAutoComplete(arr as any));
  }, [results]);

  return (
    <Container>
      <BackContainer>
        <Back />
      </BackContainer>
      <InputContainer>
        <Input onClick={onClickToggle} placeholder="검색어를 입력하세요" value={keyword} onChange={propsTofunction} />
      </InputContainer>
    </Container>
  );
}

function SearchView({ name, updateText, img }: any) {
  console.log('search view:', name);

  return (
    <div onClick={() => updateText(name)}>
      <KeywordContainer>
        <img src={img} alt="img" style={{ width: 30, height: 30, marginRight: 15 }} />
        <Keyword>{name}</Keyword>
        <RemoveButton>x</RemoveButton>
      </KeywordContainer>
    </div>
  );
}

export default SearchBar;
