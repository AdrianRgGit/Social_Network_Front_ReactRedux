import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createPost } from "../../../features/posts/postsSlice";
import { useNavigate } from "react-router-dom";
import { notification } from "antd";
import "./AddPost.scss"
import {
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Text,
  Textarea,
} from "@chakra-ui/react";

const AddPost = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    body: "",
    image: null,
  });
  const [resize] = React.useState("horizontal");

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

    if (selectedFile) {
      const reader = new FileReader();

      reader.onload = (event) => {
        const imgPreview = document.getElementById("imagePreview");
        imgPreview.src = event.target.result;
        imgPreview.style.display = "block";
      };

      reader.readAsDataURL(selectedFile);
    } else {
      const imgPreview = document.getElementById("imagePreview");
      imgPreview.style.display = "none";
      imgPreview.src = "";
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (title === "" || body === "" || !image) {
      return notification.error({
        message: "Rellene los campos y seleccione una imagen",
      });
    }

    const formDataToSend = new FormData();
    formDataToSend.append("title", title);
    formDataToSend.append("body", body);
    formDataToSend.append("image", image);

    try {
      await dispatch(createPost(formDataToSend));
      notification.success({
        message: "Post creado con éxito",
      });
      navigate("/profile");
    } catch (error) {
      console.error("Error al crear el post:", error);
      notification.error({
        message: "Error al crear el post",
      });
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={onSubmit} className="form">
        <FormControl className="form-title-container">
          <Input
            type="text"
            name="title"
            placeholder="Title"
            onChange={onChange}
          />
        </FormControl>

        <div className="img-form-container">
          <FormControl className="input-file-container">
            <Input
              type="file"
              name="image"
              accept="image/*,video/*"
              onChange={handleFileChange}
            />
          </FormControl>
          <img
            id="imagePreview"
            className="img-preview-container"
            src=""
            alt="Vista previa de la imagen"
            style={{ display: "none", maxWidth: "300px", maxHeight: "300px" }}
          />
        </div>

        <Textarea
          name="body"
          placeholder="Comment"
          size="sm"
          resize={resize}
          onChange={onChange}
        />

        <Button mt={4} colorScheme="teal" type="submit">
          Submit
        </Button>
      </form>
    </div>
  );
};

export default AddPost;
