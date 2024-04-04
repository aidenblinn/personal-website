import { createSlice } from "@reduxjs/toolkit";

const getTime = () => {
  const dateObject = new Date();

  const hour = dateObject.getHours();
  const minute = dateObject.getMinutes();

  const timeString =
    /* Hour */ (hour % 12 === 0 ? "12" : (hour % 12).toString()) +
    /* Colon */ ":" +
    /* Minute */ (minute < 10 ? "0" + minute.toString() : minute.toString()) +
    /* AM/PM */ (hour > 11 ? "PM" : "AM");

  return timeString;
};

const initialState: {
  muted: boolean;
  time: string;
  startMenuOpen: boolean;
} = {
  muted: false,
  time: getTime(),
  startMenuOpen: false,
};

export const utilityBarSlice = createSlice({
  name: "utilityBar",
  initialState,
  reducers: {
    toggleMute: (state) => {
      if (typeof window !== "undefined" && !window.Audio) {
        state.muted = true;
      } else {
        state.muted = !state.muted;
      }
    },
    updateTime: (state) => {
      state.time = getTime();
    },
    openStartMenu: (state) => {
      state.startMenuOpen = true;
    },
    closeStartMenu: (state) => {
      state.startMenuOpen = false;
    },
  },
});

export const { toggleMute, updateTime, openStartMenu, closeStartMenu } =
  utilityBarSlice.actions;

export default utilityBarSlice.reducer;
