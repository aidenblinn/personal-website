import { useEffect, useState } from "react";
import { useAppSelector } from "../app/hooks.ts";
import Login from "./login/login.tsx";
import Desktop from "./desktop/desktop.tsx";

export default function Computer(): React.ReactElement {
  const loggedIn = useAppSelector((state) => state.login.loggedIn);
  const muted = useAppSelector((state) => state.utilityBar.muted);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    // Prevent login screen from flashing on page while page loading
    if (loggedIn !== undefined && loggedIn !== null) {
      setInitialized(true);
    }

    // Play login sound if computer unmuted
    if (loggedIn && !muted) {
      const loginSound = new Audio("sounds/startup.mp3");
      loginSound.play();
    }
  }, [loggedIn]);

  return (
    <>
      {initialized && loggedIn === false && <Login />}
      <Desktop />
    </>
  );
}
