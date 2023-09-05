import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import authService from "./postsService";
import postsService from "./postsService";

const initialState = {
  posts: [],
};

export const getPosts = createAsyncThunk("posts/getPosts", async () => {
  try {
    return await postsService.getPosts();
  } catch (error) {
    console.error(error);
  }
});

export const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getPosts.fulfilled, (state, action) => {
      state.posts = action.payload;
    });
  },
});

export default postsSlice.reducer;
