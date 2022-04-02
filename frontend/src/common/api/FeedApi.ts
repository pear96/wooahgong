import axios from "axios";
import { saveToken, getToken } from "./JTW-Token";

const BASE_URL = "https://j6a505.p.ssafy.io/api/feed";
const PLACE_URL = "https://j6a505.p.ssafy.io/api/place";

const token = getToken();

const getPlaceAddReulst = async (body: { name: string, address: string, lat: number | undefined, lng: number | undefined }) => {
    // const token = getToken();
    console.log(body, token);
    if (token) {
        const result = await axios.post(`${PLACE_URL}`, body, { headers: { Authorization: token } })
            .then((response) => {
                const value = {
                    status: response.status,
                    placeSeq: response.data.placeSeq
                }
                return value;
            })
            .catch((e) => {
                const value = {
                    status: 409,
                    placeSeq: null
                }
                return value;
            });
        return result;
    }
    return null;
}
const getFeedAddResult = async (data: FormData) => {
    // for (var pair of body.entries()) {
    //     console.log(pair[0]+ ', ' + pair[1]);
    // }
    if (token) {
        const result = await axios.post(`${BASE_URL}`, data, {

            headers: { Authorization: token, 'Content-type': "multipart/form-data" }
        }).then((response) => {
            const value = {
                status: response.status,
                FeedSeq: response.data.FeedSeq
            }
            return value;
        }).catch((e) => {
            const value = {
                status: 401,
                FeedSeq: undefined
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