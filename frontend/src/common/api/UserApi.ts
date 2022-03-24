import axios from "axios";

const BASE_URL = "http://j6a505.p.ssafy.io:8888/api/users"

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

const UserApi = {
    getEmailCheckResult,
    getEmailCheckCodeResult,
    getIdDuplicateCheck,
    getNickDuplicateCheck,
    getSignupCompleteResult
}

export default UserApi;