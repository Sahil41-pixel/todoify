import axios from "axios";

const API=import.meta.env.VITE_BASEURL;

const getAuthHeader = () => {
  const user = JSON.parse(localStorage.getItem("todoapp") || "{}");
  return {
    headers: {
      Authorization: user?.token ? `Bearer ${user.token}` : ""
    }
  };
};
// //get user token
// const user=JSON.parse(localStorage.getItem('todoapp'));

// //default auth header
// axios.defaults.headers.common['Authorization']=`Bearer ${user.token}`;

//CREATE TODO
const createTodo=(data)=>{
    return axios.post(`${API}/todo/create`,data, getAuthHeader());
}

//GET ALL TODO
const getAllTodo=(id)=>{
    return axios.post(`${API}/todo/getAll/${id}`, {}, getAuthHeader());
}

//UPDATE TODO
const updateTodo=(id,data)=>{
    return axios.patch(`${API}/todo/update/${id}`,data, getAuthHeader())
}

//DELETE TODO
const deleteTodo=(id)=>{
     return axios.post(`${API}/todo/delete/${id}`, {}, getAuthHeader());
}

const TodoServices={createTodo,getAllTodo,updateTodo,deleteTodo,};

export default TodoServices;