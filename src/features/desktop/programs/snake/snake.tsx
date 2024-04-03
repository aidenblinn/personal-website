import React from "react";
import { SnakeType } from "./types";

export default function Snake({
  snake,
}: {
  snake: SnakeType;
}): React.ReactElement {
  const getSegmentType = (index: number): string => {
    if (index === 0) {
      return "Head";
    } else if (index === snake.length - 1) {
      return "Tail";
    } else {
      if (snake[index].direction !== snake[index - 1].direction) {
        return "Turn";
      }
      return "Body";
    }
  };

  const getSegmentRotation = (direction?: string): string => {
    // Body, head, tail segments
    switch (direction) {
      case "up":
        return "0";
      case "right":
        return "90";
      case "down":
        return "180";
      case "left":
        return "270";

      // Turn segments
      case "up-right":
        return "270";
      case "up-left":
        return "0";
      case "down-left":
        return "90";
      case "down-right":
        return "180";
      default:
        return "360";
    }
  };

  return (
    <React.Fragment>
      {snake.map(({ x, y, direction }, index) => {
        const segmentType = getSegmentType(index);

        let modifiedDirection: string = direction;

        if (segmentType === "Turn") {
          const prev = snake[index - 1];
          const next = snake[index + 1];

          if (prev.y === y + 1 || next.y === y + 1) {
            modifiedDirection = "up-";
          } else {
            modifiedDirection = "down-";
          }

          if (prev.x === x + 1 || next.x === x + 1) {
            modifiedDirection += "right";
          } else {
            modifiedDirection += "left";
          }
        } else if (segmentType === "Tail") {
          modifiedDirection = snake[index - 1].direction;
        }
        const segmentRotation = getSegmentRotation(modifiedDirection);

        return (
          <img
            key={`snake-segment-${x}-${y}`}
            style={{
              gridArea: `${y + 1} / ${x + 1} / ${y + 1} / ${x + 1}`,
              transform: `rotate(${segmentRotation}deg)`,
            }}
            className="absolute w-full"
            src={`img/snake/${segmentType}.png`}
            alt={`Snake ${segmentType} segment`}
          />
        );
      })}
    </React.Fragment>
  );
}
