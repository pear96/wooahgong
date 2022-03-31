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

const getMyFeeds = async (data : {nickname : string, page : number}) => {
  console.log(data);
  const result = await axios.get(`${BASE_URL}/${data.nickname}/feeds?page=${data.page}`,
                                  {headers : { Authorization: `${token}` }})
                            .then((response)=>{
                              const value = {
                                status : response.status,
                                data : response.data
                              }
                              return value;
                            }).catch((e)=>{
                              const value = {
                                status : 401,
                                data : null
                              }
                              return value;
                            })
  console.log(result);
  return result;

  // return axios({
  //   method: 'GET',
  //   url: `${BASE_URL}/${nickname}/feeds`,
  //   headers: { Authorization: `Bearer ${token}` },
  // })
  //   .then((res) => {
  //     console.log(`getMyFeeds ${nickname} Success`);
  //     return res;
  //   })
  //   .catch((err) => {
  //     return err;
  //   });
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

const updateProfileImage = async (nickname: string, data: FormData) => {
  if(token){
    const result = await axios.patch(`${BASE_URL}/${nickname}/profileimg`, data, {headers : {Authorization: token, 'Content-type' : "multipart/form-data"}})
                            .then((response)=>{
                                const value = {
                                  status : response.status,
                                  data : response.data
                                }
                                return value;
                            })
                            .catch((e)=>{
                              const value = {
                                status : 403,
                                data : null
                              }
                              return value;
                            })
    return result;
  }
  return {status : 400, data : null};
};
const getPwdChangeResult = async (body : {userId : string, password : string}) => {
  const result = await axios.patch(`https://j6a505.p.ssafy.io/api/users/repwd`, body)
                          .then((response)=>{
                            const value = {
                              status : response.status
                            }
                            return value;
                          })
                          .catch((e)=>{
                            const value = {
                              status : 400
                            }
                            return value;
                          })
  return result;
}         


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
  getPwdChangeResult
};

export default ProfileApi;
