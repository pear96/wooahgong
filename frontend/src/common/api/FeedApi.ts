import axios from "axios";
import {saveToken, getToken} from "./JTW-Token";

const BASE_URL = "https://j6a505.p.ssafy.io:8080/api/feed";
const PLACE_URL = "https://j6a505.p.ssafy.io:8080/api/place";
const token = getToken();

const getPlaceAddReulst = async (body : {name : string, address : string, lat : number | undefined, lng : number | undefined}) => {
    // const token = getToken();
    console.log(body);
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
const getFeedAddResult = async (body : {
                                            placeSeq : number, 
                                            images : any[], 
                                            thumbnail : any, 
                                            content : string, 
                                            ratings : number, 
                                            moods : string[]}) => {
    if(token){
        const result = await axios.post(`${BASE_URL}`, body, {
            headers : {Authorization: token}
        }).then((response)=>{
            const value = {
                status : response.status
            }
        }).catch((e)=>{
            const value = {
                status : 401
            }
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