import { PositionedElement } from "./types";

export default function Apple({
  apple,
}: {
  apple: PositionedElement;
}): React.ReactElement {
  return (
    <img
      style={{
        gridArea: `${apple.y + 1} / ${apple.x + 1} / ${apple.y + 1} / ${
          apple.x + 1
        }`,
        zIndex: 10,
      }}
      className="absolute row-span-1 col-span-1"
      src="img/snake/Apple.png"
      alt="Apple"
    />
  );
}
