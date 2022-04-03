import styled from 'styled-components';
import { Col } from 'antd';

export const PlaceInfoWrapper = styled.div`
  margin: 0.5rem 1rem 0 1rem;
`;

export const PlaceName = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
`;

export const AverageRatings = styled.div`
  font-size: 1.2rem;
  
`;

export const Address = styled.div`
  font-size: 0.8rem;
  font-weight: bold;
`;

export const Icons = styled(Col)`
  font-size: 1.5rem;
  margin-top: 4px;
`;

export const Icon = styled.div`
  display : inline;
  margin : 0 5px;
  cursor: pointer;
`;
