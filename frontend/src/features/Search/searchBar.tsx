import React from 'react';
import styled, { css } from 'styled-components';
import { ReactComponent as Back } from '../../assets/search/back.svg';

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
function SearchBar() {
  return (
    <Container>
      <BackContainer>
        <Back />
      </BackContainer>
      <InputContainer>
        <Input placeholder="검색어를 입력하세요" />
      </InputContainer>
    </Container>
  );
}

export default SearchBar;
