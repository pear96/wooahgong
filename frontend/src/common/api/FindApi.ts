import axios from 'axios';
import { getToken } from './JTW-Token';

const BASE_URL = 'http://localhost:8080/api/users';
const token = getToken();

// 이메일로 회원 아이디 찾기
const findIdByEmail = async (email: string) => {
  const res = await axios({
    method: 'GET',
    url: `${BASE_URL}/id?email=${email}`,
    // headers: { Authorization: `${token}` },
  }).then((response) => {
    console.log("성공")
    const value = {
      data: response.data,
      status: response.status
    }
    console.log(value.data)
    return value;
  }).catch((e) => {
    console.log("실패")
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