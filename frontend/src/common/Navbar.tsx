import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { StyledNavbar, Menubars, NavMenu, NavMenuItems, NavbarToggle, NavText } from 'common/styles/StyledNavbar';
import { FaBars } from 'react-icons/fa';
import { AiOutlineClose, AiOutlineSearch } from 'react-icons/ai';
import { Avatar } from 'antd';
import mainLogo from 'assets/Logo.png';
import { SidebarList } from './SidebarList';

const nickname = '명동홀릭';

function Navbar() {
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);

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
            <Link to="/profile">
              <Avatar src="https://joeschmoe.io/api/v1/random" style={{ marginRight: '6px' }} />
              {nickname} 님
            </Link>
          </NavText>
          {SidebarList.map((item) => {
            return (
              <NavText key={item.title}>
                <Link to={item.path}>
                  {item.icon}
                  <span style={{ marginLeft: '16px' }}>{item.title}</span>
                </Link>
              </NavText>
            );
          })}
        </NavMenuItems>
      </NavMenu>
    </>
  );
}

export default Navbar;
