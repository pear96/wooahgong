import styled from 'styled-components';

export const FeedsAndPlacesWrapper = styled.div`
  margin-top: 1rem;
  /* display: flex;
  justify-content: center; */
  
`;

export const ProfileFeedsOrPlacesGrid = styled.div`
  display: grid;
  width : 100%;
  height : 424px;
  grid-template-columns: repeat(auto-fill, minmax(116px, 1fr));
  grid-auto-rows : 115px;
  overflow : auto;
  gap: 0.25rem;
  &::-webkit-scrollbar{ display:none; };
  -ms-overflow-style: none;
`;

export const FeedOrPlaceImageWrapper = styled.div`
  position: relative;
  width : 115px;
  
  height: 100%;
  cursor : pointer;
  // width : 120px;
  // height : 120px;
`;

