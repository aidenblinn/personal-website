import { useAppSelector, useOpenProgram, useFocusModal } from "../../../app/hooks.ts";
import { IconType } from "../../../../types.ts";

export default function Icon({
  icon,
  isLink,
}: {
  icon: IconType;
  isLink: boolean;
}) {
  const openProgram = useOpenProgram();
  const focusModal = useFocusModal();
  const { name, type } = icon;

  const taskBarPrograms = useAppSelector((state) => state.taskBar.programs);

  const handleIconClick = (name: string, type: string): void => {
    if (type === "program" || type === "inprogress") {
      if (!taskBarPrograms.includes(name)) {
        // Only open program if not already open on desktop
        openProgram(name);
      } else {
        // Bump modal to top if application already open
        focusModal(name);
      }
    } else {
      window.open(icon.url, "_blank");
    }
  };

  return (
    <div
      className="w-16 h-16 m-2 mb-10 relative hover:cursor-xp-pointer"
      id={`${name}-program`}
      onClick={(e) => handleIconClick(name, type)}
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
          src="img/programIcons/Link.ico"
          alt=""
        />
      ) : (
        <></>
      )}
      {type === "inprogress" ? (
        <img
          className="absolute -top-2 right-0 h-6"
          src="img/programIcons/InProgress.ico"
          alt=""
        />
      ) : (
        <></>
      )}
      <img
        className="mx-auto h-12"
        src={`img/programIcons/${name}.ico`}
        alt={`${name} program icon on desktop`}
      />
      <p className="w-fit mx-auto text-white [text-shadow:_2px_2px_1px_rgb(0,0,0)]">
        {name}
      </p>
    </div>
  );
}
