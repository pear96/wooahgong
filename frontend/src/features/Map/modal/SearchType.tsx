import React, { useState } from 'react';
import styled from 'styled-components';
import style from './SearchType.module.css';
import { ReactComponent as Car } from '../../../assets/map/Car.svg';
import { ReactComponent as Walk } from '../../../assets/map/Walk.svg';


const MbtiContainer = styled.div`
  display: inline-block;
  background: #d7d7d7;
  font-family: 'NotoSansKR';
  font-size: 14px;
  font-weight: 700;
  width: 100px;
  height: 30px;
  margin: 2px 10px;
  margin-bottom: 10px;
  line-height: 28px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

type MyProps = {
  open: boolean;
  onClose: (e: any) => void;
};

function SearchType({ open, onClose}: MyProps) {
  const [type, setType] = useState<boolean>(false);
  const handleStopEvent = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };
  const handleCarClick = (e : React.MouseEvent<SVGElement>) =>{
    e.stopPropagation();
    setType(false);
  }
  const handleWalkClick = (e : React.MouseEvent<SVGElement>) =>{
    e.stopPropagation();
    setType(true);
  }

  return (
    <div
      className={open ? `${style.openModal} ${style.modal}` : style.modal}
      onClick={onClose}
      onKeyDown={onClose}
      role="button"
      tabIndex={0}
    >
      {open ? (
        <section className={style.modalForm} onClick={handleStopEvent} onKeyDown={onClose} role="button" tabIndex={0}>
          <header>
            <h3 className={style.title}>이동수단을 선택하세요</h3>
          </header>
          <main>
            <div className={style.configForm}>
                {type ? (<>
                  <Car 
                    style={{
                      width : 32,
                      height : 32,
                      marginLeft : 70
                    }}
                    onClick={handleCarClick}/>
                  <Walk 
                    filter = "invert(66%) sepia(27%) saturate(5544%) hue-rotate(209deg) brightness(96%) contrast(97%)"
                    style={{
                      width : 32,
                      height : 32,
                      marginLeft : 56
                    }} onClick={handleWalkClick}/>
                </>) : (
                  <><Car 
                    filter = "invert(66%) sepia(27%) saturate(5544%) hue-rotate(209deg) brightness(96%) contrast(97%)"
                    style={{
                      width : 32,
                      height : 32,
                      marginLeft : 70
                    }} onClick={handleCarClick}/>
                  <Walk style={{
                    width : 32,
                    height : 32,
                    marginLeft : 56
                  }} onClick={handleWalkClick}/></>
                )}
                  
            </div>
            <div style={{
              display : "flex",
              justifyContent : "space-evenly"
            }}>
              <button style={{
                backgroundColor : "rgba(144, 136, 243, 1)",
                color : "white",
                width : 100,
                height : 46,
                borderRadius : 6,
                fontWeight : 700
              }} type='button'>확인</button>
              <button style={{
                backgroundColor : "white",
                width : 100,
                height : 46,
                borderRadius : 6,
                fontWeight : 700,
                border : "1px solid"
              }} type='button' onClick={onClose}>취소</button>
            </div>
            
          </main>
        </section>
      ) : null}
    </div>
  );
}

export default SearchType;
