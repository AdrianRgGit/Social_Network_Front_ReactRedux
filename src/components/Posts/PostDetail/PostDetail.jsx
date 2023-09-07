import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getById, reset } from "../../../features/posts/postsSlice";
import { Card } from "antd";
import AddComment from "../../Comments/AddComment/AddComment";
import LikePost from "../LikePost/LikePost";
import LikeComment from "../../Comments/LikeComment/LikeComment";

const PostDetail = () => {
  const { _id } = useParams();
  const { post } = useSelector((state) => state.posts);

  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchData() {
      try {
        dispatch(getById(_id));
        dispatch(reset());
      } catch (error) {
        console.error("hubo un problema");
      }
    }
    fetchData();
  }, []);

  // ! Que sólo se muestre el formulario de hacer un comentario cuando le de al botón de comment
  // ! Que salga el nombre del usuario que ha comentado

  const printCard = (message) => {
    return (
      <Card
        className="card-style"
        key={post._id}
        title={post.title}
        bordered={false}
      >
        <div className="post-container">
          <p>Descripción: {post.body}</p>
          <p>Likes: {post.likes?.length}</p>
        </div>
        <LikePost />
        <br />
        <div className="comments-container">
          Comments:
          {post.commentIds?.map((comment) => {
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
          <div>{message}</div>
          <button>Comment</button>
        </div>
      </Card>
    );
  };

  if (post.commentIds?.length === 0) {
    const message = "Todavía no hay ningún comentario ¡Se el primero!";
    return <>{printCard(message)}</>;
  }

  return (
    <>
      {printCard()}
      <div>
        <AddComment />
      </div>
    </>
  );
};

export default PostDetail;
