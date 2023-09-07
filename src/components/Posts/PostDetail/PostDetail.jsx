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
        dispatch(getById(_id));
        dispatch(reset());
      } catch (error) {
        console.error("hubo un problema");
      }
    }
    fetchData();
  }, []);

  return (
    <>
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
        </div>
      </Card>
      <AddComment />
    </>
  );
};

export default PostDetail;
