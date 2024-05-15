"use client";
import { Provider } from "react-redux";
import store from "./store.ts";
import Computer from "../features/computer.tsx";
import SnakeProgram from "@/features/desktop/programs/snake/index.tsx";

export default function Desktop() {
  return (
    <Provider store={store}>
      <SnakeProgram />
    </Provider>
  );
}
