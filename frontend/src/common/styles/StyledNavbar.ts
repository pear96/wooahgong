import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const StyledNavbar = styled.div`
  height: 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Menubars = styled(Link)`
  margin-left: 15px;
  font-size: 2rem;
  background: none;
`;

export const NavMenu = styled.nav`
  z-index: 100;
  background-color: rgba(40, 40, 40, 0.7);
  backdrop-filter: blur(4px);
  width: 300px;
  height: 100vh;
  display: flex;
  justify-content: center;
  position: fixed;
  top: 0;
  left: -100%;
  transition: 850ms;
  border-radius : 0px 60px 60px 0px;
  font-family : 'NotoSansKR';
`;

export const NavMenuItems = styled.ul`
// background-color: rgba(255,255,255,0.3);
  // backdrop-filter: blur(10px);
  width: 100%;
  padding: 0;
`;

export const NavbarToggle = styled.li`
  // background-color: rgba(255,255,255,0.3);
  // backdrop-filter: blur(10px);
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: start;
  align-items: center;
`;

export const NavText = styled.li`
  display: flex;
  // justify-content: start;
  // align-items: center;
  padding: 8px 0px 8px 16px;
  margin : 10px 10px;
  list-style: none;
  height: 60px;
  // 질문!
  a {
    text-decoration: none;
    color : white;
    font-size: 18px;
    width: 95%;
    height: 100%;
    align-items: center;
    padding: 0 16px;
    border-radius: 4px;

    /* &:hover {
      background-color: #1a83ff;
    } */
  }
`;
