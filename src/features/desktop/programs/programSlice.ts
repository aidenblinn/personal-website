import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: {
  modalHierarchy: string[];
  activeProgram: string | null;
} = {
  modalHierarchy: [],
  activeProgram: null,
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
    clearModals: (state) => {
      state.modalHierarchy = [];
    },
    changeActiveProgram: (state, action: PayloadAction<string | null>) => {
      state.activeProgram = action.payload;
    },
  },
});

export const {
  bumpModalToTop,
  addModalToDesktop,
  removeModalFromDesktop,
  clearModals,
  changeActiveProgram,
} = programSlice.actions;

export default programSlice.reducer;
