import React, { useEffect, useRef, useState } from "react";
import { Audio } from "ts-audio";
import { SPEEDS, GRIDSIZE } from "./constants";
import Snake from "./snake";
import {
  SnakeType,
  GameSpeed,
  PositionedElement,
  SnakeDirection,
} from "./types";
import Apple from "./apple";
import Board from "./board";
import { useAppSelector } from "@/app/hooks";
import { isMobileDevice } from "@/utils/deviceTypeUtils";

export default function Game({
  speed,
  setGameActive,
  setScore,
}: {
  speed: GameSpeed;
  setGameActive: React.Dispatch<React.SetStateAction<boolean>>;
  setScore: React.Dispatch<React.SetStateAction<number>>;
}): React.ReactElement {
  const [snake, setSnake] = useState<SnakeType>([
    { x: 10, y: 10, direction: "right" },
    { x: 9, y: 10, direction: "right" },
    { x: 8, y: 10, direction: "right" },
  ]);
  const [direction, setDirection] = useState<SnakeDirection>("right");
  const [apple, setApple] = useState<PositionedElement>({ x: 5, y: 5 });

  const snakeRef = useRef<SnakeType>(snake);
  const directionRef = useRef<SnakeDirection>(direction);
  const appleRef = useRef<PositionedElement>(apple);
  const intervalRef = useRef<null | NodeJS.Timeout>(null);

  const muted = useAppSelector((state) => state.utilityBar.muted);
  const appleSound =
    typeof window !== "undefined" && window.Audio
      ? Audio({ file: "sounds/info.mp3" })
      : null;

  useEffect(() => {
    setGameActive(true);
    // Listen for direction change when game started
    document.addEventListener("keydown", onKeyDown);
    // Move snake on interval according to selected speed
    intervalRef.current = setInterval(
      () => moveSnake(snakeRef.current, directionRef.current),
      SPEEDS[speed]
    );
    return () => {
      setGameActive(false);
      // Clear interval causing snake to move
      clearInterval(intervalRef.current as NodeJS.Timeout);
      // Clean up event listener when game over
      document.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  useEffect(() => {
    snakeRef.current = snake;
  }, [snake]);

  useEffect(() => {
    directionRef.current = direction;
  }, [direction]);

  useEffect(() => {
    appleRef.current = apple;
  }, [apple]);

  // Change snake direction when arrow key pressed
  const handleKeyDown = (code: string) => {
    switch (code) {
      case "ArrowLeft":
        if (directionRef.current !== "right") {
          return setDirection("left");
        }
      case "ArrowRight":
        if (directionRef.current != "left") {
          return setDirection("right");
        }
      case "ArrowDown":
        if (directionRef.current != "up") {
          return setDirection("down");
        }
      case "ArrowUp":
        if (directionRef.current != "down") {
          return setDirection("up");
        }
    }
  };
  const onKeyDown = (e: KeyboardEvent) => handleKeyDown(e.code);

  const moveSnake = (snake: SnakeType, direction: SnakeDirection) => {
    /* Move head based on direction */
    const newHead = {
      x: snake[0]["x"],
      y: snake[0]["y"],
      direction,
    };

    if (direction === "right") {
      newHead.x += 1;
    } else if (direction === "left") {
      newHead.x -= 1;
    } else if (direction === "up") {
      newHead.y -= 1;
    } else if (direction === "down") {
      newHead.y += 1;
    }

    /* Check if player has lost game */
    snake.forEach(({ x, y }, index) => {
      // Head collision with body
      if (index !== 0 && x == newHead.x && y === newHead.y) {
        return endGame();
      }
    });
    // Snake is out of bounds
    if (
      newHead.x < 0 ||
      newHead.x === GRIDSIZE ||
      newHead.y < 0 ||
      newHead.y === GRIDSIZE
    ) {
      return endGame();
    }

    /* Check if head of snake has reached apple */
    const appleEaten =
      newHead.x === appleRef.current.x && newHead.y === appleRef.current.y;
    if (appleEaten) {
      // Move apple to new random location
      moveApple();
    }

    /* Create new snake with movement applied */
    const newSnake: SnakeType = [newHead, ...snake];
    // Remove tail of snake if apple not eaten
    if (!appleEaten) {
      newSnake.pop();
    }

    setSnake(newSnake);
  };

  const moveApple = (): void => {
    // Play sound
    if (appleSound !== null && !muted) {
      appleSound.play();
    }

    // Generate new apple position that does not overlap with snake
    let newX = 0,
      newY = 0;
    do {
      newX = Math.floor(Math.random() * GRIDSIZE);
      newY = Math.floor(Math.random() * GRIDSIZE);
    } while (snake.some(({ x, y }) => x === newX && y === newY));

    setApple({ x: newX, y: newY });
    // Increment score
    setScore((prevScore) => prevScore + 1);
  };

  const endGame = () => {
    if (!muted) {
      const loseSound = Audio({ file: "sounds/fail.mp3" });
      loseSound.play();
    }
    setScore(0);
    setGameActive(false);
  };

  const buttonProps = " bg-slate-400 rounded p-2 active:brightness-125";

  return (
    <React.Fragment>
      <div
        className="relative grid"
        style={{
          gridTemplateRows: `repeat(${GRIDSIZE}, 1fr)`,
          gridTemplateColumns: `repeat(${GRIDSIZE}, 1fr)`,
          height: `${document.getElementById("snake-game")?.offsetWidth}px`,
        }}
      >
        <Board />
        <Snake snake={snake} />
        <Apple apple={apple} />
      </div>
      {isMobileDevice && (
        <div className="w-full grid grid-rows-2 grid-cols-3 gap-2 p-2">
          {/* Up */}
          <button
            onClick={() => handleKeyDown("ArrowUp")}
            className={"col-start-2" + buttonProps}
          >
            ↑
          </button>
          {/* Left */}
          <button
            onClick={() => handleKeyDown("ArrowLeft")}
            className={"row-start-2 col-start-1" + buttonProps}
          >
            ←
          </button>
          {/* Down */}
          <button
            onClick={() => handleKeyDown("ArrowDown")}
            className={"row-start-2 col-start-2" + buttonProps}
          >
            ↓
          </button>
          {/* Right */}
          <button
            onClick={() => handleKeyDown("ArrowRight")}
            className={"row-start-2 col-start-3" + buttonProps}
          >
            →
          </button>
        </div>
      )}
    </React.Fragment>
  );
}
