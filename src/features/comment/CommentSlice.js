import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import commentService from "./CommentService";

const initialState = {
  newComment: "",
};

export const createComment = createAsyncThunk(
  "comment/createComment",
  async (newComment) => {
    try {
      return await commentService.createComment(newComment);
    } catch (error) {
      console.error(error);
    }
  }
);

export const commentSlice = createSlice({
  name: "comment",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder;
  },
});

export default commentSlice.reducer;
