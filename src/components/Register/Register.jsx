import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { register } from "../../features/auth/authSlice";
import { notification } from "antd";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    password2: "",
  });

  const { username, email, password, password2 } = formData;

  const dispatch = useDispatch()

  const onChange = (e) =>
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));

  const onSubmit = (e) => {
    e.preventDefault();
    if (password != password2) {
      return notification.error({
        message: "Error",
        description: "Password do not match",
      })
      
    } else {
      return dispatch(register(formData))
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <input
        type="text"
        name="username"
        value={username}
        placeholder="username"
        onChange={onChange}
      />
      <input
        type="email"
        name="email"
        value={email}
        placeholder="email"
        onChange={onChange}
      />
      <input
        type="password"
        name="password"
        value={password}
        placeholder="password"
        onChange={onChange}
      />
      <input
        type="password"
        name="password2"
        value={password2}
        placeholder="repeat password"
        onChange={onChange}
      />
      <button type="submit">Register</button>
    </form>
  );
};

export default Register;
