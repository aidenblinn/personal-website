import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: {
  modalHierarchy: string[];
} = {
  modalHierarchy: [],
};

export const programSlice = createSlice({
  name: "program",
  initialState,
  reducers: {
    bumpModalToTop: (state, action: PayloadAction<string>) => {
      const modals = [...state.modalHierarchy];
      state.modalHierarchy = modals
        .filter((el) => el !== action.payload)
        .concat([action.payload]);
    },
    addModalToDesktop: (state, action: PayloadAction<string>) => {
      state.modalHierarchy = [...state.modalHierarchy, action.payload];
    },
    removeModalFromDesktop: (state, action: PayloadAction<string>) => {
      const modals = [...state.modalHierarchy];
      state.modalHierarchy = modals.filter((el) => el !== action.payload);
    },
  },
});

export const { bumpModalToTop, addModalToDesktop, removeModalFromDesktop } =
  programSlice.actions;

export default programSlice.reducer;
