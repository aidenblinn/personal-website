"use client";
import ProgramWrapper from "./computerPrograms/programWrapper.tsx";
import Tools from "./desktopUtilities/tools.tsx";
import TaskBar from "./desktopUtilities/taskBar.tsx";
import { useState } from "react";
import { programColumns } from "./computerPrograms/programInfo.tsx";
import { DesktopState, Program } from "../../types.ts";

export default function Home() {
  const [desktopDisplay, setDesktopDisplay] = useState<DesktopState>({
    modalHierarchy: [],
    taskBarPrograms: [],
    activeProgram: null,
    muted: false,
  });

  /**
   * Focus program by layering it on top of all other programs
   * and by setting its task bar icon as active.
   * This function is triggered when a user clicks on a program's modal
   * or clicks on a program's task bar icon.
   * @param name Name of program to focus
   * @param openingProgram Boolean indicating whether program is being opened
   */
  const focusProgram = (name: string, openingProgram?: boolean): void => {
    const taskBarPrograms = desktopDisplay.taskBarPrograms;
    // Add new program to task bar if opening program
    if (openingProgram) {
      taskBarPrograms.push(name);
    }

    setDesktopDisplay({
      ...desktopDisplay,
      taskBarPrograms,
      activeProgram: name,
      // Move program to end of hierarchy array (highest z-index)
      modalHierarchy: desktopDisplay.modalHierarchy
        .filter((el) => el !== name)
        .concat([name]),
    });
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
                key={`${program.name}-program`}
                program={program}
                focusProgram={focusProgram}
                zIndex={desktopDisplay.modalHierarchy.indexOf(program.name)}
                desktopDisplay={desktopDisplay}
                setDesktopDisplay={setDesktopDisplay}
                isActive={desktopDisplay.activeProgram === program.name}
              />
            ))}
          </div>
        ))}
      </div>
      <div className="flex justify-between items-center w-screen h-12 bg-bliss-blue">
        {/* Start Menu */}
        <div className="flex items-center w-fit h-full px-2 bg-green-500">
          <h1 className="text-white">Start</h1>
        </div>
        {/* Task Bar */}
        <TaskBar
          taskBarPrograms={desktopDisplay.taskBarPrograms}
          activeProgram={desktopDisplay.activeProgram}
          focusProgram={focusProgram}
        />
        {/* Tools to the right of the task bar */}
        <div className="flex items-center w-fit h-full px-2 bg-blue-400">
          <Tools muted={desktopDisplay.muted} />
        </div>
      </div>
    </main>
  );
}
