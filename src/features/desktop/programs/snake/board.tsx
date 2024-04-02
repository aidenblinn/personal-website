import React from "react";
import { GRIDSIZE } from "./constants";

export default function Board({
  boxWidth,
}: {
  boxWidth: number;
}): React.ReactElement {
  const rows = [];
  for (let i = 0; i < GRIDSIZE; i++) {
    const columns = [];
    for (let j = 0; j < GRIDSIZE; j++) {
      const tileNumber = i + j * GRIDSIZE;
      const outerBox = {
        "width": `${boxWidth}px`,
        "height": `${boxWidth}px`,
      };
      const innerBox = {
        "width": `${boxWidth - 5}px`,
        "height": `${boxWidth - 5}px`,
      };

      columns.push(
        <div
          key={`snake-board-box-${tileNumber}`}
          className="flex items-center justify-center bg-green-600"
          style={outerBox}
        >
          <div className="bg-green-400" style={innerBox} />
        </div>
      );
    }
    rows.push(
      <div key={i} className="flex">
        {columns}
      </div>
    );
  }
  return <React.Fragment>{rows}</React.Fragment>;
}
