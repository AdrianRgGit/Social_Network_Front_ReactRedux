import axios from "axios";

const API_URL = "http://localhost:3000";

const register = async (userData) => {
  const res = await axios.post(API_URL + "/users/register", userData);
  return res.data;
};

const login = async (userData) => {
  const res = await axios.post(API_URL + "/users/login", userData); //email + password de los inputs del login
  if (res.data) {
    localStorage.setItem("user", JSON.stringify(res.data.user)); //user del back y user del back es user.username
    localStorage.setItem("token", JSON.stringify(res.data.token));
    localStorage.setItem("userConnected", JSON.stringify(res.data.userObject)); //user del back y user del back es user.username
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

const getUserConnected = async () => {
  const token = JSON.parse(localStorage.getItem("token"));
  const res = await axios.get(API_URL + "/users/getuserconnected/", {
    headers: {
      authorization: token,
    },
  });

  return res.data.getUser;
};

const getUserById = async (_id) => {
  const token = JSON.parse(localStorage.getItem("token"));
  const res = await axios.get(API_URL + "/users/getuserbyid/" + _id, {
    headers: {
      Authorization: token,
    },
  });

  return res.data;
};

const updateUser = async (userData) => {
  const token = JSON.parse(localStorage.getItem("token"));
  const res = await axios.put(
    API_URL + "/users/update/",
    userData,
    {
      headers: {
        authorization: token,
      },
    }
  );
  return res.data;
};

const authService = {
  register,
  login,
  logout,
  getUserConnected,
  getUserById,
  updateUser,
};

export default authService;
