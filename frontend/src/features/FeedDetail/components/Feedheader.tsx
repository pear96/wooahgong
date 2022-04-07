/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useCallback, useEffect, useState } from 'react';
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
  Test,
} from '../styles/styledFeedheader';

// actions

import { setUpdate } from '../feedDetailSlice';

function Feedheader({ nickname, userImage, feedSeq, placeName, address, amIOwner, placeSeq }: any) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { deleteFeedDetail } = FeedDetailApi;
  const [isUpdate, setIsUpdate] = useState(false);
  console.log(feedSeq);
  console.log(amIOwner);
  console.log(userImage);
  const onClickDeleteFeedDetail = useCallback(async () => {
    await deleteFeedDetail(feedSeq);
    navigate(`/profile/${nickname}`);
    // main만들어지면 main으로 가자
  }, []);

  const onClickUpdateFeedDetail = useCallback(() => {
    dispatch(setUpdate(true));
    setIsUpdate((prev) => !prev);
  }, [isUpdate]);

  const onClickgoToPlace = useCallback(() => {
    navigate(`/place/${placeSeq}`);
  }, []);

  const handleGotoProfile = () => {
    navigate(`/profile/${nickname}`);
  };
  useEffect(()=>{
    return () => {
      if(isUpdate) {
        dispatch(setUpdate(false));
        setIsUpdate(false);
      }
    }
  })

  const menu = (
    <Menu style={{ borderRadius: '10px' }}>
      <Menu.Item key="0" onClick={onClickUpdateFeedDetail} style={{ fontFamily: 'NotoSansKR' }}>
        수정
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="1" onClick={onClickDeleteFeedDetail} style={{ fontFamily: 'NotoSansKR' }}>
        삭제
      </Menu.Item>
    </Menu>
  );

  return (
    <>
      <HeaderContainer>
        <div style={{ marginRight: '10px', cursor: 'pointer' }} onClick={handleGotoProfile}>
          <Avatar size={60} src={userImage} icon={<UserOutlined />} />
        </div>
        <NicknameContainer onClick={handleGotoProfile}>{nickname}</NicknameContainer>
        {amIOwner ? (
          <HamburgerContainer>
            <Dropdown overlay={menu} trigger={['click']}>
              <a onClick={(e) => e.preventDefault()}>
                <Hamburger />
              </a>
            </Dropdown>
          </HamburgerContainer>
        ) : (
          <Test />
        )}
      </HeaderContainer>

      <HeaderBelowContainer onClick={onClickgoToPlace}>
        <img src={Mapmarker} alt="test" />
        <span style={{ color: '#8C8C8C' }}>
          {placeName}, {address}
        </span>
      </HeaderBelowContainer>
    </>
  );
}

export default Feedheader;
