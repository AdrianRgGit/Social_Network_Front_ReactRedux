import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import commentService from "./CommentService";

const initialState = {
  newComment: "",
  comment: "",
  comments: [],
};

export const getCommentById = createAsyncThunk(
  "comment/getCommentById",
  async (_id) => {
    try {
      return await commentService.getCommentById(_id);
    } catch (error) {
      console.error(error);
    }
  }
);

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

export const like = createAsyncThunk("comment/like", async (_id) => {
  try {
    return await commentService.like(_id);
  } catch (error) {
    console.error(error);
  }
});

export const dislike = createAsyncThunk("comment/dislike", async (_id) => {
  try {
    return await commentService.dislike(_id);
  } catch (error) {
    console.error(error);
  }
});

export const commentSlice = createSlice({
  name: "comment",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      // .addCase(getCommentById.fulfilled, (state, action) => {
      //   console.log(action.payload);
      //   state.comment = action.payload.comment;
      // })
      .addCase(createComment.fulfilled, (state, action) => {
        state.comment = action.payload.comment;
      });
  },
});

export default commentSlice.reducer;
