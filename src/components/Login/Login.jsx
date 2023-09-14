import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, reset } from "../../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";
import "./Login.scss";
import petsSperience from "../../assets/images/Petspierince1.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAt,
  faCamera,
  faFaceSmile,
  faLock,
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

      <div className="container-login">
        <div className="card-login">
          <div className="container-icons-left">
            <section className="container-logo">
              <img src={petsSperience} alt="Logo Petsperience" />
            </section>
            <section className="container-index">
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
          <div className="form-data">
            <form className="form" onSubmit={onSubmit}>
              <p id="heading">Login</p>
              <div className="field">
                <FontAwesomeIcon icon={faAt} style={{ color: "#3c5b90" }} />
                <input
                  className="input-field"
                  type="email"
                  name="email"
                  value={email}
                  placeholder="email"
                  onChange={onChange}
                  required
                />
              </div>
              <div className="field">
                <FontAwesomeIcon icon={faLock} style={{ color: "#3c5b90" }} />
                <input
                  className="input-field"
                  type="password"
                  name="password"
                  value={password}
                  placeholder="password"
                  onChange={onChange}
                  required
                />
              </div>
              <div className="container-btn">
                <button className="button1" type="submit">
                  Login
                </button>
                <button
                  className="button2"
                  onClick={() => {
                    setTimeout(() => {
                      navigate("/register");
                    }, 200);
                  }}
                >
                  Sign Up
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
