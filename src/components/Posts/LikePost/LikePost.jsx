import React from "react";
import { dislike, like } from "../../../features/posts/postsSlice";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

const LikePost = () => {
  const dispatch = useDispatch();
  const { _id } = useParams();

  return (
    <div className="button-container">
      <button onClick={() => dispatch(like(_id))}>Like</button>
      <button onClick={() => dispatch(dislike(_id))}>Dislike</button>
    </div>
  );
};

export default LikePost;
