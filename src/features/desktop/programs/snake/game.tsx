import { useState, useEffect } from "react";
import { SPEEDS } from "./constants";
import StartMenu from "./startMenu";

export default function SnakeGame({
  initHeight,
  initWidth,
}: {
  initHeight: number;
  initWidth: number;
}): React.ReactElement {
  const [speed, setSpeed] = useState(SPEEDS.MEDIUM);
  const [direction, setDirection] = useState("right");
  const [snake, setSnake] = useState([{ x: 10, y: 10 }]);
  const [food, setFood] = useState({ x: 5, y: 5 });
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleKeyDown = (e: KeyboardEvent) => {
    // switch (e.code) {
    //   case "ArrowLeft":
    //     if (head.currentDirection !== "right") {
    //       head.currentDirection = "left";
    //     }
    //     break;
    //   case "ArrowRight":
    //     if (head.currentDirection != "left") {
    //       head.currentDirection = "right";
    //     }
    //     break;
    //   case "ArrowDown":
    //     if (head.currentDirection != "up") {
    //       head.currentDirection = "down";
    //     }
    //     break;
    //   case "ArrowUp":
    //     if (head.currentDirection != "down") {
    //       head.currentDirection = "up";
    //     }
    //     break;
    // }
  };

  return (
    <div
      className="m-auto bg-slate-100"
      style={{ height: `${initHeight}px`, width: `${initWidth}px` }}
    >
      {gameOver && <StartMenu />}
    </div>
  );
}
