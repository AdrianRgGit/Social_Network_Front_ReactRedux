import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import postsService from "./postsService";

const initialState = {
  posts: [],
  isLoading: false,
  post: {},
  newPost: null,
  token: null,
};

export const getPosts = createAsyncThunk("posts/getPosts", async () => {
  try {
    return await postsService.getPosts();
  } catch (error) {
    console.error(error);
  }
});

export const getPostsComments = createAsyncThunk(
  "posts/getPostsComments",
  async () => {
    try {
      return await postsService.getPostsComments();
    } catch (error) {
      console.error(error);
    }
  }
);

export const getById = createAsyncThunk("posts/getById", async (_id) => {
  try {
    return await postsService.getById(_id);
  } catch (error) {
    console.error(error);
  }
});

export const getPostsByName = createAsyncThunk(
  "posts/getPostsByName",
  async (title) => {
    try {
      return await postsService.getPostsByName(title);
    } catch (error) {
      console.error(error);
    }
  }
);

export const getUserConnected = createAsyncThunk(
  "posts/getUserConnected",
  async () => {
    try {
      return await postsService.getUserConnected();
    } catch (error) {
      console.error(error);
    }
  }
);

export const createPost = createAsyncThunk(
  "posts/createPost",
  async (newPost) => {
    try {
      return await postsService.createPost(newPost);
    } catch (error) {
      console.error(error);
    }
  }
);

export const updatePost = createAsyncThunk(
  "posts/updatePost",
  async (obj) => {
    try {
      console.log(obj);
      return await postsService.updatePost(obj);
    } catch (error) {
      console.error(error);
    }
  }
);

export const like = createAsyncThunk("posts/like", async (_id) => {
  try {
    return await postsService.like(_id);
  } catch (error) {
    console.error(error);
  }
});

export const dislike = createAsyncThunk("posts/dislike", async (_id) => {
  try {
    return await postsService.dislike(_id);
  } catch (error) {
    console.error(error);
  }
});

export const deletePost = createAsyncThunk("posts/delete", async (_id) => {
  try {
    return await postsService.deletePost(_id);
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
      })
      .addCase(getPostsComments.fulfilled, (state, action) => {
        state.posts = action.payload;
      })
      .addCase(getPostsComments.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getById.fulfilled, (state, action) => {
        state.post = action.payload;
      })
      .addCase(getById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getPostsByName.fulfilled, (state, action) => {
        state.posts = action.payload;
      })
      .addCase(getUserConnected.fulfilled, (state, action) => {
        state.posts = action.payload;
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        state.updatePost = action.payload;
      })
      .addCase(like.fulfilled, (state, action) => {
        state.post = {
          ...action.payload,
          commentIds: state.post.commentIds,
          userId: state.post.userId,
        };
      })
      .addCase(dislike.fulfilled, (state, action) => {
        state.post = {
          ...action.payload,
          commentIds: state.post.commentIds,
          userId: state.post.userId,
        };
      });
  },
});

export const { reset } = postsSlice.actions;
export default postsSlice.reducer;
