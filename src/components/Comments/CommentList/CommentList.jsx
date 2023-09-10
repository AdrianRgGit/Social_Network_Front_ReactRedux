// CommentList.js
import React from "react";
import LikeComment from "../../Comments/LikeComment/LikeComment";
import { Spinner } from "@chakra-ui/spinner";

const CommentList = ({ comments }) => {
  console.log(comments);

  if (!comments) {
    return <Spinner />;
  }

  if (comments.length === 0) {
    return (
      <div>
        <p>Comments:</p>
        <p>There are no comments yet. Be the first!</p>
      </div>
    );
  }

  return (
    <div className="comments-container">
      Comments:
      {comments?.map((comment) => {
        return (
          <div key={comment._id}>
            <div>Title: {comment.title}</div>
            <div>Body: {comment.body}</div>
            <div>Likes: {comment.likes.length}</div>
            <br />
            <LikeComment key={comment._id} comment={comment} />
          </div>
        );
      })}
      <br />
      <button>Comment</button>
    </div>
  );
};

export default CommentList;
