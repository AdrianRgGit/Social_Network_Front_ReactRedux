import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../features/auth/authSlice";
import BtnTop from "../BtnTop/BtnTop";
import "./Header.scss";
import { getPosts } from "../../features/posts/postsSlice";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);

  const onLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
    navigate("/login");
  };

  const [text, setText] = useState("");

  const handleChange = (e) => {
    setText(e.target.value);

    if (e.key === "Enter") {
      navigate("/search/" + text);
    }
  };

  return (
    <nav className="nav-container">
      <div className="links-container">
        <Link to={"/"}>Home | </Link>
        {user ? (
          <>
            <span onClick={onLogout}>Logout | </span>
            <span>
              <Link to={`/profile`}>Profile | </Link>
            </span>
            <span>
              <Link to={"/addpost"}>Add Post </Link>
            </span>
          </>
        ) : (
          <>
            <span>
              <Link to={"/login"}>Login | </Link>
            </span>
            <span>
              <Link to={"/register"}>Register | </Link>
            </span>
          </>
        )}
      </div>
      <div className="search-container">
        <svg className="icon" aria-hidden="true" viewBox="0 0 24 24">
          <g>
            <path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path>
          </g>
        </svg>
        <input
          className="search"
          // onClick={}
          type="text"
          onKeyUp={handleChange}
          placeholder="Search"
          name="text"
        />
      </div>
      <BtnTop />
    </nav>
  );
};

export default Header;
