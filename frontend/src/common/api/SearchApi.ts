import axios from 'axios';
import { getToken } from './JTW-Token';

const BASE_URL = 'https://j6a505.p.ssafy.io/api/search';


// 최근 검색어 조회
const getRecentSearchs = async () => {
  const token = getToken();
  const result = await axios
    .get(`${BASE_URL}`, { headers: { Authorization: `Bearer ${token}` } })
    .then((res) => {
      console.log(res);
      return res;
    })
    .then((err) => {
      console.dir(err);
      return err;
    });
  return result;
};

// 최근 검색어 하나 삭제

const deleteSeacrhHistory = async (historyId: string) => {
  const token = getToken();
  const result = await axios
    .delete(`${BASE_URL}/${historyId}`, { headers: { Authorization: `Bearer ${token}` } })
    .then((res) => {
      console.log(res);
      return res;
    })
    .catch((err) => {
      console.dir(err);
      return err;
    });

  return result;
};

// 최근 검색어 전체 삭제

const deleteAllSeacrhHistory = async () => {
  const token = getToken();
  const result = await axios
    .delete(`${BASE_URL}`, { headers: { Authorization: `Bearer ${token}` } })
    .then((res) => {
      console.log(res);
      return res;
    })
    .catch((err) => {
      console.dir(err);
      return err;
    });

  return result;
};

// 검색 결과 조회 장소 (자동완성)

const getPlaceResults = async (searchWord: string) => {
  const token = getToken();
  const result = await axios
    .get(`${BASE_URL}/place?searchWord=${searchWord}`, { headers: { Authorization: `Bearer ${token}` } })
    .then((res) => {
      console.log(res);
      return res;
    })
    .catch((err) => {
      console.dir(err);
      return err;
    });
  return result;
};

// 검색 결과 조회 유저 (자동완성)

const getNicknameResults = async (searchWord: string) => {
  const token = getToken();
  const result = await axios
    .get(`${BASE_URL}/users?searchWord=${searchWord}`, { headers: { Authorization: `Bearer ${token}` } })
    .then((res) => {
      console.log(res);
      return res;
    })
    .catch((err) => {
      console.dir(err);
      return err;
    });
  return result;
};

// 검색 결과 선택 - 장소(무엇을 선택했는지 서버에 알려준다)
const postPlaceSearchResult = async (body: { placeSeq: string }) => {
  const token = getToken();
  console.log(body);
  const result = await axios
    .post(`${BASE_URL}/place`, body, {
      headers: { Authorization: `Bearer ${token}`, 'Content-type': 'application/json' },
    })
    .then((res) => {
      console.log(res);
      return res;
    })
    .catch((err) => {
      console.dir(err);
      return err;
    });
  return result;
};

// 검색 결과 선택 - 유저(무엇을 선택했는지 서버에 알려준다)
const postUserSearchResult = async (body: { nickname: string }) => {
  const token = getToken();
  const result = await axios
    .post(`${BASE_URL}/users`, body, {
      headers: { Authorization: `Bearer ${token}`, 'Content-type': 'application/json' },
    })
    .then((res) => {
      console.log(res);
      return res;
    })
    .catch((err) => {
      console.dir(err);
      return err;
    });
  return result;
};

const SearchApi = {
  getRecentSearchs,
  deleteSeacrhHistory,
  deleteAllSeacrhHistory,
  getPlaceResults,
  getNicknameResults,
  postPlaceSearchResult,
  postUserSearchResult,
};

export default SearchApi;
