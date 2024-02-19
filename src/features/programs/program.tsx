import { useAppSelector, useAppDispatch } from "../../app/hooks.ts";
import { bumpModalToTop, removeModalFromDesktop } from "./programSlice.ts";
import { changeActiveProgram } from "../activeProgramSlice.ts";
import { removeFromTaskBar } from "../utilityBar/taskBar/taskBarSlice.ts";
import { ProgramType } from "../../../types.ts";
import {
  isMobileDevice,
  getAttributesByDeviceType,
} from "../../utils/deviceTypeUtils.ts";

// This component relies on  accessing the document object -- only render on client side
import dynamic from "next/dynamic";
const ReactModal = dynamic(
  () => {
    return import("react-modal-resizable-draggable");
  },
  { ssr: false }
);

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
        `relative !z-[${zIndex}] rounded-b-lg !border-none ` +
        (isMobileDevice
          ? " !absolute !top-[40px] !left-1/2 !transform !-translate-x-1/2"
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
          "absolute -top-8 flex justify-between items-center h-8 w-full p-1 bg-gradient-to-b rounded-t-lg " +
          (isActiveProgram
            ? "from-[#0055E5] to-[#026AFE]"
            : "from-[#7996DE] to-[#82A8E9]")
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
      <div
        className={
          "h-full rounded-b-lg [&>*]:rounded-b-lg border-2 " +
          (isActiveProgram ? "border-[#026AFE]" : "border-[#82A8E9]")
        }
      >
        {programModal()}
      </div>
    </ReactModal>
  );
}
