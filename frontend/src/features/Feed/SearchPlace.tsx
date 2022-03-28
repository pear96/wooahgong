import React, { ChangeEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { AiOutlineSearch } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import { feed, setImage, setType, setPlace,Feed } from './feedReducer';
import { ReactComponent as Back } from '../../assets/search/back.svg';
import Pin from '../../assets/pin.png';
import { ReducerType } from '../../app/rootReducer';


const Place = styled.div`    
    position : relative;
    height : 70px;
    padding : 10px 0;
    text-align: left;
    font-family : 'NotoSansKR';
    // font-size : 13px;
    // border : none;
    border-bottom : 1px solid;
    // border-radius : 5px;
    cursor : pointer;
    &:hover {
        background-color : rgba(0, 0, 0, 0.3);
    }
`
const ActiveButton = styled.button`
    background: #80b2fe;
    border-style: none;
    border-radius: 10px;
    margin-top : 5px;
    margin-left : 130px;
    width: 100px;
    height: 30px;
    font-family: 'NotoSansKR';
    font-size: 16px;
    font-weight: 500;
    cursor: pointer;
    color: rgba(255, 255, 255, 1);
    &:hover {
        background-color : rgba(128,178,254,0.7);
    }
`;

function SearchPlace() {

    const [word, setWord] = useState<string>("");
    const [isPlaces, setIsPlaces] = useState<boolean>(false);
    const [places, setPlaces] = useState<{name : string, address : string}[]>([]);
    const navigate = useNavigate();

    const feedstore = useSelector<ReducerType, Feed>((state) => state.feedReducer);
    const dispatch = useDispatch();
    console.log(feedstore);

    const testData = [
        {placeSeq : 1, name : "명동", address : "비밀임"},
        {placeSeq : 2, name : "명동제과", address : "알고싶징"},
        {placeSeq : 3, name : "명동성당", address : "안알려쥼"},
        {placeSeq : 4, name : "명동거리 한복판", address : "어딘가"},
        {placeSeq : 5, name : "우리집", address : "비밀"},
        {placeSeq : 6, name : "명동어딘가", address : "알고 싶니"},
        {placeSeq : 7, name : "우리집", address : "안알려 줄꺼지롱"}
    ]
    const handleSearch = (e : React.MouseEvent | React.KeyboardEvent) => {
        // api 통신 부분
        if(word !== ""){
            console.log(word);
            const result = testData.filter(v => v.name.includes(word));
            if(result.length > 0){
                setPlaces([...result]);
                setIsPlaces(true);
            }
            else{
                const reset : {name : string, address : string}[] = places;
                // reset = places;
                setPlaces(reset.filter(v => v));
                setIsPlaces(false);
            }
        }
        else{
            console.log("???");
            const reset : {name : string, address : string}[] = places;
                // reset = places;
            setPlaces(places.filter(v=> v));
            setIsPlaces(false);
        }
        // console.log(result);

    }
    const handlePressEnter = (e : React.KeyboardEvent<HTMLInputElement>) => {
        if(e.key === "Enter"){
            handleSearch(e);
        }
    }
    const handleChangeWord = (e : React.ChangeEvent<HTMLInputElement>) => {
        console.log(e.currentTarget.value);
        setWord(e.currentTarget.value);
    }
    const handleClickPlace = (value : any) => {
        const data = {
            placeSeq : value.placeSeq,
            name : value.name,
            address : value.address
        };
        dispatch(setType(true));
        dispatch(setPlace(data));
        navigate(`/report/final`);
    }
    const handleNextStep = () => {
        dispatch(setType(false));
        navigate(`/report/final`);
    }
    const handleBack = (e : React.MouseEvent) =>{
        navigate(`/report`);
    }

    return (
        <div>
            <Back style={{
                position : "absolute",
                width : 25,
                height : 25,
                top : 7,
                left : 5,
                cursor : "pointer"
            }} filter="invert(55%) sepia(0%) saturate(3046%) hue-rotate(24deg) brightness(90%) contrast(87%)"
            onClick={handleBack}/>
            <AiOutlineSearch style={{
                position : "absolute",
                width : 25,
                height : 25,
                top : 7,
                left : 320,
                cursor : "pointer"
            }} onClick={handleSearch}/>
            <div style={{
                display : "flex",
                // alignItems : "center"
                justifyContent: "center"
            }}>
                <input style={{
                    width : "300px",
                    border : "none",
                    marginTop : 5,
                    fontSize : 18
                }} type="text" onChange={handleChangeWord} onKeyDown={handlePressEnter} placeholder='장소명으로 검색해주세요'/>
            </div>
            {isPlaces !== true ? (<><div style={{
                height : 500,
                display : "flex",
                alignItems : "center",
                justifyContent: "center",
                textAlign : "center",
                fontWeight : 700,
                color : "rgba(0,0,0,0.4)"
            }}>
                찾는 장소가 없으시다면<br/> 다음 단계로 넘어가주세요!
            </div>
            <ActiveButton style={{position : "absolute", top : 310}} onClick={handleNextStep}>다음</ActiveButton></>) : (
                <>
                    <div style={{
                        width : 320,
                        height : 400,
                        margin : "20px auto",
                        overflowY : "auto"
                    }}>
                        {places.map((v,i)=>{
                            const idx = i;
                            return (
                                <Place key={idx} onClick={()=>handleClickPlace(v)}>
                                    <img src={Pin} alt="pin" style={{
                                        position : "absolute",
                                        top : 27,
                                        left : 3,
                                        width : 15, 
                                        height : 15,
                                        
                                    }}/>
                                    <h3 style={{
                                        marginLeft : 23,
                                        marginBottom : 0
                                    }}>{v.name}</h3>
                                    <span style={{
                                        marginLeft : 23,
                                        fontSize : 12,
                                    }}>{v.address}</span>
                                </Place>
                            )
                        })}
                    </div>
                    <div style={{
                        display : "flex",
                        alignItems : "center",
                        justifyContent: "center",
                        textAlign : "center",
                        fontWeight : 700,
                        color : "rgba(0,0,0,0.4)"
                    }}>찾는 장소가 없으시다면<br/> 다음 단계로 넘어가주세요!</div>
                    <ActiveButton onClick={handleNextStep}>다음</ActiveButton>
                </>
            )}
        </div>
    );
}

export default SearchPlace;
