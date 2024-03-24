import { useState } from "react";

export default function StartMenu(): React.ReactElement {
  const [menuVisible, setMenuVisibility] = useState(false);

  const startMenuItems = [
    { name: "Next", url: "https://nextjs.org/" },
    { name: "React", url: "https://react.dev/" },
    { name: "Redux", url: "https://redux.js.org/" },
    { name: "Tailwind", url: "https://tailwindcss.com/" },
  ];

  const toggleStartMenu = () => setMenuVisibility(!menuVisible);

  const handleStartMenuClick = (url: string) => {
    window.open(url, "_blank");
  };

  return (
    <>
      <div
        className={
          "fixed bottom-12 left-0 bg-white rounded-t-lg border-[3px] border-[#026AFE]" +
          (menuVisible ? " visible" : " invisible")
        }
      >
        <div className="flex items-center p-1 gap-2 bg-[#026AFE]">
          <img
            className="h-12 border-[1px] rounded-md border-white"
            src="img/Profile.ico"
            alt="Guest user login"
          />
          <p className="text-white">Built With</p>
        </div>
        {startMenuItems.map(({ name, url }) => (
          <div
            className="flex items-center p-2 gap-2 hover:bg-[#026AFE]/25"
            key={`${name}-program`}
            onClick={() => handleStartMenuClick(url)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleStartMenuClick(url);
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
      <div
        className="relative flex items-center justify-center gap-2 w-fit h-full bg-green-500 hover:brightness-110 hover:cursor-xp-pointer rounded-r-lg"
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            toggleStartMenu;
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
