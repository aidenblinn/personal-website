import { useState } from "react";

type Tool = "Pencil" | "Fill" | "Eraser";
type Color = "black" | "red" | "green" | "blue";

const toolButton = "p-1 rounded hover:bg-black/10";
const selectedToolButton = toolButton + " bg-black bg-opacity-10";
const colorButton = {
  tailwindClass: "w-6 h-6 hover:brightness-110",
  selectedBorderColor: "border-gray-300 border-4",
  unselectedBorderColor: "border-none",
};

export default function Paint() {
  const [tool, setTool] = useState<Tool>("Pencil");
  const [color, setColor] = useState<Color>("black");

  return (
    <main className="flex flex-col space-y-2 w-full h-full px-4 py-4 bg-[#F5F2E3]">
      {/* Menu Bar */}
      <div className="flex flex-row justify-between">
        {/* Actions */}
        <div className="flex space-x-2">
          <button className="p-1 rounded hover:bg-black/10">
            <img
              className="h-4"
              src="img/paint/Undo.ico"
              alt="Undo last action"
            />
          </button>
          <button className="p-1 rounded hover:bg-black/10">
            <img
              className="h-4"
              src="img/paint/Redo.ico"
              alt="Redo last action"
            />
          </button>
          <button className="p-1 rounded hover:bg-black/10">
            <img className="h-4" src="img/paint/Save.ico" alt="Save" />
          </button>
        </div>
        {/* Tools */}
        <div className="flex space-x-2">
          <button
            className={tool === "Pencil" ? selectedToolButton : toolButton}
            onClick={() => setTool("Pencil")}
          >
            <img className="h-4" src="img/paint/Pencil.ico" alt="Pencil tool" />
          </button>
          <button
            className={tool === "Fill" ? selectedToolButton : toolButton}
            onClick={() => setTool("Fill")}
          >
            <img className="h-4" src="img/paint/Fill.ico" alt="Fill tool" />
          </button>
          <button
            className={tool === "Eraser" ? selectedToolButton : toolButton}
            onClick={() => setTool("Eraser")}
          >
            <img className="h-4" src="img/paint/Eraser.ico" alt="Eraser tool" />
          </button>
        </div>
        {/* Colors */}
        <div className="flex space-x-2">
          <button
            className={`${colorButton.tailwindClass} bg-black ${
              color === "black"
                ? colorButton.selectedBorderColor
                : colorButton.unselectedBorderColor
            }`}
            onClick={() => setColor("black")}
          />
          <button
            className={`${colorButton.tailwindClass} bg-red-500 ${
              color === "red"
                ? colorButton.selectedBorderColor
                : colorButton.unselectedBorderColor
            }`}
            onClick={() => setColor("red")}
          />
          <button
            className={`${colorButton.tailwindClass} bg-green-500 ${
              color === "green"
                ? colorButton.selectedBorderColor
                : colorButton.unselectedBorderColor
            }`}
            onClick={() => setColor("green")}
          />
          <button
            className={`${colorButton.tailwindClass} bg-blue-500 ${
              color === "blue"
                ? colorButton.selectedBorderColor
                : colorButton.unselectedBorderColor
            }`}
            onClick={() => setColor("blue")}
          />
        </div>
      </div>
      <div className="flex flex-row"></div>
      {/* Canvas */}
      <div className="flex-1 bg-white border-t-2 border-gray-300">
        {/* Drawing surface */}
        <canvas id="drawingCanvas" className=""></canvas>
      </div>
    </main>
  );
}
