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

const postsService = {
  getPosts,
  getById,
  getPostsByName,
};

export default postsService;
