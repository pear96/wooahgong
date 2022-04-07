import styled from 'styled-components';

export const Grid = styled.div`
  display: grid;
  width: 100%;
  height: 525px;
  grid-template-columns: repeat(auto-fill, minmax(116px, 1fr));
  grid-auto-rows: 115px;
  overflow: auto;
  gap: 0.25rem;
  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
`;
