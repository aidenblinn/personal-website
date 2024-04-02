import React, { useEffect, useRef, useState } from "react";
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

export default function Game({
  boxWidth,
  speed,
  setGameActive,
  setScore,
}: {
  boxWidth: number;
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

  useEffect(() => {
    // Listen for direction change when game started
    document.addEventListener("keydown", handleKeyDown);

    // Move snake on interval according to selected speed
    intervalRef.current = setInterval(
      () => moveSnake(snakeRef.current, directionRef.current),
      SPEEDS[speed]
    );
    return () => {
      // Clear interval causing snake to move
      clearInterval(intervalRef.current as NodeJS.Timeout);
      // Clean up event listener when game over
      document.removeEventListener("keydown", handleKeyDown);
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
  const handleKeyDown = (e: KeyboardEvent) => {
    switch (e.code) {
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

  const moveSnake = (snake: SnakeType, direction: SnakeDirection) => {
    const headX = snake[0]["x"];
    const headY = snake[0]["y"];

    /* Move head based on direction */
    const newHead = {
      x: headX,
      y: headY,
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
      if (index !== 0 && x == headX && y === headY) {
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
    setScore(0);
    setGameActive(false);
  };

  return (
    <React.Fragment>
      <Board boxWidth={boxWidth} />
      <Snake boxWidth={boxWidth} snake={snake} />
      <Apple boxWidth={boxWidth} apple={apple} />
    </React.Fragment>
  );
}
