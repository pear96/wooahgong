/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import styled from 'styled-components';

// antd
import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { Menu, Dropdown } from 'antd';

// assets
import { Link } from 'react-router-dom';
import { ReactComponent as Hamburger } from '../../../assets/feedDetail/hamburger1.svg';
import { ReactComponent as Mapmarker } from '../../../assets/feedDetail/test.svg';
import Test from '../../../assets/feedDetail/mapmarker.png';
// styled
import {
  HeaderContainer,
  NicknameContainer,
  HamburgerContainer,
  HeaderBelowContainer,
} from '../styles/styledFeedheader';

function Feedheader({ nickname, userImage, feedSeq, placeName, address }: any) {
  const menu = (
    <Menu>
      <Menu.Item key="0">
        <Link to="/">수정</Link>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="1">
        <Link to="/">삭제</Link>
      </Menu.Item>
    </Menu>
  );
  return (
    <>
      <HeaderContainer>
        <div style={{ marginRight: '12px' }}>
          <Avatar size={64} src={userImage} icon={<UserOutlined />} />
        </div>
        <NicknameContainer>{nickname}</NicknameContainer>
        <HamburgerContainer>
          <Dropdown overlay={menu} trigger={['click']}>
            <a onClick={(e) => e.preventDefault()}>
              <Hamburger />
            </a>
          </Dropdown>
        </HamburgerContainer>
      </HeaderContainer>
      <HeaderBelowContainer>
        <img src={Test} alt="test" />
        <Link to="/" style={{ color: '#8C8C8C' }}>
          {placeName}, {address}
        </Link>
      </HeaderBelowContainer>
    </>
  );
}

export default Feedheader;
