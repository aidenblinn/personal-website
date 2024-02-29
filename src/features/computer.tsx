import { useAppSelector } from "../app/hooks.ts";
import Login from "./login/login.tsx";
import Desktop from "./desktop/desktop.tsx";

export default function Computer(): React.ReactElement {
  const loggedIn = useAppSelector((state) => state.login.loggedIn);
  return (
    <>
      {/* Login page disabled while under development */}
      {/* {!loggedIn && <Login />} */}
      <Desktop />
    </>
  );
}
