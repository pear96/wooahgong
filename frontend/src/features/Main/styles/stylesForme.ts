import styled from 'styled-components';

export const Grid = styled.div`
  display: grid;
  width: 100%;
  height: 525px;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  grid-auto-rows: 8rem;
  overflow: auto;
  gap: 0.25rem;
  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
`;
