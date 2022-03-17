import React from "react";
import styled from 'styled-components';
import style from "./Atmos.module.css";


const Button = styled.button`
    display : inline-block;
    font-size : 11px;
    width : 45px;
    height : 30px;
    // margin-top : 20px;
    margin-left : 10px;
    margin-bottom : 25px;
    border : none;
    border-radius : 5px;
`

type MyProps = {
    open : boolean,
    onClose : (e : any) => void,
    handleAtmos : (e : React.MouseEvent<HTMLButtonElement>) => void,
    atmos : any
}

function Atmos({open, onClose, handleAtmos, atmos} : MyProps){
    const handleStopEvent = (e : React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
    }
    return (
        <div
          className={open ? `${style.openModal} ${style.modal}` : style.modal}
          onClick={onClose} onKeyDown={onClose} role="button" tabIndex={0}
        >
          {open ? (
            <section className={style.modalForm} onClick={handleStopEvent} onKeyDown={onClose} role="button" tabIndex={0}>
              <header>
                <h3 className={style.title}>관심 분위기 선택</h3>
              </header>
              <main>
                <div className={style.configForm}>
                  {atmos.map((v : {type : string, check : boolean}, i : number)=>{
                      // console.log(v);
                      const index = i;
                      if(v.check){
                        return (
                          <Button key={`key${index+1}`} value={i} onClick={handleAtmos}
                            style={{
                              background : "linear-gradient(90deg, #B3A1E0 0%, #5DACF5 100%)",
                              color : "white"
                            }}
                          >{v.type}</Button>
                        )
                      }
                      return (
                          <Button key={`key${index+1}`} value={i} onClick={handleAtmos}>{v.type}</Button>
                      )
                  })}
                </div>
              </main>
              <footer>
                <button type="button" className={style.closeBtn} onClick={onClose}>
                  {" "}
                  확인{" "}
                </button>
              </footer>
            </section>
          ) : null}
        </div>
      );
}

export default Atmos;