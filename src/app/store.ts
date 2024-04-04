import { configureStore } from "@reduxjs/toolkit";
import taskBarReducer from "../features/desktop/utilityBar/taskBar/taskBarSlice";
import activeProgramReducer from "../features/desktop/activeProgramSlice";
import programsReducer from "../features/desktop/programs/programSlice";
import utilityBarReducer from "../features/desktop/utilityBar/utilityBarSlice";
import loginReducer from "../features/login/loginSlice";

const store = configureStore({
  reducer: {
    taskBar: taskBarReducer,
    active: activeProgramReducer,
    programs: programsReducer,
    utilityBar: utilityBarReducer,
    login: loginReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
