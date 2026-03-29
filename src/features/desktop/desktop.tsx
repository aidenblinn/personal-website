import React, { useRef, useEffect } from "react";
import { Audio } from "ts-audio";
import Program from "./programs/program.tsx";
import Icon from "./programs/icon.tsx";
import UtilityBar from "./utilityBar/utilityBar.tsx";
import { iconColumns } from "../../config/icons.ts";
import { IconType } from "../../../types.ts";
import {
  useAppDispatch,
  useAppSelector,
  useFocusModal,
} from "../../app/hooks.ts";
import { closeStartMenu } from "./utilityBar/utilityBarSlice.ts";

export default function Desktop(): React.ReactElement {
  const modalHierarchy = useAppSelector(
    (state) => state.programs.modalHierarchy
  );
  const focusModal = useFocusModal();
  const dispatch = useAppDispatch();
  const muted = useAppSelector((state) => state.utilityBar.muted);

  const clickSound = useRef<ReturnType<typeof Audio> | null>(null);
  useEffect(() => {
    if (typeof window !== "undefined" && window.Audio) {
      clickSound.current = Audio({ file: "sounds/click.mp3" });
    }
  }, []);

  return (
    <main
      className="flex flex-col h-dvh"
      role="presentation"
      onClick={(e: React.BaseSyntheticEvent) => {
        if (clickSound.current !== null && !muted) {
          clickSound.current.play();
        }

        const utilityBar = document.getElementById("utility-bar");
        if (!utilityBar?.contains(e.target)) {
          dispatch(closeStartMenu());
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
            key={`column#${index}`}
            className="w-fit h-fit grid grid-cols-1"
            role="presentation"
          >
            {iconColumn.map((icon: IconType) => {
              const zIndex = modalHierarchy.indexOf(icon.name);
              if (icon.type === "program" || icon.type === "inprogress") {
                return (
                  <React.Fragment key={`${icon.name}-fragment`}>
                    <Icon
                      key={`${icon.name}-icon`}
                      icon={icon}
                      isLink={false}
                    ></Icon>
                    {zIndex !== -1 && (
                      <Program
                        key={`${icon.name}-program`}
                        program={icon}
                        zIndex={zIndex}
                      />
                    )}
                  </React.Fragment>
                );
              } else {
                return (
                  <React.Fragment key={`${icon.name}-fragment`}>
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
