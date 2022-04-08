import styled from 'styled-components';

export const PlaceFeedsWrapper = styled.div`
  margin-top: 5px;
`;

export const SortOption = styled.div`
  text-align: right;
  margin-right : 5px;
  margin-bottom : 2%;
`;

export const PlaceFeedsGrid = styled.div`
  display: grid;
  // height : 241px;
  grid-template-columns: repeat(auto-fill, minmax(111px, 1fr));
  grid-auto-rows : 111px;
  gap: 0.25rem;
  overflow-y : auto;
`;

export const FeedImageWrapper = styled.div`
  position: relative;
  margin : 0px auto;
  width : 111px;
  height: 100%;
  cursor : pointer;
`;

export const FeedImage = styled.img`
  width: 100%;
  height: 100%;
`;
