import { useEffect } from "react";
import { useAppSelector } from "../app/hooks.ts";
import Login from "./login/login.tsx";
import Desktop from "./desktop/desktop.tsx";

export default function Computer(): React.ReactElement {
  const loggedIn = useAppSelector((state) => state.login.loggedIn);
  const muted = useAppSelector((state) => state.tools.muted);

  useEffect(() => {
    if (loggedIn && !muted) {
      const loginSound = new Audio("sounds/startup.mp3");
      loginSound.play();
    }
  }, [loggedIn]);

  return (
    <>
      {/* Login page disabled while under development */}
      {!loggedIn && <Login />}
      <Desktop />
    </>
  );
}
