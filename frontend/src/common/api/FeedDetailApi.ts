import axios from 'axios';
import { getToken } from './JTW-Token';

const BASE_URL = 'https://j6a505.p.ssafy.io/api/feed';

// 피드 상세 정보 조회

const getFeedDetail = async (seq: number | string) => {
  const token = getToken();
  const result = await axios
    .get(`${BASE_URL}/${seq}`, { headers: { Authorization: `${token}` } })
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
// 피드 좋아요 => 정리 axios 형식에 따른,,, body,, {}를 넣어야만 했었따.
const postFeedLike = async (feedSeq: number | string) => {
  const token = getToken();
  console.log(feedSeq);
  const result = await axios
    .post(`${BASE_URL}/${feedSeq}`, {}, { headers: { Authorization: `${token}` } })
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
// 피드 수정하기

const patchFeedDetail = async (feedSeq: string | number, data: { content: string }) => {
  const token = getToken();
  console.log(feedSeq);
  console.log(data);
  await axios({
    method: 'PATCH',
    url: `${BASE_URL}/${feedSeq}`,
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

// 피드 삭제하기

const deleteFeedDetail = async (feedSeq: string | number) => {
  const token = getToken();
  await axios({
    method: 'DELETE',
    url: `${BASE_URL}/${feedSeq}`,
    headers: { Authorization: `${token}` },
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

const FeedDetailApi = {
  getFeedDetail,
  postFeedLike,
  deleteFeedDetail,
  patchFeedDetail,
};

export default FeedDetailApi;
