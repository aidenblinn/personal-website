import ReactModal from "react-modal-resizable-draggable";
import { useAppSelector, useAppDispatch } from "../../app/hooks.ts";
import { bumpModalToTop, removeModalFromDesktop } from "./programSlice.ts";
import { changeActiveProgram } from "../activeProgramSlice.ts";
import { removeFromTaskBar } from "../utilityBar/taskBar/taskBarSlice.ts";
import { ProgramType } from "../../../types.ts";
import {
  isMobileDevice,
  getAttributesByDeviceType,
} from "../../utils/deviceTypeUtils.ts";

export default function Program({
  program,
}: {
  program: ProgramType;
}): React.ReactElement {
  const dispatch = useAppDispatch();
  const { programModal, name, size } = program;
  const { minHeight, minWidth, initHeight, initWidth } = size;
  const isActiveProgram =
    useAppSelector((state) => state.active.activeProgram) === name;
  const zIndex = useAppSelector(
    (state) => state.programs.modalHierarchy
  ).indexOf(name);

  /**
   *
   * @param name Name of program to close
   * @param event Button click event
   */
  const closeProgram = (
    name: string,
    event: React.MouseEvent<HTMLButtonElement>
  ): void => {
    // Prevent click from triggering onFocus call in parent element
    event.stopPropagation();
    // Reset active program if active program is being closed
    if (isActiveProgram) {
      dispatch(changeActiveProgram(null));
    }
    // Remove program modal from screen and from task bar
    dispatch(removeModalFromDesktop(name));
    dispatch(removeFromTaskBar(name));
  };

  return (
    <ReactModal
      className={
        `!z-[${zIndex}] rounded-lg overflow-hidden !border-[3px] !border-solid ` +
        (isActiveProgram ? "!border-blue-600" : "!border-blue-400") +
        (isMobileDevice
          ? " !absolute !top-[10px] !left-1/2 !transform !-translate-x-1/2"
          : "")
      }
      isOpen={zIndex !== -1}
      disableKeystroke={true}
      {...getAttributesByDeviceType({
        initHeight,
        initWidth,
        minHeight,
        minWidth,
        onFocus: () => {
          dispatch(bumpModalToTop(name));
          dispatch(changeActiveProgram(name));
        },
      })}
    >
      {/* Title Bar */}
      <div
        className={
          "flex justify-between items-center h-8 p-1 " +
          (isActiveProgram ? "bg-blue-600" : "bg-blue-400")
        }
      >
        <div className="flex-1 flex justify-start items-center h-6">
          <img className="h-6 mr-2" src={`icons/${name}.ico`} />
          <p className="text-white">{name}</p>
        </div>
        {/* Button to close program */}
        <div className="flex-1 h-6 text-right">
          <button
            className="bg-red-600 text-white h-6 w-6 border-[1px] border-white rounded"
            onClick={(event) => closeProgram(name, event)}
          >
            X
          </button>
        </div>
      </div>
      {programModal()}
    </ReactModal>
  );
}
