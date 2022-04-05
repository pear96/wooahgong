import axios from 'axios';
import { getToken } from './JTW-Token';

const BASE_URL = 'https://j6a505.p.ssafy.io/api/place';

// 장소 상세정보
const readPlace = async (placeSeq: string) => {
  const token = getToken();
  const result = await axios.get(`${BASE_URL}/${placeSeq}`, {headers: { Authorization: `${token}` }})
                          .then((response) => {
                            const value = {
                              status : response.status,
                              data : response.data
                            }
                            return value;
                          })
                          .catch((e)=>{
                            const value = {
                              status : 404,
                              data : null
                            }
                            return value;
                          });
  return result;  
};

// 피드 최신순 정렬
const getFeedsSortResult = async (placeSeq: string, key : string) => {
  const token = getToken();
  const result = await axios.get(`${BASE_URL}/${placeSeq}?sort=${key}`, {headers: { Authorization: `${token}` }})
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
};

// 피드 인기순 정렬
const getPopularFeeds = async (placeSeq: string) => {
  const token = getToken();
  try {
    const res = await axios({
      method: 'GET',
      url: `${BASE_URL}/${placeSeq}?sort=popular`,
      headers: { Authorization: `${token}` },
    });
    return res;
  } catch (err) {
    return err;
  }
};

// 장소 찜하기
const bookmarkPlace = async (placeSeq: string) => {
  const token = getToken();
  const result = await axios.post(`${BASE_URL}/${placeSeq}/wish`,null,{headers: { Authorization: `${token}` }})
                          .then((response)=>{
                            const value = {
                              status : response.status,
                              isWished : response.data.isWished
                            }
                            return value;
                          })
                          .catch((e) => {
                            const value = {
                              status : 404,
                              isWished : null
                            }
                            return value;
                          });
  return result;
};

const PlaceApi = {
  readPlace,
  getFeedsSortResult,
  getPopularFeeds,
  bookmarkPlace,
};

export default PlaceApi;
