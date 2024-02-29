import { createSlice } from "@reduxjs/toolkit";

export const login = createSlice({
  name: "login",
  initialState: { loggedIn: false },
  reducers: {
    logIn: (state) => {
      state.loggedIn = true;
    },
    logOut: (state) => {
      state.loggedIn = false;
    },
  },
});

export const { logIn, logOut } = login.actions;

export default login.reducer;
