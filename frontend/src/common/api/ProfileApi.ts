import axios from 'axios';
import { getToken } from './JTW-Token';

const BASE_URL = 'http://j6a505.p.ssafy.io:8080/api/users';
const token = getToken();

const getProfile = async (nickname: string) => {
  await axios({
    method: 'GET',
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

const getProfileForUpdate = async (nickname: string) => {
  await axios({
    method: 'GET',
    url: `${BASE_URL}/${nickname}/update`,
    headers: { Authorization: `Bearer ${token}` },
  })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err;
    });
};

const getMyFeeds = async (nickname: string) => {
  await axios({
    method: 'GET',
    url: `${BASE_URL}/${nickname}/feeds`,
    headers: { Authorization: `Bearer ${token}` },
  })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err;
    });
};

const getLikedFeeds = async (nickname: string) => {
  await axios({
    method: 'GET',
    url: `${BASE_URL}/${nickname}/liked`,
    headers: { Authorization: `Bearer ${token}` },
  })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err;
    });
};

const getWishedFeeds = async (nickname: string) => {
  await axios({
    method: 'GET',
    url: `${BASE_URL}/${nickname}/wished`,
    headers: { Authorization: `Bearer ${token}` },
  })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err;
    });
};

const updateProfile = async (
  nickname: string,
  data: { password: string; nickname: string; mbti: string; moods: string[] },
) => {
  await axios({
    method: 'PATCH',
    url: `${BASE_URL}/${nickname}`,
    headers: { Authorization: `Bearer ${token}` },
    data,
  })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err;
    });
};

const updateProfileImage = async (nickname: string, data: { image: string }) => {
  await axios({
    method: 'PATCH',
    url: `${BASE_URL}/${nickname}/profileimg`,
    headers: { Authorization: `Bearer ${token}` },
    data,
  })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err;
    });
};

const resign = async (nickname: string) => {
  await axios({
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
