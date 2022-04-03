import styled from 'styled-components';

export const FeedsAndPlacesWrapper = styled.div`
  margin-top: 1rem;
  /* display: flex;
  justify-content: center; */
`;

export const ProfileFeedsOrPlacesGrid = styled.div`
  display: grid;
  width: 100%;
  height: 390px;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  grid-auto-rows: 8rem;
  overflow: auto;
  gap: 0.25rem;
  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
`;

export const FeedOrPlaceImageWrapper = styled.div`
  position: relative;
  height: 8rem;
  cursor: pointer;
  // width : 120px;
  // height : 120px;
`;
