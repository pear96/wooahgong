import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Marker from '../../assets/maker.png';
import Eximage from '../../assets/eximage.jpg';
import Myhome from '../../assets/myhome.jpg';
import SummarySpot from './SummarySpot';
// import {register, setId, setPwd, setEmail, setGender, setAtmos, setBirth, setNick, Register} from "./registerReducer";
import { ReducerType } from '../../app/rootReducer';

const maker = require("../../assets/maker.png");

const Container = styled.div`
    position : relative;
    width : 360px;
    height : 800px;
    background : none;
    margin : 0 auto;
`;

function Map(){
    const [map, setMap] = useState<any>(null);
    const [spot, setSpot] = useState<{img : string, name : string, like : number, comment : number, lat : number, lng : number}>(
        {img : "", name : "", like : 0, comment : 0, lat : 0, lng : 0}
    );
    const [open, setisOpen] = useState<boolean>(false);
    const [markerlist, setMarkerList] = useState<any[]>([]);
    const [point, setPoint] = useState<any[]>([
        {img : Eximage, name : "선릉", like : 2000, comment : 300,lat : 37.507640, lng : 127.052186},
        {img : Myhome, name : "우리집", like : 500, comment : 250, lat : 37.503350, lng : 127.051982}
    ])
    const CreateMap = () =>{
        let lat;
        let lng;
        if('geolocation' in navigator){
            navigator.geolocation.getCurrentPosition((position) => {
                lat = position.coords.latitude;
                lng = position.coords.longitude;
                setMap(new window.Tmapv2.Map("TMapContainer", {
                    center : new window.Tmapv2.LatLng(lat, lng),
                    width : "100%",
                    height : "720px",
                    zoom : 17,
                    draggable : true,
                    https : true
                }));
            })
            const marker = new window.Tmapv2.Marker({
                position :  new window.Tmapv2.LatLng(lat, lng),
                icon : "http://tmapapi.sktelecom.com/resources/images/common/pin_car.png", 
                map
            })
        }
        else{
            // const tdata = new window.Tmapv2.extension.TData();
            setMap(new window.Tmapv2.Map("TMapContainer", {
                center : new window.Tmapv2.LatLng(37.50112682268097, 127.03943283958382),
                width : "100%",
                height : "800px",
                zoom : 15,
                https : true
            }));
        }
    }
    useEffect(()=>{
        CreateMap();
    }, []);
    useEffect(()=>{
        console.log(markerlist);
    }, [markerlist])
    useEffect(()=>{
        if(map === null) return;
        // console.log(map.getCenter().lat(), map.getCenter().lng);
        map.addListener("click", ()=>{
            setisOpen(false);
            // console.log("?????????");
        })
        point.map((v) => {
            const marker = new window.Tmapv2.Marker({
                position :  new window.Tmapv2.LatLng(v.lat, v.lng),
                icon : Marker, 
                map
            })
            marker.addListener("click", ()=>{
                setSpot(v);
                setisOpen(true);
                console.log("안녕");
            })
            marker.addListener("touchstart", ()=>{
                console.log("???")
            })
            return setMarkerList([...markerlist, marker]);
        })
        
    }, [map]);
    return (
        <div id="TMapContainer">
            {open ? (<SummarySpot spot={spot}/>) : null}
        </div>

    )
}


export default Map;
