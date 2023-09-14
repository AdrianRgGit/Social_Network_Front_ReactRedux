import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import authService from "./authService";

const token = JSON.parse(localStorage.getItem("token")) || null;
const userConnected = JSON.parse(localStorage.getItem("userConnected")) || null;

const initialState = {
  token: token,
  isError: false,
  message: "",
  isLoading: false,
  userConnected: userConnected,
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
        state.token = action.payload.token;
        state.userConnected = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(logout.fulfilled, (state) => {
        state.token = null;
        state.userConnected = null;
      })
      .addCase(getUserConnected.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserConnected.fulfilled, (state, action) => {
        state.userConnected = action.payload;
        state.isLoading = false;
      })
      .addCase(getUserConnected.rejected, (state) => {
        state.isError = true;
        state.message = "error getUserConnected";
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.userConnected = action.payload;
      })
      .addCase(updateUser.rejected, (state) => {
        state.isError = true;
        state.message = "error updateUser";
      });
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

export const getUserConnected = createAsyncThunk(
  "auth/getUserConnected",
  async () => {
    try {
      return await authService.getUserConnected();
    } catch (error) {
      console.error(error);
    }
  }
);

export const getUserById = createAsyncThunk("auth/getUserById", async (_id) => {
  try {
    return await authService.getUserById(_id);
  } catch (error) {
    console.error(error);
  }
});

export const updateUser = createAsyncThunk(
  "auth/updateUser",
  async (userData) => {
    try {
      const res = await authService.updateUser(userData);
      return res;
    } catch (error) {
      console.error(error);
    }
  }
);

export default authSlice.reducer;
