import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
// import {register, setId, setPwd, setEmail, setGender, setAtmos, setBirth, setNick, Register} from "./registerReducer";
import { ReducerType } from '../../app/rootReducer';

const Container = styled.div`
    position : relative;
    width : 360px;
    height : 800px;
    background : none;
    margin : 0 auto;
`;

function Map(){
    const [map, setMap] = useState<any>(null);
    const CreateMap = () =>{
        if('geolocation' in navigator){
            navigator.geolocation.getCurrentPosition((position) => {
                setMap(new window.Tmapv2.Map("TMapContainer", {
                    center : new window.Tmapv2.LatLng(position.coords.latitude, position.coords.longitude),
                    width : "100%",
                    height : "100vh",
                    zoom : 17,
                    https : true
                }));
            })
            
        }
        else{
            // const tdata = new window.Tmapv2.extension.TData();
            setMap(new window.Tmapv2.Map("TMapContainer", {
                center : new window.Tmapv2.LatLng(37.50112682268097, 127.03943283958382),
                width : "100%",
                height : "100vh",
                zoom : 15,
                https : true
            }));
        }
    }
    useEffect(()=>{
        CreateMap();
    }, []);
    return (
        <div id="TMapContainer"/>
    )
}


export default Map;
