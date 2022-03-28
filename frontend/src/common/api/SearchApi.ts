import axios from 'axios';
import { getToken } from './JTW-Token';

const BASE_URL = 'https://j6a505.p.ssafy.io:8080/api/search';
const token = getToken();

// 최근 검색어 조회
const getRecentSearchs = async () => {
  await axios({
    method: 'GET',
    url: `${BASE_URL}`,
    headers: { Authorization: `Bearer ${token}` },
  })
    .then((res) => {
      console.log(res);
      return res;
    })
    .then((err) => {
      console.dir(err);
      return err;
    });
};

// 최근 검색어 하나 삭제

const deleteSeacrhHistory = async (historyId: string) => {
  await axios({
    method: 'DELETE',
    url: `${BASE_URL}/${historyId}`,
    headers: { Authorization: `Bearer ${token}` },
  })
    .then((res) => {
      console.log(res);
      return res;
    })
    .catch((err) => {
      console.dir(err);
      return err;
    });
};

// 최근 검색어 전체 삭제

const deleteAllSeacrhHistory = async (historyId: string) => {
  await axios({
    method: 'DELETE',
    url: `${BASE_URL}`,
    headers: { Authorization: `Bearer ${token}` },
  })
    .then((res) => {
      console.log(res);
      return res;
    })
    .catch((err) => {
      console.dir(err);
      return err;
    });
};

// 검색 결과 조회 장소 (자동완성)

const getPlaceResults = async (searchWord: string) => {
  console.log(searchWord);
  await axios({
    method: 'GET',
    url: `${BASE_URL}/place?searchWord=${searchWord}`,
    headers: { Authorization: `Bearer ${token}` },
  })
    .then((res) => {
      console.log(res);
      return res;
    })
    .catch((err) => {
      console.dir(err);
      return err;
    });
};

// 검색 결과 조회 유저 (자동완성)

const getNicknameResults = async (searchWord: string) => {
  await axios({
    method: 'GET',
    url: `${BASE_URL}/users?searchWord=${searchWord}`,
    headers: { Authorization: `Bearer ${token}` },
  })
    .then((res) => {
      console.log(res);
      return res;
    })
    .catch((err) => {
      console.dir(err);
      return err;
    });
};

// 검색 결과 선택 - 장소(무엇을 선택했는지 서버에 알려준다)
const postPlaceSearchResult = async (data: { placeId: string }) => {
  await axios({
    method: 'POST',
    url: `${BASE_URL}/place`,
    headers: { Authorization: `Bearer ${token}` },
    data,
  })
    .then((res) => {
      console.log(res);
      return res;
    })
    .catch((err) => {
      console.dir(err);
      return err;
    });
};

// 검색 결과 선택 - 유저(무엇을 선택했는지 서버에 알려준다)
const postUserSearchResult = async (data: { nickname: string }) => {
  await axios({
    method: 'POST',
    url: `${BASE_URL}/`,
    headers: { Authorization: `Bearer ${token}` },
    data,
  })
    .then((res) => {
      console.log(res);
      return res;
    })
    .catch((err) => {
      console.dir(err);
      return err;
    });
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
