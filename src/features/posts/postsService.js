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

const postsService = {
  getPosts,
  getById,
};

export default postsService;
