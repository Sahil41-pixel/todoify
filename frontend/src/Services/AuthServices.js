import axios from 'axios'

const API = "http://localhost:8080/api/v1/user";

const registerUser =(data)=>{
    return axios.post(`${API}/register`,data)

}

const loginUser =(data)=>{
  return axios.post(`${API}/login`,data)
}

const AuthServices ={ registerUser,loginUser};

export default AuthServices;

