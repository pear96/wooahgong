import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Heart from '../../assets/heart.png';
import SearchType from './modal/SearchType';


const Summary = styled.div`
    position : absolute;
    width : 340px;
    height : 103px;
    background : white;
    border-radius : 10px;
    top : 637px;
    left : 10px;
    cursor : pointer;
`;
const Title = styled.h3`
    position : absolute;
    top : 20px;
    left : 115px;
    font-family: 'NotoSansKR';
    font-size : 20px;
    font-weight : 900;
    // display : inline;
`
const Sub = styled.div`
    display: flex;
    align-items:center;
    position : absolute;
    top : 60px;
    left : 115px;
`
const SubText = styled.div`
    display : inline;
    width : fit-content;
    height : fit-content;
    padding-left : 5px;
    margin-right : 5px;
`
const Total = styled.div`
    position : absolute;
    top : 37px;
    left : 230px;
    font-family: 'NotoSansKR';
    font-weight : 600;
`
const SearchPath = styled.button`
    position : absolute;
    top : 5px;
    left : 270px;
    width : 60px;
    height : 25px;
    background-color : rgba(144, 136, 243, 1);
    color : white;
    font-family : 'NotoSansKR';
    font-size : 13px;
    border : none;
    border-radius : 5px;
    cursor : pointer;
    &:hover {
        background-color : rgba(144, 136, 243, 0.7);
    }
`

// map.tsx 에서 전달 받는 props 목록
// 클릭한 마커가 담고 있는 spot 정보 
// 경로를 탐색하는 것인지 확인하는 isSearch flag
// 경로를 탐색했다면 표시 되어야 하는 거리와 시간 값을 갖는 total
// map.tsx의 경로 탐색 함수 searchWay
// map.tsx의 경로 탐색 초기화 함수 clearRoute
type MyProps = {
    spot : {
        seq : number,
        img : string,
        name : string,
        avgRating : number,
        lat : number,
        lng : number,
    };
    isSearch : boolean,
    total : {
        tDistance : number,
        tTime : number
    }
    searchWay : (type : boolean, end : {name : string, lat : number, lng : number}) => void;
    clearRoute : () => void;
}


function SummarySpot({spot, isSearch, total,searchWay, clearRoute} : MyProps){
    
    const [open, setIsOpen] = useState<boolean>(false);
    const navigate = useNavigate();
    console.log(spot);

    const handleOpenModal = (e : React.MouseEvent<HTMLButtonElement>) =>{
        e.stopPropagation();
        setIsOpen(true);
    }
    const handleCloseModal = (e : MouseEvent) =>{
        e.stopPropagation();
        setIsOpen(false);
    }
    const handleClickSpot = (e : React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
        navigate(`/place/${spot.seq}`);
    }
    const handleClickReset = (e : React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        clearRoute();
    }
    // 하위 컴포넌트 (SearchType.tsx)에서 type을 전달 받고 map.tsx의 searchWay 함수 호출
    const sendData = (type : boolean) => {
        // 도착 지점 정보
        const end = {name : spot.name, lat : spot.lat, lng : spot.lng};
        
        // 타입과 도착 지점 정보를 map.tsx의 SearchWay 함수에 전달해줌
        searchWay(type, end);
    }
    return (
        <Summary onClick={handleClickSpot}>
            <img style={{
                width : 103,
                height : 103,
                borderRadius : "10px 0px 0px 10px",
            }} src={spot.img} alt="img"/>
            <Title>{spot.name}</Title>
            
            {isSearch ? (
                <>
                    <SearchPath
                        type='button'
                        onClick={handleClickReset}>
                            돌아가기
                    </SearchPath>
                    <Sub>
                        <img style={{
                            width : 14,
                            height : 14
                        }}
                        src={Heart} alt="img"/>
                        <SubText>{spot.avgRating.toFixed(1)}</SubText>
                        {/* <img style={{
                            width : 18,
                            height : 14
                        }}
                        src={Comment} alt="img"/>
                        <SubText>{spot.comment}</SubText> */}
                    </Sub>
                    <Total>
                        <div>거리 : {total.tDistance}km</div>
                        <div>시간 : {total.tTime}분</div>
                    </Total>
                </>
            ) : (
                <>
                    <SearchPath
                    type='button'
                    onClick={handleOpenModal}>
                        길 찾기
                    </SearchPath>
                    <Sub>
                        <img style={{
                            width : 14,
                            height : 14
                        }}
                        src={Heart} alt="img"/>
                        <SubText>{spot.avgRating.toFixed(1)}</SubText>
                        {/* <img style={{
                            width : 18,
                            height : 14
                        }}
                        src={Comment} alt="img"/>
                        <SubText>{spot.comment}</SubText> */}
                    </Sub>
                </>
            )}
            
            
            <SearchType open={open} onClose={handleCloseModal} searchWay={sendData}/>
        </Summary>
    )
}


export default SummarySpot;
