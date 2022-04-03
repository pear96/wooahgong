import React, { useEffect, useState } from 'react';
import { Slider } from 'antd';
import style from './Distance.module.css';
import { ReactComponent as Car } from '../../../assets/map/Car.svg';
import { ReactComponent as Walk } from '../../../assets/map/Walk.svg';

type MyProps = {
  open: boolean;
  dist: number;
  onClose: (e: any) => void;
  setDist: (value: number) => void;
};
// 차량(false), 도보(true) 인지 결정해서 상위 컴포넌트에 type을 전달해주는 모달
function Distance({ open, dist, onClose, setDist }: MyProps) {
  const [curDist, setCurDist] = useState<number>(dist);
  const handleStopEvent = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };
  const handleChangeRange = (value: number) => {
    setCurDist(value);
  };
  const handleSaveDist = (e: React.MouseEvent) => {
    setDist(curDist);
    onClose(e);
  };
  const dots = {
    500: '500m',
    1000: '1km',
    1500: '1.5km',
    2000: '2km',
    2500: '2.5km',
  };
  const fomatter = (value: number | undefined) => {
    if (value !== undefined) {
      if (value >= 1000) {
        return `${value / 1000}km`;
      }
      return `${value}m`;
    }
    return null;
  };

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
            <h3 className={style.title}>범위 설정🚞</h3>
          </header>
          <main>
            <div className={style.configForm}>
              <Slider
                style={{
                  width: 250,
                  margin: '0 auto',
                }}
                marks={dots}
                step={500}
                included={false}
                defaultValue={dist}
                min={500}
                max={2500}
                tipFormatter={fomatter}
                onChange={handleChangeRange}
              />
            </div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                marginTop: 55,
              }}
            >
              <button
                style={{
                  backgroundColor: 'rgba(144, 136, 243, 1)',
                  color: 'white',
                  width: 200,
                  height: 40,
                  borderRadius: 6,
                  fontWeight: 700,
                }}
                type="button"
                onClick={handleSaveDist}
              >
                확인
              </button>
            </div>
          </main>
        </section>
      ) : null}
    </div>
  );
}

export default Distance;
