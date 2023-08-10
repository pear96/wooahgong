import axios from 'axios';
import { saveToken, getToken } from './JTW-Token';

const BASE_URL = `${process.env.REACT_APP_BASE_URL}/users`;


const getEmailCheckResult = (body: { email: string }) => {
  const result = axios.post(`${BASE_URL}/signup/email`, body).catch((e: any) => {
    const value = {
      status: 409,
    };
    return value;
  });
  return result;
};
const getEmailCheckCodeResult = async (data: { email: string; code: string }) => {
  const result = await axios.get(`${BASE_URL}/signup?email=${data.email}&authCode=${data.code}`).catch((e: any) => {
    const value = {
      status: 403,
    };
    return value;
  });
  return result;
};
const getIdDuplicateCheck = async (id: string) => {
  
  const result = await axios.get(`${BASE_URL}/signup?userId=${id}`).catch((e: any) => {
    const value = {
      status: 409,
    };
    return value;
  });
  return result;
};
const getNickDuplicateCheck = async (nick: string) => {
  
  const result = await axios.get(`${BASE_URL}/signup?nickname=${nick}`).catch((e: any) => {
    const value = {
      status: 409,
    };
    return value;
  });
  return result;
};
const getSignupCompleteResult = async (body: {
  userId: string;
  password: string;
  nickname: string;
  email: string;
  birth: string;
  gender: boolean;
  provider: boolean;
  moods: string[];
  mbti: string;
}) => {
  
  const result = await axios.post(`${BASE_URL}/signup`, body).catch((e: any) => {
    
    const value = {
      status: 400,
    };
    return value;
  });
  return result;
};
const getCommonLoginResult = async (body: { userId: string; password: string }) => {
  const result = await axios
    .post(`${BASE_URL}/login`, body)
    .then((response) => {
      
      saveToken(response.data.token);
      const value = {
        status: 200,
        data: {
          nickname: response.data.nickname,
          profileImg: response.data.profileImg,
          gender: response.data.gender
        },
      };
      return value;
    })
    .catch((e: any) => {
      const value = {
        status: 409,
        data: {
          nickname: '',
          profileImg: '',
          gender: null
        },
      };
      return value;
    });

  // saveToken(result.data.token);
  return result;
};
const getKakaoLoginResult = async (code: string) => {
  const result = await axios.get(`${BASE_URL}/login/kakao?code=${code}`);
  
  return result;
};

const leaveWooAhGong = async (nickname: string) => {
  const token = getToken()
  if (token !== null) {
    const result = await axios({
      method: 'DELETE',
      url: `${BASE_URL}/${nickname}`,
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        
        const value = {
          status: res.status

        }
        return value
      })
      .catch((err) => {
        
        const value = {
          status: 401
        }
        return value
      });
    return result
  }
  return { status: 401 }
};

const UserApi = {
  getEmailCheckResult,
  getEmailCheckCodeResult,
  getIdDuplicateCheck,
  getNickDuplicateCheck,
  getSignupCompleteResult,
  getCommonLoginResult,
  getKakaoLoginResult,
  leaveWooAhGong
};

export default UserApi;
