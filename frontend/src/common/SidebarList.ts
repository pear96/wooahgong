import React from 'react';
import HomeIcon from 'assets/menu/home.png';
import ProfileIcon from 'assets/menu/profile.png';
import ReportIcon from 'assets/menu/report.png';
import LogoutIcon from 'assets/menu/logout.png';

export const SidebarList = [
  {
    title: 'Home',
    path: '/main',
    icon: <HomeIcon />,
  },
  {
    title: 'Profile',
    path: '/profile',
    icon: <ProfileIcon />,
  },
  {
    title: 'Report',
    path: '/report',
    icon: <ReportIcon />,
  },
  {
    title: 'Logout',
    path: '/',
    icon: <LogoutIcon />,
  },
];
