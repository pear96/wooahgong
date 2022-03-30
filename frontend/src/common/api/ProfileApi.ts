import axios from 'axios';
import { getToken } from './JTW-Token';

const BASE_URL = 'https://j6a505.p.ssafy.io/api/users';
const token = getToken();

const getProfile = (nickname: string) => {
  console.log('nickname', nickname);

  console.log('this is get profile');

  return axios({
    method: 'GET',
    url: `${BASE_URL}/${nickname}`,
    headers: { Authorization: `Bearer ${token}` },
  })
    .then((res) => {
      // console.log(`getProfile ${nickname} Success`);
      // console.log(res);

      return res;
    })
    .catch((err) => {
      console.log(err);

      return err;
    });
};

const getProfileForUpdate = (nickname: string) => {
  console.log('nickname', nickname);
  console.log('this is get profile for update');
  return axios({
    method: 'GET',
    url: `${BASE_URL}/${nickname}/update`,
    headers: { Authorization: `Bearer ${token}` },
  })
    .then((res) => {
      // console.log('getProfileForUpdate success');
      console.log(`${BASE_URL}/${nickname}/update`);

      return res;
    })
    .catch((err) => {
      return err;
    });
};

const getMyFeeds = (nickname: string) => {
  return axios({
    method: 'GET',
    url: `${BASE_URL}/${nickname}/feeds`,
    headers: { Authorization: `Bearer ${token}` },
  })
    .then((res) => {
      console.log(`getMyFeeds ${nickname} Success`);
      return res;
    })
    .catch((err) => {
      return err;
    });
};

const getLikedFeeds = (nickname: string) => {
  return axios({
    method: 'GET',
    url: `${BASE_URL}/${nickname}/liked`,
    headers: { Authorization: `Bearer ${token}` },
  })
    .then((res) => {
      console.log(`getLikedFeeds ${nickname} Success`);

      return res;
    })
    .catch((err) => {
      return err;
    });
};

const getWishedFeeds = (nickname: string) => {
  return axios({
    method: 'GET',
    url: `${BASE_URL}/${nickname}/wished`,
    headers: { Authorization: `Bearer ${token}` },
  })
    .then((res) => {
      console.log(`getWishedFeeds ${nickname} Success`);

      return res;
    })
    .catch((err) => {
      return err;
    });
};

const updateProfile = (nickname: string, data: { nickname: string; mbti: string; moods: string[] }) => {
  return axios({
    method: 'PATCH',
    url: `${BASE_URL}/${nickname}`,
    headers: { Authorization: `Bearer ${token}`, 'Access-Control-Allow-Methods': 'PATCH' },
    data,
  })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.log(`${BASE_URL}/${nickname}`);

      return err;
    });
};

const updateProfileImage = (nickname: string, data: FormData) => {
  return axios({
    method: 'PATCH',
    url: `${BASE_URL}/${nickname}/profileimg`,
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${token}`,
      'Access-Control-Allow-Origin': 'http://localhost:3000',
      // 'Access-Control-Allow-Credentials': true,
      'Access-Control-Allow-Methods': 'PATCH',
      // 'Access-Control-Allow-Headers':
      //   'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers',
    },
    data,
  })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.log(`${BASE_URL}/${nickname}/profileimg`);

      return err;
    });
};

const resign = (nickname: string) => {
  return axios({
    method: 'DELETE',
    url: `${BASE_URL}/${nickname}`,
    headers: { Authorization: `Bearer ${token}` },
  })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err;
    });
};

const ProfileApi = {
  getProfile,
  getProfileForUpdate,
  getMyFeeds,
  getLikedFeeds,
  getWishedFeeds,
  updateProfile,
  updateProfileImage,
  resign,
};

export default ProfileApi;
