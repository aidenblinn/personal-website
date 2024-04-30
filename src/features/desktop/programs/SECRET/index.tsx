import React, { useEffect, useState } from "react";
import { Audio } from "ts-audio";
import { useAppSelector } from "@/app/hooks";
import { useLogOutOfComputer } from "@/app/hooks";

export default function Secret() {
  const [currentFolder, setFolder] = useState<number>(0);
  const muted = useAppSelector((state) => state.utilityBar.muted);

  const logOutOfComputer = useLogOutOfComputer();

  const shutDownComputer = () => {
    if (!muted) {
      const logOutSound = Audio({ file: "sounds/shutdown.mp3" });
      logOutSound.play();
    }
    logOutOfComputer();
  };

  const folderHierarchy = [
    { name: "SECRET" },
    { name: "KEEP OUT" },
    {
      name: "IM NOT KIDDING!!",
      contents: [
        {
          name: "nuclear_launch_codes.txt",
          onClick: shutDownComputer,
          iconImage: "img/SECRET/SecretFile.ico",
        },
      ],
    },
  ];

  useEffect(() => {
    const titlebarName = document.getElementById("SECRET-titlebar-name");
    if (titlebarName !== null) {
      titlebarName.innerText = folderHierarchy[currentFolder].name;
    }
  }, [currentFolder]);

  const handleIconClick = (direction: string, onClick?: () => void) => {
    if (onClick !== undefined) {
      return onClick();
    }

    if (
      direction === "forward" &&
      currentFolder !== folderHierarchy.length - 1
    ) {
      setFolder(currentFolder + 1);
    } else if (direction === "back" && currentFolder !== 0) {
      setFolder(currentFolder - 1);
    }
  };

  /** Build contents of currently seleced folder */

  const folderContents = [];

  if (folderHierarchy[currentFolder + 1] !== undefined) {
    folderContents.push({
      name: folderHierarchy[currentFolder + 1].name,
      type: "folder",
    });
  }

  if (folderHierarchy[currentFolder].hasOwnProperty("contents")) {
    folderContents.push(
      ...(folderHierarchy[currentFolder].contents as Array<any>)
    );
  }

  return (
    <main className="flex flex-col w-full h-full">
      {/* Navigation bar */}
      <div className="flex justify-start gap-4 p-2 bg-[#F5F2E3]">
        <div className="flex flex-col items-center">
          <div
            onClick={() => handleIconClick("back")}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleIconClick("back");
              }
            }}
            role="button"
            tabIndex={0}
          >
            <img
              className={
                "rotate-180" +
                (currentFolder !== 0 ? " hover:brightness-125" : "")
              }
              src="img/SECRET/NavArrow.ico"
              alt="Back navigation arrow"
            />
          </div>

          <p className="text-xs">Back</p>
        </div>
        <div className="flex flex-col items-center">
          <div
            onClick={() => handleIconClick("forward")}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleIconClick("forward");
              }
            }}
            role="button"
            tabIndex={0}
          >
            <img
              className={currentFolder !== 0 ? " hover:brightness-125" : ""}
              src="img/SECRET/NavArrow.ico"
              alt="Forward navigation arrow"
            />
          </div>
          <p className="text-xs">Forward</p>
        </div>
      </div>
      <div className="h-[1px] w-full bg-[#D2C582]" />
      {/* Selected folder contents */}
      <div className="flex-1 p-2">
        {folderContents.map((icon, index) => {
          const { name, iconImage, onClick } = icon;
          return (
            <div
              className="flex flex-col items-center w-[100px] text-center"
              onClick={() => handleIconClick("forward", onClick)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleIconClick("forward", onClick);
                }
              }}
              role="button"
              tabIndex={0}
              key={`folder-item-${index}`}
            >
              <img src={iconImage || "img/programIcons/SECRET.ico"} alt="" />
              <p className="text-xs break-all">{name}</p>
            </div>
          );
        })}
      </div>
    </main>
  );
}
