import React, { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { StyledNavbar, Menubars, NavMenu, NavMenuItems, NavbarToggle, NavText } from 'common/styles/StyledNavbar';
import { FaBars } from 'react-icons/fa';
import { AiOutlineClose, AiOutlineSearch } from 'react-icons/ai';
import { useSelector } from 'react-redux';
import { ReducerType } from 'app/rootReducer';
import { Avatar } from 'antd';
import mainLogo from 'assets/Logo.png';
import { deleteToken } from '../common/api/JTW-Token';
import { SidebarList } from './SidebarList';

function Navbar() {
  const [sidebar, setSidebar] = useState(false);
  const user = useSelector((state: ReducerType) => state.login);
  const showSidebar = () => setSidebar(!sidebar);
  const profileLink = `/profile/${user.nickname}`;

  return (
    <>
      <StyledNavbar>
        <Menubars to="#">
          <FaBars style={{ color: '#000' }} onClick={showSidebar} />
        </Menubars>
        <img src={mainLogo} alt="mainLogo" width={50} height={50} />
        <AiOutlineSearch style={{ width: '40px', height: '40px', marginRight: '1rem' }} />
      </StyledNavbar>
      <NavMenu style={sidebar ? { left: '0', transition: '350ms' } : {}}>
        <NavMenuItems onClick={showSidebar}>
          <NavbarToggle>
            <Menubars to="#">
              <AiOutlineClose style={{ color: '#000' }} />
            </Menubars>
          </NavbarToggle>
          <NavText>
            <Link to={profileLink}>
              <Avatar src={user.profileImg} style={{ marginRight: '6px' }} />
              {user.nickname} 님
            </Link>
          </NavText>
          {SidebarList.map((item) => {
            if (item.title === '로그아웃') {
              return (
                <NavText key={item.title}>
                  <Link to={item.path} onClick={deleteToken}>
                    {item.icon}
                    <span style={{ marginLeft: '16px' }}>{item.title}</span>
                  </Link>
                </NavText>
              );
            }
            return (
              <NavText key={item.title}>
                <Link to={item.title === '프로필' ? `${item.path}/${user.nickname}` : item.path}>
                  {item.icon}
                  <span style={{ marginLeft: '16px' }}>{item.title}</span>
                </Link>
              </NavText>
            );
          })}
        </NavMenuItems>
      </NavMenu>
      <Outlet />
    </>
  );
}

export default Navbar;
