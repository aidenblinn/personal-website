import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { useCallback } from "react";
import type { RootState, AppDispatch } from "./store";
import { changeActiveProgram } from "../features/activeProgramSlice";
import { bumpModalToTop } from "../features/programs/programSlice";

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

/** Focus program modal when modal or task bar clicked */
export const useFocusModal = () => {
  const dispatch = useAppDispatch();

  const focusModal = useCallback(
    (name: string) => {
      // Dispatch action to bump modal to the top
      dispatch(bumpModalToTop(name));
      // Dispatch action to set clicked program as active
      dispatch(changeActiveProgram(name));
    },
    [dispatch]
  );

  return focusModal;
};
