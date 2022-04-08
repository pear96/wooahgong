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
  height : 400px;
  display : flex;
  justify-content : center;
  align-items : center;
`;

function Forme() {
  const { getFormeplace } = MainApi;
  const navigate = useNavigate();
  const { Changeradius } = useAppSelector((state) => state.main);
  const [target, setTarget] = useState<any>(null);
  const [state, setState] = useState<any>([]);
  const [end, setEnd] = useState<boolean>(false);
  const [check, setCheck] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(0);
  const [distance, setDistance] = useState<number>();

  const distRef = useRef(distance);
  distRef.current = distance;
  const pageRef = useRef(page);
  pageRef.current = page;
  const stateRef = useRef(state);
  stateRef.current = state;

  const endRef = useRef(end);
  endRef.current = end;

  const onClickGotoPlace = useCallback(
    (placeSeq) => () => {
      console.log(placeSeq);
      navigate(`/place/${placeSeq}`);
    },
    [],
  );
  const getAndFormeplace = async () => {
    // await getLocation();
      const curlat = window.localStorage.getItem("lat");
      const curlng = window.localStorage.getItem("lng");
      if(curlat !== null && curlng !== null && !endRef.current){      
      // console.log
        const body = { searchRadius: distRef.current, lat : +curlat, lng : +curlng, page : pageRef.current };
        const result = await getFormeplace(body);
        console.log(result);
        if(result.status === 200){
          if(result.data.places.length === 0){
            setEnd(true);
          } else if(stateRef.current.length > 0){
            setState([...stateRef.current, ...result.data.places]);
            setPage(pageRef.current + 1);
          } else {
            setState([...result.data.places]);
            setPage(pageRef.current + 1);
          }
        }
    }
  }

  // const checkLength = () => {
  //   console.log(real.length);
  //   if (state.length > 0) {
  //     console.log(state);
  //     setCheck(false);
  //     return (
  //       <Grid>
  //         {state.map((item: any, i : number) => {
  //           const idx = i;
  //           return (
  //             <div style={{ width: 115, margin: "0px auto" }} key={idx}>
  //               <img
  //                 style={{ objectFit: 'cover', width: '100%', height: '100%' }}
  //                 src={item.placeImageUrl}
  //                 alt="test"
  //                 onClick={onClickGotoPlace(item.placeSeq)}
  //               />
  //             </div>
  //           );
  //         })}

  //         <div
  //           ref={setTarget}
  //           style={{
  //             height: '15px',
  //           }}
  //         />
  //       </Grid>
  //     )
  //   }
  //   return (<div style={{
  //     height: 400,
  //     display: "flex",
  //     justifyContent: "center",
  //     alignItems: "center",
  //     fontFamily: 'NotoSansKR',
  //     fontSize: 30,
  //     fontWeight: 700
  //   }}>
  //     추천 장소가 없습니다😥
  //   </div>)
  // }

  const onIntersect = async ([entry]: any, observer: any) => {
    if (entry.isIntersecting) {
      observer.unobserve(entry.target);
      await getAndFormeplace();
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

  useEffect(() => {
    console.log("????!?!?!?!?!?!?!?!?@!?!?#?#?@#?@?#!@?#!?#");
    setDistance(Changeradius);
    setState([]);
    setEnd(false);
    setCheck(true);
    setPage(0);
    setLoading(false);
    // getAndFormeplace();
  }, [Changeradius]);

  // useEffect(() => {
  //   getLocation();
  // }, []);

  return (
    <>
      <h2 style={{ fontFamily: 'NotoSansKR', fontWeight: 'bold', marginLeft: 10 }}>
        {window.localStorage.getItem('nickname')}님을 위한 추천
      </h2>
      {state.length > 0? (<Grid>
          {state.map((item: any, i : number) => {
            const idx = i;
            return (
              <div style={{ width: 115, margin: "0px auto" }} key={idx}>
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
          
        </Grid>) : (<CustomSpin>
                        <Spin size="large" />
                          <div
                          ref={setTarget}
                          style={{
                            height: '15px',
                          }}/>
      </CustomSpin>)}
      {/* {check === true ? (<CustomSpin>
        <Spin size="large" />
      </CustomSpin>
      ) : (checkLength())} */}
    </>
  );
}

export default Forme;
