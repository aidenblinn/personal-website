"use client";
import { Provider } from "react-redux";
import store from "./store.ts";
import Computer from "../features/computer.tsx";

export default function Desktop() {
  return (
    <Provider store={store}>
      <Computer />
      {/* <SnakeGame initHeight={400} initWidth={400} /> */}
    </Provider>
  );
}
