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
      modals.filter((el) => el !== action.payload).concat([action.payload]);
      state.modalHierarchy = modals;
    },
    addModal: (state, action: PayloadAction<string>) => {
      state.modalHierarchy = [...state.modalHierarchy, action.payload];
    },
    removeModal: (state, action: PayloadAction<string>) => {
      const modals = [...state.modalHierarchy];
      modals.filter((el) => el !== action.payload);
      state.modalHierarchy = modals;
    },
  },
});

export const { bumpModalToTop, addModal, removeModal } = programSlice.actions;

export default programSlice.reducer;
