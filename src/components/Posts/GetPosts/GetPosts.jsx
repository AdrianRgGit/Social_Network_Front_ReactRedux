import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPosts, reset } from "../../../features/posts/postsSlice";
import PrintPosts from "../PrintPosts/PrintPosts";
import Login from "../../Login/Login";
import "./GetPosts.scss";

const GetPosts = () => {
  const [showLogin, setShowLogin] = useState(false);
  const { userConnected } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchData() {
      try {
        await dispatch(getPosts());
        dispatch(reset());
      } catch (error) {
        console.error("hubo un problema");
      }
    }
    fetchData();

    if (!userConnected) {
      const handleScroll = () => {
        if (window.scrollY > 600) {
          setShowLogin(true);
        } else {
          setShowLogin(false);
        }
      };

      window.addEventListener("scroll", handleScroll);

      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }
  }, []);

  return (
    <>
      {showLogin && (
        <div className="login-container-popup">
          <Login />
        </div>
      )}
      <PrintPosts />
    </>
  );
};

export default GetPosts;
