/* eslint-disable prefer-promise-reject-errors */
/* eslint-disable no-restricted-globals */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { Spin } from 'antd';
import { useAppSelector } from 'app/store';
import MainApi from 'common/api/MainApi';
import React, { useCallback, useEffect, useState } from 'react';
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

  const [state, setState] = useState([]);

  const [lat, setLat] = useState<number>();
  const [lng, setLng] = useState<number>();

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

  async function getAndFormeplace() {
    // await getLocation();
    const body = { searchRadius: Changeradius, lat, lng };
    if (lat !== undefined && lng !== undefined) {
      const result = await getFormeplace(body);
      setState(result.data?.places);
    }
  }

  useEffect(() => {
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
          state?.map((item: any) => {
            return (
              <div key={item.placeSeq}>
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
      </Grid>
    </>
  );
}

export default Forme;
