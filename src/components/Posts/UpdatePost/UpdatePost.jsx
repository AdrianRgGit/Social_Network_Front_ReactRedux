import { notification } from "antd";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updatePost } from "../../../features/posts/postsSlice";

const UpdatePost = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    body: "",
    image: null,
  });

  const { title, body, image } = formData;

  const onChange = (e) =>
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFormData((prevData) => ({
      ...prevData,
      image: selectedFile,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (title === "" || body === "" ) {
      return notification.error({
        message: "Rellene los campos y seleccione una imagen",
      });
    }

    const formDataToSend = new FormData();
    formDataToSend.append("title", title);
    formDataToSend.append("body", body);
    formDataToSend.append("image", image);

    try {
      await dispatch(updatePost(formDataToSend));
      notification.success({
        message: "Post creado con éxito",
      });
      navigate("/posts");
    } catch (error) {
      console.error("Error al crear el post:", error);
      notification.error({
        message: "Error al crear el post",
      });
    }
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
        <input
          type="file"
          name="image"
          accept="image/*,video/*"
          onChange={handleFileChange}
        />

        <button type="submit">Add</button>
      </form>
    </>
  );
};

export default UpdatePost;
