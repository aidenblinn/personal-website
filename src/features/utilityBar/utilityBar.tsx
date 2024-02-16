import TaskBar from "./taskBar/taskBar.tsx";
import Tools from "./tools/tools.tsx";

export default function UtilityBar(): React.ReactElement {
  return (
    <div className="flex justify-between items-center w-screen h-12 bg-bliss-blue">
      {/* Start Menu */}
      <div className="flex items-center w-fit h-full px-2 bg-green-500">
        <h1 className="text-white">Start</h1>
      </div>
      {/* Task Bar containing open programs */}
      <TaskBar />
      {/* Tools to the right of the task bar */}
      <Tools />
    </div>
  );
}
