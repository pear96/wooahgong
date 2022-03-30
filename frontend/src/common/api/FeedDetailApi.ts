import axios from 'axios';
import { saveToken, getToken } from './JTW-Token';

const BASE_URL = 'https://j6a505.p.ssafy.io/api/feed';
const token = getToken();

// 피드 상세 정보 조회

const getFeedDetail = async () => {
  const result = await axios
    .get(`${BASE_URL}/10`, { headers: { Authorization: `Bearer ${token}` } })
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
// 피드 수정하기

// 피드 삭제하기

// 피드 좋아요

const FeedDetailApi = {
  getFeedDetail,
};

export default FeedDetailApi;
