import { useAppSelector, useAppDispatch } from "../../../app/hooks.ts";
import { bumpModalToTop, addModalToDesktop } from "./programSlice.ts";
import { changeActiveProgram } from "../activeProgramSlice.ts";
import { addToTaskBar } from "../utilityBar/taskBar/taskBarSlice.ts";
import { IconType } from "../../../../types.ts";

export default function Icon({
  icon,
  isLink,
}: {
  icon: IconType;
  isLink: boolean;
}) {
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
      className="w-16 h-16 m-2 relative hover:cursor-xp-pointer"
      id={`${name}-program`}
      onClick={() => handleIconClick(name, type)}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          handleIconClick(name, type);
        }
      }}
      role="button"
      tabIndex={0}
    >
      {isLink ? (
        <img
          className="absolute -top-2 right-0 h-6"
          src="icons/Link.ico"
          alt=""
        />
      ) : (
        <></>
      )}
      <img
        className="mx-auto h-12"
        src={`icons/${name}.ico`}
        alt={`${name} program icon on desktop`}
      />
      <p className="w-fit mx-auto text-white [text-shadow:_2px_2px_1px_rgb(0,0,0)]">
        {name}
      </p>
    </div>
  );
}
