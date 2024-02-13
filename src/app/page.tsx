"use client";
import ProgramWrapper from "./computerPrograms/programWrapper.tsx";
import Clock from "./desktopUtilities/clock.tsx";
import TaskBar from "./desktopUtilities/taskBar.tsx";
import { useState } from "react";
import { programColumns } from "./computerPrograms/programColumns.tsx";
import { DesktopState, Program } from "../../types.ts";

export default function Home() {
  const [desktopDisplay, setDesktopDisplay] = useState<DesktopState>({
    modalHierarchy: [],
    taskBarPrograms: [],
    activeProgram: null,
  });

  /**
   * Focus program by layering it on top of all other programs
   * and by setting its task bar icon as active.
   * This function is triggered when a user clicks on a program's modal
   * or clicks on a program's task bar icon.
   * @param programName Name of program to focus
   * @param openingProgram Boolean indicating whether program is being opened
   */
  const focusProgram = (
    programName: string,
    openingProgram?: boolean
  ): void => {
    const taskBarPrograms = desktopDisplay.taskBarPrograms;
    // Add new program to task bar if opening program
    // and if program not already in task bar
    if (
      openingProgram &&
      !desktopDisplay.taskBarPrograms.includes(programName)
    ) {
      taskBarPrograms.push(programName);
    }

    setDesktopDisplay({
      taskBarPrograms,
      activeProgram: programName,
      // Move program to end of hierarchy array (highest z-index)
      modalHierarchy: desktopDisplay.modalHierarchy
        .filter((el) => el !== programName)
        .concat([programName]),
    });
  };

  const setDesktopDisplayHelper = (input: DesktopState) => {
    setDesktopDisplay(input);
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
          <p className="text-white">Start</p>
        </div>
        {/* Task Bar */}
        <TaskBar
          taskBarPrograms={desktopDisplay.taskBarPrograms}
          activeProgram={desktopDisplay.activeProgram}
          focusProgram={focusProgram}
        />
        {/* Clock */}
        <div className="flex items-center w-fit h-full px-2 bg-blue-400">
          <Clock />
        </div>
      </div>
    </main>
  );
}
