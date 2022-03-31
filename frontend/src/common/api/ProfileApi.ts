import axios from 'axios';
import { getToken } from './JTW-Token';

const BASE_URL = 'https://j6a505.p.ssafy.io/api/users';
const token = getToken();

const getProfile = async (nickname: string) => {
  console.log('nickname', nickname);

  console.log('this is get profile');

  const result = await axios.get(`${BASE_URL}/${nickname}`, {headers : { Authorization: `${token}` } })
                        .then((response) => {
                          const value = {
                            status : response.status,
                            data : response.data
                          }
                          return value;
                        })
                        .catch((e)=>{
                          const value = {
                            status : 401,
                            data : null
                          }
                          return value;
                        })
  return result;
};

const getProfileForUpdate = async (nickname: string) => {
  console.log('nickname', nickname);
  console.log('this is get profile for update');
  
  const result = await axios.get(`${BASE_URL}/${nickname}/update`, {headers: { Authorization: `Bearer ${token}` }})
                          .then((response) => {
                            const value = {
                              status : response.status,
                              data : response.data
                            }
                            return value;
                          })
                          .catch((e)=>{
                            const value = {
                              status : 401,
                              data : null
                            }
                            return value;
                          })
  return result;
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
};

const getLikedFeeds = async (data : {nickname : string, page : number}) => {
  const result = await axios.get(`${BASE_URL}/${data.nickname}/liked?page=${data.page}`,
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
                          });
  console.log(result);
  return result;
};

const getWishedFeeds = async (data : {nickname : string, page : number}) => {
  console.log(data);
  const result = await axios.get(`${BASE_URL}/${data.nickname}/wished?page=${data.page}`,
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
};

const updateProfile = async (nickname: string, data: { nickname: string; mbti: string; moods: string[] }) => {
  
  const result = await axios.patch(`${BASE_URL}/${nickname}`, data,{headers: { Authorization: `${token}`}})
                          .then((response)=>{
                            const value = {
                              status : response.status
                            }
                            return value;
                          })
                          .catch((e)=>{
                            const value = {
                              status : 403
                            }
                            return value;
                          })
  return result;                    
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
