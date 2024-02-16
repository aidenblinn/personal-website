import { configureStore } from "@reduxjs/toolkit";
import taskBarReducer from "../features/utilityBar/taskBar/taskBarSlice";
import activeProgramReducer from "../features/activeProgramSlice";
import programsReducer from "../features/programs/programSlice";
import toolsReducer from "../features/utilityBar/tools/toolsSlice";

const store = configureStore({
  reducer: {
    taskBar: taskBarReducer,
    active: activeProgramReducer,
    programs: programsReducer,
    tools: toolsReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
