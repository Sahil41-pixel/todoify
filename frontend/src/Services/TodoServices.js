import axios from "axios";

const API="http://localhost:8080/api/v1/todo";

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
    return axios.post(`${API}/create`,data, getAuthHeader());
}

//GET ALL TODO
const getAllTodo=(id)=>{
    return axios.post(`${API}/getAll/${id}`, {}, getAuthHeader());
}

//UPDATE TODO
const updateTodo=(id,data)=>{
    return axios.patch(`${API}/update/${id}`,data, getAuthHeader())
}

//DELETE TODO
const deleteTodo=(id)=>{
     return axios.post(`${API}/delete/${id}`, {}, getAuthHeader());
}

const TodoServices={createTodo,getAllTodo,updateTodo,deleteTodo,};

export default TodoServices;