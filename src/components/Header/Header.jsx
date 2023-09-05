import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <nav>
      <Link to={"/"}>Home | </Link>
      <Link to={"/Register"}>Register | </Link>
      <Link to={"/posts"}>Posts</Link>
    </nav>
  );
};

export default Header;
