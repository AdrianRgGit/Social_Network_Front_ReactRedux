import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPosts, reset } from "../../../features/posts/postsSlice";
import { Card, Spin } from "antd";
import { Link } from "react-router-dom";
import PrintPosts from "../PrintPosts/PrintPosts";

const GetPosts = () => {
  const dispatch = useDispatch();

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

  return <PrintPosts />;
};

export default GetPosts;
