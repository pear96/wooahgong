import React from 'react';
import styled from 'styled-components';

export const LogoContainer = styled.div`
  margin-top: 213px;
  margin-left: 120px;
  color: rgba(179, 161, 224, 0.4);
`;

export const ActiveButton = styled.button`
  background: linear-gradient(90deg, #b3a1e0 0%, #5dacf5 100%);
  border-style: none;
  border-radius: 10px;
  width: 200px;
  height: 40px;
  margin-top: 20px;
  margin-left: 65px;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  cursor: pointer;
  color: rgba(255, 255, 255, 1);
  transition: all 0.3s ease 0s;
  &:hover {
    box-shadow: 0rem 0.5rem 2rem rgba(179, 161, 224, 0.4);
    transform: translateY(-7px);
  }
`;
