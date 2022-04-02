import styled from 'styled-components';

export const ContentWrapper = styled.div`
  display: flex;
  justify-content: left;
  flex-direction: column;
`;

export const RateWrapper = styled.div`
  margin-top: 10px;
`;

export const ContentText = styled.div`
  margin-left: 20px;
  margin-right: 20px;
  margin-top: 10px;
`;

export const CustomText = styled.p`
  text-align: justify;
  font-weight: bold;
`;

export const MoodContainer = styled.div`
  margin-left: 20px;
  display: flex;
  flex-direction: row;
`;

export const CustomButtom = styled.button`
  background: linear-gradient(90deg, #c09fdd -3.15%, #86a6eb 100%);
  font-family: 'NotoSansKR';
  border-style: none;
  border-radius: 10px;
  margin-top: 5px;
  margin-left: 0px;
  width: 80px;
  height: 40px;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  cursor: pointer;
  color: rgba(255, 255, 255, 1);
  transition: all 0.3s ease 0s;
  &:hover {
    box-shadow: 0rem 0.5rem 2rem rgba(179, 161, 224, 0.4);
    transform: translateY(-7px);
  }
`;
