import { createSlice } from "@reduxjs/toolkit";

/** Check local storage for recent login */
const getLoginStatus = () => {
  if (typeof window !== "undefined" && window.localStorage) {
    const loginTime = JSON.parse(localStorage.getItem("lastLogin") || "null");
    if (!loginTime) {
      // If no previous login stored, stay logged out
      return false;
    } else {
      // If less than a day has elapsed since last login, stay logged in
      return new Date().getTime() - loginTime < 86400000;
    }
  } else {
    // Do not check local storage during server-side rendering
    return false;
  }
};

const initialState = { loggedIn: getLoginStatus() };

export const login = createSlice({
  name: "login",
  initialState,
  reducers: {
    logIn: (state) => {
      state.loggedIn = true;
      // Store recent login time in local storage for subsequent page loads
      if (typeof window !== "undefined" && window.localStorage) {
        localStorage.setItem("lastLogin", JSON.stringify(new Date().getTime()));
      }
    },
    logOut: (state) => {
      state.loggedIn = false;
    },
  },
});

export const { logIn, logOut } = login.actions;

export default login.reducer;
