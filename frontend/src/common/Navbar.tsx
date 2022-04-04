import React, { useCallback, useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
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
  const profileLink = `/profile/${window.localStorage.getItem('nickname')}`;
  const navigate = useNavigate();
  const onClickToSeacrh = useCallback(() => {
    navigate('/search');
  }, []);

  return (
    <>
      <StyledNavbar>
        <Menubars to="#">
          <FaBars style={{ color: '#000' }} onClick={showSidebar} />
        </Menubars>
        <img src={mainLogo} alt="mainLogo" width={50} height={50} />
        <AiOutlineSearch
          onClick={onClickToSeacrh}
          style={{ width: '40px', height: '40px', marginRight: '1rem', cursor: 'pointer' }}
        />
      </StyledNavbar>
      <NavMenu style={sidebar ? { left: '0', transition: '350ms' } : {}}>
        <NavMenuItems onClick={showSidebar}>
          <NavbarToggle>
            <Menubars to="#">
              <AiOutlineClose style={{ color: '#000' }} />
            </Menubars>
          </NavbarToggle>
          <NavText
            style={{
              marginLeft: 0,
            }}
          >
            <Link
              style={{
                display: 'flex',
                alignItems: 'center',
                paddingLeft: 0,
              }}
              to={profileLink}
            >
              <Avatar src={window.localStorage.getItem('profileImg')} style={{ marginRight: '6px' }} />
              <span style={{ marginLeft: 5 }}>{window.localStorage.getItem('nickname')} 님</span>
            </Link>
          </NavText>
          {SidebarList.map((item) => {
            if (item.title === 'LOGOUT') {
              return (
                <NavText key={item.title}>
                  <Link
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                    }}
                    to={item.path}
                    onClick={deleteToken}
                  >
                    {item.icon}
                    <span style={{ marginLeft: '16px' }}>{item.title}</span>
                  </Link>
                </NavText>
              );
            }
            return (
              <NavText key={item.title}>
                <Link
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                  }}
                  to={item.path}
                >
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
