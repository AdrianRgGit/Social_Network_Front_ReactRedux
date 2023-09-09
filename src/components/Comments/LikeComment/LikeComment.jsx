import React from "react";
import { useDispatch } from "react-redux";
import { dislike, like } from "../../../features/comment/CommentSlice";
import { useParams } from "react-router-dom";

const LikeComment = (props) => {
  const { comment } = props;
  const dispatch = useDispatch();

  // ! Tanto los likes de los comentarios como de los posts se deben actualizar al dar like o dislike
  // ! Que no salte un error en consola si ya le he dado like

  return (
    <div className="button-container">
      <button onClick={() => dispatch(like(comment._id))}>Like</button>
      <button onClick={() => dispatch(dislike(comment._id))}>Dislike</button>
    </div>
  );
};

export default LikeComment;
