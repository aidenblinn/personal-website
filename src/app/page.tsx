"use client";
import ProgramWrapper from "./computerPrograms/programWrapper.tsx";
import Clock from "./desktopUtilities/clock.tsx";
import TaskBar from "./desktopUtilities/taskBar.tsx";
import { useState } from "react";
import {
  programColumns,
  programCount,
} from "./computerPrograms/programColumns.tsx";
import { Program } from "../../types.ts";

export default function Home() {
  /** Programs are layered by z-index to simulate a multi-window desktop.
   * Program modals are prioritized by most recent open / focus.
   */
  const [modalHierarchy, setModalHierarchy] = useState<string[]>(
    new Array(programCount)
  );

  /**
   * List of open programs to be rendered in task bar,
   * ordered left to right by first program opened.
   */
  const [taskBarPrograms, setTaskBarPrograms] = useState<string[]>([]);

  /** Active program (most recently opened / focused program)
   * will be indicated in task bar.
   */
  const [activeTaskBarProgram, setActiveTaskBarProgram] = useState<
    string | null
  >(null);

  /**
   * Focus program by layering it on top of all other programs
   * and by setting its task bar icon as active.
   * This function is triggered when a user clicks on a program's modal
   * or clicks on a program's task bar icon.
   * @param programName
   */
  const focusProgram = (programName: string): void => {
    // Move program to end of hierarchy array (highest z-index)
    setModalHierarchy(
      modalHierarchy.filter((el) => el !== programName).concat([programName])
    );
    setActiveTaskBarProgram(programName);
  };

  return (
    <main className="flex flex-col h-screen">
      <div className="flex grow w-screen bg-bliss bg-center content-start p-2">
        {programColumns.map((programArray: Program[], index: number) => (
          <div
            className="w-fit h-fit grid grid-cols-1 gap-4"
            key={`column#${index}`}
          >
            {programArray.map((program: Program) => (
              <ProgramWrapper
                program={program}
                focusProgram={focusProgram}
                zIndex={modalHierarchy.indexOf(program.name)}
                taskBarPrograms={taskBarPrograms}
                setTaskBarPrograms={setTaskBarPrograms}
                modalHierarchy={modalHierarchy}
                setModalHierarchy={setModalHierarchy}
              />
            ))}
          </div>
        ))}
      </div>
      <div className="flex justify-between items-center w-screen h-12 bg-bliss-blue">
        {/* Start Menu */}
        <div className="flex items-center w-fit h-full px-2 bg-green-500">
          <p className="text-white">Start</p>
        </div>
        {/* Task Bar */}
        <div className="flex-1">
          <TaskBar
            taskBarPrograms={taskBarPrograms}
            activeTaskBarProgram={activeTaskBarProgram}
            focusProgram={focusProgram}
          />
        </div>
        {/* Clock */}
        <div className="flex items-center w-fit h-full px-2 bg-blue-400">
          <Clock />
        </div>
      </div>
    </main>
  );
}
