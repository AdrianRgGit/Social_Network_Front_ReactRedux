import axios from "axios";

const API_URL = "http://localhost:3000/comments";

const getCommentById = async (_id) => {
  const token = JSON.parse(localStorage.getItem("token"));
  const res = await axios.get(API_URL + "id/" + _id, {
    headers: {
      Authorization: token,
    },
  });

  return res.data;
};

const createComment = async (commentData) => {
  const token = JSON.parse(localStorage.getItem("token"));
  const res = await axios.post(API_URL + "/create", commentData, {
    headers: {
      Authorization: token,
    },
  });
  return res.data;
};

const like = async (_id) => {
  const token = JSON.parse(localStorage.getItem("token"));
  const res = await axios.put(
    API_URL + "/like/" + _id,
    {},
    {
      headers: {
        Authorization: token,
      },
    }
  );
  return res.data;
};

const dislike = async (_id) => {
  const token = JSON.parse(localStorage.getItem("token"));
  const res = await axios.put(
    API_URL + "/dislike/" + _id,
    {},
    {
      headers: {
        Authorization: token,
      },
    }
  );
  return res.data;
};

const commentService = {
  createComment,
  getCommentById,
  like,
  dislike,
};

export default commentService;
