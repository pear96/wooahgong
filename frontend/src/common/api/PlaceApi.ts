import axios from 'axios';
import { getToken } from './JTW-Token';

const BASE_URL = 'https://j6a505.p.ssafy.io/api/place';
const token = getToken();

// 장소 만들기
const createPlace = async (data: { name: string; address: string; lat: number; lng: number }) => {
  try {
    const res = await axios({
      method: 'POST',
      url: BASE_URL,
      headers: { Authorization: `${token}` },
      data,
    });
    return res;
  } catch (err) {
    return err;
  }
};

// 장소 상세정보
const readPlace = async (placeSeq: string) => {
    const res = await axios({
      method: 'GET',
      url: `${BASE_URL}/${placeSeq}`,
      headers: { Authorization: `${token}` },
    }).then((response)=>{
      const value = {
        data : response.data,
        status : response.status
      }
      return value;
    }).catch((e) => {
      const value = {
        data : null,
        status : 404
      }
      return value;
    })
    ;
    console.log(`readPlace ${placeSeq} Success!`);
    return res;
  
};

// 피드 최신순 정렬
const getLatestFeeds = async (placeSeq: string) => {
  try {
    const res = await axios({
      method: 'GET',
      url: `${BASE_URL}/${placeSeq}?sort=latest`,
      headers: { Authorization: `${token}` },
    });
    return res;
  } catch (err) {
    return err;
  }
};

// 피드 인기순 정렬
const getPopularFeeds = async (placeSeq: string) => {
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

    const res = await axios({
      method: 'POST',
      url: `${BASE_URL}/${placeSeq}/wish`,
      headers: { Authorization: `${token}` },
    }).then((response) => {
      const value = {
        isWished : response.data.isWished,
        status : 200
      }
      return value;
    }).catch((e)=>{
      const value = {
        isWished : null,
        status : 404
      }
      return value;
    });
    console.log('찜/찜취소 성공');
    console.log(res);
    return res;
  
};

const PlaceApi = {
  createPlace,
  readPlace,
  getLatestFeeds,
  getPopularFeeds,
  bookmarkPlace,
};

export default PlaceApi;
