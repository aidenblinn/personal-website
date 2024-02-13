type taskBarProps = {
  taskBarPrograms: string[];
  activeProgram: string | null;
  focusProgram: (programName: string) => void;
};

export default function TaskBar({
  taskBarPrograms,
  activeProgram,
  focusProgram,
}: taskBarProps): React.ReactElement {
  const inactiveStyle: string =
    "flex flex-wrap justify-start content-center h-full w-[120px] px-2 bg-blue-400 text-white rounded hover:cursor-pointer";
  const activeStyle: string = inactiveStyle.replace(
    "text-white",
    "text-red-500"
  );

  return (
    <div className="flex-1 flex justify-start h-full p-1 gap-x-1">
      {taskBarPrograms.map((programName: string) => (
        <div
          className={
            programName === activeProgram ? activeStyle : inactiveStyle
          }
          onClick={() => focusProgram(programName)}
          key={`${programName}-taskbar`}
        >
          <img className="h-6 mr-2" src={`icons/${programName}.ico`} />
          <p className="h-fit">{programName}</p>
        </div>
      ))}
    </div>
  );
}
