import React from "react";
import GetPosts from "./GetPosts/GetPosts";
import AddPost from "./AddPost/AddPost";
import PostDetail from "./PostDetail/PostDetail";
import PrintPosts from "./GetPosts/PrintPosts/PrintPosts";
import UpdatePost from "./UpdatePost/UpdatePost";

const Posts = () => {
  return (
    <>
      <GetPosts />
      <PrintPosts />
      <AddPost />
      <PostDetail />
      <UpdatePost />
    </>
  );
};

export default Posts;
