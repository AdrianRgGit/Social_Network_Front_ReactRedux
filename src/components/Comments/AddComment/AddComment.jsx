import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createComment } from "../../../features/comment/CommentSlice";
import { useNavigate, useParams } from "react-router-dom";
import { notification } from "antd";
import { Button, FormControl, Input, Textarea } from "@chakra-ui/react";
import "./AddComment.scss";

const AddComment = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { _id } = useParams();

  const [formData, setFormData] = useState({
    title: "",
    body: "",
    postId: _id,
  });

  const { title, body } = formData;
  const [resize] = React.useState("horizontal");

  const onChange = (e) =>
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));

  const onSubmit = (e) => {
    e.preventDefault();
    if (title == "" || body == "") {
      return notification.error({
        message: "Error",
        description: "Rellene los campos",
      });
    }
    notification.success({
      message: "Comentario creado con éxito",
    });
    dispatch(createComment(formData));
    setFormData({ title: "", body: "" });

    setTimeout(navigate("/"), 1000);
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        <FormControl className="comment-title-container">
          <Input
            type="text"
            name="title"
            placeholder="Title"
            onChange={onChange}
          />
        </FormControl>

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
    </>
  );
};

export default AddComment;
