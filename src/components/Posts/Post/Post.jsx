import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getPosts } from "../../../features/posts/postsSlice";
import { Card } from "antd";

const Post = () => {
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   getPosts();
  // }, []);

  return (
    <Card
      title="Card title"
      bordered={false}
      style={{
        width: 300,
      }}
    >
      <button onClick={getPosts()}></button>
    </Card>
  );
};

export default Post;
