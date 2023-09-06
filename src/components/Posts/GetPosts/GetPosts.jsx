import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPosts, reset } from "../../../features/posts/postsSlice";
import { Card, Spin } from "antd";
import { Link } from "react-router-dom";
import PrintPosts from "./PrintPosts/PrintPosts";

// ! PINTAR LOS POSTS EN OTRO COMPONENTE, QUE ESTE SÓLO SEA PARA LLAMARLOS

const GetPosts = () => {
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

  return <PrintPosts />;
};

export default GetPosts;
