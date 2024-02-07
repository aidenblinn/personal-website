type taskBarProps = {
  taskBarPrograms: string[];
  activeTaskBarProgram: string | null;
  focusProgram: (programName: string) => void;
};

export default function TaskBar({
  taskBarPrograms,
  activeTaskBarProgram,
  focusProgram,
}: taskBarProps): React.ReactElement {
  const activeProgram: string = "text-white";
  const inactiveProgram: string = "text-red-500";

  return (
    <>
      {taskBarPrograms.map((programName: string) => (
        <p
          className={
            programName === activeTaskBarProgram
              ? activeProgram
              : inactiveProgram
          }
          onClick={() => focusProgram(programName)}
        >
          {programName}
        </p>
      ))}
    </>
  );
}
