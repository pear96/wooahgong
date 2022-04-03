/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState, useCallback, useEffect } from 'react';
import styled, { css } from 'styled-components';
import { useAppDispatch } from 'app/store';
import Select from 'react-select';
import { ReactComponent as Back } from '../../assets/search/back.svg';
import { setToggle, setAutoComplete } from './searchSlice';


// &는 자기 자신을 나타냄
// 즉, 나 자신(li)들에서 마지막 요소 값을 제외한 값에 margin-bottom 속성 지정

const Container = styled.div`
  width: 100%;
  display : flex;
  margin : 0px auto;
  justify-content : space-evenly;
  align-items : center;
  // margin-left: 15px;
  background-color: #fff;
  box-sizing: border-box;
  margin-bottom : 20px;
  margin-top : 10px;
`;

// horizontalCenter 스타일 컴포넌트를 믹스인하여 속성값 전달

const Input = styled.input`
  width: 310px;
  background-color: #fff;
  font-weight: 700;
  font-size: 15px;
  font-family: 'NotoSansKR';
  border-top : none;
  border-left : none;
  border-right : none;
  border-bottom: 1px solid;
  // box-sizing: border-box;
`;


function SearchBar({ keyword, results, updateField }: any) {
  const dispatch = useAppDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [arr, setArr] = useState<any[]>([]);

  const onClickToggle = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  // 자동완성 구현
  const updateText = useCallback((text: any) => {
    updateField('keyword', text, false);
    updateField('results', []);
  }, []);
  const handleGoback = (e : React.MouseEvent) => {
    window.history.back();
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

  useEffect(() => {
    setArr(results);
  }, [results]);
  useEffect(()=>{
    dispatch(setAutoComplete(arr as any));
  },[arr])
  return (
    <Container>
        <Back style={{width : 35, height : 35}} onClick={handleGoback}/>
        <Input onClick={onClickToggle} placeholder="검색어를 입력하세요" value={keyword} onChange={propsTofunction} />
    </Container>
  );
}


export default SearchBar;
