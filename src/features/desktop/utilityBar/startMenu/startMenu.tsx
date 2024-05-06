import { useAppSelector, useAppDispatch } from "@/app/hooks";
import { Audio } from "ts-audio";
import { openStartMenu, closeStartMenu } from "../utilityBarSlice";
import { useLogOutOfComputer } from "@/app/hooks";

export default function StartMenu(): React.ReactElement {
  const dispatch = useAppDispatch();
  const logOutOfComputer = useLogOutOfComputer();

  const startMenuOpen = useAppSelector(
    (state) => state.utilityBar.startMenuOpen
  );
  const muted = useAppSelector((state) => state.utilityBar.muted);

  const startMenuItems = [
    { name: "Next", url: "https://nextjs.org/" },
    { name: "React", url: "https://react.dev/" },
    { name: "Redux", url: "https://redux.js.org/" },
    { name: "Tailwind", url: "https://tailwindcss.com/" },
    { name: "Three.js", url: "https://threejs.org/" },
  ];

  const toggleStartMenu = (
    e: React.KeyboardEvent<HTMLDivElement> | React.MouseEvent<HTMLDivElement>
  ) => {
    if (startMenuOpen) {
      dispatch(closeStartMenu());
    } else {
      dispatch(openStartMenu());
    }
  };

  const handleMenuItemClick = (url: string) => {
    window.open(url, "_blank");
  };

  const handleLogOutClick = () => {
    if (!muted) {
      const logOutSound = Audio({ file: "sounds/shutdown.mp3" });
      logOutSound.play();
    }
    logOutOfComputer();
  };

  return (
    <>
      <div
        className={
          "fixed bottom-12 left-0 bg-white rounded-t-lg " +
          (startMenuOpen ? " visible" : " invisible")
        }
      >
        <div className="relative px-4 bg-gradient-to-b from-[#2B5FC1] to-[#548AE1] rounded-t-lg overflow-hidden">
          <div className="absolute z-[1] h-1 w-full top-0 bg-gradient-to-b from-white/50 rounded-t-lg" />
          <div className="flex items-center p-4 gap-2 ">
            <img
              className="h-12 border-[1px] rounded-md border-white"
              src="img/Profile.ico"
              alt="Guest user login"
            />
            <p className="text-white">Built With</p>
          </div>
        </div>
        <div className="relative bg-[#548AE1] p-[3px]">
          <div className="absolute z-[1] h-[2px] w-full top-[2px] bg-gradient-to-r from-transparent via-[#E69C51] to-transparent" />
          {startMenuItems.map(({ name, url }) => (
            <div
              className="flex items-center px-4 py-2 gap-2 bg-white hover:bg-[#94C5FE]"
              key={`${name}-program`}
              onClick={() => handleMenuItemClick(url)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleMenuItemClick(url);
                }
              }}
              role="button"
              tabIndex={0}
            >
              <img
                src={`img/startMenu/${name}.ico`}
                alt={`${name} start menu icon`}
                className="h-6"
              />
              <p className="">{name}</p>
            </div>
          ))}
        </div>
        <div className="flex justify-end items-center p-2 gap-2 bg-gradient-to-b from-[#548AE1] to-[#2B5FC1]">
          <div
            onClick={handleLogOutClick}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleLogOutClick();
              }
            }}
            role="button"
            tabIndex={0}
          >
            <img
              className="h-6 hover:brightness-125"
              src="img/desktop/LogOut.ico"
              alt="Log out"
            />
          </div>
          <p className="text-white text-xs">Log Out</p>
        </div>
        <div className="absolute z-[1] h-1 w-full bottom-0 bg-gradient-to-t from-black/50" />
      </div>
      <div
        className="relative flex items-center justify-center gap-2 w-fit h-full bg-green-500 hover:brightness-110 hover:cursor-xp-pointer rounded-r-lg"
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            toggleStartMenu(e);
          }
        }}
        onClick={toggleStartMenu}
        role="button"
        tabIndex={0}
      >
        <em className="pl-2 pr-4 text-white tracking-wide [text-shadow:_1px_3px_4px_rgb(0,0,0)]">
          start
        </em>
        <div className="absolute h-full w-2 right-0 gradient-border rounded-r-lg"></div>
      </div>
    </>
  );
}
