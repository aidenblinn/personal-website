import { useAppSelector, useAppDispatch } from "../app/hooks";
import { bumpModalToTop, addModalToDesktop } from "./programs/programSlice";
import { changeActiveProgram } from "./activeProgramSlice.ts";
import { addToTaskBar } from "./utilityBar/taskBar/taskBarSlice";
import { IconType } from "../../types.ts";

export default function Icon({ icon }: { icon: IconType }) {
  const dispatch = useAppDispatch();
  const { name, type } = icon;

  const taskBarPrograms = useAppSelector((state) => state.taskBar.programs);

  const handleIconClick = (name: string, type: string): void => {
    if (type === "program") {
      dispatch(changeActiveProgram(name));
      if (!taskBarPrograms.includes(name)) {
        // Only open program if not already open on desktop
        dispatch(addToTaskBar(name));
        // Add program modal to screen
        dispatch(addModalToDesktop(name));
      } else {
        // Bump modal to top if application already open
        dispatch(bumpModalToTop(name));
      }
    } else {
      window.open(icon.url, "_blank");
    }
  };

  return (
    <div
      className="w-16 h-16 m-2 hover:cursor-pointer"
      id={`${name}-program`}
      onClick={() => handleIconClick(name, type)}
    >
      <img className="mx-auto h-12" src={`icons/${name}.ico`} />
      <p className="w-fit mx-auto text-white [text-shadow:_2px_2px_1px_rgb(0,0,0)]">
        {name}
      </p>
    </div>
  );
}
