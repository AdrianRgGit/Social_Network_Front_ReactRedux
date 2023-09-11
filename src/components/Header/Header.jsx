import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../features/auth/authSlice";
import BtnTop from "../BtnTop/BtnTop";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);

  const onLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
    navigate("/login");
  };

  const { posts } = useSelector((state) => state.posts);

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
        <input
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
