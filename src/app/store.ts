import { configureStore } from "@reduxjs/toolkit";
import taskBarReducer from "../features/desktop/utilityBar/taskBar/taskBarSlice";
import activeProgramReducer from "../features/desktop/activeProgramSlice";
import programsReducer from "../features/desktop/programs/programSlice";
import toolsReducer from "../features/desktop/utilityBar/tools/toolsSlice";
import loginReducer from "../features/login/loginSlice";

const store = configureStore({
  reducer: {
    taskBar: taskBarReducer,
    active: activeProgramReducer,
    programs: programsReducer,
    tools: toolsReducer,
    login: loginReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
