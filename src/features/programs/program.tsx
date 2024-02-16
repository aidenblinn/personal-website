import ReactModal from "react-modal-resizable-draggable";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { bumpModalToTop, addModal, removeModal } from "./programSlice";
import { changeActiveProgram } from "../activeProgramSlice.ts";
import { addProgram, removeProgram } from "../utilityBar/taskBar/taskBarSlice";
import { ProgramType } from "../../../types.ts";

export default function Program({
  program,
}: {
  program: ProgramType;
}): React.ReactElement {
  const dispatch = useAppDispatch();

  const { programModal, name, size } = program;
  const { minHeight, minWidth, initHeight, initWidth } = size;
  /** TODO: APPLY ACTIVE STYLING TO BORDER */
  const isActiveProgram =
    useAppSelector((state) => state.active.activeProgram) === name;
  const taskBarPrograms = useAppSelector((state) => state.taskBar.programs);
  const zIndex = taskBarPrograms.indexOf(name);

  /**
   *
   * @param name Name of program to open
   */
  const openProgram = (name: string): void => {
    if (!taskBarPrograms.includes(name)) {
      // Only open program if not already open on desktop
      dispatch(addProgram(name));
      // Add program modal to screen
      dispatch(addModal(name));
    } else {
      // Bump modal to top if application already open
      dispatch(bumpModalToTop(name));
    }
  };

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
    dispatch(removeModal(name));
    dispatch(removeProgram(name));
  };

  return (
    <>
      {/* Icon on simulated desktop that opens computer program */}
      <div
        className="w-16 h-16 m-2 hover:cursor-pointer"
        id={`${name}-program`}
        onClick={() => openProgram(name)}
      >
        <img className="mx-auto h-12" src={`icons/${name}.ico`} />
        <p className="w-fit mx-auto text-white [text-shadow:_2px_2px_1px_rgb(0,0,0)]">
          {name}
        </p>
      </div>
      {/* Program that opens as modal when icon above is clicked */}
      <ReactModal
        className={`!z-[${zIndex}] rounded-lg overflow-hidden`}
        minHeight={minHeight}
        minWidth={minWidth}
        initHeight={initHeight}
        initWidth={initWidth}
        isOpen={zIndex !== -1}
        disableKeystroke={true}
        onFocus={() => {
          dispatch(bumpModalToTop(name));
          dispatch(changeActiveProgram(name));
        }}
      >
        {/* Bar at top of program with name and icon */}
        <div
          className={
            "flex justify-between items-center h-8 p-1 bg-blue-600 z-10"
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
    </>
  );
}
