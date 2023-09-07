import React, { useEffect } from "react";
import AddComment from "./AddComment/AddComment";
import GetComments from "./AddComment/GetComments/GetComments";
import { Link } from "react-router-dom";
import { Card, Spin } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getPostsComments, reset } from "../../features/posts/postsSlice";

const Comments = () => {
  const { posts, isLoading } = useSelector((state) => state.posts);

  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchData() {
      try {
        await dispatch(getPostsComments());
        dispatch(reset());
      } catch (error) {
        console.error("hubo un problema");
      }
    }
    fetchData();
  }, []);
  if (isLoading) {
    return <Spin />;
  }

  const allPosts = posts.map((post) => {
    return (
      <>
        <Link key={post._id} to={"/postdetail/" + post._id}>
          {/* Me da el error de la key */}
          <Card className="card-style" title={post.title} bordered={false}>
            <p>Descripción: {post.body}</p>
            <p>Likes: {post.likes.length}</p>
            <div className="button-container">
              <button>Like</button>
              <button>Dislike</button>
              <button>Comment</button>
            </div>
          </Card>
        </Link>
      </>
    );
  });
  return <div>{allPosts}</div>;
};

export default Comments;
