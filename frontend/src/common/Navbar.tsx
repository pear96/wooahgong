import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  StyledNavbar,
  Menubars,
  ActiveNavMenu,
  NavMenuItems,
  NavbarToggle,
  NavText,
  InactiveNavMenu,
} from 'common/styles/StyledNavbar';
import { FaBars } from 'react-icons/fa';
import { AiOutlineClose } from 'react-icons/ai';
import { SidebarList } from './SidebarList';

function Navbar() {
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);

  return (
    <>
      <StyledNavbar>
        <Menubars to="#">
          <FaBars onClick={showSidebar} />
        </Menubars>
      </StyledNavbar>
      {sidebar ? (
        <ActiveNavMenu>
          <NavMenuItems>
            <NavbarToggle>
              <Menubars to="#">
                <AiOutlineClose />
              </Menubars>
            </NavbarToggle>
            {SidebarList.map((item, index) => {
              return (
                <NavText key={index}>
                  <Link to={item.path}>
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                </NavText>
              );
            })}
          </NavMenuItems>
        </ActiveNavMenu>
      ) : (
        <InactiveNavMenu>
          <li>ss</li>
        </InactiveNavMenu>
      )}
    </>
  );
}

export default Navbar;
