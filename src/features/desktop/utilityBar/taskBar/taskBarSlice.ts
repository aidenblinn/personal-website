import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: {
  programs: string[];
} = {
  programs: [],
};

export const taskBarSlice = createSlice({
  name: "taskBar",
  initialState,
  reducers: {
    addToTaskBar: (state, action: PayloadAction<string>) => {
      state.programs.push(action.payload);
    },
    removeFromTaskBar: (state, action: PayloadAction<string>) => {
      const programs = [...state.programs];
      state.programs = programs.filter((el) => el !== action.payload);
    },
    clearTaskBar: (state) => {
      state.programs = [];
    },
  },
});

export const { addToTaskBar, removeFromTaskBar, clearTaskBar } =
  taskBarSlice.actions;

export default taskBarSlice.reducer;
