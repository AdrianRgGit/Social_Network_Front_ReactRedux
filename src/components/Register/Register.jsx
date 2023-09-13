import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register, reset } from "../../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
// import { Button } from "@chakra-ui/react";
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Button,
} from "@chakra-ui/react";

const Register = () => {
  const { isSuccess, isError, message } = useSelector((state) => state.auth);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    // Renderizar el Alert

    if (isSuccess) {
      setTimeout(() => {
        dispatch(reset());
        navigate("/login");
      }, 3000);
    }

    // Limpiar el mensaje de error después de mostrarlo
    if (isError) {
      setTimeout(() => {
        dispatch(reset());
      }, 3000);
    }
  }, [isSuccess, isError, message, navigate, dispatch]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (isError) {
      return; // Si isError es true, no envíes la solicitud
    }

    const formData = new FormData();
    try {
      if (event.target.avatar.files[0])
        formData.set("avatar", event.target.avatar.files[0]);
      formData.set("username", event.target.username.value);
      formData.set("email", event.target.email.value);
      formData.set("password", event.target.password.value);
      formData.set("password2", event.target.password2.value);

      await dispatch(register(formData));

      console.log("handle");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="alert-container">
        {isError && (
          <Alert status="error">
            <AlertIcon />
            <AlertTitle>Error registering user</AlertTitle>
            <AlertDescription>{message}</AlertDescription>
          </Alert>
        )}

        {isSuccess && (
          <Alert status="success">
            <AlertIcon />
            <AlertTitle>User registered successfully</AlertTitle>
            <AlertDescription>{message}</AlertDescription>
          </Alert>
        )}
      </div>

      <form className="form-updateUser" onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="username"
          // defaultValue={username}
          required
        />
        <input
          type="text"
          name="email"
          placeholder="email"
          // defaultValue={email}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="password"
          // defaultValue={email}
          required
        />
        <input
          type="password"
          name="password2"
          placeholder="Repeat your password"
          // defaultValue={email}
          required
        />
        <input type="file" name="avatar" id="file" className="input-avatar" />
        <label htmlFor="file" className="btn btn-tertiary js-labelFile">
          <i className="icon fa fa-check"></i>
          <span className="js-fileName">Choose a file</span>
        </label>
        <Button type="submit" variant="solid" colorScheme="blue">
          Register
        </Button>
      </form>
    </>
  );
};

export default Register;
