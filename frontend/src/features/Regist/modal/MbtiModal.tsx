import React from 'react';
import styled from 'styled-components';
import style from './MbtiModal.module.css';

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
  handleMbti: (e: React.MouseEvent<HTMLDivElement>) => void;
  mbti: any;
};

function MbtiModal({ open, onClose, handleMbti, mbti }: MyProps) {
  const handleStopEvent = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  const handleOnMouse = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    const index = e.currentTarget.innerText;
    for (let i = 0; i < mbti.length; i += 1) {
      if (mbti[i].type === index) {
        e.currentTarget.style.background = mbti[i].color;
        e.currentTarget.style.color = 'white';
      }
    }
  };
  const handleOutMouse = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    e.currentTarget.style.background = '';
    e.currentTarget.style.color = '';
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
            <h3 className={style.title}>MBTI 🩺</h3>
          </header>
          <main>
            <div className={style.configForm}>
              {mbti.map((v: { type: string; check: boolean; color: string }, i: number) => {
                // console.log(v);
                const index = i;
                if (v.check) {
                  return (
                    <MbtiContainer
                      key={`key${index + 1}`}
                      onClick={handleMbti}
                      style={{
                        background: `${v.color}`,
                        color: 'white',
                      }}
                    >
                      {v.type}
                    </MbtiContainer>
                  );
                }
                return (
                  <MbtiContainer
                    key={`key${index + 1}`}
                    onClick={handleMbti}
                    onMouseOver={handleOnMouse}
                    onMouseOut={handleOutMouse}
                  >
                    {v.type}
                  </MbtiContainer>
                );
              })}
            </div>
          </main>
        </section>
      ) : null}
    </div>
  );
}

export default MbtiModal;
