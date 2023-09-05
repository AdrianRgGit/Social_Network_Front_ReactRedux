import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import authService from "./postsService";
import postsService from "./postsService";

const initialState = {
  posts: [],
  isLoading: false,
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
  reducers: {
    reset: (state) => {
      state.isLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPosts.fulfilled, (state, action) => {
        state.posts = action.payload;
      })
      .addCase(getPosts.pending, (state) => {
        state.isLoading = true;
      });
  },
});

export const { reset } = postsSlice.actions;
export default postsSlice.reducer;
