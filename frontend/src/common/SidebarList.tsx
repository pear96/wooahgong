import React from 'react';
import HomeIcon from 'assets/menu/home.png';
import ProfileIcon from 'assets/menu/profile.png';
import ReportIcon from 'assets/menu/report.png';
import LogoutIcon from 'assets/menu/logout.png';

const styles = {
  width: '44px',
  height: '44px',
};

// const nickname = useSelector((state: ReducerType) => state.login.nickname);

export const SidebarList = [
  {
    title: '홈',
    path: '/main',
    icon: <img style={styles} src={HomeIcon} alt="HomeIcon" />,
  },
  {
    title: '프로필',
    path: `/profile`,
    icon: <img style={styles} src={ProfileIcon} alt="ProfileIcon" />,
  },
  {
    title: '제보하기',
    path: '/report',
    icon: <img style={styles} src={ReportIcon} alt="ReportIcon" />,
  },
  {
    title: '로그아웃',
    path: '/',
    icon: <img style={styles} src={LogoutIcon} alt="LogoutIcon" />,
  },
];
