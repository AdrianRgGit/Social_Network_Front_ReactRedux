import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createComment } from "../../../features/comment/CommentSlice";

const AddComment = () => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    title: "",
    body: "",
    image: "",
  });

  const { title, body, image } = formData;

  const onChange = (e) =>
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(createComment(formData));
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
