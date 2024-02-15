type taskBarProps = {
  taskBarPrograms: string[];
  activeProgram: string | null;
  focusProgram: (name: string) => void;
};

const baseStyle: string =
  "flex flex-wrap justify-start content-center h-full w-[120px] px-2 text-white rounded hover:cursor-pointer";
const inactiveStyle: string =
  baseStyle + " bg-blue-400 shadow-[inset_0_2px_4px_0_rgb(255,255,255,0.3)]";
const activeStyle: string =
  baseStyle + " bg-blue-700 shadow-[inset_0_2px_4px_0_rgb(0,0,0,0.3)]";

export default function TaskBar({
  taskBarPrograms,
  activeProgram,
  focusProgram,
}: taskBarProps): React.ReactElement {
  return (
    <div className="flex-1 flex justify-start h-full p-1 gap-x-1">
      {taskBarPrograms.map((name: string) => (
        <div
          className={name === activeProgram ? activeStyle : inactiveStyle}
          onClick={() => focusProgram(name)}
          key={`${name}-taskbar`}
        >
          <img className="h-6 mr-2" src={`icons/${name}.ico`} />
          <p className="h-fit">{name}</p>
        </div>
      ))}
    </div>
  );
}
