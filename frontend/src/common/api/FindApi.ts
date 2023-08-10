import axios from 'axios';
import { getToken } from './JTW-Token';


const BASE_URL = `${process.env.REACT_APP_BASE_URL}/users`;


// 이메일로 회원 아이디 찾기
const findIdByEmail = async (email: string) => {
  
  const res = await axios.get(`${BASE_URL}/id?email=${email}`
    // headers: { Authorization: `${token}` },
  ).then((response) => {
    const value = {
      data: response.data,
      status: response.status
    }
    return value;
  }).catch((e) => {
    const value = {
      data: null,
      status: 404
    }
    return value;
  })
  return res;
};
// 이메일, 아이디로 회원 아이디 찾기
const findPwSendEmail = async (body: { userId: string, email: string }) => {
  const res = await axios.patch(`${BASE_URL}/pwd`, body
  ).then((response) => {
    const value = {
      data: response.data,
      status: response.status
    }
    return value;
  }).catch((e) => {
    const value = {
      data: null,
      status: 404
    }
    return value;
  })
  return res;
};
// 인증코드 확인
const findPwInsertCode = async (body: { userId: string, authCode: string }) => {
  const res = await axios.post(`${BASE_URL}/pwd`, body
    // headers: { Authorization: `${token}` },
  ).then((response) => {
    const value = {
      data: response.data,
      status: response.status
    }
    return value;
  }).catch((e) => {
    const value = {
      data: null,
      status: 404
    }
    return value;
  })
  return res;
};

// 비밀번호 변경
const resetPwd = async (body: { userId: string, password: string }) => {
  const res = await axios.patch(`${BASE_URL}/repwd`, body
    // headers: { Authorization: `${token}` },
  ).then((response) => {
    const value = {
      data: response.data,
      status: response.status
    }
    return value;
  }).catch((e) => {
    const value = {
      data: null,
      status: 404
    }
    return value;
  })
  return res;
};

const FindApi = {
  findIdByEmail,
  findPwSendEmail,
  findPwInsertCode,
  resetPwd
}
export default FindApi;