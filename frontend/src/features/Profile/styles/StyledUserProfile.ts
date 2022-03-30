import styled from 'styled-components';

export const UserProfileWrapper = styled.div`
  display: grid;
  justify-content: space-between;
  max-width: 1024px;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  /* gap: 0.5rem; */
  margin-left: auto;
  margin-right: auto;
  margin-top: 2rem;
`;

export const ProfilePictureWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

export const ProfilePicture = styled.img`
  display: flex;
  width: 5rem;
  height: 5rem;
  border-radius: 9999px;
`;

export const ProfileRightWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: left;
  grid-column: span 2 / span 2;
`;

export const ProfileRight = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
`;

export const ProfileNickname = styled.div`
  /* margin-right: 1rem; */
  font-size: 1.5rem;
  line-height: 2rem;
`;

export const ProfileBottomWrapper = styled.div`
  display: grid;
  justify-content: space-between;
  max-width: 1024px;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  /* gap: 0.5rem; */
  margin-left: auto;
  margin-right: auto;
  margin-top: 1rem;
`;

export const ProfileMBTI = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

export const ProfileMoods = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: left;
  grid-column: span 2 / span 2;
  color: #9088f3;
`;

export const ProfileEditButtonWrapper = styled.div`
  margin-top: 1rem;
  display: flex;
  justify-content: center;
`;

export const ProfileEditButton = styled.button`
  background: linear-gradient(90deg, #b3a1e0 0%, #5dacf5 100%);
  border-style: none;
  border-radius: 10px;

  width: 80%;
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
