import React from "react";
import { dislike, like } from "../../../features/posts/postsSlice";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBone } from "@fortawesome/free-solid-svg-icons";

const LikePost = () => {
  const dispatch = useDispatch();
  const { _id } = useParams();
  const { post } = useSelector((state) => state.posts);
  const { userConnected } = useSelector((state) => state.auth);

  console.log(post);
  console.log(userConnected);
  console.log(_id);

  const isAlreadyLiked = post.likes?.includes(userConnected._id);

  return (
    <div className="button-container">
      {isAlreadyLiked ? (
        <FontAwesomeIcon
          icon={faBone}
          onClick={() => dispatch(dislike(_id))}
          style={{ color: "#d7902d" }}
        />
      ) : (
        <FontAwesomeIcon icon={faBone} onClick={() => dispatch(like(_id))} />
      )}
    </div>
  );
};

export default LikePost;
