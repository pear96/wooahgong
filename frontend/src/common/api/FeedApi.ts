import axios from "axios";
import { useDispatch, useSelector } from 'react-redux';
import {saveToken, getToken} from "./JTW-Token";
import { feed, setImage, setType, Feed } from '../../features/Feed/feedReducer';
import { ReducerType } from '../../app/rootReducer';

const BASE_URL = "https://j6a505.p.ssafy.io:8080/api/feed";
const PLACE_URL = "https://j6a505.p.ssafy.io:8080/api/place";
const token = getToken();
const feedstore = useSelector<ReducerType, Feed>((state) => state.feedReducer);
    
const getPlaceAddReulst = async (body : {name : string, address : string, lat : number | undefined, lng : number | undefined}) => {
    // const token = getToken();
    console.log(body, token);
    if(token){
        const result = await axios.post(`${PLACE_URL}`, body, {headers : {Authorization: token}})
                                .then((response)=>{
                                    const value = {
                                        status : response.status,
                                        placeSeq : response.data.placeSeq
                                    }
                                    return value;
                                })
                                .catch((e)=>{
                                    const value = {
                                        status : 409,
                                        placeSeq : null
                                    }
                                    return value;
                                });
        return result;
    }
    return null;
}
const getFeedAddResult = async (body : {placeSeq : number, content : string, ratings : number, moods : string[]}) => {
    console.log(body);
    const formData = new FormData();
    for(let i = 0; i < feedstore.image.length; i += 1){
        // list.push(feedstore.image[i]);
        formData.append("images", feedstore.image[i]);
    }
    const data = {
        placeSeq : body.placeSeq,
        content : body.content,
        ratings : body.ratings,
        moods : body.moods
    }
    formData.append("data", new Blob([JSON.stringify(data)], {type : "application/x-www-form-urlencoded"}) );
    console.log(formData);
    if(token){
        console.log("된거니??");
        const result = await axios.post(`${BASE_URL}`, formData, {
            
            headers : {Authorization: token, 'Content-type' : "multipart/form-data"}
        }).then((response)=>{
            const value = {
                status : response.status
            }
            return value;
        }).catch((e)=>{
            const value = {
                status : 401
            }
            return value;
        })
        return result;
    }
    return null;

}



const FeedApi = {
    getPlaceAddReulst,
    getFeedAddResult
}

export default FeedApi;