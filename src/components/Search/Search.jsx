import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getPostsByName } from "../../features/posts/postsSlice";
import GetPosts from "../Posts/GetPosts/GetPosts";

const Search = () => {
  const { title } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPostsByName(title));
  }, [title]);

  return <div>{<GetPosts />}</div>;
};

export default Search;
