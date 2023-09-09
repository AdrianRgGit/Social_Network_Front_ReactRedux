import React from "react";
import LikeComment from "../../Posts/PostDetail/PostDetail";

// ! No me va al hacer un subcomponente para los comentarios


const CommentList = ({ comments }) => {
  console.log(comments);
  return (
    <div className="comments-container">
      Comments:
      {comments?.map((comment) => (
        <div key={comment._id}>
          <div>Title: {comment.title}</div>
          <div>Body: {comment.body}</div>
          <div>Likes: {comment.likes.length}</div>
          <br />
          <LikeComment key={comment._id} comment={comment} />
        </div>
      ))}
    </div>
  );
};

export default CommentList;
