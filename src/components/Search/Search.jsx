import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getPostsByName } from "../../features/posts/postsSlice";
import GetPosts from "../Posts/GetPosts/GetPosts";

const Search = () => {
  const { postTitle } = useParams();
  const dispatch = useDispatch();

  //   Me sale undefined
  useEffect(() => {
    console.log(postTitle);
    dispatch(getPostsByName(postTitle));
  }, [postTitle]);

  return <div>{/* <GetPosts /> */}</div>;
};

export default Search;
