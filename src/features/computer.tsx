import { useEffect, useRef, useState } from "react";
import { useAppSelector } from "../app/hooks.ts";
import Login from "./login/login.tsx";
import Desktop from "./desktop/desktop.tsx";
import { Audio } from "ts-audio";

export default function Computer(): React.ReactElement {
  const loggedIn = useAppSelector((state) => state.login.loggedIn);
  const muted = useAppSelector((state) => state.utilityBar.muted);
  const mutedRef = useRef(muted);
  const [initialized, setInitialized] = useState(false);

  // Keep mutedRef in sync so the login effect always reads the latest value
  useEffect(() => {
    mutedRef.current = muted;
  }, [muted]);

  useEffect(() => {
    // Prevent login screen from flashing on page while page loading
    if (loggedIn !== undefined && loggedIn !== null) {
      setInitialized(true);
    }

    // Play login sound if computer unmuted
    if (loggedIn && !mutedRef.current) {
      const loginSound = Audio({ file: "sounds/startup.mp3" });
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
