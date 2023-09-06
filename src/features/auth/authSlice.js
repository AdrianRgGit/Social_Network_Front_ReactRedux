import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import authService from "./authService";

const user = JSON.parse(localStorage.getItem("user")) || null;
const token = JSON.parse(localStorage.getItem("token")) || null;

const initialState = {
  user: user,
  token: token,
  isError: false,
  message: "",
  isLoading: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.message = "";
      state.isLoading = false;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(register.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.message = action.payload.message;
      })
      .addCase(register.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(login.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.token = null;
      })
      .addCase(getUserLogged.pending, (state) => {
        console.log("pending Logged")
        state.isLoading = true;
      })
      .addCase(getUserLogged.fulfilled, (state, action) => {
        console.log("fulfilled Logged")
        state.user = action.payload;
        state.isLoading = false;
         console.log("action", action.payload)
        console.log(state.user)
      })
      .addCase(getUserLogged.rejected, (state, action) => {
        console.log("rejected Logged")
        state.isError = true;
        state.message = "error getUserLogged";
      })
  },
});

export const { reset } = authSlice.actions;

export const register = createAsyncThunk(
  "auth/register",
  async (user, thunkAPI) => {
    try {
      return await authService.register(user);
    } catch (error) {
      const message = error.response.data.msg;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const login = createAsyncThunk("auth/login", async (user, thunkAPI) => {
  try {
    return await authService.login(user);
  } catch (error) {
    console.error("login slice error", error.response.data.message);
    const message = error.response.data.message;
    return thunkAPI.rejectWithValue(message);
  }
});

export const logout = createAsyncThunk("auth/logout", async () => {
  try {
    return await authService.logout();
  } catch (error) {
    console.error(error);
  }
});

export const getUserLogged = createAsyncThunk(
  "auth/getUserLogged",
  async () => {
    try {
      return await authService.getUserLogged();
    } catch (error) {
      console.error(error);
    }
  }
);

export default authSlice.reducer;
