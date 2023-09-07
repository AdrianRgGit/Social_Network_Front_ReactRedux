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
      <div  key={post._id}>
        <Link to={"/postdetail/" + post._id}>
          {/* Me da el error de la key > solucion meter key en el div */}
          <Card className="card-style" title={post.title} bordered={false}>
            <img alt="post-image" src={post.image_url}></img>
            <p>Descripción: {post.body}</p>
            <p>Likes: {post.likes.length}</p>
          </Card>
        </Link>
      </div>
    );
  });
  return <div>{allPosts}</div>;
};

export default PrintPosts;
