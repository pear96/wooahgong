import axios from "axios";
import {saveToken, getToken} from "./JTW-Token";

const BASE_URL = "https://j6a505.p.ssafy.io:8080/api/feed";
const PLACE_URL = "https://j6a505.p.ssafy.io:8080/api/place";
const token = getToken();
const getPlaceAddReulst = async (body : {name : string, address : string, lat : number | undefined, lng : number | undefined}) => {
    // const token = getToken();
    console.log(body);
    if(token){
        const result = await axios.post(`${PLACE_URL}`, body, {headers : {Authorization: token}}).catch((e)=>{console.log(e)});
        console.log(result);
    }

}

const FeedApi = {
    getPlaceAddReulst
}

export default FeedApi;