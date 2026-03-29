import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { useCallback } from "react";
import type { RootState, AppDispatch } from "./store";
import {
  bumpModalToTop,
  addModalToDesktop,
  removeModalFromDesktop,
  clearModals,
  changeActiveProgram,
} from "../features/desktop/programs/programSlice";
import { logOut } from "@/features/login/loginSlice";
import {
  addToTaskBar,
  removeFromTaskBar,
  clearTaskBar,
} from "@/features/desktop/utilityBar/taskBar/taskBarSlice";
import { closeStartMenu } from "@/features/desktop/utilityBar/utilityBarSlice";

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

/** Open a program: adds to task bar, adds modal to desktop, sets as active */
export const useOpenProgram = () => {
  const dispatch = useAppDispatch();
  return useCallback(
    (name: string) => {
      dispatch(addToTaskBar(name));
      dispatch(addModalToDesktop(name));
      dispatch(changeActiveProgram(name));
    },
    [dispatch]
  );
};

/** Close a program: removes from task bar and desktop */
export const useCloseProgram = () => {
  const dispatch = useAppDispatch();
  return useCallback(
    (name: string) => {
      dispatch(removeFromTaskBar(name));
      dispatch(removeModalFromDesktop(name));
    },
    [dispatch]
  );
};

/** Reset desktop when computer logged out */
export const useLogOutOfComputer = () => {
  const dispatch = useAppDispatch();

  const logOutOfComputer = useCallback(() => {
    dispatch(logOut());
    dispatch(clearTaskBar());
    dispatch(clearModals());
    dispatch(closeStartMenu());
  }, [dispatch]);

  return logOutOfComputer;
};
