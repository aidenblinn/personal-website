import React from "react";

export default function Menu({
  gameActive,
  setGameActive,
  setSpeed,
  highScore,
  score,
}: {
  gameActive: boolean;
  setGameActive: React.Dispatch<React.SetStateAction<boolean>>;
  setSpeed: React.Dispatch<React.SetStateAction<"0" | "1" | "2">>;
  highScore: number;
  score: number;
}): React.ReactElement {
  return (
    <div className="bg-green-700 flex justify-between h-10 p-2 gap-2">
      <div className="flex items-center gap-1">
        {[
          ["Apple", score],
          ["Trophy", highScore],
        ].map(([iconName, value]) => {
          return (
            <React.Fragment key={iconName}>
              <img className="h-6" src={`img/snake/${iconName}.png`} alt="" />
              <p className="text-white">{value}</p>
            </React.Fragment>
          );
        })}
      </div>
      <div className="flex items-center gap-1">
        <p className="text-white">Slow</p>
        <input
          className="h-4 w-24 rounded-full appearance-none bg-gray-300"
          type="range"
          min={0}
          max={2}
          step={1}
          disabled={gameActive ? true : false}
          onChange={(e) => setSpeed(e.target.value as "0" | "1" | "2")}
        />
        <p className="text-white">Fast</p>
      </div>
      <button
        onClick={() => setGameActive(true)}
        className={`${
          gameActive ? "bg-slate-400" : "bg-green-400"
        } rounded-md px-4 hover:brightness-110`}
        disabled={gameActive ? true : false}
      >
        Start
      </button>
    </div>
  );
}
