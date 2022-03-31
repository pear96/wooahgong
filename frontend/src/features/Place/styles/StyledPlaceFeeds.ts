import styled from 'styled-components';

export const PlaceFeedsWrapper = styled.div`
  margin-top: 5px;
`;

export const SortOption = styled.div`
  text-align: right;
  padding-right: 1%;
`;

export const PlaceFeedsGrid = styled.div`
  display: grid;
  // height : 241px;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 0.25rem;
  overflow-y : auto;
`;

export const FeedImageWrapper = styled.div`
  position: relative;
  height: 8rem;
  cursor : pointer;
`;

export const FeedImage = styled.img`
  width: 100%;
  height: 100%;
`;
