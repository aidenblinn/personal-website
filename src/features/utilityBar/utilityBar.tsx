import TaskBar from "./taskBar/taskBar.tsx";
import Tools from "./tools/tools.tsx";
import StartMenu from "./startMenu/startMenu.tsx";

export default function UtilityBar(): React.ReactElement {
  return (
    <div className="flex relative justify-between items-center w-screen h-12 -z-[1] bg-gradient-to-b from-[#235AD6] to-[#2560DD]">
      <div className="absolute h-2 w-full top-0 bg-gradient-to-b from-white/25"></div>
      <StartMenu />
      <TaskBar />
      <Tools />
      <div className="absolute h-1 w-full bottom-0 bg-gradient-to-t from-black/50"></div>
    </div>
  );
}
