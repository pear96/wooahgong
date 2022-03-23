import axios from "axios";

const BASE_URL = "http://j6a505.p.ssafy.io:8080/api/users"

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

const UserApi = {
    getEmailCheckResult,
    getEmailCheckCodeResult
}

export default UserApi;