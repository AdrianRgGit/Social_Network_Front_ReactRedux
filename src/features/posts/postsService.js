import axios from "axios";

const API_URL = "http://localhost:3000/posts";

const getPosts = async () => {
  const res = await axios.get(API_URL + "/getall");
  return res.data;
};

const postsService = {
  getPosts,
};

export default postsService;
