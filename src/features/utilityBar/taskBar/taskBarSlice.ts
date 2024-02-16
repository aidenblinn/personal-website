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
    addProgram: (state, action: PayloadAction<string>) => {
      state.programs.push(action.payload);
    },
    removeProgram: (state, action: PayloadAction<string>) => {
      state.programs.filter((el) => el !== action.payload);
    },
  },
});

export const { addProgram, removeProgram } = taskBarSlice.actions;

export default taskBarSlice.reducer;
