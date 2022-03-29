import axios from 'axios';
import { getToken } from './JTW-Token';

const BASE_URL = 'https://j6a505.p.ssafy.io:8080/api/place';
const token = getToken();

// 장소 만들기
const createPlace = async (data: { name: string; address: string; lat: number; lng: number }) => {
  await axios({
    method: 'POST',
    url: BASE_URL,
    headers: { Authorization: `Bearer ${token}` },
    data,
  })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err;
    });
};

// 장소 상세정보
const readPlace = async (placeSeq: string) => {
  await axios({
    method: 'GET',
    url: `${BASE_URL}/${placeSeq}`,
    headers: { Authorization: `Bearer ${token}` },
  })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err;
    });
};

// 피드 최신순 정렬
const getLatestFeeds = async (placeSeq: string) => {
  await axios({
    method: 'GET',
    url: `${BASE_URL}/${placeSeq}?sort=latest`,
    headers: { Authorization: `Bearer ${token}` },
  })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err;
    });
};

// 피드 인기순 정렬
const getPopularFeeds = async (placeSeq: string) => {
  await axios({
    method: 'GET',
    url: `${BASE_URL}/${placeSeq}?sort=popular`,
    headers: { Authorization: `Bearer ${token}` },
  })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err;
    });
};

// 장소 찜하기
const bookmarkPlace = async (placeSeq: string) => {
  await axios({
    method: 'POST',
    url: `${BASE_URL}/${placeSeq}/wish`,
    headers: { Authorization: `Bearer ${token}` },
  })
    .then((res) => {
      console.log('찜/찜취소 성공');

      return res;
    })
    .catch((err) => {
      console.log('찜/찜취소 실패');
      return err;
    });
};

const PlaceApi = {
  createPlace,
  readPlace,
  getLatestFeeds,
  getPopularFeeds,
  bookmarkPlace,
};

export default PlaceApi;
