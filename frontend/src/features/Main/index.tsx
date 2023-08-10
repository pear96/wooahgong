import React, {useEffect} from 'react';
import { useAppDispatch } from 'app/store';
import FormeAndTrends from './components/FormeAndTrends';
import { setRadius } from './mainSlice';

function Main() {
  const dispatch = useAppDispatch();
  useEffect(()=>{
    return () => {
      dispatch(setRadius(300000000000000));
    }
  });
  return (
    <div style={{ margin : "0px auto" ,width : 360, height : 800, maxWidth: '1024px' }}>
      <FormeAndTrends />
    </div>
  );
}

export default Main;
