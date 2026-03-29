import { Rnd } from "react-rnd";
import ErrorBoundary from "./ErrorBoundary";
import { Audio } from "ts-audio";
import { useAppSelector, useAppDispatch, useFocusModal, useCloseProgram } from "@/app/hooks.ts";
import { changeActiveProgram } from "./programSlice.ts";
import { ProgramType } from "@/types";
import { isMobileDevice } from "../../../utils/deviceTypeUtils.ts";

export default function Program({
  program,
  zIndex,
}: {
  program: ProgramType;
  zIndex: number;
}): React.ReactElement {
  const dispatch = useAppDispatch();
  const focusModal = useFocusModal();
  const closeProgram_ = useCloseProgram();

  const { ProgramModal, name, size } = program;

  const isActiveProgram =
    useAppSelector((state) => state.programs.activeProgram) === name;
  const muted = useAppSelector((state) => state.utilityBar.muted);

  const onFocus = () => focusModal(name);

  const closeProgram = (event: React.MouseEvent<HTMLButtonElement>): void => {
    event.stopPropagation();
    if (!muted) {
      const clickSound = Audio({ file: "sounds/click.mp3" });
      clickSound.play();
    }
    if (isActiveProgram) {
      dispatch(changeActiveProgram(null));
    }
    closeProgram_(name);
  };

  // On mobile: fill most of the viewport; on desktop: use configured dimensions
  const initWidth  = isMobileDevice ? window.innerWidth  * 0.95 : size.initWidth;
  const initHeight = isMobileDevice ? (window.innerHeight - 80) * 0.95 : size.initHeight;
  const minWidth   = isMobileDevice ? initWidth  : (size.minWidth  ?? 0);
  const minHeight  = isMobileDevice ? initHeight : (size.minHeight ?? 0);

  // Title bar height in px
  const TITLE_BAR_H = 32;

  // Centre the window in the viewport (excluding the 48px utility bar)
  const x = Math.max(0, (window.innerWidth  - initWidth)  / 2);
  const y = Math.max(0, (window.innerHeight - 48 - initHeight - TITLE_BAR_H) / 2);

  return (
    <Rnd
      default={{
        x,
        y,
        width: initWidth,
        height: initHeight + TITLE_BAR_H,
      }}
      minWidth={minWidth}
      minHeight={minHeight + TITLE_BAR_H}
      enableResizing={!isMobileDevice && !size.disableResize}
      disableDragging={isMobileDevice}
      dragHandleClassName={`${name}-drag-handle`}
      onMouseDown={onFocus}
      style={{ zIndex: zIndex + 2 }}
      className="program-window rounded-lg overflow-visible"
    >
      <div className="flex flex-col h-full w-full rounded-lg">
        {/* Title bar — also the drag handle */}
        <div
          className={
            `${name}-drag-handle flex justify-between items-center h-8 w-full p-1 rounded-t-lg bg-gradient-to-b ` +
            (isActiveProgram
              ? "from-[#0055E5] to-[#026AFE]"
              : "from-[#7996DE] to-[#82A8E9]")
          }
          id={`${name}-title-bar`}
        >
          <div className="flex-1 flex justify-start items-center h-6">
            <img
              className="h-6 mr-2"
              src={`img/programIcons/${name}.ico`}
              alt={`${name} program icon in title bar of program`}
            />
            <p id={`${name}-titlebar-name`} className="text-white">
              {name}
            </p>
          </div>
          <div className="h-6">
            <button
              className="flex align-center justify-center bg-red-600 text-white h-6 w-6 border-[1px] border-white rounded"
              onClick={closeProgram}
            >
              <p className="leading-5">x</p>
            </button>
          </div>
        </div>
        {/* Program content */}
        <div
          className={
            "overflow-hidden flex-1 rounded-b-lg [&>*]:rounded-b-lg border-x-[3px] border-b-[3px] bg-white " +
            (isActiveProgram ? "border-[#026AFE]" : "border-[#82A8E9]")
          }
        >
          <ErrorBoundary name={name}>
            <ProgramModal />
          </ErrorBoundary>
        </div>
      </div>
    </Rnd>
  );
}
