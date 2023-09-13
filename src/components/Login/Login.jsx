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
import "./Login.scss";
import petsSperience from "../../assets/images/Petspierince1.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCamera,
  faFaceSmile,
  faMobile,
} from "@fortawesome/free-solid-svg-icons";

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
      <div className="father-container">
        <div className="info-container">
          <section className="text-container">
            <img className="logo" src={petsSperience} alt="" />
          </section>
          <section className="index-container">
            <div>
              <FontAwesomeIcon
                className="icon"
                icon={faCamera}
                style={{ color: "#ef6262" }}
              />
              <p>Take photos</p>
            </div>
            <div>
              <FontAwesomeIcon
                className="icon"
                icon={faMobile}
                style={{ color: "#ef6262" }}
              />
              <p>Share moments</p>
            </div>
            <div>
              <FontAwesomeIcon
                className="icon"
                icon={faFaceSmile}
                style={{ color: "#ef6262" }}
              />
              <p>Meet friends</p>
            </div>
          </section>
        </div>

        <div className="login-container">
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
            <p>Your email</p>
            <input
              type="email"
              name="email"
              value={email}
              placeholder="email"
              onChange={onChange}
              required
            />
            Your password
            <input
              type="password"
              name="password"
              value={password}
              placeholder="password"
              onChange={onChange}
              required
            />
            <button className="btn" type="submit">Login</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
