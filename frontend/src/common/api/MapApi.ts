import axios from "axios";
import {saveToken, getToken} from "./JTW-Token";


const BASE_URL = "https://j6a505.p.ssafy.io/api/main/map";
const token = getToken();

const getResultPlaceDistance = async (data : {radius : number, lat : number, lng : number}) => {
    console.log(data);
    if(token){
        const result = await axios.post(BASE_URL, data, {headers : {Authorization: token}})
                                .then((response) => {
                                    const value = {
                                        status : response.status,
                                        data : response.data
                                    }
                                    return value;
                                })    
                                .catch((e) => {
                                    const value = {
                                        status : 400,
                                        data : null
                                    }
                                    return value;
                                });
        return result;
    }
    return {status : 400, data : null};
}

const MapApi = {
    getResultPlaceDistance
}

export default MapApi;