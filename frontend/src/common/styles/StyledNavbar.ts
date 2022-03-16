import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const StyledNavbar = styled.div`
  background-color: #edbaba;
  height: 80px;
  display: flex;
  justify-content: start;
  align-items: center;
`;

export const Menubars = styled(Link)`
  margin-left: 2rem;
  font-size: 2rem;
  background: none;
`;

export const ActiveNavMenu = styled.nav``;
export const InactiveNavMenu = styled.nav``;
export const NavMenuItems = styled.ul``;
export const NavbarToggle = styled.li``;
export const NavText = styled.li``;
