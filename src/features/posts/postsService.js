import axios from "axios";

const API_URL = "http://localhost:3000/posts";

const getPosts = async () => {
  const res = await axios.get(API_URL + "/getall");
  return res.data;
};

const getById = async (_id) => {
  const res = await axios.get(API_URL + "/id/" + _id);
  return res.data;
};

const getPostsByName = async (title) => {
  const res = await axios.get(API_URL + "/title/" + title);
  return res.data;
};

const getUserConnected = async () => {
  const token = JSON.parse(localStorage.getItem("token"));
  const res = await axios.get(API_URL + "/getuserconnected", {
    headers: {
      Authorization: token,
    },
  });
  return res.data;
};

const createPost = async (postData) => {
  const token = JSON.parse(localStorage.getItem("token"));
  const res = await axios.post(API_URL + "/create", postData, {
    headers: {
      Authorization: token,
    },
  });
  return res.data;
};

const postsService = {
  getPosts,
  getById,
  getPostsByName,
  getUserConnected,
  createPost,
};

export default postsService;
