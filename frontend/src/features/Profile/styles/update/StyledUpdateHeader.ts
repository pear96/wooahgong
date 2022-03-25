import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const StyledProfileUpdateHeader = styled.div`
  /* background-color: #edbaba; */
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const BackWrapper = styled(Link)`
  margin-left: 2rem;
  font-size: 1.5rem;
  background: none;
`;

export const ProfileUpdateTitle = styled.span`
  font-size: 1.2rem;
`;

export const NavMenu = styled.nav`
  background-color: #fafafa;
  width: 300px;
  height: 100vh;
  display: flex;
  justify-content: center;
  position: fixed;
  top: 0;
  left: -100%;
  transition: 850ms;
`;

export const NavMenuItems = styled.ul`
  width: 100%;
  padding: 0;
`;

export const NavbarToggle = styled.li`
  background-color: #fafafa;
  width: 100%;
  height: 80px;
  display: flex;
  justify-content: start;
  align-items: center;
`;

export const NavText = styled.li`
  display: flex;
  justify-content: start;
  align-items: center;
  padding: 8px 0px 8px 16px;
  list-style: none;
  height: 60px;

  a {
    text-decoration: none;
    color: #000;
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