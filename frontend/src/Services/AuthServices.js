import axios from 'axios'

const API = import.meta.env.VITE_BASEURL;

const registerUser =(data)=>{
    return axios.post(`${API}/user/register`,data)

}

const loginUser =(data)=>{
  return axios.post(`${API}/user/login`,data)
}

const AuthServices ={ registerUser,loginUser};

export default AuthServices;

