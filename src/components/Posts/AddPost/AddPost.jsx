import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createPost } from "../../../features/posts/postsSlice";
import { Link } from "react-router-dom";

const AddPost = () => {
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
    dispatch(createPost(formData));
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
        <input type="file" name="image" accept="image/*,video/*" />
        <Link to={"/posts"}>
          <button type="submit">Add</button>
        </Link>
      </form>
    </>
  );
};

export default AddPost;
