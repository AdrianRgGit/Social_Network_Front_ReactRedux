import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getPostsByName } from "../../features/posts/postsSlice";
import PrintPosts from "../Posts/PrintPosts/PrintPosts";

const Search = () => {
  const { title } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPostsByName(title));
  }, [title]);
  
  if (title == null) {
    return <div>{<PrintPosts />}</div>;
  }


  return <div>{<PrintPosts />}</div>;
};

export default Search;
