import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const StyledProfileUpdateHeader = styled.div`
  /* background-color: #edbaba; */
  height: 60px;
  display: flex;
  justify-content: space-between;
  font-family: 'NotoSansKR';
  align-items: center;
`;

export const BackWrapper = styled(Link)`
  margin-left: 2rem;
  font-size: 1.5rem;
  background: none;
`;

export const ProfileUpdateTitle = styled.span`
font-family: 'NotoSansKR';
  font-size: 1.2rem;
`;
