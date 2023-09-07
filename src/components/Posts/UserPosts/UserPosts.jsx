import { Spin } from "antd";
import React from "react";
import { useSelector } from "react-redux";
import PrintPosts from "../PrintPosts/PrintPosts";

const UserPosts = () => {
  const { posts, isLoading } = useSelector((state) => state.posts);

  return (
    <div>
      <PrintPosts />
    </div>
  );
};

export default UserPosts;
