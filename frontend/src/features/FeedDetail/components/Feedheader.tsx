/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import FeedDetailApi from 'common/api/FeedDetailApi';
import { useNavigate } from 'react-router-dom';
// antd
import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { Menu, Dropdown } from 'antd';
import { useAppDispatch } from 'app/store';

// assets
import { Link } from 'react-router-dom';
import { ReactComponent as Hamburger } from '../../../assets/feedDetail/hamburger1.svg';
import Mapmarker from '../../../assets/feedDetail/mapmarker.png';
// styled
import {
  HeaderContainer,
  NicknameContainer,
  HamburgerContainer,
  HeaderBelowContainer,
} from '../styles/styledFeedheader';

// actions

import { setUpdate } from '../feedDetailSlice';

function Feedheader({ nickname, userImage, feedSeq, placeName, address }: any) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { deleteFeedDetail } = FeedDetailApi;
  const [isUpdate, setIsUpdate] = useState(false);
  console.log(feedSeq);

  const onClickDeleteFeedDetail = useCallback(async () => {
    await deleteFeedDetail(feedSeq);
    navigate('/map');
  }, []);

  const onClickUpdateFeedDetail = useCallback(() => {
    setIsUpdate((prev) => !prev);
    dispatch(setUpdate(isUpdate));
  }, [isUpdate]);

  const onClickConfirmUpdateFeedDetail = useCallback(() => {
    setIsUpdate((prev) => !prev);
    dispatch(setUpdate(isUpdate));
  }, [isUpdate]);
  const menu = (
    <Menu>
      <Menu.Item key="0" onClick={onClickUpdateFeedDetail}>
        수정
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="1" onClick={onClickDeleteFeedDetail}>
        삭제
      </Menu.Item>
    </Menu>
  );
  const confirmUpdatemenu = (
    <Menu>
      <Menu.Item key="0" onClick={onClickConfirmUpdateFeedDetail}>
        확인
      </Menu.Item>
    </Menu>
  );
  return (
    <>
      <HeaderContainer>
        <div style={{ marginRight: '25px', width: '20px' }}>
          <Avatar size={64} src={userImage} icon={<UserOutlined />} />
        </div>
        <NicknameContainer>{nickname}</NicknameContainer>
        <HamburgerContainer>
          {isUpdate ? (
            <Dropdown overlay={menu} trigger={['click']}>
              <a onClick={(e) => e.preventDefault()}>
                <Hamburger />
              </a>
            </Dropdown>
          ) : (
            <Dropdown overlay={confirmUpdatemenu} trigger={['click']}>
              <a onClick={(e) => e.preventDefault()}>
                <Hamburger />
              </a>
            </Dropdown>
          )}
        </HamburgerContainer>
      </HeaderContainer>
      <HeaderBelowContainer>
        <img src={Mapmarker} alt="test" />
        <Link to="/" style={{ color: '#8C8C8C' }}>
          {placeName}, {address}
        </Link>
      </HeaderBelowContainer>
    </>
  );
}

export default Feedheader;
