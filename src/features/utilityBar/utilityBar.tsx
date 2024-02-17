import TaskBar from "./taskBar/taskBar.tsx";
import Tools from "./tools/tools.tsx";
import StartMenu from "./startMenu/startMenu.tsx";

export default function UtilityBar(): React.ReactElement {
  return (
    <div className="flex justify-between items-center w-screen h-12 bg-bliss-blue">
      <StartMenu />
      <TaskBar />
      <Tools />
    </div>
  );
}
