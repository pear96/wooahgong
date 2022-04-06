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
  const [offset, setOffset] = useState<number>(0);
  const [maxlength, setMaxlength] = useState<number>(18);
  const [end, setEnd] = useState<boolean>(false);
  const stateRef = useRef(state);
  stateRef.current = state;
  const realRef = useRef(real);
  realRef.current = real;
  const offsetRef = useRef(offset);
  offsetRef.current = offset;
  const endRef = useRef(end);
  endRef.current = end;
  const maxlengthRef = useRef(maxlength);
  maxlengthRef.current = maxlength;

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
        setLat(position.coords.latitude);
        setLng(position.coords.longitude);
      });
    }
  };
  const setArray = () =>{
    if(stateRef.current.length > 0){
      console.log(endRef.current, stateRef.current);
      if(!endRef.current){
        console.log(offsetRef.current, maxlengthRef.current);
        const temp = stateRef.current.splice(offsetRef.current, maxlengthRef.current);
        console.log(temp);
        if(temp.length < 18){
          setEnd(true);
        }
        if(realRef.current.length > 0){
          setReal([...realRef.current, ...temp])
        }
        else setReal([...temp]);
        setOffset(offsetRef.current+18);
        setMaxlength(maxlengthRef.current+18);
      }
    }
  } 
  async function getAndFormeplace() {
    // await getLocation();
    const body = { searchRadius: Changeradius, lat, lng };
    if (lat !== undefined && lng !== undefined) {
      const result = await getFormeplace(body);
      setState(result.data?.places);
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
    setOffset(0);
    setMaxlength(18);
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
      <Grid>
        {(lng || lat) !== undefined ? (
          real?.map((item: any) => {
            return (
              <div style={{width: 115, margin : "0px auto"}} key={item.placeSeq}>
                <img
                  style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                  src={item.placeImageUrl}
                  alt="test"
                  onClick={onClickGotoPlace(item.placeSeq)}
                />
              </div>
            );
          })
        ) : (
          <CustomSpin>
            <Spin size="large" />
          </CustomSpin>
        )}
        <div
        ref={setTarget}
        style={{
          height: '15px',
        }}
      />
      </Grid>
    </>
  );
}

export default Forme;
