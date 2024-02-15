import { useState, SetStateAction } from "react";
import ReactModal from "react-modal-resizable-draggable";
import { DesktopState, Program } from "../../../types.ts";

type programWrapperProps = {
  program: Program;
  focusProgram: (name: string, openingProgram?: boolean) => void;
  zIndex: number;
  desktopDisplay: DesktopState;
  setDesktopDisplay: React.Dispatch<SetStateAction<DesktopState>>;
  isActive: boolean;
};

export default function ProgramWrapper({
  program,
  focusProgram,
  zIndex,
  desktopDisplay,
  setDesktopDisplay,
  /** TODO: APPLY ACTIVE STYLING TO BORDER */
  isActive,
}: programWrapperProps): React.ReactElement {
  const { programModal, name, size } = program;
  const { minHeight, minWidth, initHeight, initWidth } = size;

  /**
   *
   * @param name Name of program to open
   */
  const openProgram = (name: string): void => {
    // Only open program if not already open on desktop
    const openingProgram = !desktopDisplay.taskBarPrograms.includes(name);
    focusProgram(name, openingProgram);
  };

  /**
   *
   * @param name Name of program to close
   * @param event Button click event
   */
  const closeProgram = (
    name: string,
    event: React.MouseEvent<HTMLButtonElement>
  ): void => {
    // Prevent click from triggering onFocus call in parent element
    event.stopPropagation();

    // Reset active task bar program state if active program closed
    let activeProgram = desktopDisplay.activeProgram;
    if (desktopDisplay.activeProgram === name) {
      activeProgram = null;
    }

    setDesktopDisplay({
      ...desktopDisplay,
      activeProgram,
      modalHierarchy: desktopDisplay.modalHierarchy.filter((el) => el !== name),
      taskBarPrograms: desktopDisplay.taskBarPrograms.filter(
        (el) => el !== name
      ),
    });
  };

  return (
    <>
      {/* Icon on simulated desktop that opens computer program */}
      <div
        className="w-16 h-16 m-2 hover:cursor-pointer"
        id={`${name}-program`}
        onClick={() => openProgram(name)}
      >
        <img className="mx-auto h-12" src={`icons/${name}.ico`} />
        <p className="w-fit mx-auto text-white [text-shadow:_2px_2px_1px_rgb(0,0,0)]">
          {name}
        </p>
      </div>
      {/* Program that opens as modal when icon above is clicked */}
      <ReactModal
        className={`!z-[${zIndex}] rounded-lg overflow-hidden`}
        minHeight={minHeight}
        minWidth={minWidth}
        initHeight={initHeight}
        initWidth={initWidth}
        isOpen={zIndex !== -1}
        disableKeystroke={true}
        onFocus={() => focusProgram(name)}
      >
        <div
          className={
            "flex justify-between items-center h-8 p-1 bg-blue-600 z-10"
          }
        >
          {/* Bar at top of program with name and icon */}
          <div className="flex-1 flex justify-start items-center h-6">
            <img className="h-6 mr-2" src={`icons/${name}.ico`} />
            <p className="text-white">{name}</p>
          </div>
          {/* Button to close program */}
          <div className="flex-1 h-6 text-right">
            <button
              className="bg-red-600 text-white h-6 w-6 border-[1px] border-white rounded"
              onClick={(event) => closeProgram(name, event)}
            >
              X
            </button>
          </div>
        </div>
        {programModal()}
      </ReactModal>
    </>
  );
}
