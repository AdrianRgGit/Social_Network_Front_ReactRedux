import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../../../features/posts/postsSlice";
import { Card, Spin } from "antd";

const GetPosts = () => {
  const { posts } = useSelector((state) => state.posts);
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(getPosts());
  }, []);

  if (!posts) {
    return <Spin />;
  }
  console.log(posts)

  const allPosts = posts.map((post) => {
    return (
      <Card
        className="card-style"
        key={post._id}
        title={post.title}
        bordered={false}
      >
        <p>Descripción: {post.body}</p>
        <p>Likes: {post.likes.length}</p>
      </Card>
    );
  });
  return <div>{allPosts}</div>;
};

export default GetPosts;
