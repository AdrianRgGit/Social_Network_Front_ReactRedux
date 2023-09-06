import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, reset } from "../../features/auth/authSlice";
import { notification } from "antd";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;
  const {isSuccess, isError, message } = useSelector((state) => state.auth);
  
  const dispatch = useDispatch();
  const navigate = useNavigate()

  useEffect(() => {
    if (isSuccess) {
      notification.success({
        message: "Login Success",
        description: message,
      });
      
      //navigate no funciona, no redirige a profile;
        setTimeout(() => {
        navigate("/profile");
      }, 3000);
    }
    if (isError) {
      notification.error({
        message: "Login Error",
        description: message,
      });
    
    }
    //revisar reset, funciona? siempre está en redux devtools
    dispatch(reset())
  }, [isSuccess, isError, message]);

 

  const onChange = (e) =>
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(login(formData));
  };

  return (
    <form onSubmit={onSubmit}>
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
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
