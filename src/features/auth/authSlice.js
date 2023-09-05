import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import authService from "./authService";

const initialState = {
  user: null,
  token: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
});

export const register = createAsyncThunk("auth/register", async (user) => {
  try {
    console.log("userSlice", user) //ver console y el redux devtools init/pending/fullfilled > state y active 
    //no guarda el estado de user?
    return await authService.register(user)
  } catch (error) {
    console.error(error)
  }
});

export default authSlice.reducer;
