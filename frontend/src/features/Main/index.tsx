/* eslint-disable jsx-a11y/click-events-have-key-events */
import { width } from '@mui/system';
import MainApi from 'common/api/MainApi';
import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Main() {
  const { getFormeplace } = MainApi;
  const [state, setState] = useState([]);
  const navigate = useNavigate();

  const onClickGotoPlace = useCallback(
    (placeSeq) => () => {
      console.log(placeSeq);
      navigate(`/place/${placeSeq}`);
    },
    [],
  );

  async function getAndFormeplace() {
    const body = { searchRadius: 5000, lat: 37.53279455, lng: 127.15064519 };
    const result = await getFormeplace(body);
    console.log(result.data.places);
    setState(result.data.places);
  }
  useEffect(() => {
    getAndFormeplace();
  }, []);

  return (
    <>
      메인
      {state.map((item: any) => {
        return (
          <div style={{ objectFit: 'cover' }}>
            <img
              style={{ objectFit: 'cover', width: '100px' }}
              key={item.placeSeq}
              src={item.placeImageUrl}
              alt="test"
              onClick={onClickGotoPlace(item.placeSeq)}
            />
          </div>
        );
      })}
    </>
  );
}

export default Main;
