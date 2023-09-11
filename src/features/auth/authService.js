import axios from "axios";

const API_URL = "http://localhost:3000";

const register = async (userData) => {
  const res = await axios.post(API_URL + "/users/register", userData);
  return res.data;
};

const login = async (userData) => {
  const res = await axios.post(API_URL + "/users/login", userData); //email + password de los inputs del login
  console.log(res.data)
  if (res.data) {
    localStorage.setItem("user", JSON.stringify(res.data.user)); //user del back y user del back es user.username
    localStorage.setItem("token", JSON.stringify(res.data.token));
  }
  return res.data;
};

const logout = async () => {
  const token = JSON.parse(localStorage.getItem("token"));
  const res = await axios.delete(API_URL + "/users/logout", {
    headers: {
      authorization: token,
    },
  });

  if (res.data) {
    localStorage.clear();
  }
  return res.data;
};

const getUserConnected = async (_id) => {
  const token = JSON.parse(localStorage.getItem("token"));
  const res = await axios.get(API_URL + "/users/getuserconnected/" + _id, {
    headers: {
      authorization: token,
    },
  });
  
  return res.data.getUser;
};

// http://localhost:3000/users/getuserconnected/64f9d819f052557b73482724
// (API_URL + "/posts/id/"+id)

const updateUser = async (userId, userData) => {
  console.log("update Service", userData);
  console.log("id", userId);
  const token = JSON.parse(localStorage.getItem("token"));
  console.log("token", token);
  const res = await axios.put(
    // `${API_URL}/users/id/${userId}`,
    API_URL + "/users/id/" + userId,
    userData,
    {
      headers: {
        authorization: token,
      },
    }
  );
  console.log("service user", res.data);
  return res.data;
};

const authService = {
  register,
  login,
  logout,
  getUserConnected,
  updateUser,
};

export default authService;
