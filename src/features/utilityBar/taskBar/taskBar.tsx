import { useAppSelector, useAppDispatch } from "../../../app/hooks";
import { changeActiveProgram } from "../../activeProgramSlice";
import { bumpModalToTop } from "../../programs/programSlice";

export default function TaskBar(): React.ReactElement {
  const programs = useAppSelector((state) => state.taskBar.programs);
  const activeProgram = useAppSelector((state) => state.active.activeProgram);
  const dispatch = useAppDispatch();

  const baseStyle: string =
    "flex flex-wrap justify-start content-center h-full w-[120px] px-2 text-white rounded hover:cursor-pointer";
  const inactiveStyle: string =
    baseStyle + " bg-[#4C7EEC] shadow-[inset_0_2px_4px_0_rgb(255,255,255,0.3)]";
  const activeStyle: string =
    baseStyle + " bg-[#2A4FB2] shadow-[inset_0_2px_4px_0_rgb(0,0,0,0.3)]";

  return (
    <div className="flex-1 flex justify-start h-full p-1 gap-x-1">
      {programs.map((name: string) => (
        <div
          className={name === activeProgram ? activeStyle : inactiveStyle}
          onClick={() => {
            // Bump program modal to top when task bar item clicked
            dispatch(bumpModalToTop(name));
            // Set clicked program as active
            dispatch(changeActiveProgram(name));
          }}
          key={`${name}-taskbar`}
        >
          <img className="h-6 mr-2" src={`icons/${name}.ico`} />
          <p className="h-fit">{name}</p>
        </div>
      ))}
    </div>
  );
}
