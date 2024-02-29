import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: { activeProgram: string | null } = {
  activeProgram: null,
};

export const activeProgram = createSlice({
  name: "active",
  initialState,
  reducers: {
    changeActiveProgram: (state, action: PayloadAction<string | null>) => {
      state.activeProgram = action.payload;
    },
  },
});

export const { changeActiveProgram } = activeProgram.actions;

export default activeProgram.reducer;
