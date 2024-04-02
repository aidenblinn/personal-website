import React, { useEffect, useRef, useState } from "react";
import StartMenu from "./startMenu";
import Game from "./game";
import { GRIDSIZE } from "./constants";
import { GameSpeed } from "./types";

export default function SnakeProgram({
  initHeight,
  initWidth,
}: {
  initHeight: number;
  initWidth: number;
}): React.ReactElement {
  const [speed, setSpeed] = useState<GameSpeed>("1"); // Default to medium speed
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [gameActive, setGameActive] = useState(false);

  const scoreRef = useRef(score);

  const boxWidth = initWidth / GRIDSIZE;

  useEffect(() => {
    scoreRef.current = score;
    if (scoreRef.current > highScore) {
      setHighScore(scoreRef.current);
    }
  }, [score]);

  return (
    <div
      className="relative m-auto bg-slate-100"
      id="asdfasdf"
      style={{ height: `${initHeight}px`, width: `${initWidth}px` }}
    >
      <StartMenu
        gameActive={gameActive}
        setGameActive={setGameActive}
        setSpeed={setSpeed}
        highScore={highScore}
        score={score}
      />
      {gameActive && (
        <div className="relative">
          <Game
            boxWidth={boxWidth}
            setGameActive={setGameActive}
            speed={speed}
            setScore={setScore}
          />
        </div>
      )}
    </div>
  );
}
