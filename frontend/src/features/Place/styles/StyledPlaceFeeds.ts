import styled from 'styled-components';

export const PlaceFeedsWrapper = styled.div`
  margin-top: 1rem;
`;

export const SortOption = styled.div`
  text-align: right;
  padding-right: 1%;
`;

export const PlaceFeedsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 0.25rem;
`;

export const FeedImageWrapper = styled.div`
  position: relative;
  height: 8rem;
`;

export const FeedImage = styled.img`
  width: 100%;
  height: 100%;
`;
