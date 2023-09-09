import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getById, reset } from "../../../features/posts/postsSlice";
import { Card } from "antd";
import AddComment from "../../Comments/AddComment/AddComment";
import LikePost from "../LikePost/LikePost";
import LikeComment from "../../Comments/LikeComment/LikeComment";
import AddPost from "../AddPost/AddPost";
import UpdatePost from "../UpdatePost/UpdatePost";

// ! REUTILIZAR EL COMPONENTE DE POST DETAILS (DESESTRUCTURARLO) PARA PODER AHORRAR CÓDIGO AQUÍ

const ProfilePost = () => {
  const { _id } = useParams();
  const { post } = useSelector((state) => state.posts);

  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchData() {
      try {
        dispatch(getById(_id));
        dispatch(reset());
      } catch (error) {
        console.error("hubo un problema");
      }
    }
    fetchData();
  }, []);

  const printCard = () => {
    return (
      <>
        <Card
          className="card-style"
          key={post._id}
          title={post.title}
          bordered={false}
        >
          <div className="post-container">
            <p>Descripción: {post.body}</p>
            {post.image ? (
              <img alt="post-image" src={post.image}></img>
            ) : (
              <div></div>
            )}
            <p>Likes: {post.likes?.length}</p>
          </div>
          <br />
        </Card>
        <UpdatePost />
      </>
    );
  };

  if (post.commentIds?.length === 0) {
    const message = "Todavía no hay ningún comentario ¡Se el primero!";
    return <>{printCard(message)}</>;
  }

  return (
    <>
      {printCard()}
      <div>
        <AddComment />
      </div>
    </>
  );
};

export default ProfilePost;
