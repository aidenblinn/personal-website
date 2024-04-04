import { useEffect } from "react";
import { useAppSelector, useAppDispatch, useFocusModal } from "@/app/hooks.ts";
import { removeModalFromDesktop } from "./programSlice.ts";
import { changeActiveProgram } from "../activeProgramSlice.ts";
import { removeFromTaskBar } from "../utilityBar/taskBar/taskBarSlice.ts";
import { ProgramType } from "../../../../types.ts";
import {
  isMobileDevice,
  getAttributesByDeviceType,
} from "../../../utils/deviceTypeUtils.ts";

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
  zIndex,
}: {
  program: ProgramType;
  zIndex: number;
}): React.ReactElement {
  const dispatch = useAppDispatch();
  const focusModal = useFocusModal();
  const onFocus = () => focusModal(name);

  const { ProgramModal, name, size } = program;
  const isActiveProgram =
    useAppSelector((state) => state.active.activeProgram) === name;

  /** Add mousedown listener to draggable area of title bar
   * so that program focuses when bar first dragged
   */
  useEffect(() => {
    // Only add listener if program present
    if (zIndex > -1) {
      const titleBar = document.querySelector(`#${name}-title-bar`);
      const draggableArea = titleBar?.nextSibling?.nextSibling;
      if (
        draggableArea instanceof HTMLElement &&
        draggableArea.onmousedown === null
      ) {
        draggableArea.onmousedown = onFocus;
      }
    }
  }, [zIndex]);

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

  const modalAttributes = getAttributesByDeviceType({
    size,
    onFocus,
  });

  return (
    <ReactModal
      className={
        // offset z-index by 2 to account for z-indices of other page elements
        `relative !z-[${zIndex + 2}] rounded-b-lg !border-none ` +
        (isMobileDevice
          ? " !absolute !top-[40px] !left-1/2 !transform !-translate-x-1/2"
          : "")
      }
      isOpen={zIndex !== -1}
      disableKeystroke={true}
      {...modalAttributes}
    >
      {/* Title Bar */}
      <div
        className={
          "absolute -top-8 flex justify-between items-center h-8 w-full p-1 bg-gradient-to-b rounded-t-lg " +
          (isActiveProgram
            ? "from-[#0055E5] to-[#026AFE]"
            : "from-[#7996DE] to-[#82A8E9]")
        }
        id={`${name}-title-bar`}
        onDragStart={() => console.log("hello")}
      >
        <div className="flex-1 flex justify-start items-center h-6">
          <img
            className="h-6 mr-2"
            src={`img/programIcons/${name}.ico`}
            alt={`${name} program icon in title bar of program`}
          />
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
          "overflow-scroll h-full rounded-b-lg [&>*]:rounded-b-lg border-[3px] " +
          (isActiveProgram ? "border-[#026AFE]" : "border-[#82A8E9]")
        }
      >
        {ProgramModal()}
      </div>
    </ReactModal>
  );
}
