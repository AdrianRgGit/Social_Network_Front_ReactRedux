import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register, reset } from "../../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";
import "./Register.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAt,
  faCamera,
  faFaceSmile,
  faLock,
  faMobile,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import petsSperience from "../../assets/images/Petspierince1.png";

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
            <form className="form" onSubmit={handleSubmit}>
              <p id="heading">Register</p>
              <div className="field">
                <FontAwesomeIcon icon={faUser} style={{ color: "#3c5b90" }} />
                <input
                  className="input-field"
                  type="text"
                  name="username"
                  placeholder="username"
                  required
                />
              </div>
              <div className="field">
                <FontAwesomeIcon icon={faAt} style={{ color: "#3c5b90" }} />
                <input
                  className="input-field"
                  type="email"
                  name="email"
                  placeholder="email"
                  required
                />
              </div>
              <div className="field">
                <FontAwesomeIcon icon={faLock} style={{ color: "#3c5b90" }} />
                <input
                  className="input-field"
                  type="password"
                  name="password"
                  placeholder="password"
                  required
                />
              </div>
              <div className="field">
                <FontAwesomeIcon icon={faLock} style={{ color: "#3c5b90" }} />
                <input
                  className="input-field"
                  type="password"
                  name="password2"
                  placeholder="Repeat your password"
                  required
                />
              </div>
              <input
                type="file"
                name="avatar"
                id="file"
                className="input-avatar"
              />
              <div className="container-btn">
                <button className="button1" type="submit">
                  Register
                </button>
                <button
                  className="button2"
                  onClick={() => {
                    setTimeout(() => {
                      navigate("/login");
                    }, 200);
                  }}
                >
                  Go to Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

    </>
  );
};

export default Register;
