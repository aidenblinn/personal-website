import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../../app/hooks";
import { toggleMute, updateTime } from "./toolsSlice";

export default function Tools(): React.ReactElement {
  const time = useAppSelector((state) => state.tools.time);
  const muted = useAppSelector((state) => state.tools.muted);
  const dispatch = useAppDispatch();

  const updateTimeEveryMinute = (firstCall?: boolean) => {
    dispatch(updateTime());
    const timeoutDuration = firstCall
      ? (60 - new Date().getSeconds()) * 1000
      : 60000;
    setTimeout(updateTimeEveryMinute, timeoutDuration);
  };

  useEffect(() => {
    updateTimeEveryMinute(true);
  });

  return (
    <div className="relative flex items-center w-fit h-full px-2 bg-gradient-to-b from-[#1290E8] to-[#109EED]">
      <div className="absolute h-full w-1 left-0 bg-gradient-to-r from-white/25"></div>
      <img
        onClick={() => dispatch(toggleMute())}
        src={`icons/${muted ? "Muted" : "Unmuted"}.ico`}
        alt="Mute/unmute icon"
        className={"hover:brightness-125 hover:cursor-pointer"}
      />
      <p className="ml-1 pb-1 text-white">{time}</p>
    </div>
  );
}
