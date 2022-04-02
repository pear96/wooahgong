import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { getToken } from './JTW-Token';

const BASE_URL = 'https://j6a505.p.ssafy.io/data/main';
const token = getToken();
// 피드 상세 정보 조회

// 피드 좋아요 => 정리 axios 형식에 따른,,, body,, {}를 넣어야만 했었따.
const getFormeplace = async (body: { searchRadius: number | string; lat: number | string; lng: number | string }) => {
  console.log(body);

  const result = await axios
    .post(`${BASE_URL}`, body, { headers: { Authorization: `${token}` } })
    .then((res) => {
      console.log(res);
      return res;
    })
    .catch((err: any) => {
      console.dir(err);
      return err;
    });

  return result;
};

const MainApi = {
  getFormeplace,
};

export default MainApi;
