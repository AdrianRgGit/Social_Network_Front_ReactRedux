import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getById, reset } from "../../../features/posts/postsSlice";
import { Card, Spin } from "antd";
import AddComment from "../../Comments/AddComment/AddComment";

const PostDetail = () => {
  const { _id } = useParams();
  const { post, isLoading } = useSelector((state) => state.posts);

  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchData() {
      try {
        console.log(post.commentIds);
        dispatch(getById(_id));
        dispatch(reset());
      } catch (error) {
        console.error("hubo un problema");
      }
    }
    fetchData();
  }, []);

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
        <div className="comments-container">
          Comments:
          {post.commentIds?.map((comment) => {
            return (
              <div key={comment._id}>
                <div>Title: {comment.title}</div>
                <div>Body: {comment.body}</div>
                <br />
              </div>
            );
          })}
          <div>{message}</div>
        </div>
      </Card>
    );
  };

  // ! Aparece fuera de la card, arreglar
  if (post.commentIds?.length === 0) {
    const message = "Todavía no hay ningún comentario ¡Se el primero!";
    return <>{printCard(message)}</>;
  }

  return (
    <>
      {printCard()}
      <AddComment />
    </>
  );
};

export default PostDetail;
