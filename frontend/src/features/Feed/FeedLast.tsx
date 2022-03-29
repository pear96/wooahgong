import React, { ChangeEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { AiOutlineSearch } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import FeedApi from 'common/api/FeedApi';
import { toast } from 'react-toastify';
import FindAddress from './modal/FindAddress';
import { feed, setImage, setType, Feed } from './feedReducer';
import Pin from '../../assets/pin.png';
import Quote from '../../assets/quote.png';
import Tag from '../../assets/tag.png';
import Like from '../../assets/like.png';
import { ReducerType } from '../../app/rootReducer';


const ActiveButton = styled.button`
    background: #80b2fe;
    border-style: none;
    margin-top : 25px;
    border-radius: 10px;
    width: 200px;
    height: 40px;
    font-family: 'NotoSansKR';
    font-size: 16px;
    font-weight: 500;
    cursor: pointer;
    color: rgba(255, 255, 255, 1);
    &:hover {
        background-color : rgba(128,178,254,0.7);
    }
`;

function FeedLast() {

    const [placeName, setPlaceName] = useState<string>("");
    const [placeAddres, setPlaceAddress] = useState<string>("");
    const [desc, setDesc] = useState<string>("");
    const [score, setScore] = useState<number>(1);
    const [open, setIsOpen] = useState<boolean>(false);
    const [position, setPosition] = useState<{lat : number, lng : number}>();
    const feedstore = useSelector<ReducerType, Feed>((state) => state.feedReducer);
    
    const {getPlaceAddReulst, getFeedAddResult} = FeedApi;
    
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [atmos, setAtmos] = useState<{title : string, check : boolean}[]>([
        {title : "현대적인", check : false},
        {title : "자연주의", check : false},
        {title : "복고풍의", check : false},
        {title : "활동적인", check : false},
        {title : "낭만적인", check : false},
        {title : "야경이멋진", check : false},
        {title : "평화로운", check : false},
        {title : "이국적인", check : false},
        {title : "기타", check : false},
    ]);
    
    
    
    console.log(feedstore);
    const handleOpenModal = (e : React.MouseEvent) => {
        setIsOpen(true);
    }
    const handleCloseModal = (e : React.MouseEvent) => {
        console.log("미쳤냐 진짜?");
        setIsOpen(false);
    }

    const handleChangePlaceName = (e : React.ChangeEvent<HTMLInputElement>) =>{
        e.stopPropagation();
        setPlaceName(e.currentTarget.value);
    }

    const handleChangeDesc = (e : React.ChangeEvent<HTMLTextAreaElement>) =>{
        const word = e.currentTarget.value;
        setDesc(word);
    }
    const handleInputAddress = (data : {latlng : {lat : number, lng : number}, addr : string}) => {
        console.log(data);
        setPosition(data.latlng);
        setPlaceAddress(data.addr);
    }
    const handleClickAtmos = (e : React.MouseEvent<HTMLButtonElement>) =>{
        e.stopPropagation();
        const index : number = +e.currentTarget.value;
        setAtmos(
            atmos.map((v,i) => i === index ? {...v, check : !v.check} : v)
        );
    }
    const handleStar = (e : any) => {
        const doc = document.getElementById('star');
        if(doc instanceof HTMLElement){
            console.log(e.target.value);
            if(+e.target.value === 0){
                console.log("???");
                doc.style.width = `20%`;
            }
            else {
                doc.style.width = `${e.target.value*10}%`;
            }
            if(+e.target.value !== 0 && score !== e.target.value/2) setScore(e.target.value/2);
            else if (+e.target.value === 0 && score !== 1) setScore(1);
        }
    }
    const handleClickRegist = async (e : React.MouseEvent) => {
        // api 요청 있는 곳
        if(feedstore.type){
            let count = 0;
            for(let i = 0; i < atmos.length; i+=1){
                if(atmos[i].check) count += 1;
            }
            // atmos.map(v => v.check ? count += 1 : count += 0);
            if(desc.length === 0){
                toast.error(<div style={{ width: 'inherit', fontSize: '14px' }}>피드의 내용을 입력해주세요</div>, {
                    position: toast.POSITION.TOP_CENTER,
                    role: 'alert',
                });
            }
            else if(count === 0){
                toast.error(<div style={{ width: 'inherit', fontSize: '14px' }}>1개 이상의 분위기를 선택해주세요</div>, {
                    position: toast.POSITION.TOP_CENTER,
                    role: 'alert',
                });
            }
        }
        else{
            let count = 0;
            for(let i = 0; i < atmos.length; i+=1){
                if(atmos[i].check) count += 1;
            }
            // atmos.map(v => v.check ? count += 1 : count += 0);
            if(placeName === ""){
                toast.error(<div style={{ width: 'inherit', fontSize: '14px' }}>장소명을 정해주세요</div>, {
                    position: toast.POSITION.TOP_CENTER,
                    role: 'alert',
                });
            }
            else if(placeAddres === ""){
                toast.error(<div style={{ width: 'inherit', fontSize: '14px' }}>주소필드가 빈 값 입니다.</div>, {
                    position: toast.POSITION.TOP_CENTER,
                    role: 'alert',
                });
            }
            else if(desc.length === 0){
                toast.error(<div style={{ width: 'inherit', fontSize: '14px' }}>피드의 내용을 입력해주세요</div>, {
                    position: toast.POSITION.TOP_CENTER,
                    role: 'alert',
                });
            }
            else if(count === 0){
                toast.error(<div style={{ width: 'inherit', fontSize: '14px' }}>1개 이상의 분위기를 선택해주세요</div>, {
                    position: toast.POSITION.TOP_CENTER,
                    role: 'alert',
                });
            }
            else{
                const body = {
                    name : placeName, 
                    address : placeAddres, 
                    lat : position?.lat, 
                    lng : position?.lng
                }
                const result = await getPlaceAddReulst(body);
                console.log(result?.status);
                if (result?.status === 409) {
                    toast.error(<div style={{ width: 'inherit', fontSize: '14px' }}>해당 위치(좌표)에 등록된 장소가 있습니다. 위치를 조정해주세요</div>, {
                        position: toast.POSITION.TOP_CENTER,
                        role: 'alert',
                    });
                }
                else if (result?.status === 201) {
                    console.log("된거니?!?!?!?!");
                    const formData = new FormData();
                    for (let i = 0; i < feedstore.image.length; i += 1) {
                        formData.append("images", feedstore.image[i]);
                    }
                    const data = {
                        placeSeq: result.placeSeq,
                        content: desc,
                        ratings: score,
                        moods: atmos.map(v => v.title)
                    }
                    formData.append("data", new Blob([JSON.stringify(data)], { type: "application/json" }));
                    
                    
                    const res = await getFeedAddResult(formData);
                }
            }
        }
        // type false 경우
    }
    useEffect(()=>{
        if(feedstore.type){
            setPlaceName(feedstore.place.name);
            setPlaceAddress(feedstore.place.address);
        }
    }, [])


    return (
        <div>
            {feedstore.type === true ? (
            <div>
                <div style={{
                        display : "flex",
                        alignItems : "center",
                        justifyContent: "center",
                        textAlign : "center",
                        fontWeight : 700,
                        // marginTop : 20
                    }}>
                    <AiOutlineSearch style={{width : 20, height : 20, marginRight : 10,marginTop : 20,}}/>
                    <input
                    style={{
                        width : 280,
                        borderLeft : "none",
                        borderRight : "none",
                        borderTop : "none",
                        background : "none",
                        marginTop : 20,
                        fontSize : 16,
                        fontWeight : 700,
                        fontFamily: 'NotoSansKR'
                    }}
                    type="text" placeholder={placeName} disabled/>
                </div>
                <div style={{
                        display : "flex",
                        alignItems : "center",
                        justifyContent: "center",
                        textAlign : "center",
                        fontWeight : 700,
                        marginTop : 40
                    }}>
                    <img src={Pin} style={{width : 20, height : 20, marginRight : 10}} alt="pin"/>
                    <input
                    style={{
                        width : 280,
                        borderLeft : "none",
                        borderRight : "none",
                        borderTop : "none",
                        background : "none",
                        fontSize : 16,
                        fontWeight : 700,
                        fontFamily: 'NotoSansKR'
                    }}
                    type="text" placeholder={placeAddres} disabled/>
                </div>
            </div>
            ) : (
            <div>
                <div style={{
                        display : "flex",
                        alignItems : "center",
                        justifyContent: "center",
                        textAlign : "center",
                        fontWeight : 700,
                        // marginTop : 20
                    }}>
                    <AiOutlineSearch style={{width : 20, height : 20, marginRight : 10, marginTop : 20}}/>
                    <input
                    style={{
                        width : 280,
                        borderLeft : "none",
                        borderRight : "none",
                        borderTop : "none",
                        background : "none",
                        marginTop : 20,
                        fontSize : 16,
                        fontWeight : 700,
                        fontFamily: 'NotoSansKR'
                    }}
                    type="text" placeholder="장소명을 정해주세요" onChange={handleChangePlaceName}/>
                </div>
                <div style={{
                        display : "flex",
                        alignItems : "center",
                        justifyContent: "center",
                        textAlign : "center",
                        fontWeight : 700,
                        marginTop : 40
                    }}>
                    <img src={Pin} style={{width : 20, height : 20, marginRight : 10}} alt="pin"/>
                    <button type="button"
                    style={{
                        width : 280,
                        textAlign : "left",
                        borderLeft : "none",
                        borderRight : "none",
                        borderTop : "none",
                        borderColor : "#D7D7D7",
                        background : "none",
                        paddingLeft : 2,
                        fontSize : 16,
                        fontWeight : 700,
                        fontFamily: 'NotoSansKR',
                        cursor : "pointer"
                    }}
                    value={placeAddres}
                    onClick={handleOpenModal}
                    >{placeAddres.length > 0 ? placeAddres : "주소를 검색해주세요"}</button>
                </div>
            </div>)}
            <div style={{
                        display : "flex",
                        alignItems : "center",
                        flexWrap : "wrap",
                        justifyContent: "center",
                        // textAlign : "center",
                        fontWeight : 700,
                        marginTop : 40
                    }}>
                    <img src={Quote} style={{width : 20, height : 20, marginRight : 10}} alt="pin"/>
                    <h1 style={{width : 280,fontSize : 16,
                        fontWeight : 700,
                        fontFamily: 'NotoSansKR', marginBottom : 0}}>피드 내용</h1>
                    <textarea style={{
                        width : 280,
                        height : 120,
                        marginLeft : 30,
                        marginTop : 5,
                        fontFamily: 'NotoSansKR',
                        fontSize : 12,
                        borderLeft : "none",
                        borderRight : "none",
                        borderTop : "none",
                        resize : "none",
                        overflowY : "auto"
                    }} onChange={handleChangeDesc} placeholder="피드에 대한 내용을 적어주세요"/>
                </div>
                <div style={{
                        display : "flex",
                        alignItems : "center",
                        flexWrap : "wrap",
                        justifyContent: "center",
                        // textAlign : "center",
                        width : 310,
                        marginLeft : 25,
                        fontWeight : 700,
                        marginTop : 10
                    }}>
                    <img src={Tag} style={{width : 20, height : 20, marginRight : 10}} alt="pin"/>
                    <h1 style={{width : 280,fontSize : 16,
                        fontWeight : 700,
                        fontFamily: 'NotoSansKR', marginBottom : 0}}>분위기 설정</h1>
                        {atmos.map((v,i)=>{
                            const idx = i;
                            if(v.check === false){
                                return(
                                    <button key={idx} type="button" value={idx} style={
                                        {
                                            fontFamily: 'NotoSansKR',
                                            marginRight : 10, 
                                            marginTop : 5, 
                                            border : "0.5px solid", 
                                            borderRadius : 5, 
                                            cursor : "pointer",
                                            background : "none"
                                        }} onClick={handleClickAtmos}> #{v.title} </button>
                                )
                            }
                            return(
                                    <button key={idx} type="button" value={idx} style={
                                        {
                                            fontFamily: 'NotoSansKR',
                                            marginRight : 10, 
                                            marginTop : 5, 
                                            border : "0.5px solid #000", 
                                            borderRadius : 5, 
                                            cursor : "pointer",
                                            background : "none",
                                            color : "rgba(144, 136, 243, 1)"
                                        }} onClick={handleClickAtmos}>#{v.title}</button>
                            )
                            
                        })}
                            
            </div>
            <div style={{
                        display : "flex",
                        alignItems : "center",
                        flexWrap : "wrap",
                        justifyContent: "center",
                        // textAlign : "center",
                        fontWeight : 700,
                        marginTop : 40
                    }}>
                    <img src={Like} style={{width : 20, height : 20, marginRight : 10}} alt="pin"/>
                    <h1 style={{width : 280,fontSize : 16,
                    fontWeight : 700,
                    fontFamily: 'NotoSansKR', marginBottom : 0}}>평점</h1>
                    <span style={{
                                        position: "relative",
                                        fontSize: 38,
                                        color: "#ddd"
                                    }}>
                    ★★★★★
                        <span id="star" style={{
                            width : "20%",
                            position : "absolute",
                            left : 0,
                            color : "rgba(144, 136, 243, 1)",
                            overflow : "hidden",
                            pointerEvents : "none"
                        }}>★★★★★</span>
                        <input type="range" style={{
                            width : "100%",
                            height : "100%",
                            position : "absolute",
                            left : 0,
                            opacity : 0,
                            cursor : "pointer"
                        }} onInput={handleStar} value="1" step="2" min="0" max="10"/>
                    </span>
                    <ActiveButton onClick={handleClickRegist}>등록</ActiveButton>
            
            </div>
            {open ? (<FindAddress open={open} onClose={handleCloseModal} handleInput={handleInputAddress}/>) : null}
        </div>
    );
}

export default FeedLast;
