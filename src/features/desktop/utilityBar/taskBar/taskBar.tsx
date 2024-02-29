import { useAppSelector, useFocusModal } from "../../../../app/hooks";

export default function TaskBar(): React.ReactElement {
  const focusModal = useFocusModal();

  const programs = useAppSelector((state) => state.taskBar.programs);
  const activeProgram = useAppSelector((state) => state.active.activeProgram);

  const baseStyle: string =
    "flex flex-wrap justify-start content-center h-full w-[120px] px-2 text-white rounded hover:cursor-xp-pointer";
  const inactiveStyle: string =
    baseStyle + " bg-[#4C7EEC] shadow-[inset_0_2px_4px_0_rgb(255,255,255,0.3)]";
  const activeStyle: string =
    baseStyle + " bg-[#2A4FB2] shadow-[inset_0_2px_4px_0_rgb(0,0,0,0.3)]";

  return (
    <div className="flex-1 flex justify-start h-full p-1 gap-x-1">
      {programs.map((name: string) => (
        <div
          key={`${name}-taskbar`}
          className={name === activeProgram ? activeStyle : inactiveStyle}
          onClick={() => focusModal(name)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              focusModal(name);
            }
          }}
          role="button"
          tabIndex={0}
        >
          <img
            className="h-6 mr-2"
            src={`icons/${name}.ico`}
            alt={`${name} program icon in task bar`}
          />
          <p className="h-fit">{name}</p>
        </div>
      ))}
    </div>
  );
}
