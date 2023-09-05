import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPosts, reset } from "../../../features/posts/postsSlice";
import { Card, Spin } from "antd";

const GetPosts = () => {
  const { posts, isLoading } = useSelector((state) => state.posts);
  const dispatch = useDispatch();

  // Preguntar a sofia esta sintaxis y la que me recomienda vs
  useEffect(() => {
    async function fetchData() {
      try {
        await dispatch(getPosts());
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
