import React, { useEffect, useMemo, useState } from "react";
import { Audio } from "ts-audio";
import { useAppSelector } from "@/app/hooks";
import { useLogOutOfComputer } from "@/app/hooks";

export default function Secret() {
  const [currentFolder, setFolder] = useState<number>(0);
  const muted = useAppSelector((state) => state.utilityBar.muted);

  const logOutOfComputer = useLogOutOfComputer();

  // "Glitchy" shutdown function triggered by opening secret file
  // Large function that should only be recomputed when needed
  const shutDownComputer = async () => {
    // Reusable function to pause code
    const pause = (ms: number) =>
      new Promise((resolve) => setTimeout(resolve, ms));

    const glitchOverlay = document.createElement("div");
    glitchOverlay.style.cssText =
      "position: fixed; top: 0; left: 0; width: 100%; height: 100%; animation: screenGlitchAnimation 2s infinite; z-index: 10;";
    document.body.appendChild(glitchOverlay);

    // Make all modals spin and zoom in/out on desktop
    const elements = document.querySelectorAll(".flexible-modal");
    elements.forEach((modal) => {
      const htmlModal = modal as HTMLElement;
      htmlModal.style.animation =
        "programGlitchAnimation 1s infinite alternate";
    });

    // Initialize sounds to be reused
    const clickSound = Audio({
      file: "sounds/click.mp3",
      loop: true,
      volume: 1.4,
    });
    const failSound = Audio({
      file: "sounds/fail.mp3",
      loop: true,
    });
    const logOutSound = Audio({ file: "sounds/shutdown.mp3" });
    const tadaSound = Audio({ file: "sounds/tada.mp3" });

    // Start looping / playing sounds
    if (!muted) {
      clickSound.play();
      failSound.play();
      await pause(1500);
      tadaSound.play();
      await pause(1000);
    } else {
      await pause(2500);
    }

    // Stop glitch sounds and remove overlay
    clickSound.stop();
    failSound.stop();
    document.body.removeChild(glitchOverlay);

    if (!muted) {
      logOutSound.play();
    }

    logOutOfComputer();
  };

  // Array of folders from least to most nested
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

  // Set folder name in title bar to name of current folder
  useEffect(() => {
    const titlebarName = document.getElementById("SECRET-titlebar-name");
    if (titlebarName !== null) {
      titlebarName.innerText = folderHierarchy[currentFolder].name;
    }
  }, [currentFolder]);

  const handleIconClick = (direction: string, onClick?: () => void) => {
    // If function triggered by click, run function
    if (onClick !== undefined) {
      return onClick();
    }

    if (
      direction === "forward" &&
      currentFolder !== folderHierarchy.length - 1
    ) {
      // Move forwards to deeper folder
      setFolder(currentFolder + 1);
    } else if (direction === "back" && currentFolder !== 0) {
      // Move backwards to less nested folder
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
              className={currentFolder !== 0 ? " hover:brightness-125" : ""}
              style={{ transform: "scaleX(-1)" }}
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
