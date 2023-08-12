import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: localStorage.getItem("accessToken") ? true : false,
  user: {},
};

export const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    deAuthenticate: (state) => {
      state.isLoggedIn = false;
      state.user = {};
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
    },
    authenticate: (state) => {
      state.isLoggedIn = true;
    },
    setUserData: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { deAuthenticate, authenticate, setUserData } = authSlice.actions;

export default authSlice.reducer;
