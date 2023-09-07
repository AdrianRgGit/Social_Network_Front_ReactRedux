import React from "react";
import GetPosts from "./GetPosts/GetPosts";
import AddPost from "./AddPost/AddPost";
import PostDetail from "./PostDetail/PostDetail";
import PrintPosts from "./GetPosts/PrintPosts/PrintPosts";
import UserPosts from "./UserPosts/UserPosts";

const Posts = () => {
  return (
    <>
      <GetPosts />
      <PrintPosts />
      <AddPost />
      <PostDetail />
      <UserPosts />
    </>
  );
};

export default Posts;
