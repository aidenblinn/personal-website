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
    <div className="flex items-center w-fit h-full px-2 bg-blue-400">
      <img
        onClick={() => dispatch(toggleMute())}
        src={`icons/${muted ? "Muted" : "Unmuted"}.ico`}
        alt="Mute/unmute icon"
      />
      <p className="text-white">{time}</p>
    </div>
  );
}