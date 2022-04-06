/* eslint-disable prefer-promise-reject-errors */
/* eslint-disable no-restricted-globals */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { Spin } from 'antd';
import { useAppSelector } from 'app/store';
import MainApi from 'common/api/MainApi';
import React, { useCallback, useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Grid } from '../styles/stylesForme';

const CustomSpin = styled.div`
  margin-left: 140%;
  margin-top: 200%;
`;

function Forme() {
  const { getFormeplace } = MainApi;
  const navigate = useNavigate();
  const { Changeradius } = useAppSelector((state) => state.main);
  const [target, setTarget] = useState<any>(null);
  const [state, setState] = useState([]);
  const [lat, setLat] = useState<number>();
  const [lng, setLng] = useState<number>();
  const [real, setReal] = useState([]);
  const [end, setEnd] = useState<boolean>(false);
  const stateRef = useRef(state);
  stateRef.current = state;
  const realRef = useRef(real);
  realRef.current = real;
  const endRef = useRef(end);
  endRef.current = end;

  const onClickGotoPlace = useCallback(
    (placeSeq) => () => {
      console.log(placeSeq);
      navigate(`/place/${placeSeq}`);
    },
    [],
  );

  const getLocation = async () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setLat(37.557620);
        setLng(126.923110);
        // setLat(position.coords.latitude);
        // setLng(position.coords.longitude);
      });
    }
  };
  const setArray = () =>{
    if(stateRef.current.length > 0){
      console.log(endRef.current, stateRef.current);
      if(!endRef.current){
        
        const temp = stateRef.current.splice(0, 18);
        console.log(temp);
        if(temp.length < 18){
          setEnd(true);
        }
        if(realRef.current.length > 0){
          setReal([...realRef.current, ...temp])
        }
        else setReal([...temp]);
      }
    }
  } 
  async function getAndFormeplace() {
    // await getLocation();
    const body = { searchRadius: Changeradius, lat, lng };
    if (lat !== undefined && lng !== undefined) {
      const result = await getFormeplace(body);
      console.log(result);
      setState(result.data.places);
    }
  }


  const onIntersect = async ([entry]: any, observer: any) => {
    if (entry.isIntersecting) {
      observer.unobserve(entry.target);
      if(!endRef.current) setArray();
      observer.observe(entry.target);
    }
  };
  useEffect(() => {
    let observer: any;
    if (target) {
      observer = new IntersectionObserver(onIntersect, {
        threshold: 0.2,
      });
      observer.observe(target);
    }
    return () => observer && observer.disconnect();
  }, [target]);
  useEffect(()=>{
    setArray();
  },[state])

  useEffect(() => {
    setState([]);
    setReal([]);
    setEnd(false);
    getAndFormeplace();
  }, [lat, lng, Changeradius]);

  useEffect(() => {
    getLocation();
  }, []);

  return (
    <>
      <h2 style={{ fontFamily: 'NotoSansKR', fontWeight: 'bold' }}>
        {window.localStorage.getItem('nickname')}님을 위한 추천
      </h2>
      { (lng || lat) !== undefined ? (<Grid>
          {real.map((item: any, i) => {
            const idx = i;
            return (
              <div style={{width: 115, margin : "0px auto"}} key={idx}>
                <img
                  style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                  src={item.placeImageUrl}
                  alt="test"
                  onClick={onClickGotoPlace(item.placeSeq)}
                />
              </div>
            );
          })}

        <div
        ref={setTarget}
        style={{
          height: '15px',
        }}
      />
      </Grid>) : (
      <div style={{
        height : 525,
        display : "flex",
        justifyContent : "center",
        alignItems : "center",
        fontFamily: 'NotoSansKR',
        fontSize : 30
      }}>
          결과가 없습니다😥
      </div>)
      }
    </>
  );
}

export default Forme;
