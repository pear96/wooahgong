import axios from "axios";
import {saveToken, getToken} from "./JTW-Token";

const BASE_URL = `${process.env.REACT_APP_BASE_URL}/main/map`;


const getResultPlaceDistance = async (data : {radius : number, lat : number, lng : number}) => {
    const token = getToken();
    
    if(token){
        const result = await axios.get(`${BASE_URL}?lng=${data.lng}&lat=${data.lat}&rad=${data.radius}`, {headers : {Authorization: token}})
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