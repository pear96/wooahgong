import styled from 'styled-components';

export const ModalBackground = styled.div`
  width: 100vw;
  height: calc(100vh - 80px);
  backdrop-filter: blur(8px);
  position: fixed;
  left: 0;
  top: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ModalContainer = styled.div`
  width: 80%;
  height: 500px;
  border-radius: 12px;
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  display: flex;
  flex-direction: column;
  padding: 25px 25px 0px 25px;
`;

export const TitleCloseBtn = styled.div`
  display: flex;
  justify-content: flex-end;

  &:hover {
    cursor: pointer;
  }
`;

export const Title = styled.div`
  display: inline-block;
  text-align: center;
  margin-top: 10px;

  h2 {
    font-weight: bold;
  }
`;

export const Body = styled.div`
  flex: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  h3 {
    font-size: 1.3rem;
  }
`;

export const Footer = styled.div`
  flex: 20%;
  display: flex;
  justify-content: center;
  align-items: center;

  Button {
    width: 150px;
    height: 45px;
    margin: 5px;
    border-radius: 8px;
    font-size: 20px;
    cursor: pointer;

    &:nth-child(1) {
      border: none;
      background-color: #fe7575;
      color: white;
    }

    &:nth-child(2) {
      border: 1px solid black;
      background-color: white;
      color: black;
    }
  }
`;
