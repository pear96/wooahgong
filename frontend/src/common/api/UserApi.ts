import axios from "axios";
import {saveToken, getToken} from "./JTW-Token";

const BASE_URL = "http://j6a505.p.ssafy.io:8080/api/users"
// const BASE_URL = "http://localhost:8080/api/users"

const getEmailCheckResult = (body : {email : string}) => {
    const result =  axios.post(`${BASE_URL}/signup/email`, body)
                        .catch((e : any)=>{
                            const value = {
                                status : 409
                            }
                            return value;
                        });
    return result;
}
const getEmailCheckCodeResult = async (data : {email : string, code : string}) =>{
    const result = await axios.get(`${BASE_URL}/signup?email=${data.email}&authCode=${data.code}`,)
                                .catch((e:any)=>{
                                const value = {
                                    status : 403
                                }
                                return value;
                            });
    return result;
}
const getIdDuplicateCheck =async (id : string) => {
    console.log(id);
    const result = await axios.get(`${BASE_URL}/signup?userId=${id}`)
                            .catch((e:any)=>{
                                const value = {
                                    status : 409
                                }
                                return value;
                            })
    return result;
}
const getNickDuplicateCheck = async (nick : string) => {
    console.log(nick);
    const result = await axios.get(`${BASE_URL}/signup?nickname=${nick}`)
                            .catch((e:any)=>{
                                const value = {
                                    status : 409
                                }
                                return value;
                            })
    return result;
}
const getSignupCompleteResult = 
                    async (body : {
                                    userId : string, 
                                    password : string, 
                                    nickname : string, 
                                    email : string, 
                                    birth : string, 
                                    gender : boolean, 
                                    provider : boolean, 
                                    moods : string[], 
                                    mbti : string
                                }) => 
                                {
    console.log(body);
    const result = await axios.post(`${BASE_URL}/signup`, body)
                            .catch((e:any)=>{
                                console.log(e);
                                const value = {
                                    status : 400
                                }
                                return value;
                            });
    return result;
}
const getCommonLoginResult = async(body : {userId : string, password : string}) =>{
    const result = await axios.post(`${BASE_URL}/login`, body)
                            .then((response)=>{
                                // console.log(response.data.token);
                                saveToken(response.data.token);
                                const value = {
                                    status : 200,
                                    data : {
                                        nickname : response.data.nickname,
                                        profileImg : response.data.profileImg
                                    }
                                }
                                return value;
                            })
                            .catch((e : any)=>{
                                const value = {
                                    status : 409,
                                    data : {
                                        nickname : "",
                                        profileImg : ""
                                    }
                                }
                                return value;
                            })
    // saveToken(result.data.token);
    return result;
}
const getKakaoLoginResult = async (code : string) =>{
    const result = await axios.get(`${BASE_URL}/login/kakao?code=${code}`);
    return result;
}

const UserApi = {
    getEmailCheckResult,
    getEmailCheckCodeResult,
    getIdDuplicateCheck,
    getNickDuplicateCheck,
    getSignupCompleteResult,
    getCommonLoginResult,
    getKakaoLoginResult
}

export default UserApi;