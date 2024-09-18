import { useEffect, useRef, useState } from "react";

type Tool = "Pencil" | "Fill" | "Eraser";
type Color = "black" | "red" | "green" | "blue" | "white";

// Reusable Tailwind styles
const toolButton = "p-1 rounded hover:bg-black/10";
const selectedToolButton = toolButton + " bg-black bg-opacity-10";
const colorButton = {
  tailwindClass: "w-6 h-6 hover:brightness-110",
  selectedBorderColor: "border-gray-300 border-4",
  unselectedBorderColor: "border-none",
};
const menuSeparator = "w-1 h-1 border-2 rounded border-gray-500";

// Map color options to rgba values
const colorMap: { [key in Color]: [number, number, number, number] } = {
  black: [0, 0, 0, 255],
  red: [255, 0, 0, 255],
  green: [0, 255, 0, 255],
  blue: [0, 0, 255, 255],
  white: [255, 255, 255, 255],
};

export default function Paint() {
  const [tool, setTool] = useState<Tool>("Pencil");
  const [color, setColor] = useState<Color>("black");

  // Canvas history for undo and redo functionality
  const [history, setHistory] = useState<ImageData[]>([]);
  const [redoHistory, setRedoHistory] = useState<ImageData[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);

  // Initialize and resize canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");

    if (canvas && ctx) {
      // Set default stroke preferences
      ctxRef.current = ctx;
      ctx.lineCap = "round";
      ctx.lineWidth = 5;
      ctx.strokeStyle = `rgba(${colorMap[color].join(",")})`;

      // Initialize canvas with white fill
      const initializeCanvas = () => {
        canvas.width = canvas.clientWidth;
        canvas.height = canvas.clientHeight;
        ctx.fillStyle = "white";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      };

      // Preserve existing drawing and fill new space with white
      const resizeCanvas = () => {
        const img = ctx.getImageData(0, 0, canvas.width, canvas.height);

        // Fill resized canvas with white
        initializeCanvas();

        // Paste previous canvas onto new canvas
        ctx.putImageData(img, 0, 0);
      };

      // Observe canvas for resizing
      const observer = new ResizeObserver(resizeCanvas);
      observer.observe(canvas);

      initializeCanvas();

      return () => observer.unobserve(canvas);
    }
  }, []);

  // Set line width and event handlers based on tool
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = ctxRef.current;
    let drawing = false;

    if (ctx) {
      ctx.lineWidth = tool === "Eraser" ? 10 : 5;
    }

    // Get coordinates of mouse or touch event
    const getEventCoords = (e: MouseEvent | TouchEvent) => {
      if (e instanceof TouchEvent) {
        const touch = e.touches[0];
        return {
          offsetX: touch.clientX - canvas!.offsetLeft,
          offsetY: touch.clientY - canvas!.offsetTop,
        };
      } else {
        return { offsetX: e.offsetX, offsetY: e.offsetY };
      }
    };

    // Begin stroke on mouse down when using pencil/eraser
    const startDrawing = (e: MouseEvent | TouchEvent) => {
      if (tool !== "Fill" && ctx) {
        const { offsetX, offsetY } = getEventCoords(e);
        ctx.lineWidth = tool === "Eraser" ? 10 : 5;
        ctx.strokeStyle = `rgba(${colorMap[color].join(",")})`;
        ctx.beginPath();
        ctx.moveTo(offsetX, offsetY);
        drawing = true;
      }
    };

    // Continue line if mouse moved while pressed down when using pencil/eraser
    const draw = (e: MouseEvent | TouchEvent) => {
      if (tool !== "Fill" && drawing && ctx) {
        const { offsetX, offsetY } = getEventCoords(e);
        ctx.lineTo(offsetX, offsetY);
        ctx.stroke();
      }
    };

    // Stop drawing on mouse up when using pencil/eraser
    const stopDrawing = () => {
      if (tool !== "Fill" && ctx) {
        ctx.closePath();
        drawing = false;
      }
    };

    // Fill canvas when clicked using flood tool
    const handleCanvasClick = (e: MouseEvent) => {
      if (tool === "Fill") {
        floodFill(e.offsetX, e.offsetY, color);
      }
    };

    if (canvas) {
      // Event listeners for mobile drawing
      canvas.addEventListener("touchstart", startDrawing);
      canvas.addEventListener("touchmove", draw);
      canvas.addEventListener("touchend", stopDrawing);

      // Event listeners for desktop drawing
      canvas.addEventListener("mousedown", startDrawing);
      canvas.addEventListener("mousemove", draw);
      canvas.addEventListener("mouseup", stopDrawing);
      canvas.addEventListener("mouseout", stopDrawing);

      // Event listener for fill tool
      canvas.addEventListener("click", handleCanvasClick);
    }

    return () => {
      // Remove event listeners when component unmounts
      if (canvas) {
        canvas.removeEventListener("touchstart", startDrawing);
        canvas.removeEventListener("touchmove", draw);
        canvas.removeEventListener("touchend", stopDrawing);
        canvas.removeEventListener("mousedown", startDrawing);
        canvas.removeEventListener("mousemove", draw);
        canvas.removeEventListener("mouseup", stopDrawing);
        canvas.removeEventListener("mouseout", stopDrawing);
        canvas.removeEventListener("click", handleCanvasClick);
      }
    };
  }, [color, tool]);

  // Perform flood fill on canvas when "Fill" tool used
  const floodFill = (x: number, y: number, color: Color) => {
    const canvas = canvasRef.current;
    const ctx = ctxRef.current;
    if (canvas && ctx) {
      // Get color of clicked pixel
      const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const targetColor = getColorAtPixel(x, y, imgData);
      const colorToFill = colorMap[color];

      if (colorsAreEqual(targetColor, colorToFill)) return; // No need to fill if target color is the same

      const stack: [number, number][] = [[x, y]];
      const { width, height, data } = imgData;
      const index = (x: number, y: number) => (y * width + x) * 4;

      while (stack.length > 0) {
        const [currentX, currentY] = stack.pop()!;
        const pos = index(currentX, currentY);

        // Perform flood fill if current pixel is same color as clicked pixel
        if (
          data[pos] === targetColor[0] &&
          data[pos + 1] === targetColor[1] &&
          data[pos + 2] === targetColor[2] &&
          data[pos + 3] === targetColor[3]
        ) {
          // Fill the pixel
          data[pos] = colorToFill[0];
          data[pos + 1] = colorToFill[1];
          data[pos + 2] = colorToFill[2];
          data[pos + 3] = colorToFill[3];

          // Add neighboring pixels to the stack
          if (currentX > 0) stack.push([currentX - 1, currentY]); // left
          if (currentX < width - 1) stack.push([currentX + 1, currentY]); // right
          if (currentY > 0) stack.push([currentX, currentY - 1]); // top
          if (currentY < height - 1) stack.push([currentX, currentY + 1]); // bottom
        }
      }

      ctx.putImageData(imgData, 0, 0);
      saveState(); // Save the new state after filling
    }
  };

  const colorsAreEqual = (
    color1: [number, number, number, number],
    color2: [number, number, number, number]
  ) => {
    return (
      color1[0] === color2[0] &&
      color1[1] === color2[1] &&
      color1[2] === color2[2] &&
      color1[3] === color2[3]
    );
  };

  // Get the color of the pixel at the given position
  const getColorAtPixel = (x: number, y: number, imgData: ImageData) => {
    const index = (y * imgData.width + x) * 4;
    return [
      imgData.data[index], // Red
      imgData.data[index + 1], // Green
      imgData.data[index + 2], // Blue
      imgData.data[index + 3], // Alpha
    ] as [number, number, number, number];
  };

  // Save canvas state to history for undo and redo
  const saveState = () => {
    const canvas = canvasRef.current;
    const ctx = ctxRef.current;
    if (canvas && ctx) {
      const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      setHistory((prev) => [...prev.slice(0, historyIndex + 1), imgData]);
      setHistoryIndex((prev) => prev + 1);
      setRedoHistory([]);
    }
  };

  // Save the state when tool or color changes
  useEffect(() => {
    saveState();
  }, [tool, color]);

  const handleUndo = () => {
    if (historyIndex > 0) {
      const canvas = canvasRef.current;
      const ctx = ctxRef.current;
      if (canvas && ctx) {
        // Add current canvas to redo history
        const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        setRedoHistory((prev) => [imgData, ...prev]);
        // Switch canvas state to previous canvas (undo one step)
        const prevState = history[historyIndex - 1];
        ctx.putImageData(prevState, 0, 0);
        // Decrement history index to match index of previous canvas
        setHistoryIndex((prev) => prev - 1);
      }
    }
  };

  const handleRedo = () => {
    if (redoHistory.length > 0) {
      const canvas = canvasRef.current;
      const ctx = ctxRef.current;
      if (canvas && ctx) {
        // Add current canvas to undo history
        const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        setHistory((prev) => [...prev.slice(0, historyIndex + 1), imgData]);
        // Increment history index
        setHistoryIndex((prev) => prev + 1);
        // Switch canvas state to next canvas
        const nextState = redoHistory[0];
        ctx.putImageData(nextState, 0, 0);
        setRedoHistory((prev) => prev.slice(1));
      }
    }
  };

  // Convert canvas to JPG and download
  const handleSave = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.toBlob((blob) => {
        if (blob) {
          // Create link with blob representation of canvas image
          const url = URL.createObjectURL(blob);
          const link = document.createElement("a");
          link.href = url;
          link.download = "drawing.jpg";
          link.target = "_blank"; // Open in a new tab

          // Append the link to the body
          document.body.appendChild(link);

          // Programmatically trigger the click event
          link.click();

          // Remove the link from the document
          document.body.removeChild(link);

          // Revoke the object URL after the download
          URL.revokeObjectURL(url);
        }
      }, "image/jpeg");
    }
  };

  return (
    <main className="flex flex-col space-y-2 w-full h-full px-4 py-4 bg-[#F5F2E3]">
      <div className="flex flex-row justify-between items-center">
        {/* Action buttons */}
        <div className="flex space-x-2">
          <button
            className="p-1 rounded hover:bg-black/10"
            onClick={handleSave}
          >
            <img className="h-4" src="img/paint/Save.ico" alt="Save" />
          </button>
          <button
            className="p-1 rounded hover:bg-black/10"
            onClick={handleUndo}
          >
            <img
              className="h-4"
              src="img/paint/Undo.ico"
              alt="Undo last action"
            />
          </button>
          <button
            className="p-1 rounded hover:bg-black/10"
            onClick={handleRedo}
          >
            <img
              className="h-4"
              src="img/paint/Redo.ico"
              alt="Redo last action"
            />
          </button>
        </div>
        <div className={menuSeparator}></div>
        {/* Tool buttons */}
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
            onClick={() => {
              setTool("Eraser");
              setColor("white");
            }}
          >
            <img className="h-4" src="img/paint/Eraser.ico" alt="Eraser tool" />
          </button>
        </div>
        <div className={menuSeparator}></div>
        {/* Color buttons */}
        <div className="flex space-x-2">
          {(["black", "red", "green", "blue"] as Color[]).map((c) => (
            <button
              key={c}
              style={{ backgroundColor: `rgba(${colorMap[c].join(",")})` }}
              className={`${colorButton.tailwindClass} ${
                color === c
                  ? colorButton.selectedBorderColor
                  : colorButton.unselectedBorderColor
              }`}
              onClick={() => setColor(c)}
            />
          ))}
        </div>
      </div>
      {/* Drawing canvas */}
      <div className="flex-1 bg-white border-t-2 border-gray-300">
        <canvas
          id="drawingCanvas"
          ref={canvasRef}
          className="w-full h-full"
        ></canvas>
      </div>
    </main>
  );
}