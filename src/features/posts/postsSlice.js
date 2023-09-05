import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import authService from "./postsService";
import postsService from "./postsService";

const initialState = {
  // post: null,
};

export const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
});

export const getPosts = createAsyncThunk("posts/getposts", async (posts) => {
  try {
    return await postsService.getPosts(posts);
  } catch (error) {
    console.error(error);
  }
});


export default postsSlice.reducer;
