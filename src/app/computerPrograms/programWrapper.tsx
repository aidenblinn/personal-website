import { useState, SetStateAction } from "react";
import ReactModal from "react-modal-resizable-draggable";
import { Program } from "../../../types.ts";

type programWrapperProps = {
  program: Program;
  focusProgram: (programName: string) => void;
  zIndex: number;
  taskBarPrograms: string[];
  setTaskBarPrograms: React.Dispatch<SetStateAction<string[]>>;
  modalHierarchy: string[];
  setModalHierarchy: React.Dispatch<SetStateAction<string[]>>;
};

export default function ProgramWrapper({
  program,
  focusProgram,
  zIndex,
  taskBarPrograms,
  setTaskBarPrograms,
  modalHierarchy,
  setModalHierarchy,
}: programWrapperProps): React.ReactElement {
  const { programModal, name, size } = program;
  const { minHeight, minWidth, initHeight, initWidth } = size;

  const [programIsOpen, setProgramVisibility] = useState(false);

  const openProgram = (programName: string): void => {
    focusProgram(programName);
    setTaskBarPrograms(taskBarPrograms.concat([programName]));
    setProgramVisibility(true);
  };

  const closeProgram = (programName: string): void => {
    setModalHierarchy(modalHierarchy.filter((el) => el !== programName));
    setTaskBarPrograms(taskBarPrograms.filter((el) => el !== programName));
    setProgramVisibility(false);
  };

  return (
    <>
      {/* Icon on simulated desktop that opens computer program */}
      <div
        className="w-16 h-16 m-2 hover:cursor-pointer"
        key={`${name}-program`}
        id={`${name}-program#`}
        onClick={() => openProgram(`${name}-program`)}
      >
        <img className="mx-auto h-12" src={`icons/${name}.ico`} />
        <p className="w-fit mx-auto">{name}</p>
      </div>
      {/* Program that opens as modal when icon above is clicked */}
      <ReactModal
        className="rounded-lg overflow-hidden border-[3px] border-blue-600"
        minHeight={minHeight}
        minWidth={minWidth}
        initHeight={initHeight}
        initWidth={initWidth}
        isOpen={programIsOpen}
        disableKeystroke={true}
        onFocus={() => focusProgram(name)}
      >
        <div
          className={`z-[${zIndex}] indedxflex justify-between items-center h-8 p-1 bg-blue-600`}
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
              onClick={() => {
                closeProgram(`${name}-program`);
              }}
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
