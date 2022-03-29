import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { toast } from 'react-toastify';
import style from './FindAddress.module.css';
import My from '../../../assets/MyPosition.png';


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
    handleInput : (data : {latlng : {lat : number, lng : number}, addr : string}) => void;
};

function FindAddress({ open, onClose, handleInput }: MyProps) {
    
    const [map, setMap] = useState<any>(null);
    const [myPosition, setPosition] = useState<{lat : number, lng : number}>();
    const [address, setAddress] = useState<string>("");
    const [markerList, setMarkerList] = useState<any>(null);
    const [check, setCheck] = useState<boolean>(false);
    const markerRef = useRef(markerList);
    markerRef.current = markerList;
    const handleStopEvent = (e: any) => {
        e.stopPropagation();
    };
    const handleChangeInput = (e : React.ChangeEvent<HTMLInputElement>) =>{
        e.stopPropagation();
        console.log(address);
        setAddress(e.currentTarget.value);
    }
    const CreateMap = () =>{
        let lat;
        let lng;

        if('geolocation' in navigator){
            navigator.geolocation.getCurrentPosition((position) => {
                lat = position.coords.latitude;
                lng = position.coords.longitude;
                
                setMap(new window.Tmapv2.Map("MapContainer", {
                    center : new window.Tmapv2.LatLng(lat, lng),
                    width : "100%",
                    height : "100%",
                    zoom : 17,
                    draggable : true,
                    https : true
                }));
                
                console.log("???실행");
                setPosition({lat, lng});
            })
        }
    }
    const SearchAddress = () => {
        if(markerRef.current !== null){
            markerRef.current.setMap(null);
        }
        axios({
            method : 'get',
            url : "https://apis.openapi.sk.com/tmap/pois?version=1&format=json&callback=result",
            params : {
                "appKey" : "l7xx76446024905c421fa3c63af0f5bb9175",
				"searchKeyword" : address,
				"count" : 1
            },

        }).then((response)=>{
            const result = response.data.searchPoiInfo.pois.poi;
            const lat = +result["0"].frontLat;
            const lng = +result["0"].frontLon;
            // console.log(name);
            const {name} = result["0"];
            console.log(result["0"].newAddressList.newAddress[0].fullAddressRoad);
            
            axios({
                method : 'GET',
                url : "https://apis.openapi.sk.com/tmap/geo/reversegeocoding?version=1&format=json&callback=result",
                params : {
                    "appKey" : "l7xx76446024905c421fa3c63af0f5bb9175",
                    "coordType" : "WGS84GEO",
                    "addressType" : "A10",
                    "lon" : lng,
                    "lat" : lat
                }
            }).then((newresponse)=>{
                console.log(markerRef.current);
                if(markerRef.current !== null){
                    
                    console.log("???????????????????");
                    markerRef.current.setMap(null);
                }
                const newresult = newresponse.data.addressInfo;
                // const check = result.city_do+' '+result.gu_gun;
                let resAdr = `${newresult.city_do} ${newresult.gu_gun} `;
                const lastLegal = newresult.legalDong.charAt(newresult.legalDong.length-1);
                if(lastLegal === '읍' || lastLegal === '면'){
                    resAdr = `${resAdr}${newresult.legalDong} `;
                }
                else if(newresult.eup_myun !==''){
                    console.log("????왜 실행됨??", lastLegal);
                    resAdr = `${resAdr}${newresult.eup_myun} `;
                }
                resAdr = `${resAdr}${newresult.roadName} ${newresult.buildingIndex}`;
                console.log(newresult, resAdr);
                const marker = new window.Tmapv2.Marker({
                    position : new window.Tmapv2.LatLng(lat, lng),
                    icon : My,
                    map
                })
                setMarkerList(marker);
                setPosition({lat, lng});
                setAddress(resAdr);
                setCheck(true);
                map.setCenter(new window.Tmapv2.LatLng(lat, lng));
            })
        })
        
    }
    const handleClickMap = (e : any) =>{
        
        console.log(e.latLng.lat());
        const lat = e.latLng.lat();
        const lng = e.latLng.lng();
        axios({
            method : 'GET',
            url : "https://apis.openapi.sk.com/tmap/geo/reversegeocoding?version=1&format=json&callback=result",
            params : {
                "appKey" : "l7xx76446024905c421fa3c63af0f5bb9175",
				"coordType" : "WGS84GEO",
				"addressType" : "A10",
				"lon" : lng,
				"lat" : lat
            }
        }).then((response)=>{
            console.log(markerRef.current);
            if(markerRef.current !== null){
                
                console.log("???????????????????");
                markerRef.current.setMap(null);
            }
            const result = response.data.addressInfo;
            // const check = result.city_do+' '+result.gu_gun;
            let resAdr = `${result.city_do} ${result.gu_gun} `;
            const lastLegal = result.legalDong.charAt(result.legalDong.length-1);
            if(lastLegal === '읍' || lastLegal === '면'){
                resAdr = `${resAdr}${result.legalDong} `;
            }
            else if(result.eup_myun !==''){
                console.log("????왜 실행됨??", lastLegal);
                resAdr = `${resAdr}${result.eup_myun} `;
            }
            resAdr = `${resAdr}${result.roadName} ${result.buildingIndex}`;
            console.log(result, resAdr);
            const marker = new window.Tmapv2.Marker({
                position : new window.Tmapv2.LatLng(lat, lng),
                icon : My,
                map
            })
            setMarkerList(marker);
            setPosition({lat, lng});
            setAddress(resAdr);
            setCheck(true);
            map.setCenter(new window.Tmapv2.LatLng(lat, lng));
        })
    }
    const submit = (e : React.MouseEvent) => {
        console.log("????????!?!?!?!?!?!?");
        if(check === false){
            toast.error(<div style={{ width: 'inherit', fontSize: '14px' }}>주소를 입력해주세요</div>, {
                position: toast.POSITION.TOP_CENTER,
                role: 'alert',
            });
        }
        else{
            const data : any = {
                latlng : myPosition,
                addr : address
            }
            handleInput(data);
            onClose(e);    
        }
        
    }
    
    useEffect(()=>{
        CreateMap();
    },[]);
    useEffect(()=>{
        if(map === null) return;
        map.addListener("click", handleClickMap);
    }, [map])
    useEffect(()=>{
        console.log(markerList);    
    }, [markerList])
    return (
        <div
        className={open ? `${style.openModal} ${style.modal}` : style.modal}
        onClick={onClose}
        onKeyDown={handleStopEvent}
        role="button"
        tabIndex={0}
        >
        {open ? (
            <section className={style.modalForm} onClick={handleStopEvent} onKeyDown={handleStopEvent} role="button" tabIndex={0}>
            <header>
                <h3 className={style.title}>주소 등록 🚋</h3>
                <h3 style={{
                    fontSize: 12,
                    fontFamily: 'NotoSansKR',
                    marginBottom : 10,
                    textAlign : "center",
                }}>주소 검색은 정확하지 않을 수 있습니다 <br/>정확한 위치는 지도를 클릭하여 위치를 조정해주세요</h3>
            </header>
            <main>
                <div className={style.configForm}>
                    <div id="MapContainer"/>
                </div>
                <input
                style={{
                    width : 290,
                    marginTop : 10,
                    borderTop : "none",
                    borderLeft : "none",
                    borderRight : "none",
                    fontSize : 12
                }}
                value={address}
                type="text" placeholder='주소 입력' onChange={handleChangeInput}/>
                <button style={{
                    background : "#80b2fe",
                    color : "white",
                    width : 45,
                    height : 30,
                    marginTop : 10,
                    marginLeft : 5,
                    border : "none",
                    borderRadius : "10px"
                }} type='button' onClick={SearchAddress}>검색</button>
                <div style={{
                        display : "flex",
                        alignItems : "center",
                        justifyContent: "center",
                        textAlign : "center",
                        fontWeight : 700,
                        color : "rgba(0,0,0,0.4)"
                    }}>
                    <button style={{
                        background : "#80b2fe",
                        color : "white",
                        width : 150,
                        height : 30,
                        marginTop : 25,
                        // marginLeft : 5,
                        border : "none",
                        borderRadius : "10px"
                    }} type='button' onClick={submit}>등록</button>
                    <button style={{
                        background : "tomato",
                        color : "white",
                        width : 150,
                        height : 30,
                        marginTop : 25,
                        marginLeft : 15,
                        border : "none",
                        borderRadius : "10px"
                    }} type='button' onClick={onClose}>취소</button>
                </div>
            </main>
            </section>
        ) : null}
        </div>
    );
}

export default FindAddress;
