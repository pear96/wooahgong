import styled from 'styled-components';

export const InputWrapper = styled.div`
  margin-top: 20px;
  border-radius: 2px;
  box-sizing: border-box;
  width: 250px;
`;

export const CustomInput = styled.input`
  background-color: transparent;
  border: none;
  border-bottom: 1px solid #ccc;
  box-sizing: border-box;
  font-family: 'NotoSansKR';
  width: 250px;
  &:focus {
    outline: none;
  }

  &::-webkit-input-placeholder {
    color: #aaa;
  }

  &:focus::-webkit-input-placeholder {
    color: #9088f3;
  }
`;

export const ButtonContainer = styled.div``;

export const CustomButton = styled.button`
  background: linear-gradient(90deg, #c09fdd -3.15%, #86a6eb 100%);
  font-family: 'NotoSansKR';
  border-style: none;
  border-radius: 10px;
  margin-top: 5px;
  margin-left: 5px;
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

export const CustomForm = styled.form`
  display: flex;
  margin: 0 auto;
  max-width: 400px;
`;
