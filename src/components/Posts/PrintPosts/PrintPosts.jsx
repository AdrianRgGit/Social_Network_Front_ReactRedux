import { Card, Spin } from "antd";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import LikePost from "../LikePost/LikePost";

const PrintPosts = () => {
  const { posts, isLoading } = useSelector((state) => state.posts);

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
          </Card>
        </Link>
        
      </>
    );
  });
  return <div>{allPosts}</div>;
};

export default PrintPosts;
