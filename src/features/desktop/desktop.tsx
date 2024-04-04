import Program from "./programs/program.tsx";
import Icon from "./programs/icon.tsx";
import UtilityBar from "./utilityBar/utilityBar.tsx";
import { iconColumns } from "../../config/icons.ts";
import { IconType } from "../../../types.ts";
import React from "react";
import { useAppSelector, useFocusModal } from "../../app/hooks.ts";

export default function Desktop(): React.ReactElement {
  const modalHierarchy = useAppSelector(
    (state) => state.programs.modalHierarchy
  );
  const focusModal = useFocusModal();
  const muted = useAppSelector((state) => state.tools.muted);
  const clickSound = new Audio("sounds/click.mp3");

  return (
    <main
      className="flex flex-col h-dvh"
      role="presentation"
      onClick={() => {
        if (!muted) {
          clickSound.play();
        }
      }}
    >
      <div
        id="desktop"
        className="flex grow w-screen bg-bliss bg-cover bg-center content-start p-2"
        role="presentation"
        // Remove focus from active program when desktop clicked
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            focusModal("");
          }
        }}
      >
        {iconColumns.map((iconColumn: IconType[], index: number) => (
          <div
            // onClick={(e) => e.stopPropagation()}
            key={`column#${index}`}
            className="w-fit h-fit grid grid-cols-1"
            role="presentation"
          >
            {iconColumn.map((icon: IconType) => {
              if (icon.type === "program" || icon.type === "inprogress") {
                return (
                  <React.Fragment key={`${icon.name}-fragment`}>
                    <Icon
                      key={`${icon.name}-icon`}
                      icon={icon}
                      isLink={false}
                    ></Icon>
                    <Program
                      key={`${icon.name}-program`}
                      program={icon}
                      zIndex={modalHierarchy.indexOf(icon.name)}
                    />
                  </React.Fragment>
                );
              } else {
                return (
                  <React.Fragment key={`${icon.name}-fragment`}>
                    <img
                      className="absolute top-0 right-0 h-2"
                      src="img/programIcons/Link.ico"
                      alt=""
                    />
                    <Icon
                      key={`${icon.name}-icon`}
                      icon={icon}
                      isLink={true}
                    ></Icon>
                  </React.Fragment>
                );
              }
            })}
          </div>
        ))}
      </div>
      <UtilityBar />
    </main>
  );
}
