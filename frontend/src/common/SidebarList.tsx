import React from 'react';
import HomeIcon from 'assets/menu/home.png';
import MapIcon from 'assets/menu/mapicon.png';
import ReportIcon from 'assets/menu/report.png';
import LogoutIcon from 'assets/menu/logout.png';

const styles = {
  width: '44px',
  height: '44px',
};

// const nickname = useSelector((state: ReducerType) => state.login.nickname);

export const SidebarList = [
  {
    title: 'HOME',
    path: '/main',
    icon: <img style={styles} src={HomeIcon} alt="HomeIcon" />,
  },
  {
    title: 'MAP',
    path: `/map`,
    icon: <img style={styles} src={MapIcon} alt="ProfileIcon" />,
  },
  {
    title: 'REPORT',
    path: '/report',
    icon: <img style={styles} src={ReportIcon} alt="ReportIcon" />,
  },
  {
    title: 'LOGOUT',
    path: '/',
    icon: <img style={styles} src={LogoutIcon} alt="LogoutIcon" />,
  },
];
