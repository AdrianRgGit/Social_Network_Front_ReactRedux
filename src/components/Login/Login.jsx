import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, reset } from "../../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { getUserConnected } from "../../features/posts/postsSlice";
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Button,
} from "@chakra-ui/react";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;
  const { isSuccess, isError, message } = useSelector((state) => state.auth);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    // Renderizar el Alert

    if (isSuccess) {
      setTimeout(() => {
        navigate("/profile");
      }, 1500);
    }

    // Limpiar el mensaje de error después de mostrarlo
    if (isError) {
      setTimeout(() => {
        dispatch(reset());
      }, 3000);
    }
  }, [isSuccess, isError, message, navigate, dispatch]);

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
    <>
      <div className="alert-container">
        {isError && (
          <Alert status="error">
            <AlertIcon />
            <AlertTitle>Error login user</AlertTitle>
            <AlertDescription>{message}</AlertDescription>
          </Alert>
        )}

        {isSuccess && (
          <Alert status="success">
            <AlertIcon />
            <AlertTitle>User logged successfully</AlertTitle>
            <AlertDescription>{message}</AlertDescription>
          </Alert>
        )}
      </div>

      <form onSubmit={onSubmit}>
        <input
          type="email"
          name="email"
          value={email}
          placeholder="email"
          onChange={onChange}
          required
        />
        <input
          type="password"
          name="password"
          value={password}
          placeholder="password"
          onChange={onChange}
          required
        />
        <button type="submit">Login</button>
      </form>
    </>
  );
};

export default Login;
