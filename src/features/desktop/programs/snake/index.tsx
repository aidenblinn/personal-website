import React, { useEffect, useRef, useState } from "react";
import Menu from "./menu";
import Game from "./game";
import { GameSpeed } from "./types";

export default function SnakeProgram(): React.ReactElement {
  const [speed, setSpeed] = useState<GameSpeed>("1"); // Default to medium speed
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [gameActive, setGameActive] = useState(false);

  const scoreRef = useRef(score);

  useEffect(() => {
    scoreRef.current = score;
    if (scoreRef.current > highScore) {
      setHighScore(scoreRef.current);
    }
  }, [score]);

  return (
    <main
      id="snake-game"
      className="relative m-auto bg-slate-800 w-full h-full"
    >
      <Menu
        gameActive={gameActive}
        setGameActive={setGameActive}
        setSpeed={setSpeed}
        highScore={highScore}
        score={score}
      />
      {gameActive && (
        <Game setGameActive={setGameActive} speed={speed} setScore={setScore} />
      )}
    </main>
  );
}
