import React from "react";
import GetPosts from "./GetPosts/GetPosts";
import AddPost from "./AddPost/AddPost";
import PostDetail from "./PostDetail/PostDetail";

const Posts = () => {
  return (
    <>
      <GetPosts />
      <AddPost />
      <PostDetail />
    </>
  );
};

export default Posts;
