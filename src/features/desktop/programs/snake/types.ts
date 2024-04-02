export type SnakeDirection = "up" | "down" | "left" | "right";
export type PositionedElement = { x: number; y: number };
export interface SnakeSegment extends PositionedElement {
  direction: SnakeDirection;
}
export type SnakeType = SnakeSegment[];
export type GameSpeed = "0" | "1" | "2";
