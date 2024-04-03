import React from "react";
import { GRIDSIZE } from "./constants";

export default function Board(): React.ReactElement {
  const tiles = [];
  for (let i = 0; i < GRIDSIZE; i++) {
    for (let j = 0; j < GRIDSIZE; j++) {
      const tileNumber = i + j * GRIDSIZE;
      tiles.push(
        <div
          key={`snake-board-box-${tileNumber}`}
          className={tileNumber % 2 === 0 ? "bg-green-600" : "bg-green-400"}
        />
      );
    }
  }
  return <React.Fragment>{tiles}</React.Fragment>;
}
