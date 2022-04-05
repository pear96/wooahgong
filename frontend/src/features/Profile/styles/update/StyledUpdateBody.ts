import { Button, Space, Row, Col } from 'antd';
import styled from 'styled-components';

export const StyledUpdateBody = styled.div`
  /* height: 60px; */
  display: flex;
  justify-content: center;
  font-family: 'NotoSansKR';
  align-items: center;
  margin-top: 1rem;
`;

export const CenterAlignedSpace = styled(Space)`
  align-items: center;
  gap: 1rem;
`;

export const UploadButton = styled(Button)`
font-family: 'NotoSansKR';
  border-radius: 5px;
  &:hover {
    color: #9088f3;
    border-color: #9088f3;
  }
`;

export const RePwdButton = styled(Button)`
  background-color: lightgray;
  color: white;
  border-radius: 0.25rem;
`;

export const StyledUpdateInfo = styled.div`
font-family: 'NotoSansKR';
  margin: 2rem 2rem 0 2rem;
`;
export const StyledInfoRow = styled(Row)`
  height: 3rem;
`;

export const StyledInfoTitle = styled(Col)`
  font-weight: bold;
`;

export const UnderlinedDiv = styled.div`
  border-bottom: 1px solid #b3a1e0;
`;

export const Warning = styled.div`
  color: red;
  font-size: small;
`;

export const LeaveButton = styled.div`
  margin-left : 2rem;
  margin-top : 8rem;
  color: lightgray;
  &:hover {
    cursor: pointer;
  }
`;
