import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createComment } from "../../../features/comment/CommentSlice";
import { useParams } from "react-router-dom";
import { notification } from "antd";
// import { getById } from "../../../features/posts/postsSlice";

const AddComment = () => {
  const dispatch = useDispatch();
  const { _id } = useParams();

  const [formData, setFormData] = useState({
    title: "",
    body: "",
    image: "",
    postId: _id,
  });

  const { title, body, image } = formData;

  const onChange = (e) =>
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));

  const onSubmit = (e) => {
    e.preventDefault();
    if (title == "" || body == "") {
      notification.error({
        message: "Error",
        description: "Rellene los campos",
      });
    }
    notification.success({
      message: "Comentario creado con éxito",
    });
    dispatch(createComment(formData));
    setFormData({ title: "", body: "", image: "" });
    // ! Preguntar a sofía la manera que había para actualizar esto sin tener que hacer otra petición
    // ! Sólo puedes comentar una vez por post sin refrescar la página
    // dispatch(getById(_id));
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          name="title"
          value={title}
          placeholder="title"
          onChange={onChange}
        />
        <input
          type="text"
          name="body"
          value={body}
          placeholder="body"
          onChange={onChange}
        />
        <button type="submit">Add</button>
      </form>
    </>
  );
};

export default AddComment;
