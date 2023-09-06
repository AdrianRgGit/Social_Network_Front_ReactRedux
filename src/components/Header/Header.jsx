import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../features/auth/authSlice";

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
        {user ? (
          <>
          <span onClick={onLogout}>Logout | </span>
          <span><Link to={"/profile"}>Profile | </Link></span>
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

        <Link to={"/"}>Home | </Link>
        <Link to={"/register"}>Register | </Link>
        <Link to={"/posts"}>Posts | </Link>
        <Link to={"/addpost"}>Add Post </Link>
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
    </nav>
  );
};

export default Header;
