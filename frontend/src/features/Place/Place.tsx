import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Spin } from 'antd';
import PlaceApi from 'common/api/PlaceApi';
import PlaceThumbnail from './components/PlaceThumbnail';
import PlaceInfo from './components/PlaceInfo';
import PlaceFeeds from './components/PlaceFeeds';

function Place() {
    const [place, setPlace] = useState<{
    address : string, 
    avgRatings : number, 
    feeds : {
        feedSeq : number, 
        thumbnail : string
    }, 
    isWished : boolean, 
    latitude : number, 
    longitude : number, 
    name : string, 
    placeImageUrl : string}>();
    const { placeSeq } = useParams();

    const readPlaceApi = async () => {
    if (placeSeq !== undefined) {
        const result = await PlaceApi.readPlace(placeSeq);
        console.log(result)
        if (result?.status === 200) {
            
            setPlace(result.data);
        }
    }
    };

    useEffect(() => {
        readPlaceApi();
    },[]);

    return (
        <div>
            <div style={{ marginLeft: 'auto', marginRight: 'auto', maxWidth: '1024px' }}>
            {place === undefined ? (
                <div style={{
                    height : 720,
                    display : "flex",
                    alignItems : "center",
                    justifyContent : "center"
                }}>
                    <Spin size='large'/>
                </div>
            ) 
            : (
                <>
                <PlaceThumbnail thumbnail={place.placeImageUrl} />
                <PlaceInfo placeInfo={place}/>
                <PlaceFeeds placeFeeds={place.feeds} />
                </>
            )}
            </div>
        </div>
    );
}

export default Place;
