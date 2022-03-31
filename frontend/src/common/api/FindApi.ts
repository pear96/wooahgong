import axios from 'axios';
import { getToken } from './JTW-Token';

const BASE_URL = 'https://j6a505.p.ssafy.io/api/users';
const token = getToken();

// 이메일로 회원 아이디 찾기
const findIdByEmail = async (email: String) => {
  const res = await axios({
    method: 'GET',
    url: `${BASE_URL}/id/${email}`,
    // headers: { Authorization: `${token}` },
  }).then((response) => {
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
};

const FindApi = {
  findIdByEmail
}
export default FindApi;