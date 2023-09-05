import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getById, reset } from "../../../features/posts/postsSlice";
import { Card, Spin } from "antd";

const PostDetail = () => {
  const { _id } = useParams();
  const { post, isLoading } = useSelector((state) => state.posts);
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchData() {
      try {
        await dispatch(getById(_id));
        dispatch(reset());
      } catch (error) {
        console.error("hubo un problema");
      }
    }
    fetchData();
  }, []);

  //   Está fallando a la hora de cargar, el return entra antes que se haga la petición, preguntar a sofia
  if (isLoading) {
    return <Spin />;
  }
  
  // De momento lo soluciono así, pero quiero utilizar el isLoading ya que está hecho
  if (!post) {
    return <Spin />;
  }

  return (
    <>
      <Card
        className="card-style"
        key={post._id}
        title={post.title}
        bordered={false}
      >
        <p>Descripción: {post.body}</p>
        <p>Likes: {post.likes.length}</p>
      </Card>
    </>
  );
};

export default PostDetail;
