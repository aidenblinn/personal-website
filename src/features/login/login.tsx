import { useAppDispatch, useAppSelector } from "../../app/hooks.ts";
import { logIn } from "./loginSlice.tsx";
import { toggleMute } from "../desktop/utilityBar/tools/toolsSlice.ts";

export default function Login(): React.ReactElement {
  const dispatch = useAppDispatch();

  const muted = useAppSelector((state) => state.tools.muted);

  const handleLogin = () => {
    dispatch(logIn());
  };

  return (
    <main className="flex flex-col z-30 fixed top-0 left-0 w-screen h-dvh">
      <div className="h-16 md:h-24 w-full bg-[#00309C]" />
      <div className="flex flex-col md:flex-row items-center justify-end grow w-full bg-[#5A7EDC]">
        <div className="pb-4 md:pb-0 md:pr-4 md:w-1/2 md:text-right align-baseline">
          <h1 className="text-4xl text-white font-sans">Aiden Blinn</h1>
          <p className="text-white font-sans">To begin, click your user name</p>
        </div>
        <div className="fixed top-1/2 md:left-1/2 transform -translate-y-1/2 md:-translate-x-1/2 h-1 md:h-2/3 w-2/3 md:w-1 bg-gradient-to-r md:bg-gradient-to-b from-transparent via-white/25 to-transparent" />
        <div className="pt-4 md:pl-4 h-1/2 md:h-fit md:w-1/2 ">
          <div
            className="w-fit flex flex-col items-center md:items-start md:flex-row gap-2 p-2 rounded-md hover:bg-white/25"
            onClick={handleLogin}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleLogin();
              }
            }}
          >
            <img
              className="border-[1px] rounded-md border-white h-20"
              src="img/Profile.ico"
              alt="Guest user login"
            />
            <h1 className="text-white font-sans w-fit">Guest</h1>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center md:justify-end px-4 h-16 md:h-24 w-full bg-[#00309C]">
        {/* Toggle button adapted from the following source:
        https://flowbite.com/docs/forms/toggle/ */}
        <label className="inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            value=""
            className="sr-only peer"
            defaultChecked
          />
          <div
            className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"
            role="button"
            onClick={() => dispatch(toggleMute())}
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                dispatch(toggleMute());
              }
            }}
          ></div>
          <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
            {muted ? "Sounds OFF" : "Sounds ON"}
          </span>
        </label>
      </div>
    </main>
  );
}
