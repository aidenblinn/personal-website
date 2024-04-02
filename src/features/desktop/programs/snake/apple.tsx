import { PositionedElement } from "./types";

export default function Apple({
  apple,
  boxWidth,
}: {
  apple: PositionedElement;
  boxWidth: number;
}): React.ReactElement {
  return (
    <img
      style={{
        top: `${apple.y * boxWidth}px`,
        left: `${apple.x * boxWidth}px`,
        height: `${boxWidth - 2}px`,
        zIndex: 10,
      }}
      className="absolute"
      src="img/snake/Apple.png"
      alt="Apple"
    />
  );
}
