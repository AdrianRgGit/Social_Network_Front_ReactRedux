import axios from "axios";

const API_URL = "http://localhost:3000/comments";

const createComment = async (commentData) => {
  const token = JSON.parse(localStorage.getItem("token"));
  const res = await axios.post(API_URL + "/create", commentData, {
    headers: {
      Authorization: token,
    },
  });
  return res.data;
};

const commentService = {
  createComment,
};

export default commentService;
