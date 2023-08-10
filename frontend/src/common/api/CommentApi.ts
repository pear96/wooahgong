import axios from 'axios';
import { getToken } from './JTW-Token';

const BASE_URL = `${process.env.REACT_APP_BASE_URL}/feed`;


// 댓글 불러오기

const getFeedComment = async (feedseq: number | string | undefined) => {
  const token = getToken();
  const result = await axios
    .get(`${BASE_URL}/${feedseq}/comments`, { headers: { Authorization: `${token}` } })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err;
    });
  return result;
};

// 댓글 작성하기

const postFeedComment = async (feedSeq: string | number | undefined, body: { content: string }) => {
  // 
  // 
  const token = getToken();
  const result = await axios
    .post(`${BASE_URL}/${feedSeq}/comments`, body, {
      headers: { Authorization: `${token}` },
    })
    .then((res) => {
      // 
      return res;
    })
    .catch((err) => {
      // console.dir(err);
      return err;
    });
  return result;
};

// 댓글 삭제하기

const deleteComment = async (feedSeq: string | number | undefined, commentSeq: string | number) => {
  const token = getToken();
  await axios({
    method: 'DELETE',
    url: `${BASE_URL}/${feedSeq}/comments/${commentSeq}`,
    headers: { Authorization: `${token}` },
  })
    .then((res) => {
      // 
      return res;
    })
    .catch((err) => {
      // console.dir(err);
      return err;
    });
};

//

// 댓글 좋아요 => 정리 axios 형식에 따른,,, body,, {}를 넣어야만 했었따.
const postCommentLike = async (feedSeq: number | string | undefined, commentSeq: number | string) => {
  // 
  // 
  const token = getToken();
  const result = await axios
    .post(`${BASE_URL}/${feedSeq}/comments/${commentSeq}`, {}, { headers: { Authorization: `${token}` } })
    .then((res) => {
      // 
      return res;
    })
    .catch((err: any) => {
      // console.dir(err);
      return err;
    });

  return result;
};

const CommentApi = {
  postFeedComment,
  getFeedComment,
  deleteComment,
  postCommentLike,
};

export default CommentApi;
