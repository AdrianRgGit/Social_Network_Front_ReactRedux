import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
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
        <Link to={"/login"}>Login | </Link>
        <Link to={"/register"}>Register | </Link>
        <Link to={"/posts"}>Posts | </Link>
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
